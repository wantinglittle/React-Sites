import { useState, useContext } from "react";
import Axios from "axios";
import { useLocation } from "react-router-dom";
import { CartContext } from "../cartContext";
import "./styles/selectedItem.css";

const SelectedItem = (props) => {
  const {updateCartSize} = useContext(CartContext)
  const location = useLocation();
  const itemID = location.state.database.ProductId;
  const itemPic = location.state.database.DefaultProductImage;
  const itemTitle = location.state.database.DisplayName;
  const itemDescription = location.state.database.Description;
  const itemPrice = location.state.database.ListPrice;
  const descriptionStart = itemDescription.search(`"d_content">`) + 12;
  const descriptionEnd =
    itemDescription.search(`.</div></section><section class="d_wrapper">`) + 1;
  const itemDesc = itemDescription.slice(descriptionStart, descriptionEnd);

  const token = localStorage.getItem("authToken");
  const [error, setError] = useState("");

  const addToDatabase = (e) => {
    e.preventDefault();

    const config = {
      header: {
        "Content-Type": "application/json",
      },
    };

    try {
      Axios.post(
        "/api/cart",
        {
          token,
          itemID,
          itemPic,
          itemTitle,
          itemPrice,
        },
        config
      );
      updateCartSize()
    } catch (err) {
      setError(err.response.data.error);
      console.log(error)
    }
  };

  return (
    <section className="SIContainer">
      <div className="SIimageContainer"><img src={itemPic} alt="Item" className="resultPicture" /></div>
      <div className="SIitemDetailsContainer">
        <p className="SIitemTitle">{itemTitle}</p>
        <article className="SIitemDescriptionContainer">
          <p className="SIitemDescription">{itemDesc}</p><br />
          <strong>
            <p className="SIitemDescription">Price: ${itemPrice}</p>
          </strong>
        </article>
        {token ? <button className="SIAddToCartButton" onClick={addToDatabase}>
          Add to Shopping Bag
        </button> :
          <p>You must be logged in to add this item to your shopping bag.</p>
        }
      </div>
      
    </section>
  );
};

export default SelectedItem;
