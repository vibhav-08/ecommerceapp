const users = require("../../models/advertiser.js");
const router = require("express").Router();
const bcrypt = require('bcrypt');

const cookieParser = require("cookie-parser");
const session = require("express-session");
const cors = require("cors");

router.use(cors({
    origin: ["http://localhost:3000/advertiser/*"],
    methods: ["GET", "POST"],
    credentials: true,
}))
router.use(cookieParser());
router.use(
    session({
        key: "advertiserId",
        secret: "subscribe",
        resave: false,
        saveUninitialized: false,
        cookie: {
            expires: 36000 * 1000,
        },
    })
);

router.get("/", (req, res) => {
    if (req.session.user) {
        console.log(req.session);
        const response = { loggedIn: true, user: req.session.user }
        console.log(req.session.user);
        console.log("Calling from alumniLogin GET API")
        for (let x in response) { if (x == "loggedIn") console.log(true); console.log(response[x]); }
        res.send(response);
    }
    else {
        res.send({ loggedIn: false });
    }
});

router.post("/", async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    users.find({ email: email }, (err, result) => {
        
        if (result.length > 0) {
            bcrypt.compare(password, result[0].password, (err, response) => {
                if (response) {
                    req.session.user = result[0].email;

                    ////////consoles
                    console.log(req.session.user);
                    console.log("hello" + result[0].email);
                    console.log(result);
                    ///////////

                    res.send(req.session.user);
                }
                else {
                    console.log("error1");
                    res.send({ msg: "Please check your Username/Password" });
                }
            })
        }
        else {
            console.log("error2");
            res.send({ msg: "Please check your Username/Password" });
        }
    });
});

module.exports = router