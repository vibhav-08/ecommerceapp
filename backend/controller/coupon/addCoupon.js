const router = require("express").Router();
const connection = require('../../mysqldb.js');

router.post("/", async (req, res) => {
    var insertCoupons = 'INSERT INTO coupon(coupon_name, advertiser, amount)  VALUES ?'

    var coupons = [
        [req.body.coupon_name, req.body.advertiser, req.body.amount]
    ];

    connection.query(insertCoupons, [coupons], (err, results, fields) => {
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