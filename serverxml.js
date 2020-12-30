var arr =[
    {
    name: "raza",
    email: "raza@gmail.com",
    password: "1234",
    }
]

let express = require("express")
let cors = require("cors");
// const { json } = require("body-parser");
// const bodyParserXml = require("body-parser-xml");
let appxml = express()
bodyParser = require('body-parser');
appxml.use(cors());
appxml.use(bodyParser.json());
appxml.use(bodyParser.urlencoded({ extended: true }));



appxml.post('/',(req,res,next)=>{
arr.push(req.body)
res.send(arr)
// let found = false;
// for (let i = 0 ; i<arr.length ; i++)
// {
//     if (arr[i].email === req.body.email)
//     {
//         found = true;
//         res.send("email already exists");
//         break;
//     }
// }
// if (found)
// {
//     res.send("Email already exists");
// }
// else{
//         res.send("Signed up succesfully");
//         arr.push(req.body);
// }
})
// =========================>
// =========================>
// =========================>
// =========================>
// var ar=[{
//     a:"da"
// }]


appxml.post('/login',(req,res,next)=>{

    var flag = false
    for (let i = 0 ; i<arr.length ; i++)
    {
        if ( arr[i].email === req.body.emailsin )
        {
            flag = i;
            break;
        }
    }
 
   
     if (arr[flag].password===req.body.passwordsin)
    {
        res.send({
            message : "signed in succesfully",
            status : 200
        })
    }
    else {
        res.send({
            message : "Email or password is incorrect",
            status : 400
        })
    }

// res.send(req.body.emailsin);
// console.log(req.body.emailsin);

})
















// =====
appxml.listen(3001,()=>{
    console.log("chal gya hai server");
})