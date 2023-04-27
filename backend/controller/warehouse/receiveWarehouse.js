const router = require("express").Router();
const connection = require('../../mysqldb.js');

router.post("/", async (req, res) => {
    var getWarehouseId = `select warehouse_id from warehouse where owner_email = ?`
    var updateStatus = `update orders set order_status = 'warehouse' where warehouse = ? and order_status = 'dispatched'`;

    var owner_email = [req.body.email];

    connection.query(getWarehouseId, [owner_email], (err, results, fields) => {
        if (err) {
            res.status(500).send({msg: err.message});
            return console.error('error1', err.message);
        }
        // get inserted rows
        console.log(results);
        // res.status(200).send({msg: results});
        var warehouseId = results[0].warehouse_id;
        connection.query(updateStatus, [warehouseId], (err, results, fields) => {
            if (err) {
                res.status(500).send({msg: err.message});
                return console.error('error1', err.message);
            }
            // get inserted rows
            // console.log(results.affectedRows);
            res.status(200).send({msg: 'success'});
        });
    });
});

module.exports = router;