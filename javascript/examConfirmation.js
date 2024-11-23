// Aaron Lambou-Selgestad
// 11/22/2024
// examConfirmation.js
// this page is the examConfirmation page. It is required to meet the criteria of the exam registration and thus we can NOT use the confirm()
// method. This page must handle the logic to display all stored data, return must release this data, and must store and update in the database
// on confirm.

// TODO... actually save the data to the database
// TODO... display datepicker data
$(document).ready(function () {
    // if loggedin is anything but true, the user is not logged in and must be returned to the login screen
    if (sessionStorage.getItem('loggedIn') != 'true') {
        alert("Access Denied")
        window.location.href = "index.html";  // kicks the user back to the login screen
    } else {
        // null check
        // we do NOT want to save null data to the database
        // this check makes sure all relevant data is correct containing data before we begin the database storage step
        // this usually occurs if the user navigates here by selecting the browser back button from studentProfile.html
        // or other nefarious means...
        // TODO... we need a check for datePicker
        if (sessionStorage.getItem('selectedSubject') === null 
            || sessionStorage.getItem('selectedCampus') === null
            || sessionStorage.getItem('selectedTime') === null 
            || sessionStorage.getItem('loggedUser') === null 
            || sessionStorage.getItem('loggedPassword') === null) {
            alert("Something went wrong")
            window.location.href = "studentProfile.html";  // kick them back to their profile
        } else {
            // all data is accounted for and we must update the current session AND store the data in the database

            // seperates the name of the user from their student number
            var firstName = sessionStorage.getItem('loggedUser'); // stored the userName 
            firstName = firstName.slice(0, (firstName.length - 4)); // seperated the 4 digits of NSHE#
            firstName = firstName[0].toUpperCase() + firstName.slice(1, firstName.length); // uppercase first letter

            // captures the time data to be stored
            var time = sessionStorage.getItem('selectedTime')

            // WE MAY NEED TO FORMAT THE DATE FOR DISPLAY HERE
            // captures the date data to be stored
            // TODO... actually store the data for the session
            var date = "12/12/24";

            // sets the text in the relevant container to the stored data
            $("#studentName").text(firstName); // displays the user's name
            $("#studentNumber").text(sessionStorage.getItem('loggedPassword')); // displayed their NSHE#
            $("#examType").text(sessionStorage.getItem('selectedSubject')); // displays the subject of the exam
            $("#examCampus").text(sessionStorage.getItem('selectedCampus')); // displays the campus and bldg room#
            // the below NEEDS the datepicker data... TODO
            $("#dateTime").text(date + " at " + time); // displays the date and time

            // the user has confirmed everything is correct and we must now query the database for storage
            $("#confirmButton").click(function () {
                sessionStorage.setItem('fromConfirmBackCheck', 'false');  // the user is navigating correctly, set this to false to end the bug check case
                // storing data in the database should occur here
            });
            
            // the user is selecting the return button, we must remove the relevent data to the current selection process
            // this will effectively set the use back to a clean reset for the scheduleNewExam step
            // NOTE: we do NOT remove data for top, middle, or bottom... the user is still in the editing process for one of the
            // exam slots... we only need to remove the current data they have selected up to this point
            $("#return").click(function () {
                sessionStorage.removeItem('selectedCampus');  // removes which campus they selected
                sessionStorage.removeItem('selectedSubject'); // removes which subject they selected
                // we need to remove data picker data here... TODO  // removed the date they selected
                sessionStorage.removeItem('selectedTime');    // removes the time they selected
            });
        }
    }
});