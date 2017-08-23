const router = require('koa-router')()
const Listing = require('../models/Listing.js')

// router.get('/load', async ctx => {ctx.body = {res: require('./testdata.js')}})

router.get('/', async ctx => {
  let search = []
  let query = standardizeQuery(ctx.request.query)
  if (query.title) search.push({title: query.title})
  if (query.by) query.by.forEach(x => {search.push({by: x})})
  if (query.tag) query.tag.forEach(x => {search.push({tag: x})})
  let searchobj = search.length > 0 ? {$and: search} : {}
  let listings = await Listing.find(searchobj)
  listings = listings.map(x => ({title: x.title, by: x.by, tag: x.tag, price: x.price}))
  let search_results = {
    listings,
    categories: makeCategories(query, listings),
    input: '',
    isLoading: false
  }
  ctx.body = {res: search_results}
})

function standardizeQuery (query) {
  rquery = {}
  if (query.title) rquery.title = query.title
  if (query.by) rquery.by = query.by.constructor === Array ? query.by : [query.by]
  if (query.tag) rquery.tag = query.tag.constructor === Array ? query.tag : [query.tag]
  return rquery
}

function makeCategories (query, listings) {
  return [
    { name: 'title',
      values: listings
        .map(x => x.title)
        .sort()
        .filter((x, i, a) => !i || x != a[i - 1])
        .map(x => ({v: x, sel: x === query.title}))
    },
    { name: 'by',
      values: listings
        .map(x => x.by)
        .reduce((a, b) => a.concat(b))
        .sort()
        .filter((x, i, a) => !i || x != a[i - 1])
        .map(x => ({v: x, sel: Boolean(query.by) && query.by.includes(x)}))
    },
    { name: 'tag',
      values: listings
        .map(x => x.tag)
        .reduce((a, b) => a.concat(b))
        .sort()
        .filter((x, i, a) => !i || x != a[i - 1])
        .map(x => ({v: x, sel: Boolean(query.tag) && query.tag.includes(x)}))
    }
  ]
}

module.exports = router