import React, {useContext} from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import "./selectedcountry.css";
import { ThemeContext } from "../themecontext";

const SelectedCountry = (props) => {
  const {theme} = useContext(ThemeContext)

  const navigate = useNavigate();
  const location = useLocation();
  const name = location.state.name;
  const database = location.state.database;

  let index = database.findIndex((x) => x.name === name);

  let currencies = database[index].currencies.map((curr) => {
    return curr.name;
  });

  let languages = database[index].languages.map((lang) => {
    return lang.name;
  });

  // Find index of border countries to convert abbreviations to full names
  const hasBorders = database[index].hasOwnProperty("borders"); //first, make sure there are bordering countries
  let borderCountryIndices = [];
  if (hasBorders) {
    borderCountryIndices = database[index].borders.map((bc) => {
      return database.findIndex((x) => {
        return x.alpha3Code === bc;
      });
    });
  }

  //Convert border country indices to full names
  let borderCountries = borderCountryIndices
    .map((bc) => {
      return database[bc].name;
    });


    return (
    <div className="sc-container" id={theme}>
        <div className="go-back-container">
          <div className="go-back" id={theme} onClick={() => navigate(-1)}>
          <i className="fa-solid fa-arrow-left"></i><p>Back</p>
          </div>
        </div>
      <div className="sc-container-country">
        <div className="sc-flag-container">
          <img src={database[index].flags.svg} alt="flag" className="sc-flag" />
        </div>
        <div className="sc-container-details" id={theme}>
          <h1 className="sc-name">{name}</h1>
          <div className="sc-details" id={theme}>
            <div className="sc-left-column" id={theme}>
              <p className="sc-native-name"><span>Native Name: </span>{database[index].nativeName}</p>
              <p className="sc-population"><span>Population: </span>{database[index].population.toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</p>
              <p className="sc-region"><span>Region: </span>{database[index].region}</p>
              <p className="sc-sub-region"><span>Sub Region: </span>{database[index].subRegion}</p>
              <p className="sc-capital"><span>Capital: </span>{database[index].capital}</p>
            </div>
            <div className="sc-right-column">
              <p className="sc-top-level-domain">
                <span>Top Level Domain: </span>{database[index].topLevelDomain}
              </p>
              <p className="sc-currencies"><span>Currency(ies): </span>{currencies.join(", ")}</p>
              <p className="sc-languages"><span>Language(s): </span>{languages.join(", ")}</p>
                        </div>
            </div>
          <div className="sc-border-countries"><p className="bc-title">Border Countries:</p>{borderCountries.map(each =>  <Link to="/selectedcountry"
              state={{ database: database, name: each }}><div className="each-border-country" key={each}>{each}</div></Link>)}</div>
        </div>
      </div>
    </div>
  );
};

export default SelectedCountry;
