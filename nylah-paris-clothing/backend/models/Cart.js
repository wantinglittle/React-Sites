const mongoose = require('mongoose');

    const cartSchema = new mongoose.Schema({
        userID: {
            type: String,
        },
        cartItems: [
            {
            itemID: {
                type: Number,
            },
            itemPic: {
                type: String,
            },
            itemTitle: {
                type: String,
            },
            itemPrice: {
                type: Number,
            },
            }
        ]
    }, { timestamps: true });


module.exports = mongoose.model('Cart', cartSchema);