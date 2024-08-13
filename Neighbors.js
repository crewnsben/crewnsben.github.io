function checkSwiperAndInitialize() {
  if (typeof Swiper === 'undefined') {
      console.error('Swiper is not loaded. Please make sure you have included the Swiper library.');
      return;
  }
  initializeSwipers();
}

function fadeIn(element, duration = 250) {
  element.style.opacity = 0;
  element.style.display = 'block';
  element.style.transition = `opacity ${duration}ms`;
  setTimeout(() => {
      element.style.opacity = 1;
  }, 10);
}


function initializeSwipers() {
  const imageSources = [
      'files/img/osm_diagramAthens.png',
      'files/img/osm_diagramCompton.png',
      'files/img/osm_diagramThessaloniki.png',
      'files/img/Screenshot 2023-10-19 042952.png',
      'files/img/Screenshot 2023-10-19 043458.png',
      'files/img/Screenshot 2023-12-09 155927.png',
      'files/img/Screenshot 2024-06-29 174744.png',
      'files/img/Screenshot 2024-07-23 150909.png',
      'files/img/Screenshot 2024-07-07 233418.png',
      'files/img/Steven-Holl-Architects-Ecology-and-Planning-Museums-.jpg',
      'files/img/Screenshot 2024-07-23 151645.png'
  ];
  const imageTexts = {
      'osm_diagramAthens.png': 'Athens Diagram',
      'osm_diagramCompton.png': 'Compton Diagram',
      'osm_diagramThessaloniki.png': 'Thessaloniki Diagram',
      'Screenshot 2023-10-19 042952.png': 'Urban Planning 2023',
      'Screenshot 2023-10-19 043458.png': 'City Layout 2023',
      'Screenshot 2023-12-09 155927.png': 'December 2023 Urban Design',
      'Screenshot 2024-06-29 174744.png': 'June 2024 City Plan',
      'Screenshot 2024-07-23 150909.png': 'July 2024 Urban Development',
      'Screenshot 2024-07-07 233418.png': 'City Night View 2024',
      'Steven-Holl-Architects-Ecology-and-Planning-Museums-.jpg': 'Steven Holl Ecology Museum',
      'Screenshot 2024-07-23 151645.png': 'Urban Planning July 2024'
  };
  

  let swipers = [];


  function createSwiper(elementId, initialSlideIndex = 0, direction = 'vertical') {
      const container = document.getElementById(elementId);
      if (!container) {
          console.error(`Element with id "${elementId}" not found`);
          return null;
      }

      const swiperWrapper = document.createElement('div');
      swiperWrapper.className = 'swiper-wrapper';

      for (let i = 0; i < 11; i++) {
          const index = (initialSlideIndex + i) % imageSources.length;
          const slide = createSlide(imageSources[index], index, elementId);
          swiperWrapper.appendChild(slide);
      }

      container.appendChild(swiperWrapper);

      const swiperInstance = new Swiper(`#${elementId}`, {
          direction: direction,
          loop: true,
          slidesPerView: 'auto',
          spaceBetween: '2%',
          freeMode: {
              enabled: true,
              momentum: false,
              // momentumRatio: 0.1,
              // momentumVelocityRatio: 0.1
          },
          speed: 20000,
          centeredSlides: false,
          initialSlide: initialSlideIndex,
          preloadImages: true,
          updateOnImagesReady: true,
          observer: true,
          observeParents: true,
          autoplay: {
              delay: 0,
              disableOnInteraction: false,
          },
          mousewheel: {
              sensitivity: 0.6,
          },
          on: {
              init: function() {
                  this.el.addEventListener('click', (e) => {
                      if (e.target.tagName === 'IMG') {
                          focusImage(e.target);
                      }
                  });
                  this.slideTo(initialSlideIndex, 0, false);
                  this.el.addEventListener('mouseenter', () => {
                      this.autoplay.stop();
                      clearInterval(this.customAutoplayInterval);
                  });
                  this.el.addEventListener('mouseleave', () => {
                      this.autoplay.start();
                      startCustomAutoplay(this, direction);
                  });
                  startCustomAutoplay(this, direction);
              },
              // ... (keep other existing event handlers)
          }
      });

      return swiperInstance;
  }


  function startCustomAutoplay(swiper, direction) {
      const scrollSpeed = 0.1;
      const intervalTime = 16;
  
      function autoplayScroll() {
          const wrapper = swiper.wrapperEl;
          const maxScroll = wrapper.scrollHeight - wrapper.clientHeight;
  
          if (direction === 'vertical') {
              wrapper.scrollTop -= scrollSpeed;
              if (wrapper.scrollTop <= 0) wrapper.scrollTop = maxScroll;
          } else {
              wrapper.scrollTop += scrollSpeed;
              if (wrapper.scrollTop >= maxScroll) wrapper.scrollTop = 0;
          }
      }
  
      swiper.customAutoplayInterval = setInterval(autoplayScroll, intervalTime);
  
      // Add event listeners for mouse enter and leave
      swiper.el.addEventListener('mouseenter', () => {
          clearInterval(swiper.customAutoplayInterval);
      });
  
      swiper.el.addEventListener('mouseleave', () => {
          swiper.customAutoplayInterval = setInterval(autoplayScroll, intervalTime);
      });
  }

  function createSlide(src, index, elementId) {
      const slide = document.createElement('div');
      slide.className = 'swiper-slide';
      slide.style.height = 'auto';
      
      const img = document.createElement('img');
      img.src = src;
      img.alt = `Urban Image ${index + 1}`;
      img.style.width = '100%';
      img.style.height = 'auto';
      img.style.objectFit = 'cover';
      
      const text = document.createElement('div');
      text.className = 'slide-text';
      text.textContent = imageTexts[src.split('/').pop()] || `Image ${index + 1}`;
      text.style.position = 'relative';
      text.style.top= '10px';
      text.style.right = '10px';
      text.style.color = 'white';
      // text.style.backgroundColor = 'rgba(0,0,0,0.5)';
      text.style.padding = '5px';
      text.style.borderRadius = '3px';
      
      slide.appendChild(img);
      slide.appendChild(text);
      return slide;
  }
  function focusImage(image) {
      const focusedImageContainer = document.createElement('div');
      focusedImageContainer.id = 'focused-image-container';
      Object.assign(focusedImageContainer.style, {
          position: 'fixed',
          top: '0',
          left: '0%',
          width: '100%',
          height: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: '1000',
          backgroundColor: 'rgba(0,0,0,0.95)',
      });

      const clonedImage = image.cloneNode(true);
      Object.assign(clonedImage.style, {
          maxWidth: '80%',
          maxHeight: '80%',
          objectFit: 'contain',
          transition: 'transform 0.3s ease-in-out',
      });

      focusedImageContainer.appendChild(clonedImage);
      document.body.appendChild(focusedImageContainer);

      focusedImageContainer.addEventListener('click', unfocusImage);

      document.body.style.overflow = 'hidden';
      swipers.forEach(swiper => swiper.autoplay.stop());
  }

  function unfocusImage() {
      const focusedImageContainer = document.getElementById('focused-image-container');
      if (focusedImageContainer) {
          focusedImageContainer.style.transition = 'opacity 0.8s ease-out';
          focusedImageContainer.style.opacity = '0';
          setTimeout(() => {
              document.body.removeChild(focusedImageContainer);
              document.body.style.overflow = '';
              swipers.forEach(swiper => swiper.autoplay.start());
          }, 1);
      };
  }

  swipers = [createSwiper('left_row', 8, 'vertical')];
  swipers[0].update();

  function ensureCorrectInitialPosition() {
      swipers.forEach((swiper, index) => {
          if (swiper && typeof swiper.update === 'function') {
              swiper.update();
              const initialIndex = index === 0 ? 5 : 8;
              swiper.slideTo(initialIndex, 0, false);
          }
      });
  }

  const swiperContainers = document.querySelectorAll('#left_row, #right_row');
  swiperContainers.forEach(container => {
      container.style.opacity = 0;
  });

  setTimeout(() => {
      swiperContainers.forEach(container => fadeIn(container));
  }, 500);

  window.addEventListener('load', ensureCorrectInitialPosition);
}

