const router = require("express").Router();
const connection = require('../../mysqldb.js');

router.post("/", async (req, res) => {
    var deleteItems = 'DELETE FROM coupon WHERE coupon_name = ? AND advertiser = ?'

    var data = [req.body.coupon_name, req.body.advertiser];

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