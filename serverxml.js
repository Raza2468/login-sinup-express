var arr = [
    {
        name: "raza",
        email: "raza@gmail.com",
        password: "1234",
    }
]


// ==============BOYLERPLAT:

let express = require("express")
let cors = require("cors");
let appxml = express()
bodyParser = require('body-parser');
var morgan = require("morgan");
const mongoose = require("mongoose");
var bcrypt = require("bcrypt-inzi");
var jwt = require('jsonwebtoken');
var ServerSecretKey = process.env.SECRET || "123"
var PORT = process.env.PORT || 3001



/////////////////////////////////////////////////////////////////////////////////////////////////
// let dbURI = "mongodb+srv://dbuser:dbpassword@cluster0.9qvbs.mongodb.net/abc-database";
let dbURI = "mongodb+srv://faiz:2468@mundodb.lkd4g.mongodb.net/ttest?retryWrites=true&w=majority";
// let dbURI = 'mongodb://localhost:27017/abc-database';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true });


////////////////mongodb connected disconnected events///////////////////////////////////////////////
mongoose.connection.on('connected', function () {//connected
    console.log("Mongoose is connected");
});

mongoose.connection.on('disconnected', function () {//disconnected
    console.log("Mongoose is disconnected");
    process.exit(1);
});

mongoose.connection.on('error', function (err) {//any error
    console.log('Mongoose connection error: ', err);
    process.exit(1);
});

process.on('SIGINT', function () {/////this function will run jst before app is closing
    console.log("app is terminating");
    mongoose.connection.close(function () {
        console.log('Mongoose default connection closed');
        process.exit(0);
    });
});
////////////////mongodb connected disconnected events///////////////////////////////////////////////



var userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    phone: String,
    gender: String,
    createdOn: { type: Date, 'default': Date.now },
    activeSince: Date,
});

var getUser = mongoose.model("users", userSchema);
module.export = getUser


// let appxml = express()

appxml.use(cors());
appxml.use(bodyParser.json());
appxml.use(bodyParser.urlencoded({ extended: true }));
appxml.use(morgan('dev'));

// ==================BOYLERPLAT


// creatuser boylerplat ,Hash,Mando Db database

appxml.post('/', (req, res, next) => {
    if (!req.body.name || !req.body.email || !req.body.password) {
        // pleas,send,email,obj,retrun
        res.status(503).send(`
        please send email and passwod in json body.
                    e.g:
                     {
                    "name": RazaMaLik
                    "email": "RazaMaLik@gmail.com",
                    "password": "abc",
                 }`)
        return;
    }
    getUser.findOne({ email: req.body.email },
        function (err, Doc) {
            if (!err && !Doc) {
                // password hash,obj
                bcrypt.stringToHash(req.body.password).then(hash => {
                    newUser = new getUser({
                        "name": req.body.name,
                        "email": req.body.email,
                        "password": hash,
                        // "phone": req.body.phone,
                        // "gender": req.body.gender,
                       

                    })

                    newUser.save((err, data) => {
                        if (!err) {
                            // user creat
                            res.send({ message: "user created" })
                        } else {
                            // user creat error
                            res.status(500).send("user create error, " + err)
                        }
                    })
                })
            } else if (err) {
                // db errer
                res.status(500).send({
                    message: "db error"
                })
            } else {
                // user alredy access
                res.status(409).send({
                    message: "user alredy access"
                })
            }
        })
})
// ==== CreAte 5ignup foam
appxml.post('/login', (req, res, next) => {

    if (!req.body.email || !req.body.password) {
        res.status(503).send(`
please send email and passwod in json body.
            e.g:
             {
            "email": "Razamalik@gmail.com",
            "password": "abc",
         }`)
        return;
    }
    getUser.findOne({ email: req.body.email },
        function (err, user) {
            if (err) {
                res.status(500).send({ message: "an error accure" })
            } else if (user) {
                bcrypt.varifyHash(req.body.password, user.password).then(result => {
                    if (result) {
                        // res.status(200).send({
                        //     message: "match,Sinup seccess full"
                        // });
                        // console.log("match,Sinup seccess full");
                        // token
                        var token = jwt.sign({
                            id: user._id,
                            name: user.name,
                            email: user.email,
                        }, 'ServerSecretKey');
                        res.send({
                            message: "login success",
                            user: {
                                name: user.name,
                                email: user.email,
                                phone: user.phone,
                            },
                            token: token
                        })
                    } else {
                        res.status(503).send({
                            message: "do not match,do not match password"
                        });
                        console.log("do not match,do not match password");
                    }
                })
            } else {
                res.status(503).send({
                    message: "user not found,do not email"
                });
            }
        })


})

appxml.get("/profile", (req, res, next) => {

    if (!req.headers.token) {
        res.status(403).send(`
            please provide token in headers.
            e.g:
            {
                "token": "h2345jnfiuwfn23423...kj345352345"
            }`)
        return;
    }

    var declareData = jwt.verify(req.headers.token,ServerSecretKey);
    console.log("declareData",declareData)
    userModel.findById(declareData.id, 'name email phone gender createdOn',
    function (err, doc) {

        if (!err) {

            res.send({
                profile: doc
            })
        } else {
            res.status(500).send({
                message: "server error"
            })
        }

    })
})




appxml.listen(PORT,() => {
    console.log("chal gya hai server")
})
// app.use("/", express.static(path.resolve(path.join(__dirname,'public'))))

// ==============>
