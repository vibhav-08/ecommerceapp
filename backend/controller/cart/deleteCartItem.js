const router = require("express").Router();
const connection = require('../../mysqldb.js');

router.post("/", async (req, res) => {
    var deleteItems = 'DELETE FROM cart WHERE itemno = ? AND seller_email = ? AND customer_email = ?';

    var data = [req.body.itemno, req.body.seller_email, req.body.customer_email];

    connection.query(deleteItems, data, (err, results, fields) => {
        if (err) {
            res.status(500).send({msg: err.message});
            return console.error('error1', err.message);
        }
        // get inserted rows
        console.log('Row inserted:' + results.affectedRows);
        res.status(200).send({msg:"Success"})
    });
});

module.exports = router;

// cart_id coupon_id order_status warehouse1 warehouse2
// coupon_id adv 