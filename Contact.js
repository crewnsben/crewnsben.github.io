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


const rollingImage = document.querySelector('img[alt="disclogo"]');

if (rollingImage) {
  // Store the original styles
  const originalStyles = {
    position: rollingImage.style.position,
    left: rollingImage.style.left,
    top: rollingImage.style.top,
    transform: rollingImage.style.transform,
    opacity: rollingImage.style.opacity,
    display: rollingImage.style.display,
    zIndex: rollingImage.style.zIndex,
    transition: rollingImage.style.transition
  };

  // Set initial styles for the animation
  function setInitialStyles() {
    rollingImage.style.position = 'fixed';
    rollingImage.style.left = '-20px';
    rollingImage.style.top = '25%';
    rollingImage.style.transform = 'translateY(-50%)';
    rollingImage.style.opacity = '0';
    rollingImage.style.display = 'none';
    rollingImage.style.zIndex = '9999';
    rollingImage.style.transition = 'opacity 0.3s ease-out';
  }

  setInitialStyles();

  let isAnimating = false;
  let isHovering = false;

  // Function to animate the image
  function animateImage() {
    if (isAnimating) return;
    isAnimating = true;

    rollingImage.style.display = 'block';
    setTimeout(() => {
      rollingImage.style.opacity = '1';
    }, 0);

    let rotation = 0;
    let position = -100;

    function animate() {
      rotation += 5;
      position += 3;
      rollingImage.style.transform = `translateY(-50%) rotate(${rotation}deg)`;
      rollingImage.style.left = `${position}px`;

      if (position < window.innerWidth / 4) {
        requestAnimationFrame(animate);
      } else {
          if (position < window.innerWidth / 1.5) {
            rollingImage.style.opacity = '0';
            setTimeout(() => {
              setInitialStyles();
              isAnimating = false;
              if (isHovering) {
                animateImage();
              }
            }, 150);
          }
      }
    }

    animate();
  }

  // Add hover event listeners to the specified element
  const targetElement = document.querySelector('.join'); // Using the class 'join' as the selector
  if (targetElement) {
    targetElement.addEventListener('mouseenter', () => {
      isHovering = true;
      if (!isAnimating) {
        animateImage();
      }
    });

    targetElement.addEventListener('mouseleave', () => {
      isHovering = false;
    });
  } else {
    console.error("Element with class 'join' not found");
  }
} else {
  console.error("Image with alt='disclogo' not found");
}