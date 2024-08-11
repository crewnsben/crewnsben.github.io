document.addEventListener('DOMContentLoaded', () => {
  // Discord box hover effect
  const discordBox = document.querySelector('.discord-box');
  discordBox.addEventListener('mouseenter', () => {
      discordBox.style.backgroundColor = '#e0e0e0';
  });
  discordBox.addEventListener('mouseleave', () => {
      discordBox.style.backgroundColor = '';
  });

  // Example boxes scaling effect
  const exampleBoxes = document.querySelectorAll('.examples');
  const examplesContainer = document.querySelector('.examplebox');
  const totalWidth = examplesContainer.offsetWidth;
  const originalWidths = Array.from(exampleBoxes).map(box => box.offsetWidth);

  exampleBoxes.forEach((box, index) => {
      box.addEventListener('mouseenter', () => {
          const growFactor = '1.5'; // How much the hovered box grows
          const shrinkFactor = (totalWidth - originalWidths[index] * growFactor) / (totalWidth - originalWidths[index]);

          exampleBoxes.forEach((otherBox, otherIndex) => {
              if (otherIndex === index) {
                  otherBox.style.flexGrow = '1';
                  otherBox.style.opacity = '1';
              } else {
                  otherBox.style.flexGrow = shrinkFactor;
                  otherBox.style.opacity = '0.7';
              }
          });
      });

      box.addEventListener('mouseleave', () => {
          exampleBoxes.forEach((otherBox) => {
              otherBox.style.flexGrow = '-1';
              otherBox.style.opacity = '1';
          });
      });
  });

  // Hover effects for other elements
  const hoverElements = document.querySelectorAll('.statement, .technology, .contact');
  hoverElements.forEach(elem => {
      elem.addEventListener('mouseenter', () => {
          elem.style.backgroundColor = '#e0e0e0';
      });
      elem.addEventListener('mouseleave', () => {
          elem.style.backgroundColor = '';
      });
  });
});