// Automatically update copyright year
document.getElementById(
    'copyright'
).textContent = `© ${new Date().getFullYear()} Kaur Hendrikson`;

// Emulate hover on portfolio cards that are in the middle of the screen
document.addEventListener('DOMContentLoaded', () => {
    const portfolioCards = document.querySelectorAll('.portfolio-card');
    const pageContent = document.getElementById('page-content');

    window.addEventListener('scroll', () => {
        portfolioCards.forEach((card) => {
            const cardRect = card.getBoundingClientRect();
            if (
                cardRect.top < window.innerHeight / 2 &&
                cardRect.bottom > window.innerHeight / 2
            ) {
                card.classList.add('hover');
            } else {
                card.classList.remove('hover');
            }
        });
    });
});

// Carousel functionality
document.addEventListener('DOMContentLoaded', () => {
    const pageContent = document.getElementById('page-content');
    const portfolioCards = document.querySelectorAll('.portfolio-card');
    const carousel = document.getElementById('carousel');
    const carouselImage = document.getElementById('carousel-image');
    const closeBtn = document.getElementById('carousel-close');
    const prevBtn = document.getElementById('carousel-prev');
    const nextBtn = document.getElementById('carousel-next');

    let images = [];
    let currentIndex = 0;

    portfolioCards.forEach((card) => {
        card.addEventListener('click', () => {
            // Get img inside of div inside of portfolio card
            const img = card.querySelector('img');
            // Get src of img
            const src = img.getAttribute('src');
            // Regex match (?<=portfolio\/).+(?=\/) to get the image folder
            const projName = src.match(/(?<=portfolio\/).+(?=\/)/)[0];
            const imgName = src.match(/(?<=portfolio\/\d+\-).+(?=\/)/)[0];
            // Push the images to the array
            images = [];
            images.push(`./public/portfolio/${projName}/${imgName}-1-600.webp`);
            images.push(`./public/portfolio/${projName}/${imgName}-2-600.webp`);
            images.push(`./public/portfolio/${projName}/${imgName}-3-600.webp`);

            currentIndex = 0;
            carouselImage.src = images[currentIndex];

            carouselImage.srcset = `${images[currentIndex]} 600w,
            ${images[currentIndex].replace('600', '1200')} 1200w, ${images[
                currentIndex
            ].replace('600', '1920')} 1920w`;

            carouselImage.sizes =
                '(max-width: 600px) 600w, (max-width: 1200px) 1200w, 1920w';

            carousel.classList.remove('hidden');
            document.body.style.overflow = 'hidden'; // Prevent background scrolling
            pageContent.classList.add('blurred');
        });
    });

    closeBtn.addEventListener('click', () => {
        carousel.classList.add('hidden');
        document.body.style.overflow = ''; // Restore background scrolling
        pageContent.classList.remove('blurred');
    });

    prevBtn.addEventListener('click', () => {
        currentIndex =
            currentIndex === 0 ? images.length - 1 : currentIndex - 1;
        carouselImage.src = images[currentIndex];

        carouselImage.srcset = `${images[currentIndex]} 600w,
        ${images[currentIndex].replace('600', '1200')} 1200w, ${images[
            currentIndex
        ].replace('600', '1920')} 1920w`;

        carouselImage.sizes =
            '(max-width: 600px) 600w, (max-width: 1200px) 1200w, 1920w';
    });

    nextBtn.addEventListener('click', () => {
        currentIndex =
            currentIndex === images.length - 1 ? 0 : currentIndex + 1;
        carouselImage.src = images[currentIndex];

        carouselImage.srcset = `${images[currentIndex]} 600w,
        ${images[currentIndex].replace('600', '1200')} 1200w, ${images[
            currentIndex
        ].replace('600', '1920')} 1920w`;

        carouselImage.sizes =
            '(max-width: 600px) 600w, (max-width: 1200px) 1200w, 1920w';
    });

    document.addEventListener('keydown', (e) => {
        if (!carousel.classList.contains('hidden')) {
            if (e.key === 'ArrowLeft') {
                prevBtn.click();
            } else if (e.key === 'ArrowRight') {
                nextBtn.click();
            } else if (e.key === 'Escape') {
                closeBtn.click();
            }
        }
    });
});

console.log('Hello, there! 👋');
