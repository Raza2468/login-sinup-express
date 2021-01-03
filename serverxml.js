var arr = [
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



appxml.post('/', (req, res, next) => {

    console.log(arr);

    let found = false;
    for (let i = 0; i < arr.length; i++) {
        if (arr[i].email === req.body.email) {
            found = true;
            // res.send("email already exists");
            break;
        }
    }
    if (found) {
        res.send({
            message:"email alredy access",
            status:400
        });

    }
    else {
        res.send({
            message:"Signed up succesfully",
             status:200
        });
        arr.push(req.body);
        console.log(req.body);
    }
})
// =========================>
// =========================>
// =========================>
// =========================>
// var obj = [{
//     // pswd: pswd
// }]


appxml.post('/login', (req, res, next) => {

    // console.log(arr);

    var flag = false;
    for (let i = 0; i<arr.length; i++) {
        if (arr[i].email === req.body.email) {
        // if (arr[i].password===req.body.password) {
          
            flag = i;
            break;
       }}
       if(flag===false){
    
        res.send({
            message:"do not match email",
            status:400
   })}else if(arr[flag].password===req.body.password){ 
        
    res.send({
       message:"Sin in Success Full",
       status:200
})}else{
    res.send({
        message:"do not match PAssword",
        status:400
    })
}

   
//     else{

//         res.send({
//             message:"Sin in Success Full",
//             status:200
// })
    
    // }else if(arr[flag].password===req.body.password){
        
    //     // else if (arr[i].email === req.body.email){
    //     res.send("login susse full")
     
    //     }else {
     
    //         res.send("do not match pswd");
    // }
})

 
        // console.log("confrom======>");
        // res.send("confrom")
    
    //    res.send(a)















// appxml.get('/cheak',(req,res,next)=>{
// res.send("f")
// })
// =====
appxml.listen(3001, () => {
    console.log("chal gya hai server");
})