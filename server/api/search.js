const router = require('koa-router')()
const Listing = require('../models/Listing.js')

router.get('/', async ctx => {
  let search = []
  let query = standardizeQuery(ctx.request.query)
  query.input.forEach(x => {
    let rx = new RegExp('(?:^| )' + x + '(?: |$)')
    search.push({$or: [
      {title: {$regex: rx, $options: 'i'}},
      {by: {$regex: rx, $options: 'i'}},
      {tag: {$regex: rx, $options: 'i'}}
    ]})
  })
  if (query.title) search.push({title: query.title})
  query.by.forEach(x => {search.push({by: x})})
  query.tag.forEach(x => {search.push({tag: x})})
  let searchobj = search.length > 0 ? {$and: search} : {}
  let listings = await Listing.find(searchobj)
  listings = listings.map(x => ({
    title: x.title,
    by: x.by,
    tag: x.tag,
    seller: x.username,
    price: x.price,
    id: x.id
  }))
  let search_results = {
    listings,
    categories: makeCategories(query, listings),
    isLoading: false
  }
  ctx.body = {res: search_results}
})

function standardizeQuery (query) {
  return {
    input: query.input ? query.input.split(' ') : [],
    title: query.title ? query.title : '',
    by: query.by ? query.by.constructor === Array ? query.by : [query.by] : [],
    tag: query.tag ? query.tag.constructor === Array ? query.tag : [query.tag] : []
  }
}

function makeCategories (query, listings) {
  return [
    { name: 'title',
      open: true,
      values: listings
        .map(x => x.title)
        .sort()
        .filter((x, i, a) => !i || x != a[i - 1])
        .map(x => ({v: x, sel: x === query.title}))
    },
    { name: 'by',
      open: true,
      values: listings
        .map(x => x.by)
        .reduce((a, b) => a.concat(b), [])
        .sort()
        .filter((x, i, a) => !i || x != a[i - 1])
        .map(x => ({v: x, sel: Boolean(query.by) && query.by.includes(x)}))
    },
    { name: 'tag',
      open: true,
      values: listings
        .map(x => x.tag)
        .reduce((a, b) => a.concat(b), [])
        .sort()
        .filter((x, i, a) => !i || x != a[i - 1])
        .map(x => ({v: x, sel: Boolean(query.tag) && query.tag.includes(x)}))
    }
  ]
}

module.exports = router