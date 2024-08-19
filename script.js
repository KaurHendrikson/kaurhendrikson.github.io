// Hidden by default if JS is disabled
scrollCue = document.getElementById('scroll-cue');
scrollCue.style.display = 'block';
scrollCue.addEventListener('click', () => {
    // Scroll to the first section (reel)
    document.querySelector('#reel').scrollIntoView({
        behavior: 'smooth',
    });
});

window.addEventListener(
    'scroll',
    () => {
        const scroll = Math.min(
            (window.scrollY || window.pageYOffset) / 100,
            0.999
        );
        document.body.style.setProperty('--scroll', scroll);
    },
    false
);

// Update the URL when a section is in view
document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('div[id]');
    const options = {
        root: null, // Use the viewport as the root
        threshold: 0.75, // Trigger when 75% of the section is visible
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                history.replaceState(null, null, `#${id}`);
            }
        });
    }, options);

    sections.forEach((section) => {
        observer.observe(section);
    });
});
