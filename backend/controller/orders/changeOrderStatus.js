const router = require("express").Router();
const connection = require('../../mysqldb.js');

router.post("/", async (req, res) => {
    var updateStatus = `UPDATE orders
    SET order_status=?
    WHERE cart_id=?`;

    var data = [req.body.status, req.body.cart_id];
    console.log(updateStatus, data);

    connection.query(updateStatus, data, (err, results, fields) => {
        if (err) {
            res.status(500).send({msg: err.message});
            return console.error('error1', err.message);
        }
        // get inserted rows
        // console.log(results);
        res.status(200).send({msg: 'Success'});
    });
});

module.exports = router;