const router = require("express").Router();
const connection = require('../../mysqldb.js');

router.post("/", async (req, res) => {
    var getInventoryDetails = `select items.itemno, items.name, placed.id, placed.quantity, placed.seller_email, placed.customer_email
                                from orders join warehouse
                                on orders.warehouse = warehouse.warehouse_id
                                join placed
                                on placed.id = orders.cart_id
                                join items
                                on placed.itemno = items.itemno
                                where warehouse.owner_email = ? and orders.order_status = 'warehouse'`;

    var owner_email = [req.body.email];

    connection.query(getInventoryDetails, [owner_email], (err, results, fields) => {
        if (err) {
            res.status(500).send({msg: err.message});
            return console.error('error1', err.message);
        }
        // get inserted rows
        console.log(results);
        res.status(200).send({msg: results});
    });
});

module.exports = router;