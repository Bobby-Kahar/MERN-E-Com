const express = require("express");
const router = express.Router();
const checkAuth = require("../middleware/check-auth");
const cartController = require("../controllers/cart");


router.get('/', checkAuth, cartController.get_your_carts);

// router.get('/:orderId', checkAuth,cartController.get_a_order);

router.post('/', checkAuth, cartController.add_to_cart);

router.post('/remove', checkAuth, cartController.remove_item);

router.put('/', checkAuth, cartController.update_qty);

router.delete('/', checkAuth, cartController.delete_cart);

module.exports = router;