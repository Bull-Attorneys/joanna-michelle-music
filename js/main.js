// Gallery Lightbox Functionality
document.addEventListener('DOMContentLoaded', function() {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const closeBtn = document.querySelector('.lightbox-close');
    const prevBtn = document.querySelector('.lightbox-prev');
    const nextBtn = document.querySelector('.lightbox-next');
    const galleryItems = document.querySelectorAll('.gallery-item img');
    
    let currentIndex = 0;
    const images = Array.from(galleryItems).map(img => ({
        src: img.src,
        alt: img.alt
    }));

    // Open lightbox when clicking on a gallery image
    galleryItems.forEach((img, index) => {
        img.parentElement.addEventListener('click', function(e) {
            e.preventDefault();
            currentIndex = index;
            openLightbox();
        });
    });

    function openLightbox() {
        lightbox.classList.add('active');
        updateImage();
        document.body.style.overflow = 'hidden';
    }

    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    }

    function updateImage() {
        lightboxImg.src = images[currentIndex].src;
        lightboxImg.alt = images[currentIndex].alt;
    }

    function showPrev() {
        currentIndex = (currentIndex - 1 + images.length) % images.length;
        updateImage();
    }

    function showNext() {
        currentIndex = (currentIndex + 1) % images.length;
        updateImage();
    }

    // Close button
    closeBtn.addEventListener('click', closeLightbox);

    // Navigation buttons
    prevBtn.addEventListener('click', showPrev);
    nextBtn.addEventListener('click', showNext);

    // Click outside image to close
    lightbox.addEventListener('click', function(e) {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });

    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (!lightbox.classList.contains('active')) return;

        switch(e.key) {
            case 'Escape':
                closeLightbox();
                break;
            case 'ArrowLeft':
                showPrev();
                break;
            case 'ArrowRight':
                showNext();
                break;
        }
    });
});
