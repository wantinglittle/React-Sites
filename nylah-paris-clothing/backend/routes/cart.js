const express = require("express");
const router = express.Router();
const { cart } = require("../controllers/cart");
const { addItemToCart } = require("../controllers/cart");
const { deleteCartItem } = require("../controllers/cart");

router.route("/").get(cart);
router.route("/").post(addItemToCart);
router.route("/").delete(deleteCartItem);

module.exports = router;
