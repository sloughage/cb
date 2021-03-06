let construct = {}

construct.query = (rl) => {
  let print = (a, b) => encodeURIComponent(a) + '=' + encodeURIComponent(b)
  return Object.keys(rl)
    .map(k => {
      if (rl[k].constructor === Array) return rl[k].filter(x => x).map(v => print(k, v))
      else if (rl[k]) return print(k, rl[k])
    }).reduce((a, b) => a.concat(b), [])
    .filter(x => x)
    .join('&')
}

construct.search = (state, z) => {
  let input = state.input ? 'input=' + encodeURIComponent(state.input) : ''
  let filter = z && state.categories
    .map(cat => cat.values
      .filter(value => value.sel)
      .map(value => encodeURIComponent(cat.name) + '=' + encodeURIComponent(value.v))
    ).reduce((a, b) => a.concat(b), [])
    .join('&')
  return 'search?' + [input, filter].filter(x => x).join('&')
}

construct.raw = (listing) => ({
  title: listing.title,
  by: listing.by,
  tag: listing.tag.length ? listing.tag : [''],
  price: listing.price
})

construct.new = () => ({
  title: '',
  by: [''],
  tag: [''],
  price: ''
})

construct.dropdown = () => ({
  register: {open: false, username: '', password: ''},
  login: {open: false, username: '', password: ''},
  settings: {open: false}
})

construct.user = (cat) => {
  return '?' + [
    cat.username && 'username=' + encodeURIComponent(cat.username),
    cat.password && 'password=' + encodeURIComponent(cat.password)
  ].filter(x => x).join('&')
}

export default construct
