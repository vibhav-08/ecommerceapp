const router = require("express").Router();
const connection = require('../../mysqldb.js');

router.post("/", async (req, res) => {

    var joinSelect = `  SELECT cart.id as cart_id, customers.email as customer_email, cart.quantity as cart_quantity, cart.price as cart_price, sellers.shopname as seller_name, items.name as item_name, items.company as item_company, sellers.email as seller_email, items.itemno as itemno
                        from sellers join inventory 
                        on sellers.email = inventory.seller_email
                        join items
                        on items.itemno = inventory.itemno
                        join cart
                        on cart.seller_email = sellers.email
                        join customers
                        on cart.customer_email = customers.email
                        where customers.email = ? and cart.itemno = inventory.itemno`

    // var selectItems = 'SELECT * FROM cart WHERE customer_email = ?'

    var email = [req.body.customer_email];

    connection.query(joinSelect, [email], (err, results, fields) => {
        if (err) {
            res.status(500).send({msg: err.message});
            return console.error('error1', err.message);
        }
        // get inserted rows

        console.log(results);
        res.status(200).send({msg:results});
    });

    // Got to select all elements having given username 
});

module.exports = router;