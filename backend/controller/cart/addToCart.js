const router = require("express").Router();
const connection = require('../../mysqldb.js');

router.post("/", async (req, res) => {
    var price = 0;

    var priceQuery = 'SELECT price FROM inventory WHERE itemno = ? AND seller_email = ?'
    var quedata = [req.body.itemno, req.body.seller_email];
    connection.query(priceQuery, quedata, (error, results, fields) => {
        if (error) {
            res.status(500).send({ msg: 'Item Not In Inventory' });
            return console.error(error.message);
        }

        console.log(results);
        price = results[0].price;
        console.log(price);
        var insertItems = 'INSERT INTO cart(customer_email, seller_email, itemno, quantity, price)  VALUES ?'

        var items = [
            [req.body.customer_email, req.body.seller_email, req.body.itemno, req.body.quantity, price*req.body.quantity]
        ];

        connection.query(insertItems, [items], (err, results, fields) => {
            if (err) {
                res.status(500).send({ msg: err.message });
                return console.error('error1', err.message);
            }
            // get inserted rows
            console.log('Row inserted:' + results.affectedRows);
            res.status(200).send({ msg: "Success" })
        });
    })
});

module.exports = router;