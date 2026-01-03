let config = {};

const languageColors = {
    'Java': 'language-java',
    'Shell': 'language-shell',
    'Python': 'language-python',
    'JavaScript': 'language-javascript',
};

async function initializePage() {
    try {
        const response = await fetch('resources/repositories.json');
        if (!response.ok) throw new Error('Failed to load configuration');

        config = await response.json();

        updateHeader();
        renderServices();
        renderProducts();
        initializeAnimations();

        const loading = document.getElementById('loading');
        const container = document.getElementById('products-container');

        if (loading) loading.classList.add('d-none');
        if (container) container.classList.remove('d-none');

    } catch (error) {
        console.error('Error:', error);
    }
}

// REPLACE your existing updateHeader function with this:

function updateHeader() {
    const s = config.settings;
    
    // 1. Update Site Name & Link it to Email
    const siteNameEl = document.getElementById('site-name');
    if (siteNameEl) {
        siteNameEl.innerHTML = `<i class="fas fa-code me-2"></i>${s.siteName}`;
        
        // Set the href to mailto
        if (s.email) {
            siteNameEl.href = `mailto:${s.email}`;
        }
    }

    // 2. Update Hero Section Text
    document.getElementById('hero-title').textContent = s.heroTitle;
    document.getElementById('hero-subtitle').textContent = s.heroSubtitle;
    document.getElementById('hero-description').textContent = s.heroDescription;
    
    // 3. Update Contact Button in Hero
    const emailBtn = document.getElementById('contact-email-btn');
    if(emailBtn && s.email) emailBtn.href = `mailto:${s.email}`;

    // 4. Update Social Links
    const linkedIn = document.getElementById('footer-linkedin-link');
    const github = document.getElementById('footer-github-link');
    if(linkedIn) linkedIn.href = s.linkedinProfile;
    if(github) github.href = s.githubProfile;
}

// 1. Render Services (Now handles TOPICS)
function renderServices() {
    const container = document.getElementById('services-container');
    if (!container) return;

    container.innerHTML = '';

    config.services.forEach((service, index) => {
        const div = document.createElement('div');
        div.className = 'col-lg-4 fade-in';

        // Handle topics for Services
        const topicsHtml = (service.topics || []).map(topic =>
            `<span class="topic-tag">${topic}</span>`
        ).join('');

        div.innerHTML = `
            <div class="service-card h-100">
                <div class="d-flex align-items-center mb-3">
                    <div class="icon-box me-3">
                        <i class="fas ${service.icon} fa-lg"></i>
                    </div>
                    <h4 class="fw-bold mb-0">${service.title}</h4>
                </div>
                
                <p class="text-muted mb-4 flex-grow-1">${service.description}</p>
                
                <div class="repo-topics mt-auto">
                    ${topicsHtml}
                </div>
            </div>
        `;
        container.appendChild(div);
    });
}

// 2. Render Products (Restored the Buttons)
// REPLACE your existing renderProducts function with this:

function renderProducts() {
    const container = document.getElementById('products-container');
    if (!container) return;

    // Clear container
    container.innerHTML = '';

    config.products.forEach((prod, index) => {
        const div = document.createElement('div');
        div.className = 'col-lg-4 col-md-6 fade-in';

        div.innerHTML = `
            <div class="service-card h-100 ${!prod.isActive ? 'inactive' : ''}">
                <div class="d-flex justify-content-between align-items-start mb-3">
                    <h5 class="fw-bold mb-0">${prod.title}</h5>
                    ${prod.isActive ?
                '<span class="badge bg-success-subtle text-success rounded-pill">Ready</span>' :
                '<span class="badge bg-secondary-subtle text-secondary rounded-pill">In Dev</span>'
            }
                </div>
                
                <p class="text-muted small mb-3 flex-grow-1">${prod.description}</p>
                
                <div class="repo-topics mt-auto">
                    ${prod.topics.map(t => `<span class="topic-tag">${t}</span>`).join('')}
                </div>
            </div>
        `;
        container.appendChild(div);
    });
}

// Animations and Smooth Scroll
function initializeAnimations() {
    window.addEventListener('scroll', () => {
        const nav = document.getElementById('mainNav');
        if (nav) {
            if (window.scrollY > 50) nav.classList.add('scrolled');
            else nav.classList.remove('scrolled');
        }
    });

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) entry.target.classList.add('visible');
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));
}

document.addEventListener('DOMContentLoaded', initializePage);

