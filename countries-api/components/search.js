import React, { useEffect, useState, useContext } from "react";
import Axios from "axios";
import SearchResults from "./SearchResults";
import "./search.css";
import { ThemeContext } from "../themecontext";

const Search = () => {

const {theme} = useContext(ThemeContext)


  const [input, setInput] = useState("");
  const [countryList, setCountryList] = useState([]);
  const [allCountries, setAllCountries] = useState([]);
  const [search, setSearch] = useState(false);
  const [region, setRegion] = useState(["Filter by Region"]);
  const [regionSwitch, setRegionSwitch] = useState([false]);
  const [regionList, setRegionList] = useState({});
  const [regionDeprecated, setRegionDeprecated] = useState({});

  const handleChange = (event) => {
    setInput(event.target.value);
  };

  //when no country is searched
  useEffect(() => {
    Axios.get("https://restcountries.com/v2/all").then((response) => {
      setAllCountries(response.data);
    });
  }, []);

  //when a country is searched for
  const getCountries = (e) => {
    e.preventDefault();
    input === "" ? setSearch(false) : setSearch(true);
    Axios.get("https://restcountries.com/v2/all").then((response) => {
      setCountryList(
        response.data.filter((country) => {
          return country.name.toLowerCase().includes(input.toLowerCase());
        })
      );
    });
  };

  //when no country is searched and region is selected
  useEffect(() => {
    Axios.get("https://restcountries.com/v2/all").then((response) => {
      setRegionList(
        response.data.filter((country) => {
          return country.region.toLowerCase().includes(region[0].toLowerCase());
        })
      );
    });
  }, [region]);

  //when region is selected and country is searched
  useEffect(() => {
    Axios.get("https://restcountries.com/v2/all").then((response) => {
      setRegionDeprecated(
        response.data
          .filter((country) => {
            return country.name.toLowerCase().includes(input.toLowerCase());
          })
          .filter((country) => {
            return country.region
              .toLowerCase()
              .includes(region[0].toLowerCase());
          })
      );
    });
  }, [region, input]);

  //when a region is selected
  const regionSelect = (event) => {
    setRegion([event.target.value]);
    if (event.target.value === "Filter by Region") {
      setRegionSwitch([false]);
    } else {
      setRegionSwitch([true]);
    }
  };

  return (
    <>
      <header className="search-header" id={theme}>
        <div className="search-container">
          <div className="search-image">
            <i className="fa-solid fa-magnifying-glass"></i>
          </div>
          <form onSubmit={getCountries}>
            <input
              type="text"
              value={input}
              onChange={handleChange}
              placeholder="Search for a country..."
              className="search-box"
              id={theme}
            ></input>
          </form>
        </div>
        <div className="select-container">
          <select id="regions" className="regions" onChange={regionSelect}>
            <option value="Filter by Region">None</option>
            <option value="Africa">Africa</option>
            <option value="Americas">Americas</option>
            <option value="Asia">Asia</option>
            <option value="Europe">Europe</option>
            <option value="Oceania">Oceania</option>
          </select>
          <div className="dropdown-selected">{region}</div>
        </div>
      </header>
      {search === false && regionSwitch[0] === false ? (
        <SearchResults searchString={allCountries} />
      ) : null}
      {search === true && regionSwitch[0] === false ? (
        <SearchResults searchString={countryList} />
      ) : null}
      {search === false && regionSwitch[0] === true ? (
        <SearchResults searchString={regionList} />
      ) : null}
      {search === true && regionSwitch[0] === true ? (
        <SearchResults searchString={regionDeprecated} />
      ) : null}
    </>
  );
};

export default Search;
