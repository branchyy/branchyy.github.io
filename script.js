/**
 * Logic for Page Switching and Sidebar Toggle
 */
document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('.nav-link');
    const pages = document.querySelectorAll('.doc-page');
    const sidebar = document.getElementById('sidebar');
    const sidebarToggle = document.getElementById('sidebar-toggle');

    // Function to switch pages
    const switchPage = (pageId) => {
        // Remove active class from all links and pages
        navLinks.forEach(link => link.classList.remove('active'));
        pages.forEach(page => page.classList.remove('active'));

        // Add active class to target link and page
        const activeLink = document.querySelector(`.nav-link[data-page="${pageId}"]`);
        const activePage = document.getElementById(pageId);

        if (activeLink) activeLink.classList.add('active');
        if (activePage) activePage.classList.add('active');

        // Scroll to top of content
        window.scrollTo({ top: 0, behavior: 'smooth' });

        // Close sidebar on mobile after selection
        if (window.innerWidth <= 768) {
            sidebar.classList.remove('open');
        }
    };

    // Add click listeners to nav links
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const pageId = link.getAttribute('data-page');
            switchPage(pageId);
            
            // Update URL hash without jumping
            history.pushState(null, null, `#${pageId}`);
        });
    });

    // Handle logo clicks to go home (Introdução)
    const logos = document.querySelectorAll('.logo');
    logos.forEach(logo => {
        logo.addEventListener('click', (e) => {
            e.preventDefault();
            switchPage('introducao');
            history.pushState(null, null, ' ');
            
            // On mobile, ensure sidebar closes when logo is clicked
            if (window.innerWidth <= 768) {
                sidebar.classList.remove('open');
            }
        });
    });

    // Mobile Sidebar Toggle
    if (sidebarToggle) {
        sidebarToggle.addEventListener('click', () => {
            sidebar.classList.toggle('open');
        });
    }

    // Handle hash on initial load
    const hash = window.location.hash.replace('#', '');
    if (hash && document.getElementById(hash)) {
        switchPage(hash);
    }
});
