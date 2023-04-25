const router = require("express").Router();
const users = require("../../models/user.js");
const bcrypt = require('bcrypt');
const connection = require('../../mysqldb.js');

router.get("/", (req, res) => {
    console.log("open");
    res.send("hello");
})

router.post("/", async (req, res) => {
    try {
        const salt = await bcrypt.genSalt(10);
        console.log("hello");
        const hashedPass = await bcrypt.hash(req.body.password, salt);
        req.body.password = hashedPass;
        const newUser = new users({email: req.body.email, password: req.body.password});
        const user = await newUser.save();

        var insertCustomer = 'INSERT INTO customers(email, name, password, gender, occupation)  VALUES ?'

        var customer = [
            [req.body.email, req.body.name, req.body.password, req.body.gender, req.body.occupation]
        ];

        connection.query(insertCustomer, [customer], (err, results, fields) => {
            if (err) {
                return console.error('error1', err.message);
            }
            // get inserted rows
            console.log('Row inserted:' + results.affectedRows);
        });

        res.status(200).send(user);
        console.log(user);
    }
    catch (err) {
        res.status(500).send(err);
        console.log(err);
    }
});

module.exports = router