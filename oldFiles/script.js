// Define your image sources
const imageSources = [
  'files/img/osm_diagramAthens.png',
  'files/img/osm_diagramCompton.png',
  'files/img/osm_diagramThessaloniki.png',
  'files/img/Screenshot 2023-10-19 042952.png',
  'files/img/Screenshot 2023-10-19 043458.png',
  'files/img/Screenshot 2023-12-09 155927.png',
  'files/img/Screenshot 2024-06-29 174744.png',
  'files/img/Screenshot 2024-07-23 150909.png'
];

function createEndlessScroll(elementId) {
  const container = document.getElementById(elementId);
  if (!container) {
      console.error(`Element with id "${elementId}" not found`);
      return;
  }
  
  const contentWrapper = container.querySelector('.content-wrapper');
  if (!contentWrapper) {
      console.error(`Content wrapper not found in element with id "${elementId}"`);
      return;
  }
  
  let isLoading = false;
  let imageIndex = 0;
  let preloadedImages = [];
  let focusedImage = null;

  function preloadImages() {
      imageSources.forEach((src, index) => {
          const img = new Image();
          img.src = src;
          img.onload = () => {
              preloadedImages[index] = img;
              console.log(`Preloaded image ${index + 1}`);
          };
      });
  }

  container.addEventListener('scroll', () => {
      if (isLoading) return;

      const scrollPosition = container.scrollTop + container.clientHeight;
      const scrollHeight = container.scrollHeight;

      if (scrollPosition > scrollHeight - 200) {
          isLoading = true;
          loadMoreContent();
      }
  });

  function loadMoreContent() {
      const newContent = createImageContent(imageIndex);
      contentWrapper.insertAdjacentHTML('beforeend', newContent);
      imageIndex = (imageIndex + 1) % imageSources.length;
      isLoading = false;
      addClickListenersToNewImages();
  }

  function createImageContent(index) {
      const img = preloadedImages[index] || { src: imageSources[index] };
      return `
          <div class="content-item">
              <img src="${img.src}" alt="Urban Image ${index + 1}" style="width: 100%; height: auto;">
          </div>
      `;
  }

  function addClickListenersToNewImages() {
      const newImages = contentWrapper.querySelectorAll('.content-item:not(.click-listener-added)');
      newImages.forEach(item => {
          item.addEventListener('click', handleImageClick);
          item.classList.add('click-listener-added');
      });
  }

  function handleImageClick(event) {
      event.preventDefault();
      event.stopPropagation();
      const clickedImage = event.currentTarget.querySelector('img');
      
      if (focusedImage === clickedImage) {
          unfocusImage();
      } else {
          focusImage(clickedImage);
      }
  }

  function focusImage(image) {
      unfocusImage(); // Unfocus any previously focused image
      
      focusedImage = image;
      const mainContainer = document.querySelector('.main-content');
      
      // Create a new div to hold the focused image
      const focusedImageContainer = document.createElement('div');
      focusedImageContainer.id = 'focused-image-container';
      focusedImageContainer.style.position = '';
      focusedImageContainer.style.top= '0';
      focusedImageContainer.style.left= '50%';
      focusedImageContainer.style.display = 'flex';
      focusedImageContainer.style.justifyContent = 'center';
      focusedImageContainer.style.alignItems = 'center';
      focusedImageContainer.style.backgroundColor = 'rgba(0,0,0,0.5)';

      // Clone the image and add it to the new container
      const clonedImage = image.cloneNode(true);
      clonedImage.style.transform = 'scale(2)';
      clonedImage.style.maxWidth = '80%';
      clonedImage.style.maxHeight = '80%';
      clonedImage.style.objectFit = 'fill';
      focusedImageContainer.appendChild(clonedImage);

      // Add the new container to the body
      document.body.appendChild(focusedImageContainer);

      // Dim other images
      document.querySelectorAll('.content-item img').forEach(img => {
          img.style.filter = 'grayscale(100%) brightness(10%)';
      });

      // Add click event to unfocus when clicking outside the image
      focusedImageContainer.addEventListener('click', (e) => {
        if (e.target === focusedImageContainer) {
            goBack();
        }
      });

      // Store the current scroll positions
      focusedImageContainer.dataset.leftScrollPos = document.getElementById('left_row').scrollTop;
      focusedImageContainer.dataset.rightScrollPos = document.getElementById('right_row').scrollTop;

      // Disable scrolling on the main content
      document.body.style.overflow = 'hidden';
  }

  function unfocusImage() {
    const focusedImageContainer = document.getElementById('focused-image-container');
    if (focusedImageContainer) {
        document.body.removeChild(focusedImageContainer);
    }

    // Restore all images
    document.querySelectorAll('.content-item img').forEach(img => {
        img.style.filter = '';
    });

    focusedImage = null;

    // Re-enable scrolling on the main content
    document.body.style.overflow = '';
  }

  function goBack() {
    const focusedImageContainer = document.getElementById('focused-image-container');
    if (focusedImageContainer) {
        // Retrieve the stored scroll positions
        const leftScrollPos = focusedImageContainer.dataset.leftScrollPos;
        const rightScrollPos = focusedImageContainer.dataset.rightScrollPos;

        unfocusImage();

        // Restore the scroll positions
        document.getElementById('left_row').scrollTop = leftScrollPos;
        document.getElementById('right_row').scrollTop = rightScrollPos;
    }
  }

  preloadImages();
  loadMoreContent(); // Load initial content
  addClickListenersToNewImages();
}

document.addEventListener('DOMContentLoaded', function() {
  createEndlessScroll('left_row');
  createEndlessScroll('right_row');
});