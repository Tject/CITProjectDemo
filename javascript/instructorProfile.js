// Aaron Lambou-Selgestad
// 11/22/2024
// instructorProfile.js
// this document should contain the funcionality for instructorProfile.html
// there should not be much functionality here but it will need to either handle the filters for the view report
// or simple direct to the report screen.

// TODO... get the report screen to works

$(document).ready(function () {
    // the instructor must have logged in correctly else kick em back to the login page
    if (localStorage.getItem('loggedIn') != 'true') {
        alert("Access Denied")
        window.location.href = "index.html";
    } else {

        // we will hide the instructors password unless they hover over it
        // i got this from github....
        $("#instructorPassword").hover(
            // on hover, we switch the text to their loggedPassword
            function() {
                // shows it what to switch too
                var $this = $(this); // caching $(this)
                $this.data("**********", $this.text());
                $this.text(localStorage.getItem('loggedPassword'));
            },
            // after the hover event ends, we must switch it back
            function() {
                var $this = $(this); // caching $(this)
                $this.text($this.data("**********"));
            }
        );

        // the instructor is logging out, clear ALL local data
        $("#logout").click(function() {
            if (confirm("Do you wish to logout?")) {
                localStorage.clear();  // clear all local data, this effectively signs the user out
                $(this).attr("href", "index.html");  // send back to the login screen
            } 
        });
    }
});