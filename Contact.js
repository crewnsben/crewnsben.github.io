document.addEventListener('DOMContentLoaded', function() {
  const sidebarLinks = document.querySelectorAll('.sidebar a');
  const architectsLink = document.getElementById('contact');
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

function animateScale(element, start, end, duration, callback) {
  let startTime = null;
  
  function animation(currentTime) {
      if (startTime === null) startTime = currentTime;
      const elapsedTime = currentTime - startTime;
      const progress = Math.min(elapsedTime / duration, 1);
      const currentScale = start + (end - start) * progress;
      
      element.style.transform = `scale(${currentScale})`;
      
      if (progress < 1) {
          requestAnimationFrame(animation);
      } else if (callback) {
          callback();
      }
  }
  
  requestAnimationFrame(animation);
}

// Function to recursively animate scale in and out
function recursiveScaleAnimation(element, duration) {
  animateScale(element, 1, 1.2, duration, () => {
      animateScale(element, 1.2, 1, duration, () => {
          // After scaling in and out, restart the cycle
          recursiveScaleAnimation(element, duration);
      });
  });
}

// Get the mailto element
const mailtoElement = document.getElementById('mailto');

// Set initial styles
mailtoElement.style.display = 'inline-block';  // Ensures the anchor behaves as a block for transformations
mailtoElement.style.transition = 'transform 0.3s ease';  // Smooth transition for transform changes

// Animation duration in milliseconds
const animationDuration = 1000;

// Start the recursive scale animation
recursiveScaleAnimation(mailtoElement, animationDuration);

// Add hover effect
mailtoElement.addEventListener('mouseenter', () => {
  mailtoElement.style.transform = 'scale(1.3)';
});

mailtoElement.addEventListener('mouseleave', () => {
  mailtoElement.style.transform = 'scale(1)';
});