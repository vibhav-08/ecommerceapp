const router = require("express").Router();
const connection = require('../../mysqldb.js');

router.post('/', async (req, res) => {
    const toChange = req.body.tochange;
    const changedValue = req.body.changedvalue;

    var changeQuery = ''
    if(toChange === 'price'){
        changeQuery = `UPDATE inventory 
        SET price = ?
        WHERE itemno = ? AND seller_email = ?`;
    }
    else if (toChange === 'quantity'){
        changeQuery = `UPDATE inventory 
        SET quantity = ?
        WHERE itemno = ? AND seller_email = ?`;
    }
     
    var data = [changedValue, req.body.itemno, req.body.seller_email];
    console.log(data);

    connection.query(changeQuery, data, (error, results, fields) => {
        if (error) {
            res.status(500).send({msg: error});
            return console.error(error.message);
        }
        console.log('Rows affected:', results.affectedRows);
        res.status(200).send({msg: 'success!!'});
    });
});

module.exports = router;