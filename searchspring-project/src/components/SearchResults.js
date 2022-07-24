import { useEffect, useState } from "react";
import "./styles/searchResults.css";

function SearchResults(props) {
  const search = props.data;
  const [numItems, setNumItems] = useState()

  useEffect(() => {
    setNumItems(search && search.results.length)
  }, [search])
  
  return (
    <div>
    {numItems ===0 ? (
    <div className="noResults">
      We're sorry, there are no items resulting from that search.
    </div>
    ) : null}
      <ul className="resultsContainer">
        {search?.results.map((item) => {
          return (
            <li className="itemContainer" key={item.id}>
              <div className="itemName">{item.name}</div>
              <img
                src={item.thumbnailImageUrl}
                alt="thumbnail"
                className="itemThumbnail"
              />
              {item.msrp > item.price ? (
                <div className="itemPrice">
                ${item.price} <span className="priceCrossout">${item.msrp}</span>
                </div>
              ) : (
                <div>${item.price}</div>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default SearchResults;
