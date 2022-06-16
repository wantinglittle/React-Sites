import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Axios from "axios";
import { Link } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid'
import Spinner from "./Spinner";
import("./styles/categoryResults.css");

const CategoryResults = (props) => {
  const location = useLocation();
  const output = location.state.output;
  const [results, setResults] = useState(null);
  const [resultsHeading, setResultsHeading] = useState("");
  const API_URL = process.env.REACT_APP_API_URL;
  const API_HOST = process.env.REACT_APP_HOST;
  const API_KEY = process.env.REACT_APP_KEY;

  const options = {
    method: "GET",
    url: API_URL,
    params: {
      categoryName: `${output}`,
      pageSize: "48",
      pageNumber: "1",
      sortby: "0",
    },
    headers: {
      "X-RapidAPI-Host": API_HOST,
      "X-RapidAPI-Key": API_KEY,
    },
  };

  useEffect(() => {
    setResults(null)
    Axios.request(options)
      .then((res) => setResults(res.data.CatalogProducts))
      .catch(function (error) {
        console.error(error);
      });
    if (output === "mens_main") setResultsHeading(`Men's Clothing`);
    if (output === "women_main") setResultsHeading(`Women's Clothing`);
    if (output === "sale") setResultsHeading(`Sale`);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [output]);

  console.log(results);


  return (
    <div className="resultsContainer">
    {!results && <Spinner />}
      {results && <h1 className="resultsHeading">{resultsHeading}</h1>}
        <ul className="resultsItemUL">
          {results?.map((item) => {
            return (

                <li className="displayItem" key={uuidv4()}>
                <Link
                to="/selecteditem"
                state={{
                  database: item,
                }}
                className='displayItemLink'
                
              >
                  <div className="resultsItemContainer">
                    <img
                      src={item.DefaultProductImage}
                      alt="Item"
                      className="resultPicture"
                    />
                    <p className="resultTitle">{item.DisplayName}</p>
                    <p className="resultPrice">${item.ListPrice}</p>
                  </div>
              </Link>
                </li>
            );
          })}
        </ul>
    </div>
  );
};

export default CategoryResults;
