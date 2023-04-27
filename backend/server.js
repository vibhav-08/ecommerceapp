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
const getCustomerBankDetails = require('./controller/customer/getCustomerBanks.js');
const getCouponDetails = require('./controller/coupon/getCoupon.js');
const customerBuyCart = require('./controller/customer/buyCart.js');
const modifyBalanceRoute = require('./controller/accounts/modifyBalance.js');
const addOrderRoute = require('./controller/orders/addOrder.js');
const cartFlushRoute = require('./controller/cart/flushCart.js');
const customerGetOrders = require('./controller/customer/getOrders.js');
const addToPlacedRoute = require('./controller/cart/addToPlaced.js');
const warehouseReceive = require('./controller/warehouse/receiveWarehouse.js');
const warehouseDispatch = require('./controller/warehouse/dispatchWarehouse.js');
const getWarehouseInventory = require('./controller/warehouse/getInventory.js');
const changeOrderStatus = require('./controller/orders/changeOrderStatus.js');
const setOrderedItems = require('./controller/seller/orderedItems.js');
const customerFetchInventory = require('./controller/inventory/fetchInventory.js');
const customerFetchSelected = require('./controller/inventory/fetchSelectedItems.js');

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
app.use("/customer/getbanks", getCustomerBankDetails);
app.use("/customer/buycart", customerBuyCart);
app.use("/customer/getorders", customerGetOrders);
app.use('/customer/fetchinventory', customerFetchInventory);
app.use('/customer/fetchsearch', customerFetchSelected);

app.use("/getitem", getItemDetails);
app.use("/getseller", getSellerDetails);
app.use("/getcoupon", getCouponDetails);

app.use("/seller/login", sellerLoginRoute);
app.use("/seller/register", sellerRegisterRoute);
app.use("/seller/additem", sellerAddItem);
app.use("/seller/additemtoinv", sellerAddItemToInventory);
app.use("/seller/modifyitemininv", sellerModItemInInventory);
app.use("/seller/deleteitemfrominv", sellerDelItemFromInventory);
app.use("/seller/getordereditems", setOrderedItems);

app.use("/advertiser/register", advertiserRegisterRoute);
app.use("/advertiser/login", advertiserLoginRoute);
app.use("/advertiser/addcoupon", addCouponRoute);
app.use("/advertiser/deleteCoupon", deleteCouponRoute);

app.use("/warehouse/register", warehouseRegisterRoute);
app.use("/warehouse/login", warehouseLoginRoute);
app.use("/warehouse/receiveitems", warehouseReceive);
app.use("/warehouse/dispatchitems", warehouseDispatch);
app.use("/warehouse/getinventory", getWarehouseInventory);

app.use("/accounts/modifybalance", modifyBalanceRoute);

app.use("/orders/addorder", addOrderRoute);
app.use("/orders/changeorderstatus", changeOrderStatus);

app.use("/cart/flushcart", cartFlushRoute);

app.use("/placed/addtoplaced", addToPlacedRoute);

app.listen(3080, () => {
    console.log('Backend running');
});