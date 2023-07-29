const mongoose = require("mongoose");
const Order = require("../models/order");
const Cart = require("../models/cart");
const Product = require("../models/product");

exports.get_your_carts = (req, res, next) => {
  Cart.find({ buyer: req.userData.userId })
    .select("items _id buyer")
    .populate("productId", "_id name")
    .exec()
    .then((docs) => {
      res.status(200).json({
        message: "Your Cart!",
        count: docs.length > 0 ? docs[0].items.length : 0,
        data: docs.length > 0 ? docs[0].items : [],
      });
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
};

exports.add_to_cart = (req, res, next) => {
  const { product_id } = req.body;
  Product.findById(product_id)
    .exec()
    .then((product) => {
      const qty = Number.parseInt(req.body.qty);
      console.log("qty: ", qty);
      Cart.find({ buyer: req.userData.userId })
        .populate("productId", "_id name")
        .exec()
        .then((cart) => {
          if (!cart && qty <= 0) {
            throw new Error("Invalid request");
          } else if (cart.length > 0) {
            let cartVal = cart[0];
            const indexFound = cartVal.items?.findIndex((item) => {
              return item.product_id === product_id;
            });
            if (indexFound !== -1 && qty <= 0) {
              cartVal.items.splice(indexFound, 1);
            } else if (indexFound !== -1) {
              console.log(cartVal.items[indexFound].price * qty);
              cartVal.items[indexFound].qty =
                cartVal.items[indexFound].qty + qty;
              cartVal.items[indexFound].total =
                cartVal.items[indexFound].price * cartVal.items[indexFound].qty;
            } else if (qty > 0) {
              cartVal.items.push({
                product_id: product_id,
                name: product.name,
                price: product.price,
                category: product.category,
                productImage: product.productImage,
                qty: qty,
                total: product.price,
              });
            } else {
              throw new Error("Invalid request");
            }
            return cartVal.save();
          } else {
            const cartData = {
              buyer: req.userData.userId,
              items: [
                {
                  product_id: product_id,
                  name: product.name,
                  price: product.price,
                  category: product.category,
                  productImage: product.productImage,
                  qty: qty,
                  total: product.price,
                },
              ],
            };
            cart = new Cart(cartData);
            return cart.save();
          }
        })
        .then((savedCart) =>
          res.status(200).json({
            message: "Item Added To Cart!",
            count: savedCart.items.length > 0 ? savedCart.items.length : 0,
            data: savedCart.items,
          })
        )
        .catch((err) => {
          console.log(err);
          res.status(500).json({ error: err });
        });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err });
    });
};

exports.update_qty = (req, res, next) => {
  const { product_id } = req.body;
  const qty = Number.parseInt(req.body.qty);
  console.log("qty: ", qty);
  Cart.find({ buyer: req.userData.userId })
    .exec()
    .then((cart) => {
      if (!cart || qty <= 0) {
        throw new Error("Invalid request");
      } else {
        let cartVal = cart[0];
        const indexFound = cartVal.items.findIndex((item) => {
          return item.product_id === product_id;
        });
        if (indexFound !== -1) {
          //   console.log("index Found: ", indexFound);
          //   console.log("before update items: ", cartVal.items);
          let updatedQty = cartVal.items[indexFound].qty - qty;
          let updatedTotal =
            cartVal.items[indexFound].total -
            cartVal.items[indexFound].price * qty;
          if (updatedQty <= 0) {
            cartVal.items.splice(indexFound, 1);
          } else {
            cartVal.items[indexFound].qty = updatedQty;
            cartVal.items[indexFound].total = updatedTotal;
          }
          //   console.log("after update items: ", cartVal.items);
          cart = cartVal;
          return cart.save();
        } else {
          throw new Error("Invalid request");
        }
      }
    })
    .then((updatedCart) =>
      res.status(200).json({
        message: "Item Updated To Cart!",
        count: updatedCart.items.length > 0 ? updatedCart.items.length : 0,        
        data: updatedCart.items,
      })
    )
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err });
    });
};

exports.remove_item = (req, res, next) => {
  const { product_id } = req.body;

  Cart.find({ buyer: req.userData.userId })
    .exec()
    .then((cart) => {
      if (!cart) {
        throw new Error("Invalid request");
      } else {
        let cartVal = cart[0];
        const indexFound = cartVal.items.findIndex((item) => {
          return item.product_id === product_id;
        });
        if (indexFound !== -1) {
          cartVal.items.splice(indexFound, 1);
          cart = cartVal;

          return cart.save();
        } else {
          throw new Error("Invalid request");
        }
      }
    })
    .then((updatedCart) =>
      res.status(200).json({
        message: "Item Remove To Cart!",
        count: updatedCart.items.length > 0 ? updatedCart.items.length : 0,
        data: updatedCart.items,
      })
    )
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err });
    });
};
exports.delete_cart = (req, res, next) => {
  Cart.remove({ buyer: req.userData.userId })
    .exec()
    .then((docs) => {
      res.status(200).json({
        message: "Cart Empty",
        count: 0,
        data: [],
      });
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
};
