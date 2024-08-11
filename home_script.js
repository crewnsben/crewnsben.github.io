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

// document.addEventListener('DOMContentLoaded', () => {
//   const container = document.getElementById('header-container');
//   const images = document.querySelectorAll('.floating-image');

//   class FloatingImage {
//       constructor(element) {
//           this.element = element;
//           this.x = Math.random() * (container.clientWidth - element.width);
//           this.y = Math.random() * (container.clientHeight - element.height);
//           if (this.x > container.clientWidth){
//             this.x = container.clientWidth
//           }
//           if (this.y > container.clientWidth){
//             this.y = container.clientWidth
//           }
//           this.vx = (Math.random() - 0.5) / 2;
//           this.vy = (Math.random() - 0.8) / 2;
//           this.isMoving = false;

//           this.element.style.position = 'absolute';
//           this.element.style.left = `${this.x}px`;
//           this.element.style.top = `${this.y}px`;
//           this.element.style.transition = 'opacity 0.5s ease-in-out';
//           this.element.style.opacity = '0.5';

//           this.element.addEventListener('mouseenter', () => {
//               if (!this.isMoving) {
//                   this.isMoving = true;
//                   this.move();
//               }
//           });
//       }

//       move() {
//           if (!this.isMoving) return;

//           this.x += this.vx;
//           this.y += this.vy;

//           if (this.x <= 0 || this.x + this.element.width >= container.clientWidth) {
//               this.vx *= -1;
//           }
//           if (this.y <= 0 || this.y + this.element.height >= container.clientHeight) {
//               this.vy *= -1;
//           }

//           this.element.style.left = `${this.x}px`;
//           this.element.style.top = `${this.y}px`;

//           requestAnimationFrame(() => this.move());
//       }
//   }

//   images.forEach(img => new FloatingImage(img));
// });