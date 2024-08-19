// Hidden by default if JS is disabled
scrollCue = document.getElementById('scroll-cue');
scrollCue.style.display = 'block';
scrollCue.addEventListener('click', () => {
    // Scroll to the first section (dctls)
    document.querySelector('#dctls').scrollIntoView({
        behavior: 'smooth',
    });
});

window.addEventListener(
    'scroll',
    () => {
        // Update the scroll variable in the CSS
        const scroll = Math.min(
            (window.scrollY || window.pageYOffset) / 100,
            0.999
        );
        document.body.style.setProperty('--scroll', scroll);

        // Update the active link in the navbar
        const sections = document.querySelectorAll('.section');
        const links = document.querySelectorAll('#top-bar a.m05.f1');

        let currentSection = '';

        sections.forEach((section) => {
            const sectionTop = section.offsetTop;
            if (scrollY >= sectionTop - window.innerHeight * 0.4) {
                // Adjust this value as needed
                currentSection = section.getAttribute('id');
            }
        });

        console.log(currentSection);

        links.forEach((link) => {
            link.classList.remove('active');
            if (link.getAttribute('href').substring(1) === currentSection) {
                link.classList.add('active');
            }
        });
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
