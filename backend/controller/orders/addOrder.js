const router = require("express").Router();
const connection = require('../../mysqldb.js');

router.post("/", async (req, res) => {
    var insertOrder = `INSERT INTO 
    orders(
        cart_id,
        customer_amount, 
        seller_amount, 
        advertiser_amount, 
        warehouse, 
        order_status,
        otp)  
        VALUES 
        ?`

    var order = [[req.body.cart_id, req.body.customer_amount, req.body.seller_amount, req.body.advertiser_amount, req.body.warehouse, req.body.order_status, req.body.otp]];

    console.log(req.body, order);
    connection.query(insertOrder, [order], (err, results, fields) => {
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