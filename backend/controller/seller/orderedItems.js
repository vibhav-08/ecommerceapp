const router = require("express").Router();
const connection = require('../../mysqldb.js');

router.post("/", async (req, res) => {
    var getInventoryDetails = `select warehouse.address, warehouse.city, items.itemno, items.name, placed.id, placed.quantity, placed.seller_email, placed.customer_email, orders.order_status
                                from orders join warehouse
                                on orders.warehouse = warehouse.warehouse_id
                                join placed
                                on placed.id = orders.cart_id
                                join items
                                on placed.itemno = items.itemno
                                where placed.seller_email = ?`;

    var owner_email = [req.body.email];

    connection.query(getInventoryDetails, owner_email, (err, results, fields) => {
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