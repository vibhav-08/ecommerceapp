const router = require("express").Router();
const users = require("../../models/warehouse.js");
const bcrypt = require('bcrypt');
const connection = require('../../mysqldb.js');

router.post("/", async (req, res) => {
    try {
        const salt = await bcrypt.genSalt(10);
        console.log("hello");
        const hashedPass = await bcrypt.hash(req.body.password, salt);
        req.body.password = hashedPass;
        const newUser = new users({email: req.body.owner_email, password: req.body.password});
        const user = await newUser.save();

        var insertWarehouse = 'INSERT INTO warehouse(owner_email, owner_name, address, city, pincode, capacity_desc)  VALUES ?'

        var warehouse = [
            [req.body.owner_email, req.body.owner_name, req.body.address, req.body.city, req.body.pincode, req.body.capacity_desc]
        ];

        connection.query(insertWarehouse, [warehouse], (err, results, fields) => {
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