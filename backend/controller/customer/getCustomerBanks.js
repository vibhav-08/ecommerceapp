const router = require("express").Router();
const connection = require('../../mysqldb.js');

router.post("/", async (req, res) => {

    var joinSelect = `  SELECT banks.bank_name, banks.bank_regno
                        from banks join accounts 
                        on banks.bank_regno = accounts.bank_regno
                        where accounts.account_holder_email = ?`

    // var selectItems = 'SELECT * FROM cart WHERE customer_email = ?'

    var email = [req.body.email];

    connection.query(joinSelect, [email], (err, results, fields) => {
        if (err) {
            res.status(500).send({msg: err.message});
            return console.error('error1', err.message);
        }
        // get inserted rows

        console.log(results);
        res.status(200).send({msg:results});
    });

    // Got to select all elements having given username 
});

module.exports = router;