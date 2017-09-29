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

standardize.user = (db_user) => ({
  isLoggedIn: true,
  id: db_user._id,
  username: db_user.username,
  cart: db_user.cart
})

standardize.listings = (db_listings) => db_listings
  .map(x => standardize.listing(x))

standardize.newListing = (user, query) => {
  try {
    let r = {}
    if (!user.id) throw 'not logged in'
    r.userid = user.id
    if (!user.username) throw 'not logged in'
    r.username = user.username
    if (!query.title) throw 'title required'
    r.title = query.title
    if (!query.by) throw 'by required'
    r.by = query.by.constructor === Array ? query.by : [query.by]
    r.tag = query.tag ? query.tag.constructor === Array ? query.tag : [query.tag] : []
    if (isNaN(+query.price) || +query.price < 0 || +query.price >= 10000) throw 'valid price required'
    r.price = +query.price
    return r
  } catch (err){
    return {err}
  }
}

standardize.updateListing = (query) => {
  try {
    let r = {}
    if (!query.title) throw 'title required'
    r.title = query.title
    if (!query.by) throw 'by required'
    r.by = query.by.constructor === Array ? query.by : [query.by]
    r.tag = query.tag ? query.tag.constructor === Array ? query.tag : [query.tag] : []
    if (isNaN(+query.price) || +query.price < 0 || +query.price >= 10000) throw 'valid price required'
    r.price = +query.price
    return r
  } catch (err) {
    return {err}
  }
}

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
