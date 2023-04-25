const router = require("express").Router();
const connection = require('../../mysqldb.js');

router.post('/', async (req, res) => {
    const changedValue = req.body.changedvalue;
    const boolVal = true;
    var price = 0;

    var priceQuery = 'SELECT price FROM inventory WHERE itemno = ? AND seller_email = ?'
    var quedata = [req.body.itemno, req.body.seller_email];

    connection.query(priceQuery, quedata, (error, results, fields) => {
        if (error) {
            res.status(500).send({ msg: 'Item Not In Inventory' });
            return console.error(error.message);
        }

        console.log(results);
        price = results[0].price;
        console.log(price);

        var changeQuery = `UPDATE cart 
        SET quantity = ?, price = ?
        WHERE itemno = ? AND seller_email = ? AND customer_email = ?`;


        var data = [changedValue, changedValue * price, req.body.itemno, req.body.seller_email, req.body.customer_email];
        console.log(data);

        connection.query(changeQuery, data, (error, results, fields) => {
            if (error) {
                res.status(500).send({ msg: error });
                return console.error(error.message);
            }

            console.log('Rows affected:', results.affectedRows);
            res.status(200).send({ msg: 'success!!' });
        });

    });

});

module.exports = router;