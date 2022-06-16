import { useState, useEffect, useContext } from "react";
import Axios from "axios";
import { CartContext } from "../cartContext";
import "./styles/shoppingCart.css";

const ShoppingCart = () => {
  const {updateCartSize, cartSize} = useContext(CartContext)
  const token = localStorage.getItem("authToken");
  const [cart, setCart] = useState([]);
  const [totalCost, setTotalCost] = useState([])

  useEffect(() => {
    try {
      Axios.get(`/api/cart`, { params: { token: token } }).then((res) => {
        setCart(res.data[0].cartItems);
      });
    } catch (error) {
      console.log(error);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cartSize]);

  const removeFromCart = (itemID) => {
    try {
      Axios.delete(`/api/cart`, {
        params: { itemID: itemID, token: token },
      }).then((res) => {
        setCart(res.data[0].cartItems);
      });
    } catch (error) {
      console.log(error);
    }
    updateCartSize()
  };
  
  useEffect(() => {
    let arr =[0]
    cart.map(item => {
      return arr.push(item.itemPrice)
    })
    setTotalCost(arr.reduce((sum, a) => sum + a ))
    
  },[cart])

  console.log(totalCost)
  
  return (
    <section className="SCContainer">
    
      <div className="itemsContainer">
        <h1 className="SCTitle">Shopping Cart</h1>
        <div className="cartItems">
          <ul className="resultsItemUL">
            {cart?.map((item) => {
              return (
                <li className="displayItem" key={item._id}>
                  <div className="cartItemImage">
                    <img
                      src={item.itemPic}
                      alt="Item"
                      className="resultPicture"
                    />
                  </div>
                  <div className="titleAndButton">
                    <span className="resultTitle">{item.itemTitle}</span>
                    <p className="resultPrice">${item.itemPrice}</p>
                    <button
                      className="deleteCartItem"
                      onClick={() => removeFromCart(item._id)}
                    >
                      Remove From Cart
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
      <div className="totalCostWrapper">
        <div className="totalCostContainer">
          <p className="totalCostHeader">Total:</p>
          {cart === [] ? null : <p className="totalCostAmount">${totalCost}.00</p>}
        </div>
      </div>
    </section>
  );
};

export default ShoppingCart;
