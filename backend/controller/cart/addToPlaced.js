const router = require("express").Router();
const connection = require('../../mysqldb.js');

router.post("/", async (req, res) => {

    var insertItems = 'INSERT INTO placed(id, customer_email, seller_email, itemno, quantity, price)  VALUES ?'

    var items = [
        [req.body.id, req.body.customer_email, req.body.seller_email, req.body.itemno, req.body.quantity, req.body.price]
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
});

module.exports = router;