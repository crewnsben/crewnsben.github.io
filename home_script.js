document.addEventListener('DOMContentLoaded', () => {
  const container = document.querySelector('.buttons');
  const allBoxes = container.querySelectorAll('.discord-box, .statement, .examplebox, .technology, .contact');
  const topSection = document.querySelector('.top');
  const bottomSection = document.querySelector('.bottom');

  const originalDimensions = {
      container: { width: container.offsetWidth, height: container.offsetHeight },
      boxes: Array.from(allBoxes).map(box => ({ 
          element: box,
          width: box.offsetWidth, 
          height: box.offsetHeight 
      })),
      top: { height: topSection.offsetHeight },
      bottom: { height: bottomSection.offsetHeight }
  };

  function scaleElements(hoveredElement, scale) {
      const isInTop = topSection.contains(hoveredElement);
      const totalWidth = container.offsetWidth;
      const totalHeight = container.offsetHeight;

      let availableWidth = totalWidth;
      let availableHeight = isInTop ? originalDimensions.top.height : originalDimensions.bottom.height;

      // Scale the hovered element
      const hoveredOriginal = originalDimensions.boxes.find(box => box.element === hoveredElement);
      const newHoveredWidth = hoveredOriginal.width * scale;
      const newHoveredHeight = hoveredOriginal.height * scale;
      hoveredElement.style.width = `${newHoveredWidth}px`;
      hoveredElement.style.height = `${newHoveredHeight}px`;

      availableWidth -= newHoveredWidth;
      if (isInTop) availableHeight -= newHoveredHeight;

      // Scale other elements in the same section
      const sectionBoxes = isInTop ? 
          Array.from(topSection.querySelectorAll('.discord-box, .statement, .examplebox')) :
          Array.from(bottomSection.querySelectorAll('.technology, .contact'));

      const otherBoxes = sectionBoxes.filter(box => box !== hoveredElement);
      const totalOriginalWidth = otherBoxes.reduce((sum, box) => 
          sum + originalDimensions.boxes.find(orig => orig.element === box).width, 0);

      const scaleFactor = availableWidth / totalOriginalWidth;

      otherBoxes.forEach(box => {
          const originalDim = originalDimensions.boxes.find(orig => orig.element === box);
          box.style.width = `${originalDim.width * scaleFactor}px`;
          box.style.height = `${originalDim.height * scaleFactor}px`;
      });

      // Adjust the height of the non-hovered section
      if (isInTop) {
          bottomSection.style.height = `${totalHeight - newHoveredHeight}px`;
      } else {
          topSection.style.height = `${totalHeight - newHoveredHeight}px`;
      }
  }

  function resetElements() {
      originalDimensions.boxes.forEach(box => {
          box.element.style.width = `${box.width}px`;
          box.element.style.height = `${box.height}px`;
      });
      topSection.style.height = `${originalDimensions.top.height}px`;
      bottomSection.style.height = `${originalDimensions.bottom.height}px`;
  }

  allBoxes.forEach(box => {
      box.addEventListener('mouseenter', () => scaleElements(box, 1.2));
      box.addEventListener('mouseleave', resetElements);
  });
});

document.addEventListener('DOMContentLoaded', () => {
  const homebox2 = document.getElementById('homebox2');
  const additionalTextElement = document.getElementById('additional-text');
  const cursorCircle = document.getElementById('cursor-circle');
  const additionalText = " This innovative suite empowers architects to harness the power of data-driven design, creating smarter, more sustainable urban environments for tomorrow.";
  let timeoutId;

  // Start pulsating effect
  homebox2.classList.add('pulsating');

  function typeText(index = 0) {
      if (index <= additionalText.length) {
          additionalTextElement.textContent = additionalText.slice(0, index);
          cursorCircle.style.display = 'inline-block';
          setTimeout(() => typeText(index + 1), 30);
      } else {
          setTimeout(() => cursorCircle.style.display = 'none', 10000);
      }
  }

  function resetText() {
    additionalTextElement.classList.add('fade-out');
    cursorCircle.classList.add('fade-out');
    setTimeout(() => {
        additionalTextElement.textContent = '';
        additionalTextElement.classList.remove('fade-out');
        cursorCircle.style.display = 'none';
        cursorCircle.classList.remove('fade-out');
        homebox2.classList.add('pulsating');
    }, 500);
}

  homebox2.addEventListener('mouseenter', () => {
      // Stop pulsating effect
      // homebox2.classList.remove('pulsating');
      
      clearTimeout(timeoutId);
      typeText();
      timeoutId = setTimeout(resetText, 15000);
  });

  // homebox2.addEventListener('mouseleave', () => {
  //     clearTimeout(timeoutId);
  //     timeoutId = setTimeout(resetText, 15000);
  // });
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
    overlay.style.transition = 'opacity 0.5s ease-in-out';
    document.body.appendChild(overlay);
    return overlay;
}

// Function to handle page transitions
function transitionToPage(url) {
    const currentColor = getBackgroundColor();
    const overlay = createOverlay("#151515");

    // Fade in the overlay
    setTimeout(() => {
        overlay.style.opacity = '1';
    }, 10);

    // Navigate to the new page after the fade-in is complete
    setTimeout(() => {
        window.location.href = url;
    }, 500);
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
        }, 200);
    }, 0);
});


function fadeOutCurrentPage(callback) {
    document.body.style.transition = 'opacity 0.3s ease-out';
    document.body.style.opacity = '0';
    setTimeout(callback, 50);
  }
  function showLoadingPage(url) {
    const iframe = document.createElement('iframe');
    iframe.src = 'loading.html';
    iframe.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;border:none;z-index:9999;';
    document.body.appendChild(iframe);

    setTimeout(() => {
      iframe.contentWindow.postMessage('fade-out', '*');
      setTimeout(() => window.location.href = url, 50);
    }, 50);
  }

  window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.3s ease-in';
    setTimeout(() => document.body.style.opacity = '1', 0);
  });
