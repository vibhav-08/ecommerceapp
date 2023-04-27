const router = require("express").Router();
const connection = require('../../mysqldb.js');

//email route(plus/minus) cartPrice
router.post("/", async (req, res) => {
    var prevBalance = 'select * from accounts where account_holder_email = ?'

    var data = [req.body.email];

    connection.query(prevBalance, data, (err, results, fields) => {
        if (err) {
            res.status(500).send({msg: err.message});
            return console.error('error1', err.message);
        }
        // get inserted rows
        console.log(results);
        var prevAmount = results[0].balance;
        console.log(prevAmount);
        var accountNumber = results[0].account_number;
        var bankRegNo = results[0].bank_regno;

        var reducedBalance = prevAmount;

        if(req.body.route === 'plus'){
            reducedBalance = prevAmount + req.body.cartprice;
        }
        else if (req.body.route === 'minus'){
            if(prevAmount < req.body.cartprice){
                res.status(500).send({msg: 'Balance insufficient'});
            }
            reducedBalance = prevAmount - req.body.cartprice;
        }
        
        var reduceBalance = 'update accounts set balance = ? where account_number = ? and bank_regno = ?';

        var data = [reducedBalance, accountNumber, bankRegNo];

        connection.query(reduceBalance, data, (err, results, fields) => {
            if (err) {
                res.status(500).send({msg: err.message});
                return console.error('error1', err.message);
            }
            res.status(200).send({msg: 'Success'});
        })
    });
});

module.exports = router;