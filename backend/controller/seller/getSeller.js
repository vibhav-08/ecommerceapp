const router = require("express").Router();
const connection = require('../../mysqldb.js');

router.post("/", async (req, res) => {
    var selectItems = 'SELECT * FROM sellers WHERE email = ?'

    var email = [req.body.email];

    connection.query(selectItems, [email], (err, results, fields) => {
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