const router = require("express").Router();
const connection = require('../../mysqldb.js');

router.post("/", async (req, res) => {
    var prevBalance = 'select balance from accounts where account_number = ? and bank_regno = ? and pin = ?'

    var data = [req.body.account_number, req.body.bank_regno, req.body.pin];

    connection.query(prevBalance, data, (err, results, fields) => {
        if (err) {
            res.status(500).send({msg: err.message});
            return console.error('error1', err.message);
        }
        // get inserted rows
        console.log(results);
        prevAmount = results[0].balance;

        console.log(prevAmount);
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

        var data2 = [reducedBalance, req.body.account_number, req.body.bank_regno];

        console.log(reduceBalance, data2);
        connection.query(reduceBalance, data2, (err, results, fields) => {
            if (err) {
                res.status(500).send({msg: err.message});
                return console.error('error2', err.message);
            }
            res.status(200).send({msg: 'Success'});
        })
    });
});

module.exports = router;