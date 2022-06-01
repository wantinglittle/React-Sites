import { useState } from "react";
import Axios from "axios";
import { Link } from "react-router-dom";
import "./styles/searchClients.css";

const SearchClients = () => {
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const onChange = (e) => {
    setSearch(e.target.value);
  };

  const onClick = (e) => {
    e.preventDefault();
    Axios.get("/getclients").then((res) => {
      setSearchResults(
        res.data.filter((clients) => {
          return clients.name.toLowerCase().includes(search.toLowerCase());
        })
      );
    });
  };

  return (
    <div className="searchPageContainer">
      <div className="searchContainer">
        <form className="searchForm">
          <input
            type="text"
            className="searchInput"
            value={search}
            onChange={onChange}
            placeholder="Search for a client..."
          ></input>
          <button className="searchButton" onClick={onClick}>
            Search
          </button>
        </form>
      </div>
      <div className="searchResults">
        {searchResults.map((clients) => {
          return (
            <Link
              to="/selectedclient"
              state={{ database: searchResults, id: clients._id, edit: false }}
              key={clients._id}
            >
              <ul className="resultItem" key={clients._id}>
                <li className="srClientName">{clients.name.slice(0,30)}{clients.name.length > 30 ? '...' : null}</li>
                <li className="srClientCity">{clients.city.slice(0, 15)}{clients.city.length > 15 ? '...' : null}</li>
                <li className="srClientDeliverable">{clients.deliverable}</li>
                <li className="srClientDueDate">{(new Date(clients.dueDate)).toString().slice(4,10)}</li>
                {/* <li className="srClientDueDate">{moment(clients.dueDate).format('MMMM Do')}</li> */}
              </ul>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default SearchClients;
