import { useState } from "react";
import "./searchbar.css";

const SearchBar = ({ setFilterList, allProducts }) => {
  const [searchWord, setSearchWord] = useState("");

  const handleChange = (e) => {
    const value = e.target.value;
    setSearchWord(value);
    const filtered = allProducts.filter((item) =>
      item.name?.toLowerCase().includes(value.toLowerCase())
    );
    setFilterList(filtered);
  };

  return (
    <div className="search-container">
      <input
        type="text"
        placeholder="Search..."
        value={searchWord}
        onChange={handleChange}
      />
      <ion-icon name="search-outline" class="search-icon"></ion-icon>
    </div>
  );
};

export default SearchBar;
