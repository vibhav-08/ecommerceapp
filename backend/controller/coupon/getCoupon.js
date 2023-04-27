const router = require("express").Router();
const connection = require('../../mysqldb.js');

router.get("/", async (req, res) => {
    var selectItems = 'SELECT * FROM coupon'

    connection.query(selectItems, (err, results, fields) => {
        if (err) {
            res.status(500).send({msg: err.message});
            return console.error('error1', err.message);
        }
        // get inserted rows
        console.log(results);
        res.status(200).send({msg:results})
    });
});

module.exports = router;