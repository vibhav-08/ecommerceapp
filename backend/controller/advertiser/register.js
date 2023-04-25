const router = require("express").Router();
const users = require("../../models/advertiser.js");
const bcrypt = require('bcrypt');
const connection = require('../../mysqldb.js')

router.post("/", async (req, res) => {
    try {
        const salt = await bcrypt.genSalt(10);
        console.log("hello");
        const hashedPass = await bcrypt.hash(req.body.password, salt);
        req.body.password = hashedPass;
        const newUser = new users({email: req.body.email, password: req.body.password});
        const user = await newUser.save();

        var insertAdvertiser = 'INSERT INTO advertisers(email, name, location, manager_name)  VALUES ?'

        var advert = [
            [req.body.email, req.body.name, req.body.location, req.body.manager_name]
        ];

        connection.query(insertAdvertiser, [advert], (err, results, fields) => {
            if (err) {
                return console.error('error1', err.message);
            }
            // get inserted rows
            console.log('Row inserted:' + results.affectedRows);
        });

        console.log(user);
        res.status(200).send(user);
    } catch (err) {
        console.log('s', err);
        res.send({msg: {err}});
    }
});

module.exports = router