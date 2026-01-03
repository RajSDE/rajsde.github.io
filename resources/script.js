let config = {};

// Language colors mapping
const languageColors = {
    'Python': 'language-python',
    'Java': 'language-java',
    'JavaScript': 'language-javascript',
    'Shell': 'language-shell',
    'Markdown': 'language-markdown'
};

async function initializePage() {
    try {
        const response = await fetch('resources/repositories.json');
        if (!response.ok) throw new Error('Failed to load configuration');

        config = await response.json();
        updatePageContent();
        renderRepositories();
        initializeAnimations();

        document.getElementById('loading').classList.add('d-none');
        document.getElementById('repositories-container').classList.remove('d-none');

    } catch (error) {
        console.error('Error loading configuration:', error);
        showError();
    }
}

function updatePageContent() {
    const settings = config.settings;

    // Debug: Check if settings are loaded
    console.log('Settings loaded:', settings);

    document.getElementById('site-name').innerHTML = `<i class="fas fa-code me-2"></i>${settings.siteName}`;
    document.getElementById('hero-title').textContent = settings.heroTitle;
    document.getElementById('hero-subtitle').textContent = settings.heroSubtitle;
    document.getElementById('hero-description').textContent = settings.heroDescription;

    // Update all links - ADD ERROR CHECKING
    const githubProfile = settings.githubProfile;
    const linkedinProfile = settings.linkedinProfile;

    // Update all GitHub and LinkedIn links
    const githubLink = document.getElementById('github-link');
    const linkedinLink = document.getElementById('linkedin-link');
    const heroGithubLink = document.getElementById('hero-github-link');
    const footerGithubLink = document.getElementById('footer-github-link');
    const footerLinkedinLink = document.getElementById('footer-linkedin-link');

    if (githubLink) githubLink.href = githubProfile;
    if (linkedinLink) linkedinLink.href = linkedinProfile;
    if (heroGithubLink) heroGithubLink.href = githubProfile;
    if (footerGithubLink) footerGithubLink.href = githubProfile;
    if (footerLinkedinLink) footerLinkedinLink.href = linkedinProfile;

    // Debug: Check if links were updated
    console.log('GitHub link updated:', footerGithubLink?.href);
    console.log('LinkedIn link updated:', footerLinkedinLink?.href);
}


function renderRepositories() {
    const container = document.getElementById('repositories-container');
    container.innerHTML = '';

    config.repositories.forEach((repo, index) => {
        const repoCard = createRepositoryCard(repo);
        repoCard.style.animationDelay = `${index * 0.1}s`;
        container.appendChild(repoCard);
    });
}

function createRepositoryCard(repo) {
    const colDiv = document.createElement('div');
    colDiv.className = 'col-lg-4 col-md-6 fade-in';

    const cardClass = repo.isActive ? 'card repo-card' : 'card repo-card inactive';
    const languageColorClass = languageColors[repo.language] || 'language-python';

    colDiv.innerHTML = `
                <div class="${cardClass}">
                    ${repo.isActive ?
            '<span class="status-badge badge-active">Active</span>' :
            '<span class="status-badge badge-coming-soon">Coming Soon</span>'
        }
                    
                    <div class="card-header-modern">
                        <h5 class="repo-title">
                            <i class="fab fa-github"></i>
                            ${repo.title}
                        </h5>
                        <div class="repo-language">
                            <span class="language-dot ${languageColorClass}"></span>
                            ${repo.language}
                        </div>
                    </div>
                    
                    <div class="card-body-modern">
                        <p class="repo-description">${repo.description}</p>
                        
                        <div class="repo-topics">
                            ${repo.topics.map(topic =>
            `<span class="topic-tag">${topic}</span>`
        ).join('')}
                        </div>
                    </div>
                    
                    <div class="card-footer-modern">
                        ${repo.isActive ?
            `<a href="${repo.url}"  class="repo-btn repo-btn-primary">
                                <i class="fas fa-external-link-alt me-2"></i>View Repository
                            </a>` :
            `<button class="repo-btn repo-btn-disabled" disabled>
                                <i class="fas fa-clock me-2"></i>Coming Soon
                            </button>`
        }
                    </div>
                </div>
            `;

    return colDiv;
}

function showError() {
    document.getElementById('loading').classList.add('d-none');
    document.getElementById('error').classList.remove('d-none');
}

function initializeAnimations() {
    // Navbar scroll effect
    window.addEventListener('scroll', () => {
        const navbar = document.getElementById('mainNav');
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Fade in animation on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.fade-in').forEach(el => {
        observer.observe(el);
    });
}

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', () => {
    // 1. Initialize Page Data
    initializePage();

    // 2. Setup Smooth Scrolling (Moved inside here for safety)
    document.querySelectorAll('a[href^="#"]:not([href="#"])').forEach(anchor => {
        const href = anchor.getAttribute('href');
        if (href.startsWith('#') && href.length > 1) {
            anchor.addEventListener('click', function (e) {
                const target = document.querySelector(href);
                if (target) {
                    e.preventDefault();
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            });
        }
    });
});
