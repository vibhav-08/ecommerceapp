const router = require("express").Router();
const connection = require('../../mysqldb.js');

router.post("/", async (req, res) => {
    var selectInventory = `select items.name as item_name, items.itemtype as item_type, items.itemno as itemno, sellers.shopname as shop_name, inventory.price as price, sellers.email as seller_email, inventory.quantity as quantity from 
                            inventory join items
                            on items.itemno = inventory.itemno
                            join sellers
                            on inventory.seller_email = sellers.email
                            `;
    
    connection.query(selectInventory, [], (err, results, fields) => {
        if (err) {
            res.status(500).send({msg: err.message});
            return console.error('error1', err.message);
        }
        // get inserted rows

        console.log(results);
        res.status(200).send({msg:results});
    });
})

module.exports = router;