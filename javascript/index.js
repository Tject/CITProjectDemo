// Aaron Lambou-Selgestad
// 11/18/2024
// index.js
// this document should contain the necessary methods and variables for users to log in with their credentials
// depending on the credentials given, the user will either be a student with a loggedRole = '0' or an instructor with a loggedRole of = '1'

// TODO... we need to a query a database to even check if a user exists and can actually log in

/*************************GLOBAL VARIABLES ***********************************/
// variables to validate student login against
var studentUserName = "aaron2024";  // pretend DB data for student username
var studentPassword = "5000495937"; // pretend DB data for student password

// variables to validate instructor login against
var instructorUserName = "Karen.Coombs"; // the instructor's login username
var instructorPassword = "Password123";  // the instructor's login password

/***************** BLOCK OF CODE FOR INDEX.HTML*******************************/
// this is the code for the index.html page a.k.a the login page
// this page will redirect to the studentProfile.html or instructorProfile.html depending on the input validation
// this method should redirect the user depending on whether a student or instructor credentials was entered
$(document).ready(function () {
    // variables the user enters to log in
    var userName = "";  // username field
    var password = "";  // password field

    // login method, the logic should contain checks to validate the user's input against the DB
    $("#Login").click(function () {
        // these variables will extract the data from the input fields and store into variables
        userName = $("#userNameField").val();  // the user enters their username here
        userName = userName.toLowerCase();     // we lowercase the username so that capitlization does not matter
        password  = $("#passwordField").val(); // the user enters their password here

        // if to check if the username and password are correct
        if (studentUserName === userName) {
            if (studentPassword === password) {
                // this is more of a test block than actual use case
                // will navigate to the student profile
                sessionStorage.setItem('loggedUser', userName);      // we store the username for the current session
                sessionStorage.setItem('loggedPassword', password);  // we store the password a.k.a. the NSHE# for the current session
                sessionStorage.setItem('loggedRole', '0');           // this is a student which we assign as a 0 for database reasons
                sessionStorage.setItem('loggedIn', 'true');          // we set the status of the user to loggedIn as true
                $(this).attr("href", "studentProfile.html");         // this will direct them to the studentProfile.html
            } else {
                alert("Invalid Username or Password.");
            }
        // this should be the main point of entry for an instructor
        } else if (instructorUserName.toLowerCase() === userName) {
            if (instructorPassword === password) {
                // will navigate to the instructor profile
                sessionStorage.setItem('loggedUser', userName);     // we store the username for the current session
                sessionStorage.setItem('loggedPassword', password); // we store the password
                sessionStorage.setItem('loggedRole', '1');          // this is an instructor which we assign as a 1 for database reasons
                sessionStorage.setItem('loggedIn', 'true');         // we set the status of the user to loggedIn as true
                $(this).attr("href", "instructorProfile.html");     // this will direct them to the instrucctorProfile.html
            } else {
                alert("Invalid Username or Password.");
            }
        // this should be the main point of entry for student users
        } else if (sessionStorage.getItem('newRegisteredUser') === userName) { 
            // this block should be the mirror of real use case as it will need to query against the db
            if (sessionStorage.getItem('newRegisteredPassword') === password) {
                // will navigate to the student profile
                sessionStorage.setItem('loggedUser', userName);      // we store the username for the current session
                sessionStorage.setItem('loggedPassword', password);  // we store the password a.k.a. the NSHE# for the current session
                sessionStorage.setItem('loggedRole', '0');           // this is a student which we assign as a 0 for database reasons
                sessionStorage.setItem('loggedIn', 'true');          // we set the status of the user to loggedIn as true
                $(this).attr("href", "studentProfile.html");         // this will direct them to the studentProfile.html
            } else {
                alert("Invalid Username or Password.");
            }
        } else {
            // all validations failed
            alert("Invalid Username or Password.");
        }
    });
});
/***************** END BLOCK OF CODE FOR INDEX.HTML*******************************/
