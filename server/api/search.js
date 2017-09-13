const router = require('koa-router')()
const Listing = require('../models/Listing.js')

router.get('/', async ctx => {
  try {
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
    let db_listings = await Listing.find(search.length > 0 ? {$and: search} : {})
    ctx.body = {res: {
      input: query.input ? query.input.join(' ') : '',
      listings: makeListings(db_listings),
      categories: makeCategories(query, db_listings)
    }}
  } catch (err) {
    ctx.body = {err}
  }
})

function standardizeQuery (query) {
  return {
    input: query.input ? query.input.split(' ') : [],
    title: query.title ? query.title : '',
    by: query.by ? query.by.constructor === Array ? query.by : [query.by] : [],
    tag: query.tag ? query.tag.constructor === Array ? query.tag : [query.tag] : []
  }
}

function makeListings (dbres) {
  return dbres.map(x => ({
    title: x.title,
    by: x.by,
    tag: x.tag,
    seller: x.username,
    price: x.price,
    id: x.id
  }))
}

function makeCategories (query, listings) {
  return ['title', 'by', 'tag']
    .map(cat => ({
      name: cat,
      open: true,
      values: listings
        .map(x => x[cat])
        .reduce((a, b) => a.concat(b), [])
        .sort()
        .filter((x, i, a) => !i || x != a[i - 1])
        .map(x => ({
          v: x,
          sel: query[cat] instanceof Array ? query[cat].includes(x) : x === query[cat]
        }))
    }))
}

module.exports = router