document.addEventListener('DOMContentLoaded', function() {
  const sidebarLinks = document.querySelectorAll('.sidebar a');
  const architectsLink = document.getElementById('statement');
  const originalArchitectsStyle = window.getComputedStyle(architectsLink);

  sidebarLinks.forEach(link => {
    link.addEventListener('mouseover', function() {
      this.style.fontSize = originalArchitectsStyle.fontSize;
      this.style.fontWeight = originalArchitectsStyle.fontWeight;
      this.style.color = originalArchitectsStyle.color;
      architectsLink.style.fontSize = '';
      architectsLink.style.fontWeight = '';
    });

    link.addEventListener('mouseout', function() {
      this.style.fontSize = '';
      this.style.fontWeight = '';
      architectsLink.style.fontSize = originalArchitectsStyle.fontSize;
      architectsLink.style.fontWeight = originalArchitectsStyle.fontWeight;
    });
  });
});

// Function to fade an element
function fade(element, type, duration, callback) {
  let opacity = type === 'in' ? 0 : 1;
  const interval = 50;
  const gap = interval / duration;

  function run() {
      opacity = type === 'in' ? opacity + gap : opacity - gap;
      element.style.opacity = opacity;

      if ((type === 'in' && opacity >= 1) || (type === 'out' && opacity <= 0)) {
          clearInterval(fading);
          if (callback) callback();
      }
  }

  const fading = setInterval(run, interval);
}

// Function to recursively fade elements
function recursiveFade(element1, element2, duration) {
  fade(element1, 'in', duration, () => {
      fade(element1, 'out', duration, () => {
          fade(element2, 'in', duration, () => {
              fade(element2, 'out', duration, () => {
                  // After both elements have faded in and out, restart the cycle
                  recursiveFade(element1, element2, duration);
              });
          });
      });
  });
}

// Get the elements and start the animation
const element1 = document.getElementById('centertop');
const element2 = document.getElementById('centerbot');
const fadeDuration = 2000; // Duration for each fade in milliseconds

// Set initial opacity to 0 for both elements
element1.style.opacity = 0;
element2.style.opacity = 0;

// Start the recursive fading
recursiveFade(element1, element2, fadeDuration);