document.addEventListener('DOMContentLoaded', checkSwiperAndInitialize);

// Fade in Transitions
function fadeOutCurrentPage(callback) {
  document.body.style.transition = 'opacity 0.5s';
  document.body.style.opacity = '0';
  setTimeout(callback, 500);
}

document.addEventListener('DOMContentLoaded', () => {
  const cursor = document.createElement('div');
  cursor.classList.add('custom-cursor', 'default');
  document.body.appendChild(cursor);

  const images = document.querySelectorAll('img');

  document.addEventListener('mousemove', (e) => {
    cursor.style.left = `${e.clientX}px`;
    cursor.style.top = `${e.clientY}px`;
  });

  images.forEach(img => {
    img.addEventListener('mouseenter', () => {
      cursor.classList.remove('default');
    });

    img.addEventListener('mouseleave', () => {
      cursor.classList.add('default');
    });
  });
});


window.addEventListener('load', () => {
  document.body.style.opacity = '0';
  document.body.style.transition = 'opacity 0.2s';
  setTimeout(() => document.body.style.opacity = '1', 80);
});

function getBackgroundColor() {
  return window.getComputedStyle(document.body).backgroundColor;
}

// Function to create a transition overlay
function createOverlay(color) {
  const overlay = document.createElement('div');
  overlay.style.position = 'fixed';
  overlay.style.top = '0';
  overlay.style.left = '0';
  overlay.style.width = '100%';
  overlay.style.height = '100%';
  overlay.style.backgroundColor = color;
  overlay.style.zIndex = '9999';
  overlay.style.opacity = '0';
  overlay.style.transition = 'opacity 0.2s ease-in-out';
  document.body.appendChild(overlay);
  return overlay;
}

// Function to handle page transitions
function transitionToPage(url) {
  const currentColor = getBackgroundColor();
  const overlay = createOverlay(currentColor);

  // Fade in the overlay
  setTimeout(() => {
      overlay.style.opacity = '1';
  }, 0);

  // Navigate to the new page after the fade-in is complete
  setTimeout(() => {
      window.location.href = url;
  }, 250);
}

// Intercept all link clicks
document.addEventListener('click', function(e) {
  const target = e.target.closest('a');
  if (target && target.getAttribute('href') !== '#') {
      e.preventDefault();
      transitionToPage(target.getAttribute('href'));
  }
});

// Handle the fade-out transition when the new page loads
window.addEventListener('load', function() {
  const overlay = createOverlay(getBackgroundColor());
  overlay.style.opacity = '1';

  // Fade out the overlay
  setTimeout(() => {
      overlay.style.opacity = '0';
      setTimeout(() => {
          overlay.remove();
      }, 500);
  }, 0);
});

document.addEventListener('DOMContentLoaded', function() {
  const sidebarLinks = document.querySelectorAll('.sidebar a');
  const architectsLink = document.getElementById('Neighbors');
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