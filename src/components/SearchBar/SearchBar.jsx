import React from 'react'

const SearchBar = ({ search, setSearch, handleSearch }) => {
  return (
    <div className='search-engine'>
        <input
            type='text'
            className='search-city'
            placeholder='Enter City Name...'
            name='search'
            value={search}
            onChange={ (event) => setSearch(event.target.value) }
        />
        <button className='search-btn' onClick={handleSearch}>Search Weather</button>
    </div>
  )
}

export default SearchBar;