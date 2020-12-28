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

    request.onreadystatechange = () => {
        console.log(request.responseText);
    }

    return false;
}

// ============>

function sin() {
var usrname = document.getElementById("usrname").value
var pswd = document.getElementById("pass").value
// console.log(usrname);
// console.log(pswd);

usersin={
    usrname:usrname,
    pswd:pswd,
}


let request = new XMLHttpRequest();
let url = "http://localhost:3001/login";
request.open("POST", url);
request.setRequestHeader('Content-Type', 'application/json')
request.send(JSON.stringify(usersin))
request.onreadystatechange = () => {
    console.log(request.responseText);
}

return false;




}