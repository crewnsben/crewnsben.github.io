function checkSwiperAndInitialize() {
    if (typeof Swiper === 'undefined') {
        console.error('Swiper is not loaded. Please make sure you have included the Swiper library.');
        setTimeout(checkSwiperAndInitialize, 100);
        return;
    }
    initializeSwipers();
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

    let swipers = [];

    function createSwiper(elementId, initialSlideIndex = 0, direction='up') {
        const container = document.getElementById(elementId);
        if (!container) {
            console.error(`Element with id "${elementId}" not found`);
            return null;
        }

        const swiperWrapper = document.createElement('div');
        swiperWrapper.className = 'swiper-wrapper';
        
        for (let i = 0; i < 8; i++) {  // Load first 8 images
            const index = (initialSlideIndex + i) % imageSources.length;
            const slide = createSlide(imageSources[index], index, elementId);
            swiperWrapper.appendChild(slide);
        }
        
        container.appendChild(swiperWrapper);

        const swiperInstance = new Swiper(`#${elementId}`, {
            direction: 'vertical',
            loop: true,
            slidesPerView: 'auto',
            spaceBetween: '5%',
            freeMode: true,
            speed: 5000,
            centeredSlides: true,
            mousewheel: true,
            initialSlide: initialSlideIndex,
            preloadImages: true,
            updateOnImagesReady: true,
            observer: true,
            observeParents: true,
            pagination: {
                el: '.swiper-pagination',
                dynamicBullets: true
            },
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            scrollbar: {
                el: '.swiper-scrollbar',
            },
            autoplay: true,
            allowTouchMove: true,

            on: {
                init: function() {
                    this.el.addEventListener('click', (e) => {
                        if (e.target.tagName === 'IMG') {
                            focusImage(e.target);
                        }
                    });
                    this.slideTo(initialSlideIndex, 0, false);
                    startCustomAutoplay(this,direction)
                },
                imagesReady: function() {
                    // Reposition slides after images are loaded
                    this.slideTo(initialSlideIndex, 0, false);
                }
            }
        });

        return swiperInstance;
    }


    function startCustomAutoplay(swiper, direction) {
        let autoplayInterval;
        const scrollSpeed = 10000; // Pixels per interval
        const intervalTime = 1; // Milliseconds between each scroll
    
        function smoothScroll() {
            const wrapper = swiper.wrapperEl;
            const maxScroll = wrapper.scrollHeight - wrapper.clientHeight;
    
            if (direction === 'up') {
                wrapper.scrollTop -= scrollSpeed;
                if (wrapper.scrollTop <= 0) {
                    wrapper.scrollTop = maxScroll;
                }
            } else {
                wrapper.scrollTop += scrollSpeed;
                if (wrapper.scrollTop >= maxScroll) {
                    wrapper.scrollTop = 0;
                }
            }
        }
    
        autoplayInterval = setInterval(smoothScroll, intervalTime);
    
        // Pause on hover
        swiper.el.addEventListener('mouseenter', () => clearInterval(autoplayInterval));
        swiper.el.addEventListener('mouseleave', () => {
            clearInterval(autoplayInterval);
            autoplayInterval = setInterval(smoothScroll, intervalTime);
        });
    
        // Stop on touch
        swiper.el.addEventListener('touchstart', () => clearInterval(autoplayInterval));
        swiper.el.addEventListener('touchend', () => {
            setTimeout(() => {
                clearInterval(autoplayInterval);
                autoplayInterval = setInterval(smoothScroll, intervalTime);
            }, 10); // Resume after 3 seconds
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
        
        if (elementId === 'left_row') {
            img.style.maxHeight = 'auto';
        } else {
            img.style.maxHeight = 'auto';
        }
        
        slide.appendChild(img);
        return slide;
    }

    function focusImage(image) {
        const focusedImageContainer = document.createElement('div');
        focusedImageContainer.id = 'focused-image-container';
        Object.assign(focusedImageContainer.style, {
            position: 'fixed',
            top: '0',
            left: '30%',
            width: '70%',
            height: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: '1000',
            backgroundColor: 'rgba(0,0,0,0.9)',
        });

        const clonedImage = image.cloneNode(true);
        Object.assign(clonedImage.style, {
            maxWidth: '80%',
            maxHeight: '80%',
            objectFit: 'contain',
            transform: 'scale(1)',
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
            focusedImageContainer.style.transition = 'opacity 0.3s ease-out';
            focusedImageContainer.style.opacity = '0';
            setTimeout(() => {
                document.body.removeChild(focusedImageContainer);
                document.body.style.overflow = '';
                swipers.forEach(swiper => swiper.autoplay.start());
            }, 10);
        }
    }

    swipers = [createSwiper('left_row', 5,'up'), createSwiper('right_row', 8,'down')];
    
    function ensureCorrectInitialPosition() {
        swipers.forEach((swiper, index) => {
            if (swiper && typeof swiper.update === 'function') {
                swiper.update();
                const initialIndex = index === 0 ? 5 : 8;
                swiper.slideTo(initialIndex, 0, false);
                
                // Force a reflow and reposition
                setTimeout(() => {
                    swiper.slideTo(initialIndex, 0, false);
                }, 10);
            }
        });
    }
    // Ensure updates after DOM is fully loaded
    window.addEventListener('load', () => {
        swipers.forEach((swiper, index) => {
            if (swiper && typeof swiper.update === 'function') {
                swiper.update();
                // Use the initial index you want (5 for left, 1 for right)
                const initialIndex = index === 0 ? 5 : 8;
                swiper.slideTo(initialIndex, 0, false);
            }
        });
    });
}


document.addEventListener('DOMContentLoaded', checkSwiperAndInitialize);