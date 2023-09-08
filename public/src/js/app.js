

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js')
    .then(function() {
      console.log('SW registered');
    });
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