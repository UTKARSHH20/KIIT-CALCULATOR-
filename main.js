// Main JavaScript file for KIIT Student Support Website

document.addEventListener('DOMContentLoaded', () => {
    console.log('KIIT Student Support Website Loaded');

    // Mobile Menu Toggle
    const menuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');

    if (menuButton && mobileMenu) {
        menuButton.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });
    }
});
