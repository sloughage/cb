// let user = {
//   isLoggedIn: true,
//   username: 'bill69',
//   userid: '123'}

let user = {
  isLoggedIn: false}

let categories = [
  { name: 'title',
    values: [
      {v: 'watchmen', sel: false},
      {v: 'pim & francie', sel: false},
      {v: 'big numbers #2', sel: false}]},
  { name: 'by',
    values: [
      {v: 'alan moore', sel: false},
      {v: 'dave gibbons', sel: false},
      {v: 'al columbia', sel: false}]},
  { name: 'tag',
    values: [
      {v: 'oop', sel: false}]}]

let listings = [
  { title: 'watchmen',
    by: ['alan moore', 'dave gibbons'],
    tags: [],
    seller: 'bill69',
    price: '12.99'},
  { title: 'pim & francie',
    by: ['al columbia'],
    tags: [],
    seller: 'frankie',
    price: '30.00'},
  { title: 'big numbers #2',
    by: ['alan moore', 'al columbia'],
    tags: ['oop'],
    seller: 'bill69',
    price: '8.60'}]

let columns = ['title', 'by', 'tags', 'seller', 'price']

let input = 'woof'

let dropdown = {
  register: false,
  login: false,
  settings: false
}

export default {
  user,
  categories,
  listings,
  columns,
  input,
  dropdown
}