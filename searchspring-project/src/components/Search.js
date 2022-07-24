import { useState, useEffect } from "react";
import Axios from "axios";
import SearchResults from "./SearchResults";
import Pagination from "./Pagination";
import("./styles/search.css");

const Header = () => {
  const [firstLoad, setFirstLoad] = useState(true)
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [searchResults, setSearchResults] = useState();
  const API_URL = process.env.REACT_APP_API_URL;
  const SITE_ID = process.env.REACT_APP_SITE_ID;

  const onChange = (e) => {
    setSearch(e.target.value);
  };

  const fetchData = () => {
    Axios.get(
      `${API_URL}${search}&resultsFormat=native&page=${page}&siteId=${SITE_ID}`
    ).then((res) => {
      setSearchResults(res.data);
    });
  };
  
  const onClick = (e) => {
    e.preventDefault();
    setFirstLoad(false)
    Axios.get(
      `${API_URL}${search}&resultsFormat=native&page=1&siteId=${SITE_ID}`
    ).then((res) => {
      setSearchResults(res.data);
    });
  };

  useEffect(() => {
    if(firstLoad) {
      return
    }
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

// console.log(searchResults)
  return (
    <div className="body">
      <div className="headerContainer">
        <div className="logoContainer">
          <a href="/">
            <img src="images/gaia-logo.png" alt="logo" className="logo" />
          </a>
        </div>
        <div className="searchContainer">
          <form action="" className="searchForm">
            <input
              type="text"
              className="searchInput"
              value={search}
              onChange={onChange}
              placeholder="Search for an item..."
              size='32'
            ></input>
            <button className="searchButton" onClick={onClick}>
            <i className="fa-solid fa-magnifying-glass"></i>
            </button>
          </form>
        </div>
        <div className="profileContainer"></div>
      </div>
      {firstLoad===false ? <Pagination setPage={setPage} pageData={searchResults} /> : null}
      <SearchResults data={searchResults} />
      {firstLoad===false ? <Pagination setPage={setPage} pageData={searchResults} /> : null}
    </div>
  );
};

export default Header;
