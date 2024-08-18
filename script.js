// Hidden by default if JS is disabled
document.getElementById('scroll-cue').style.display = 'block';

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
