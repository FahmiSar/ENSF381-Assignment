// signup.html
document.getElementById('signup-form').addEventListener('submit',function(event){
    event.preventDefault();
    // username is a string type 
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;
    var confirmPassword = document.getElementById('confirm-password').value;
    var email = document.getElementById('email').value;

    // list of allowed username characters
    var usernameRegex = /^[a-zA-Z][a-zA-Z0-9_-]*$/;

    // list of allowed password characters
    var passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()-_=+\[\]{}|;:'",.<>?/`~])[A-Za-z\d!@#$%^&*()-_=+\[\]{}|;:'",.<>?/`~]{8,}$/;

    // list of allowed email characters
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    var minLength = 3;
    var maxLength = 20;

    // <<<< Remove the alerts and put in a way so <p> elements are added >>>>>>>

    // -------- Username Checks ------------
    if(username.length < minLength || username.length > maxLength ){
        alert('Check Username again');
        return;
    }

    if(!username.match(usernameRegex)){
        alert("check Username");
        return;
    }

    // -------- Password Checks --------

    if(password !== confirmPassword){
        alert('Password do not match');
        return;
    }

    if(password.length < 8){
        alert("Password too short");
        return;
    }

    if(!password.match(passwordRegex)){
        alert("Check Password");
        return;
    }

    // ------------ Email Checks ----------
    if(!email.match(emailRegex)){
        alert("Check Email");
        return;
    }

    console.log("success");
});