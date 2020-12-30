// const { json } = require("express");

// const { json } = require("body-parser");

$(document).ready(function(){
    $("#myBtn").click(function(){
      $("#myModal").modal();
    });
  });


//  ========>

const sub = () => {
    let namei = document.getElementById("name").value
    let emaili = document.getElementById("email").value
    let passwordi = document.getElementById("password").value

    var user = {
        name: namei,
        email: emaili,
        password: passwordi,
    }


    let request = new XMLHttpRequest();
    let url = "http://localhost:3001/";
    request.open("POST", url);

    request.setRequestHeader('Content-Type', 'application/json')
    request.send(JSON.stringify(user))

    request.onreadystatechange = (e) => {
        console.log(request.responseText);
    }

    return false;
}

// ============>

function sin() {
var emailsin = document.getElementById("emailsin").value
var password = document.getElementById("passwordsin").value
// console.log(usrname);
// console.log(pswd);

usersin={
    emailsin:emailsin,
    passwordsin:password,
}


let request = new XMLHttpRequest();
let url = "http://localhost:3001/login";
request.open("POST", url);
request.setRequestHeader('Content-Type', 'application/json')
request.send(JSON.stringify(usersin))
request.onreadystatechange = (e) => {
    
    let jsonRes = JSON.parse(request.responseText)

    if (request.readyState === 4)
    l{
        // alert(jsonRes)
        if (jsonRes.status === 200)
        {
            alert(jsonRes.message)
        }
        else{
                alert(jsonRes.message)
        }
    }

}

return false;




}