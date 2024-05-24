const express = require('express');
const userController = require('./controllers/userController');
const orderController = require('./controllers/orderController');
const cartController = require('./controllers/cartController');
const authenticateToken = require('../middlewares/auth'); 
const wrapAsync = require("../utils/wrapAsync")

const router = express.Router();

router.post('/signup', wrapAsync(userController.signup));
router.post('/login', wrapAsync(userController.login));
router.post('/logout', wrapAsync(userController.logout));
router.post('/order', authenticateToken, wrapAsync(orderController.placeOrder)); 
router.get('/orders', authenticateToken, wrapAsync(orderController.getOrders)); 
router.post('/cart', authenticateToken, wrapAsync(cartController.addToCart)); 
router.post('/checkout', authenticateToken, wrapAsync(cartController.checkout)); 

module.exports = router;
