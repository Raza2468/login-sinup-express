var arr =[
    {
    name: "raza",
    email: "raza@gmail.com",
    password: "1234",
    }
]

let express = require("express")
let cors = require("cors");
let appxml = express()
bodyParser = require('body-parser');
appxml.use(cors());
appxml.use(bodyParser.json());
appxml.use(bodyParser.urlencoded({ extended: true }));



appxml.post('/',(req,res,next)=>{

let found = false;
for (let i = 0 ; i<arr.length ; i++)
{
    if (arr[i].email === req.body.email)
    {
        found = true;
        res.send("email already exists");
        break;
    }
}
if (found)
{
    res.send("Email already exists");
}
else{
        res.send("Signed up succesfully");
        arr.push(req.body);
}
})
// =========================>
// =========================>
// =========================>
// =========================>
var ar=[{
    a:"da"
}]

appxml.post('/login',(req,res,next)=>{
//    var a = JSON.parse(req.body)
   res.send(req.body)
//    res.send(a)
        
   
})














// =====
appxml.listen(3001,()=>{
    console.log("chal gya hai server");
})