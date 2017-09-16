let standardize = {}

standardize.listing = (db_listing) => ({
  title: db_listing.title,
  by: db_listing.by,
  tag: db_listing.tag,
  seller: db_listing.username,
  userid: db_listing.userid,
  price: db_listing.price,
  id: db_listing._id
})

standardize.listings = (db_listings) => db_listings
  .map(x => standardize.listing(x))

standardize.newListing = (user, query) => ({
  userid: user.id,
  username: user.username,
  title: query.title,
  by: query.by.constructor === Array ? query.by : [query.by],
  tag: query.tag ? query.tag.constructor === Array ? query.tag : [query.tag] : [],
  price: query.price
})

standardize.updateListing = (query) => ({
  title: query.title,
  by: query.by.constructor === Array ? query.by : [query.by],
  tag: query.tag ? query.tag.constructor === Array ? query.tag : [query.tag] : [],
  price: query.price
})

standardize.query = (query) => ({
  input: query.input ? query.input.split(' ') : [],
  title: query.title ? query.title : '',
  by: query.by ? query.by.constructor === Array ? query.by : [query.by] : [],
  tag: query.tag ? query.tag.constructor === Array ? query.tag : [query.tag] : []
})

standardize.searchObj = (query) => {
  let rArr = query.input.map(x => {
    let rx = new RegExp('(?:^| )' + x + '(?: |$)')
    return {$or: [
      {title: {$regex: rx, $options: 'i'}},
      {by: {$regex: rx, $options: 'i'}},
      {tag: {$regex: rx, $options: 'i'}}
    ]}
  })
  if (query.title) rArr.push({title: query.title})
  query.by.forEach(x => rArr.push({by: x}))
  query.tag.forEach(x => rArr.push({tag: x}))
  return rArr.length ? {$and: rArr} : {}
}

standardize.categories = (query, db_listings) => ['title', 'by', 'tag']
  .map(cat => ({
    name: cat,
    open: true,
    values: db_listings
      .map(x => x[cat])
      .reduce((a, b) => a.concat(b), [])
      .sort()
      .filter((x, i, a) => !i || x != a[i - 1])
      .map(x => ({
        v: x,
        sel: x === query[cat] || query[cat].includes(x)
      }))
  }))

module.exports = standardize
