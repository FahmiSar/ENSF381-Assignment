// signup.html


function checkForErrorBox(){
    var messageBox = document.querySelector(".error-message");

    // if messageBox = null; create a box
    if(!messageBox){
        messageBox = document.createElement("div");
        messageBox.classList.add("error-message");
        document.body.appendChild(messageBox);
    }

    return messageBox;
}

function createMessage(message){
    var messageBox = checkForErrorBox();

    // error message is a bad name but it work (replace with something better)
    var errorMessage = document.createElement("p");
    var errorMessageText = document.createTextNode(message);

    errorMessage.appendChild(errorMessageText);
    messageBox.appendChild(errorMessage);
    
    var mainElement = document.querySelector("main");
    mainElement.appendChild(messageBox);    
}

// checks for errors after submit button is pressed
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

    var errorOccured = false;
    // <<<< Remove the alerts and put in a way so <p> elements are added >>>>>>>

    // -------- Username Checks ------------
    if(username.length < minLength || username.length > maxLength ){
        createMessage("Username is too short or too long");
        errorOccured = true;
    }

    if(!username.match(usernameRegex)){
        createMessage("Username has illegal characters");   
        errorOccured = true;     
    }

    // -------- Password Checks --------

    if(password !== confirmPassword){
        createMessage("Password does not match");
        errorOccured = true;
    }

    if(password.length < 8){
        createMessage("Password too short");
        errorOccured = true;
    }

    if(!password.match(passwordRegex)){
        createMessage("Password might contain illegal characters");
        errorOccured = true;
    }

    // ------------ Email Checks ----------
    if(!email.match(emailRegex)){
        createMessage("Check Email");
        errorOccured = true;
    }

    if(!errorOccured){
        createMessage("Successful Login");
    }
});