import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { ThemeContext } from "../themecontext";

const SearchResults = (props) => {
  const { theme } = useContext(ThemeContext);
  let countries = props.searchString;

  return (
    <div className="card-grid" id={theme}>
      {countries.map((country) => {
        return (
          <div className="country-card" id={theme} key={country.name}>
            <div className="flag-container">
              <Link
                to="/selectedcountry"
                state={{ database: countries, name: country.name }}
              >
                <img
                  src={country.flags.png}
                  alt="flag"
                  className="flag-image"
                />
              </Link>
            </div>
            <Link
              to="/selectedcountry"
              state={{ database: countries, name: country.name }}
            >
              <div className="country-name">
                <h1>{country.name}</h1>
              </div>
            </Link>
            <div className="country-details">
              <p className="population">
                <b>Population: </b>
                {country.population
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
              </p>
              <p className="region">
                <b>Region: </b>
                {country.region}
              </p>
              <p className="capital">
                <b>Capital: </b>
                {country.capital}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default SearchResults;
