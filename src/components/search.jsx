import React from 'react'
import Searchbar from './searchbar.jsx'
import Filter from './filter.jsx'
import Listings from './listings.jsx'

export default (props) =>
  <div className='p2'>
    <Searchbar
      input={props.input}
      inputChange={props.inputChange}
      clickBtn={props.clickBtn} />
    <div className='flex'>
      <Filter
        categories={props.categories}
        clickFilter={props.clickFilter}
        clickBtn={props.clickBtn} />
      <Listings
        empty='no results found'
        listings={props.listings}
        columns={['title', 'by', 'tag', 'seller', 'price']}
        clickBtn={props.clickBtn} />
    </div>
  </div>
