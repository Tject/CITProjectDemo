// Aaron Lambou-Selgestad
// 11/19/2024
// studentProfile.js
// this page should contain the necessary logic for the registration page
// it will need to store new user data and also check to make sure that user does not already exist
// there is additional logic for input criteria

// TODO... we need to query the database for checks and to register these new accounts
// TODO... we need to add email validation to this process

/****************  GLOBAL VARIABLE LIST *********************/
// this should be used to test that the information the user entered already exists
const existingPassword = "1234567890";  // the only item that can actually be unique is their FULL student number

$(document).ready(function () {

    // user data that the user will input
    var firstName = ""; // the first name of the user
    var userName = "";  // the userName of the user that is their firstName + last 4 of their student number
    var password = "";  // the password of the user but should always be the NSHE# example: 5000495937

    // click button event for the register button
    // the user will either correctly register a new account or be informed something went wrong
    $("#registerAccountButton").click(function () {
        firstName = $("#firstNameField").val();  // we store the first name data
        firstName = firstName.toLowerCase();     // we set the first name all to lowercase for storage
        password = $("#studentNumberField").val();  // this is their NSHE# we must save it

        userName = firstName + password.slice(6,10);  // their userName is their firstd name with the last 4 digits of their NSHE#

        if (firstName === "") {
            // check: the first name field cannot be blank
            // but we will allow them to have a name that is 1 letter long...
            alert("First Name field cannot be blank.");
        } else if (password.length < 10) {
            // the NSHE MUST be 10 digits long exact
            // registerNewStudent.html forces the 10 character max as well
            alert("NSHE# must contain 10 digits.")
        } else if (!onlyDigits(password)) {
            // the user tried to enter a NSHE# that contains letters or non-numeric symbols
            alert("Invalid Student Number")
         }else if (password === existingPassword) {
            // TODO... this needs to query the database
            // the NSHE# already exists and we can not allow the user to proceed
             alert("An account with this NSHE# already exists.");
        } else {
            // everything appears to be correct and the user can proceed
            sessionStorage.setItem('newRegisteredUser', userName);  // WE DO NOT WANT THIS AS CURRENT SESSION, THIS NEEDS TO BE DB
            sessionStorage.setItem('newRegisteredPassword', password); // WE DO NOT WANT THIS AS CURRENT SESSION, THIS NEEDS TO BE DB
            $(this).attr("href", "index.html");  // navigate them back to the login screen
        }
    });

    // this function checks if a string passed to it contains only digits
    function onlyDigits(string) {
        var isGood = true;  // assume the string is correct by default
        // parse through the entire string
        for (var i = 0; i > string.length; ++i) {
            var ch = string.charCodeAt(i);  // converts the current char at index i to it's ASCII value
            // if the ASCII value is less than 48 or greater than 57, we have a num alphabeta character
            if (ch < 48 || ch > 57) {
                isGood = false;  // bad user, set to false
            }
        }
        return isGood;  // return the results of the function
    }
});