const Cart = require("../models/Cart");
const jwt = require("jsonwebtoken");

// Get list of cart contents
exports.cart = async (req, res) => {
  const { token } = req.query;
  const userID = jwt.verify(token, process.env.JWT_SECRET).id;
  Cart.find({ userID }, (err, result) => {
    if (err) res.send(error);

    res.send(result);
  });
};

// Add item to cart
exports.addItemToCart = async (req, res) => {
  const { token, itemID, itemPic, itemTitle, itemPrice } = req.body;
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const userID = decoded.id;
  const user = await Cart.findOne({ userID });

  if (!user) {
    try {
      user = await Cart.create({
        userID,
        cartItems: { itemID, itemPic, itemTitle, itemPrice },
      });
    } catch (err) {
      console.log(err);
    }
  }

  if (user) {
    Cart.findOneAndUpdate(
      { userID: userID },
      {
        $push: {
          cartItems: [
            { itemID, itemPic, itemTitle, itemPrice },
          ],
        },
      }
    ).exec((error, _cart) => {
      if (error) console.log(error);
    });
  }
};

// Delete item from cart
exports.deleteCartItem = async (req, res) => {
  const { itemID } = req.query;
  const { token } = req.query;
  const userID = jwt.verify(token, process.env.JWT_SECRET).id;

  Cart.findOneAndUpdate(
    { userID: userID },
    {
      $pull: {
        cartItems: { _id: itemID },
      },
    }
  ).exec((error, _cart) => {
    if (error) console.log(error);
  });
  Cart.find({ userID }, (err, result) => {
    if (err) res.send(error);

    res.send(result);
  });
};
