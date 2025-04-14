import React, { useState } from 'react';
import toast from 'react-hot-toast';
import s from './SearchBar.module.css';

export const SearchBar = ({ handleChangeQuery }) => {
  const [query, setQuery] = useState(''); 

  
  const handleSubmit = (e) => {
    e.preventDefault(); 

    if (query.trim() === "") {
      toast.error("Please enter a search term.");
      return;
    }

    handleChangeQuery(query); 
    setQuery(''); 
  };

  return (
    <header className={s.searchWrapper}>
      <form onSubmit={handleSubmit}>
        <input
         className={s.searchInput}
          type="text"
          value={query} 
          onChange={(e) => setQuery(e.target.value)} 
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
        <button type="submit">Search</button>
      </form>
    </header>
  );
};

export default SearchBar;
