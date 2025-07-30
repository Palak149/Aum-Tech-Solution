
// Smooth scrolling for navigation links
document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Intersection Observer for fade-in animations (Vanilla JS)
const sections = document.querySelectorAll('.fade-in-section');

const observerOptions = {
    root: null, // relative to the viewport
    rootMargin: '0px',
    threshold: 0.1 // trigger when 10% of the section is visible
};

const sectionObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target); // Stop observing once visible
        }
    });
}, observerOptions);

sections.forEach(section => {
    sectionObserver.observe(section);
});

// Simple background movement (optional, for the animated-background)
document.addEventListener('mousemove', function(e) {
    const wrapper = document.querySelector('.content-wrapper');
    const x = (e.clientX / window.innerWidth - 0.5) * 2; // -1 to 1
    const y = (e.clientY / window.innerHeight - 0.5) * 2; // -1 to 1
    wrapper.style.transform = `translate(${x * 5}px, ${y * 5}px)`; // Subtle movement
    wrapper.style.transition = 'none'; // Prevent transition during movement
});

document.addEventListener('mouseleave', function() {
    const wrapper = document.querySelector('.content-wrapper');
    wrapper.style.transform = `translate(0, 0)`;
    wrapper.style.transition = 'transform 0.5s ease-out'; // Smooth return
});

// --- Theme Toggle Logic ---
const themeToggleBtn = document.getElementById('theme-toggle');
const body = document.body;
const themeIcon = themeToggleBtn.querySelector('svg');
const themeText = themeToggleBtn.querySelector('span');

// Function to set the theme
function setTheme(theme) {
    if (theme === 'dark') {
        body.classList.add('dark-theme');
        body.classList.remove('light-theme');
        themeIcon.innerHTML = `<path stroke-linecap="round" stroke-linejoin="round" d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-6.364-.386 1.591-1.591M3 12H5.25m-.386-6.364 1.591 1.591M12 12.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5ZM12 7.5a4.5 4.5 0 1 1 0 9 4.5 4.5 0 0 1 0-9Z" />`; // Sun icon
        themeText.textContent = 'Light Theme';
        localStorage.setItem('theme', 'dark');
    } else {
        body.classList.add('light-theme');
        body.classList.remove('dark-theme');
        themeIcon.innerHTML = `<path stroke-linecap="round" stroke-linejoin="round" d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25c0 5.385 4.365 9.75 9.75 9.75 2.071 0 4.04-.645 5.687-1.752Z" />`; // Moon icon
        themeText.textContent = 'Dark Theme';
        localStorage.setItem('theme', 'light');
    }
}

// Check for saved theme preference on load
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
    setTheme(savedTheme);
} else {
    // Default to dark theme if no preference is saved
    setTheme('dark');
}

// Event listener for theme toggle button
themeToggleBtn.addEventListener('click', () => {
    if (body.classList.contains('dark-theme')) {
        setTheme('light');
    } else {
        setTheme('dark');
    }
});
