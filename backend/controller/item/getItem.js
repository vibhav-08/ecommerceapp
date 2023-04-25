const router = require("express").Router();
const connection = require('../../mysqldb.js');

router.post("/", async (req, res) => {
    var selectItems = 'SELECT * FROM items WHERE itemno = ?'

    var itemno = [req.body.itemno];

    connection.query(selectItems, [itemno], (err, results, fields) => {
        if (err) {
            res.status(500).send({msg: err.message});
            return console.error('error1', err.message);
        }
        // get inserted rows
        console.log(results[0]);
        res.status(200).send({msg:results});
    });

    // Got to select all elements having given username 
});

module.exports = router;