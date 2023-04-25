var mongoose = require('mongoose');
const express = require("express");
const app = express();
const bodyParser = require("body-parser");


const customerLoginRoute = require('./controller/customer/loginAuth.js');
const customerRegisterRoute = require('./controller/customer/register.js');
const sellerLoginRoute = require('./controller/seller/loginAuth.js');
const sellerRegisterRoute = require('./controller/seller/register.js');
const sellerAddItem = require('./controller/item/addItem.js');
const sellerAddItemToInventory = require('./controller/inventory/addItemToInv.js');
const sellerModItemInInventory = require('./controller/inventory/modifyInventory.js');
const sellerDelItemFromInventory = require('./controller/inventory/deleteItemFromInv.js');
const addItemToCart = require('./controller/cart/addToCart.js');
const modifyCartItem = require('./controller/cart/modifyCartItem.js');
const deleteCartItem = require('./controller/cart/deleteCartItem.js');
const customerCartRoute = require('./controller/cart/getCartItems.js');
const advertiserRegisterRoute = require('./controller/advertiser/register.js');
const advertiserLoginRoute = require('./controller/advertiser/loginAuth.js');
const warehouseRegisterRoute = require('./controller/warehouse/addWarehouse.js');
const warehouseLoginRoute = require('./controller/warehouse/login.js');
const addCouponRoute = require('./controller/coupon/addCoupon.js');
const deleteCouponRoute = require('./controller/coupon/deleteCoupon.js');
const getItemDetails = require('./controller/item/getItem.js');
const getSellerDetails = require('./controller/seller/getSeller.js');

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const url = 'mongodb://127.0.0.1:27017';
const dbName = 'dummy';

console.log('user')

// Connect to the db
mongoose
    .connect(
        "mongodb://127.0.0.1:27017/ecommerceapp",
        { useNewUrlParser: true, useUnifiedTopology: true }
    )
    .then(
        () => console.log('Connected to mongodb'),
        (err) => console.log('error', err)
    );

app.use("/customer/login", customerLoginRoute);
app.use("/customer/register", customerRegisterRoute);
app.use("/customer/additemtocart", addItemToCart);
app.use("/customer/modifycartitem", modifyCartItem);
app.use("/customer/deletecartitem", deleteCartItem);
app.use("/customer/getcart", customerCartRoute);

app.use("/getitem", getItemDetails);
app.use("/getseller", getSellerDetails);

app.use("/seller/login", sellerLoginRoute);
app.use("/seller/register", sellerRegisterRoute);
app.use("/seller/additem", sellerAddItem);
app.use("/seller/additemtoinv", sellerAddItemToInventory);
app.use("/seller/modifyitemininv", sellerModItemInInventory);
app.use("/seller/deleteitemfrominv", sellerDelItemFromInventory);

app.use("/advertiser/register", advertiserRegisterRoute);
app.use("/advertiser/login", advertiserLoginRoute);
app.use("/advertiser/addcoupon", addCouponRoute);
app.use("/advertiser/deleteCoupon", deleteCouponRoute);

app.use("/warehouse/register", warehouseRegisterRoute);
app.use("/warehouse/login", warehouseLoginRoute);

app.listen(3080, () => {
    console.log('Backend running');
});