// ******* product.html *******

function addToCart(productName, priceTag, quantity = 1){
    var shoppingCart = document.querySelector(".shopping-cart"); 

    var existingItem = shoppingCart.querySelector(`[in-cart="${productName}"]`);
    if(existingItem){
        var quantityElement = existingItem.querySelector(".item-quantity");
        var currentQuantity = parseInt(quantityElement.textContent);
        quantityElement.textContent = currentQuantity + quantity;
        existingItem.classList.add("in-cart");
    }
    else{
        // creating the text with button
        var itemElement = document.createElement("p");
        var removeButton = document.createElement("button");
        removeButton.classList.add("remove-cart-button");

        var buttonText = document.createTextNode("Remove");
        removeButton.appendChild(buttonText);

        // remove button function
        removeButton.addEventListener("click", function(){
            var currentQuantity = parseInt(quantityElement.textContent);
            if(currentQuantity > 1){
                quantityElement.textContent = currentQuantity - 1;
            } else{
                itemElement.remove();
            }
        });

        var item = document.createTextNode(`${productName} - ${priceTag} - `);
        itemElement.appendChild(item);

        // Add quantity element
        var quantityElement = document.createElement("span");
        quantityElement.classList.add("item-quantity");
        quantityElement.textContent = quantity;
        itemElement.appendChild(quantityElement);

        itemElement.appendChild(removeButton);

        itemElement.setAttribute("in-cart", productName);
        shoppingCart.appendChild(itemElement);

    }
    
}

if(window.location.pathname.includes("products.html")){
    var addToCartButtons = document.querySelectorAll(".add-to-cart-button");
    
        addToCartButtons.forEach(function(button){
            button.addEventListener("click",function(){
                var productCard = button.closest(".product-card");
                var productName = productCard.querySelector(".product-title").textContent;
                var priceTag = productCard.querySelector(".product-price").textContent;
                alert(productName + " has been added to cart");
                addToCart(productName, priceTag);
            });
        });
  
    
}

// ******* signup.html ***********
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
if(window.location.pathname.includes("signup.html")){
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
}





//safaa

document.addEventListener("DOMContentLoaded", function() {
    const loginForm = document.getElementById("loginForm");
    const messageBox = document.getElementById("messageBox");
    const messageText = document.getElementById("message");
    
    loginForm.addEventListener("submit", function(event) {
        event.preventDefault();

        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;

        fetch('https://jsonplaceholder.typicode.com/users')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                const user = data.find(user => user.name === username && user.email === password);
                if (user) {
                    showMessage("success", "Login successful!");
                } else {
                    showMessage("error", "Invalid username or password");
                }
            })
            .catch(error => {
                showMessage("error", "Failed to fetch data from server");
            });
    });

    function showMessage(type, text) {
        messageText.textContent = text;
        messageBox.className = type;
        messageBox.style.display = "block"; // Show the message box
    }
});
