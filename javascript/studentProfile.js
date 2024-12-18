// Aaron Lambou-Selgestad
// 11/19/2024
// studentProfile.js
// this document should contain the methods and variables required to display information
// the information to display should be the current logged in user and their passwird (NSHE#)
// additionally, it needs to handle the three exams that are displayed
// it needs to be able to direct to create a new exam and allow users to delete exams
// it should only show the current scheduled exams
// also contains a variety of bug fixes

/*********************** IMPORTANT NOTE *************************/
// you are going to see a lot of localStorage data, there is quite a bit to keep track of as the user navigates
// please be aware that top, middle, or bottom local data variables are used to permanently display selected data for the entire local
// the selected variables are temporary local data that holds what the user is attempting to save and schedule


// TODO... we need datePicker data
// TODO... the View History button needs full functionality but required a database to work
// TODO... the database must be able to delete data and we must be able to query the database for relevant data on user login

$(document).ready(function () {
    // if the user is not logged in, redirect them to the login screen, otherwise business as usual
    if (localStorage.getItem('loggedIn') != 'true') {
        alert("Access Denied")
        window.location.href = "index.html";
    } else {
        // store some variables to make it easier to handle
        var userName = localStorage.getItem('loggedUser');
        var password = localStorage.getItem('loggedPassword');
        // some default display data
        $("#studentUserName").text(userName);
        $("#studentNumber").text("**********");
    /***************************** ON BACK BUTTON TEXT FIX BLOCK***************************/
    // there is a bug if the user hits the window back button instead of the cancel button
    // if the user selects the window back button it will either display null data or an exam slot
    // will display exam data for a previous selected exam
    // it checks to see if the backCheck was set to true, that means a user used the back button to return here
    // if this happens we set the backCheck back to false, and remove the relevant data to avoid a display error
    if (localStorage.getItem('backCheck') === "true") {
        if (localStorage.getItem('selectedExam') === "top") {
            // the user navigated back after attempting to edit a top exam slot
            localStorage.removeItem('topExam');
            localStorage.removeItem('selectedExam');
        } else if (localStorage.getItem('selectedExam') === "middle") {
            // the user navigated back after attempting to edit a middle exam slot
            localStorage.removeItem('middleExam');
            localStorage.removeItem('selectedExam');
        } else if (localStorage.getItem('selectedExam') === "bottom") {
            // the user navigated back after attempting to edit a bottom exam slot
            localStorage.removeItem('bottomExam');
            localStorage.removeItem('selectedExam');
        } else {
            alert("Hmmmmmm? How did we get here?")  // this should never occur....
        }
        // this removes all other data, essentially bringing the user to a clean slate
        localStorage.removeItem('selectedCampus');
        localStorage.removeItem('selectedSubject');
        // we need to remove data picker data here... TODO
        localStorage.removeItem('selectedTime');
        localStorage.setItem('backCheck', 'false');
    }
    /***************************** END ON BACK BUTTON TEXT FIX BLOCK***************************/
        /*************************** ASSIGNMENT BLOCK ********************************************/
        // this will assign all the data that must be displayed for the current local
        // this will hold the subject, campus, date, and time from the schedule exam steop to be displayed
        if (localStorage.getItem('selectedExam') === "top") {
            // this will set the data for the top exam slot
            localStorage.setItem('rememberTopCampus', localStorage.getItem('selectedCampus')) ;
            localStorage.setItem('rememberTopSubject',  localStorage.getItem('selectedSubject'));
            // TODO... we need the date data to be assigned
            localStorage.setItem('rememberTopTime', localStorage.getItem('selectedTime'));
        } else if (localStorage.getItem('selectedExam') === "middle") {
            // this will set the data for the middle exam slot
            localStorage.setItem('rememberMiddleCampus', localStorage.getItem('selectedCampus')) ;
            localStorage.setItem('rememberMiddleSubject',  localStorage.getItem('selectedSubject'));
            // TODO... we need the date data to be assigned
            localStorage.setItem('rememberMiddleTime', localStorage.getItem('selectedTime'));
        } else if (localStorage.getItem('selectedExam') === "bottom") {
            // this will set the data for the bottom exam slot
            localStorage.setItem('rememberBottomCampus', localStorage.getItem('selectedCampus')) ;
            localStorage.setItem('rememberBottomSubject',  localStorage.getItem('selectedSubject'));
            // TODO... we need the date data to be assigned
            localStorage.setItem('rememberBottomTime', localStorage.getItem('selectedTime'));
        }
        /*************************** eND ASSIGNMENT BLOCK ********************************************/

        // hides password until mouse over
        // credits: https://stackoverflow.com/questions/10701124/jquery-replace-text-of-element-on-hover
        $("#studentNumber").hover(
            function() {
                // shows it what to switch too
                var $this = $(this); // caching $(this)
                $this.data("**********", $this.text());  // this is what it will display by default
                $this.text(password);                    // otherwise we will display the NSHE# on mouse over
            },
            // when hover event ends we must reset the data to the default aka hide the password
            function() {
                var $this = $(this); // caching $(this)
                $this.text($this.data("**********"));
            }
        );
    /************************ TOP BUTTON BLOCK ****************************/
        // top button functionality
        // this is the functionality for the top exam selection button
        // om hover it will display the correct information depending if an exam can be scheduled or is already scheduled
        $("#topExam").hover(
            // if the topExam is false, that means it is not available and must be deleted first
            // so it will display the text to 'delete exam' to inform the user
            function () {
                if (localStorage.getItem('topExam') === "false") {
                    $("#topExam").text("                                Delete Exam?                                ");
                }
            },
            
            // after the mouse stops hovering over the button, we must return the correct values to be displayed
            function () {
                // if the exam is available to be scheduled, we set the text back to it's default which is "schedule exam"
                // otherwise the exam is scheduled and we must display the correct data to inform the user on the button
                // we check to see if an exam is availalbe by checking if the local Data is true or null
                if (localStorage.getItem('topExam') === "true"
                    || localStorage.getItem('topExam') == null) {
                    $("#topExam").text("                            Schedule Exam?                            ");
                } else {
                    $("#topExam").text(localStorage.getItem('rememberTopCampus')
                        + " 12/12/24 at " + localStorage.getItem('rememberTopTime'));
                }
            }
            
        );
        // topExam button click event method
        $("#topExam").click(function() {
            // if the exam is not availalbe the user will have an option to delete the exam
            // we check this by checking if the localData is false
            if (localStorage.getItem('topExam') === "false") {
                // the user will be prompted if they wish to delete the exam
                // if yes, it will set the exam to true making it available to be scheduled
                if (confirm("Do you wish to delete this exam?")) {
                    localStorage.setItem('topExam', "true");
                    $("#topText b").text("Exam C");  // sets the subject back to its default
                    // TODO... delete DB data on deletion of a scheduled exam (technically we just have a bool variable in the DB)
                }
            } else {
                // the exam was available so we will hold some local data and navigate to the schedule Exam step
                localStorage.setItem('topExam', "false");  // this sets the top exam slot to become unavailable
                localStorage.setItem('selectedExam', "top");  // this tells us that we CURRENTLY are editing the top slot
                // if the user were to immediately select the browser back button (not the cancel button),
                // the button would display false information. We much do a check on return by selecting backCheck to false
                localStorage.setItem('backCheck', 'true');       // this prevents a bug
                $(this).attr("href", "scheduleNewExam.html");      // navigates to the schedule exam step
            }
        });
        // this is the on load information the button must communicate to the user
        // if the exam slot is available, then we will display the default text of "schedule exam?"
        // otherwise, the slot has already been scheduled and we must display the relevant data to the user
        if (localStorage.getItem('topExam') === "true"
            || localStorage.getItem('topExam') == null) {
            $("#topExam").text("                            Schedule Exam?                            ");
        } else {
            $("#topText b").text(localStorage.getItem('rememberTopSubject'))  // this changes the text above the button
            $("#topExam").text(localStorage.getItem('rememberTopCampus')      // dispays the campus on button
                + " 12/12/24 at " + localStorage.getItem('rememberTopTime'));    // displays time and date on button
        }
    /************************ END TOP BUTTON BLOCK ****************************/

    /************************ MIDDLE BUTTON BLOCK ****************************/
        // middle button functionality
        // this is the functionality for the middle exam selection button
        // om hover it will display the correct information depending if an exam can be scheduled or is already scheduled
        $("#middleExam").hover(
            // if the middleExam is false, that means it is not available and must be deleted first
            // so it will display the text to 'delete exam' to inform the user
            function () {
                if (localStorage.getItem('middleExam') === "false") {
                    $("#middleExam").text("                                Delete Exam?                                ");
                }
            },
            
            // after the mouse stops hovering over the button, we must return the correct values to be displayed
            function () {
                // if the exam is available to be scheduled, we set the text back to it's default which is "schedule exam"
                // otherwise the exam is scheduled and we must display the correct data to inform the user on the button
                // we check to see if an exam is availalbe by checking if the local Data is true or null
                if (localStorage.getItem('middleExam') === "true"
                    || localStorage.getItem('middleExam') == null) {
                    $("#middleExam").text("                            Schedule Exam?                            ");
                } else {
                    $("#middleExam").text(localStorage.getItem('rememberMiddleCampus')
                        + " 12/12/24 at " + localStorage.getItem('rememberMiddleTime'));
                }
            }
            
        );
        // middleExam button click event method
        $("#middleExam").click(function() {
            // if the exam is not availalbe the user will have an option to delete the exam
            // we check this by checking if the localData is false
            if (localStorage.getItem('middleExam') === "false") {
                // the user will be prompted if they wish to delete the exam
                // if yes, it will set the exam to true making it available to be scheduled
                if (confirm("Do you wish to delete this exam?")) {
                    localStorage.setItem('middleExam', "true");
                    $("#middleText b").text("Exam C");  // sets the subject back to its default
                    // TODO... delete DB data on deletion of a scheduled exam (technically we just have a bool variable in the DB)
                }
            } else {
                // the exam was available so we will hold some local data and navigate to the schedule Exam step
                localStorage.setItem('middleExam', "false");  // this sets the middle exam slot to become unavailable
                localStorage.setItem('selectedExam', "middle");  // this tells us that we CURRENTLY are editing the middle slot
                // if the user were to immediately select the browser back button (not the cancel button),
                // the button would display false information. We much do a check on return by selecting backCheck to false
                localStorage.setItem('backCheck', 'true');       // this prevents a bug
                $(this).attr("href", "scheduleNewExam.html");      // navigates to the schedule exam step
            }
        });
        // this is the on load information the button must communicate to the user
        // if the exam slot is available, then we will display the default text of "schedule exam?"
        // otherwise, the slot has already been scheduled and we must display the relevant data to the user
        if (localStorage.getItem('middleExam') === "true"
            || localStorage.getItem('middleExam') == null) {
            $("#middleExam").text("                            Schedule Exam?                            ");
        } else {
            $("#middleText b").text(localStorage.getItem('rememberMiddleSubject'))  // this changes the text above the button
            $("#middleExam").text(localStorage.getItem('rememberMiddleCampus')      // dispays the campus on button
                + " 12/12/24 at " + localStorage.getItem('rememberMiddleTime'));    // displays time and date on button
        }
    /************************ END MIDDLE BUTTON BLOCK ****************************/

    /************************ BOTTOM BUTTON BLOCK ****************************/
        // bottom button functionality
        // this is the functionality for the bottom exam selection button
        // om hover it will display the correct information depending if an exam can be scheduled or is already scheduled
        $("#bottomExam").hover(
            // if the bottomExam is false, that means it is not available and must be deleted first
            // so it will display the text to 'delete exam' to inform the user
            function () {
                if (localStorage.getItem('bottomExam') === "false") {
                    $("#bottomExam").text("                                Delete Exam?                                ");
                }
            },
            
            // after the mouse stops hovering over the button, we must return the correct values to be displayed
            function () {
                // if the exam is available to be scheduled, we set the text back to it's default which is "schedule exam"
                // otherwise the exam is scheduled and we must display the correct data to inform the user on the button
                // we check to see if an exam is availalbe by checking if the local Data is true or null
                if (localStorage.getItem('bottomExam') === "true"
                    || localStorage.getItem('bottomExam') == null) {
                    $("#bottomExam").text("                            Schedule Exam?                            ");
                } else {
                    $("#bottomExam").text(localStorage.getItem('rememberBottomCampus')
                        + " 12/12/24 at " + localStorage.getItem('rememberBottomTime'));
                }
            }
            
        );
        // bottomExam button click event method
        $("#bottomExam").click(function() {
            // if the exam is not availalbe the user will have an option to delete the exam
            // we check this by checking if the localData is false
            if (localStorage.getItem('bottomExam') === "false") {
                // the user will be prompted if they wish to delete the exam
                // if yes, it will set the exam to true making it available to be scheduled
                if (confirm("Do you wish to delete this exam?")) {
                    localStorage.setItem('bottomExam', "true");
                    $("#bottomText b").text("Exam C");  // sets the subject back to its default
                    // TODO... delete DB data on deletion of a scheduled exam (technically we just have a bool variable in the DB)
                }
            } else {
                // the exam was available so we will hold some local data and navigate to the schedule Exam step
                localStorage.setItem('bottomExam', "false");  // this sets the bottom exam slot to become unavailable
                localStorage.setItem('selectedExam', "bottom");  // this tells us that we CURRENTLY are editing the bottom slot
                // if the user were to immediately select the browser back button (not the cancel button),
                // the button would display false information. We much do a check on return by selecting backCheck to false
                localStorage.setItem('backCheck', 'true');       // this prevents a bug
                $(this).attr("href", "scheduleNewExam.html");      // navigates to the schedule exam step
            }
        });
        // this is the on load information the button must communicate to the user
        // if the exam slot is available, then we will display the default text of "schedule exam?"
        // otherwise, the slot has already been scheduled and we must display the relevant data to the user
        if (localStorage.getItem('bottomExam') === "true"
            || localStorage.getItem('bottomExam') == null) {
            $("#bottomExam").text("                            Schedule Exam?                            ");
        } else {
            $("#bottomText b").text(localStorage.getItem('rememberBottomSubject'))  // this changes the text above the button
            $("#bottomExam").text(localStorage.getItem('rememberBottomCampus')      // dispays the campus on button
                + " 12/12/24 at " + localStorage.getItem('rememberBottomTime'));    // displays time and date on button
        }
    /************************ END BOTTOM BUTTON BLOCK ****************************/
        /************************ CLEAN UP BLOCK **********************************/
        // this block cleans up all hanging data to avoid a bug
        // in the above code, each of these should have been assigned to their proper location
        // if the user were to select another exam schedule and navigate back or refresh, the buttos will register as if
        // that exam was scheduled with all the previous exam data. This ensures that all exam registration locals
        // are unique.
        localStorage.removeItem('selectedCampus');    // removes localData for the stored campus
        localStorage.removeItem('selectedSubject');   // removes localData for the stored subject
        // we need to remove data picker data here... TODO  // removes localData for the stored date
        localStorage.removeItem('selectedTime');      // removes localData for the stored time
        localStorage.removeItem('selectedExam')       // removes localData for the stored subject
        /*************************END CLEAN UP BLOCK ******************************/

        // when the user logouts we will ask them if they wish to do so
        $("#logout").click(function() {
            // if the user clicks okay to logout we will clear all localStorage
            // this means the user MUST login again to access anything
            if (confirm("Do you wish to logout?")) {
                localStorage.clear();                 // clears all local data
                $(this).attr("href", "index.html");     // redirects to the login page
            }
        });
       /************************ END CLEAN UP BLOCK **********************************/ 
    } 
});