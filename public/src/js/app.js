

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js')
    .then(function() {
      console.log('SW registered');
    });
}

const divInstall = document.getElementById("installContainer");
const butInstall = document.getElementById("butInstall");

/* Put code here */


/**
 * Warn the page must be served over HTTPS
 * The `beforeinstallprompt` event won't fire if the page is served over HTTP.
 */
if (window.location.protocol === "http:") {
  const requireHTTPS = document.getElementById("requireHTTPS");
  const link = requireHTTPS.querySelector("a");
  link.href = window.location.href.replace("http://", "https://");
  requireHTTPS.classList.remove("hidden");
}

/**
 * Warn the page must not be served in an iframe.
 */
if (window.self !== window.top) {
  const requireTopLevel = document.getElementById("requireTopLevel");
  const link = requireTopLevel.querySelector("a");
  link.href = window.location.href;
  requireTopLevel.classList.remove("hidden");
}


document.addEventListener('DOMContentLoaded', function() {
  const fullscreenButton = document.getElementById('fullscreen-button');

  fullscreenButton.addEventListener('click', function() {
    if (document.documentElement.requestFullscreen) {
      document.documentElement.requestFullscreen();
    } else if (document.documentElement.mozRequestFullScreen) { // Firefox
      document.documentElement.mozRequestFullScreen();
    } else if (document.documentElement.webkitRequestFullscreen) { // Chrome, Safari and Opera
      document.documentElement.webkitRequestFullscreen();
    } else if (document.documentElement.msRequestFullscreen) { // IE/Edge
      document.documentElement.msRequestFullscreen();
    }
  });

  // Trigger button click after 5 seconds
  setTimeout(function() {
    fullscreenButton.click();
  }, 5000); // 5000 milliseconds = 5 seconds
});
$(document).ready(function() {
  $('#app-menu').hide();
  // When the button is clicked
  $("#toggleButton").click(function() {
    // Toggle the visibility of the content div
    $("#content").toggle();
  });
});

//here we go again
$(document).ready(function() {
  $('#loginForm').submit(function(event) {
    event.preventDefault(); // Prevent the default form submission

    // Get the user input values
    var userid = $('#userid').val();
    var password = $('#password').val();

    // Make an API call to authenticate the user
    $.ajax({
      type: 'POST', // Adjust the HTTP method as needed (e.g., POST, GET)
      url: 'https://pwa.onlinebilling.ca/login', // Replace with your API endpoint for user authentication
      data: {
        userid: userid,
        password: password
      },
      success: function(response) {
        // Check the response from the API
        if (response.error===false) {
          // Authentication successful
          $('#loginStatus').text('Login successful.');
          $('#app-menu').show();
          $('#app-pin-wrapper').hide();
          
          // You can also store user-related data in localStorage, if needed.
          localStorage.setItem('userid', userid);
          localStorage.setItem('token', response.token); // Assuming the API provides an authentication token.
        } else {
          // Authentication failed
          console.log('not found');
          $('#loginStatus').text('Login failed. Please check your credentials.');
        }
      },
      error: function() {
        $('#loginStatus').text('An error occurred while attempting to log in.');
      }
    });
  });
});

