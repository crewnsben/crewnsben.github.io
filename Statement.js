document.addEventListener('DOMContentLoaded', function () {
  const sidebarLinks = document.querySelectorAll('.sidebar a');
  const architectsLink = document.getElementById('statement');
  const originalArchitectsStyle = window.getComputedStyle(architectsLink);

  sidebarLinks.forEach(link => {
    link.addEventListener('mouseover', function () {
      this.style.fontSize = originalArchitectsStyle.fontSize;
      this.style.fontWeight = originalArchitectsStyle.fontWeight;
      this.style.color = originalArchitectsStyle.color;
      architectsLink.style.fontSize = '';
      architectsLink.style.fontWeight = '';
    });

    link.addEventListener('mouseout', function () {
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