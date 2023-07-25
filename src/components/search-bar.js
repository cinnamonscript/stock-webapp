import React, { useState } from "react";
import "../styles/search-bar.css";

export function SearchBar(props) {
  const [searchText, setSearchText] = useState(props.value); // the input inside search bar for stock symbol
  const handleSubmit = (e) => {
    e.preventDefault();
    props.onSearch(searchText);
  };
  return (
    <div class="search-bar">
      <form className="search-form" class="search-form p-3">
        <input
          id="search"
          className="search"
          aria-labelledby="search-button"
          name="search"
          type="text"
          placeholder={props.placeholder || "Search..."}
          value={searchText}
          onInput={(e) => setSearchText(e.target.value)}
          style={{
            height: "38px",
            width: "200px",
          }}
        />
        <button
          class="search-button"
          id="search-button"
          type="submit"
          onClick={handleSubmit}
          style={{
            height: "35px",
          }}
        >
          Search
        </button>
      </form>
    </div>
  );
}
