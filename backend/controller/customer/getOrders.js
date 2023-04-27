const router = require("express").Router();
const connection = require('../../mysqldb.js');

router.post("/", async (req, res) => {

    var joinSelect = `  SELECT orders.customer_amount, orders.seller_amount, orders.otp, orders.warehouse as warehouse_id, warehouse.address as w_addr, warehouse.city as w_city, orders.order_status as status, orders.cart_id as cart_id, placed.quantity as cart_quantity, placed.price as cart_price, sellers.shopname as seller_name, items.name as item_name, items.company as item_company, sellers.email as seller_email, items.itemno as itemno
                        from orders join placed 
                        on placed.id = orders.cart_id
                        join items
                        on items.itemno = placed.itemno
                        join sellers
                        on placed.seller_email = sellers.email
                        join customers
                        on placed.customer_email = customers.email
                        join warehouse
                        on warehouse.warehouse_id = orders.warehouse
                        where customers.email = ?`

    // var selectItems = 'SELECT * FROM cart WHERE customer_email = ?'

    var email = [req.body.customer_email];

    connection.query(joinSelect, [email], (err, results, fields) => {
        if (err) {
            res.status(500).send({msg: err.message});
            return console.error('error1', err.message);
        }
        // get inserted rows
        console.log(results);
        res.status(200).send({msg: results});
    });

    // Got to select all elements having given username 
});

module.exports = router;