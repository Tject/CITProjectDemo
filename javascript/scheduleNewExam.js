// Aaron Lambou-Selgestad
// 11/20/2024
// scheduleNewExam.js
// this page should provide the functionality to scheduleNewExam.html
// this page should store and capture data for campus, exam type, date, and time

/*********************** IMPORTANT NOTE *************************/
// you are going to see a lot of localStorage data, there is quite a bit to keep track of as the user navigates
// please be aware that top, middle, or bottom local data variables are used to permanently display selected data for the entire local
// the selected variables are temporary local data that holds what the user is attempting to save and schedule

// TODO... add a datePicker
// TODO... add a check for the datePicker
// TODO... query the database for exams that are actually avaialble to be scheduled

$(document).ready(function () {
    // the user must be logged in to continue, logged in is not true we return them to the login screen otherwise business as usual
    if (localStorage.getItem('loggedIn') != 'true') {
        alert("Access Denied")
        window.location.href = "index.html";  // returns them to the login screen
    } else {
        /********************* BACK CHECK BLOCK *******************************/
        // the user used the broswer back button (not the return button) to return to this page
        // this means we must clear all data that was stored from their previous visit here otherwise incorrect data will display
        // null data will display, or incorrect data will be stored in the database
        // we do this by checking if the 'fromConfirmBackCheck' is true, if so we clear all data and set it to false
        // we then MUST set 'backCheck' back to true to prevent the user from causing issues by selecting back for a second time
        if (localStorage.getItem('fromConfirmBackCheck') === "true"){
            localStorage.removeItem('selectedCampus');
            localStorage.removeItem('selectedSubject');
            // we need to remove data picker data here... TODO
            localStorage.removeItem('selectedTime');
            localStorage.setItem('fromConfirmBackCheck', 'false');  // resets the bug case
            localStorage.setItem('backCheck', 'true');              // restarts the first back case from the studentProfile screen
        }
        /********************* END BACK CHECK BLOCK *******************************/

        // click event for the confirmation button
        // on click, the local will store all data that was selected by the user
        // it should store campus, subject with the radio buttons
        // date with a datePicker
        // and time with the drop down
        $("#confirmButton").click(function () {
            // this is a check fo make sure all options were selected
            // we do NOT want the user to continue with an option not selected
            // TODO... there needs to be a check for the date picker
            if ($('input[name=campus]:checked').length > 0
                && $('input[name=sub]:checked').length > 0
                && $("#time").val() > 0) {
                        // this block of code set's the key data required to schedule the exam
                        // this is the data that was selected, it is now stored and ready to be transported to the next screen
                        // for display and then to the student profile after confirmation
                        localStorage.setItem('selectedCampus', $('input[name=campus]:checked', '#campusForm').val());  // sets the campus
                        localStorage.setItem('selectedSubject', $('input[name=sub]:checked', '#subjectForm').val());  // sets the subject

                        // formats the time for display on the website
                        // we have a value for time as a single digit and must concatinate the string for user display
                        var time = $("#time").val();
                        // if the value is between 9 but less than 12 it is am time, else it is pm time
                        if (time >= 9 && time < 12) {
                            time = time + ":00 am";
                        } else {
                            time = time + ":00 pm";
                        }

                        // we need date picker logic here... TODO
                        // this is the data that was selected, it is now stored and ready to be transported to the next screen
                        // for display and then to the student profile after confirmation
                        localStorage.setItem('selectedTime', time);  // stored the tiem the user selected
                        localStorage.setItem('backCheck', 'false');  // this is the back check, the user navigated normally so set to false
                        localStorage.setItem('fromConfirmBackCheck', 'true');  // this is the second back check, set to true to start the bug checking process
                        $(this).attr("href", "examConfirmation.html");  // navigate to the exam confirmation page
            } else {
                alert("Please finish completing the form.")  // the user did not select all relevant criteria and is informed
            }
        });

        // cancel button, removes the current held and relevant data
        // the user will be asked if they wish to cancel, if the select okay to cancel ALL relevant data is removed
        // and they will be returned to the studentProfile.html with no new data to be displayed
        // all previous data should also then display correctly
        $("#cancel").click(function () {
            // the user selected cancel, we must remove the data
            if (confirm("Do you wish to cancel?")) {
                if (localStorage.getItem('selectedExam') === "top") {
                    // the user was editing the top exam slot, we must now end the top editing local
                    localStorage.removeItem('topExam');  // we are no longer editing the top exam
                    localStorage.removeItem('selectedExam');  // we are ending the editing local
                } else if (localStorage.getItem('selectedExam') === "middle") {
                    // the user was editing the middle exam slot, we must now end the middle editing local
                    localStorage.removeItem('middleExam');    // we are no longer editing the middle exam
                    localStorage.removeItem('selectedExam');  // we are ending the editing local
                } else if (localStorage.getItem('selectedExam') === "bottom") {
                    // the user was editing the bottom exam slot, we must now end the bottom editing local
                    localStorage.removeItem('bottomExam');    // we are no longer editing the bottom exam
                    localStorage.removeItem('selectedExam');  // we are ending the editing local
                } else {
                    alert("Hmmmmmm? How did we get here?")  // this should never occur
                }
                // this removes all stored selected values in the potential event that a user navigates to examConfirmation.html
                // and then cancels back twice to scheduleNewExam.html
                localStorage.removeItem('selectedCampus');
                localStorage.removeItem('selectedSubject');
                // we need to remove data picker data here... TODO
                localStorage.removeItem('selectedTime');
                
                localStorage.setItem('backCheck', 'false');
                $(this).attr("href", "studentProfile.html");
            }
        });
    }
});