// ============================
// Custom Cursor
// ============================
const cursorDot = document.querySelector('.cursor-dot');
const cursorOutline = document.querySelector('.cursor-outline');

if (cursorDot && cursorOutline && window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
    let mouseX = 0, mouseY = 0;
    let outlineX = 0, outlineY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        cursorDot.style.left = mouseX + 'px';
        cursorDot.style.top = mouseY + 'px';
    });

    function animateCursor() {
        outlineX += (mouseX - outlineX) * 0.15;
        outlineY += (mouseY - outlineY) * 0.15;
        cursorOutline.style.left = outlineX + 'px';
        cursorOutline.style.top = outlineY + 'px';
        requestAnimationFrame(animateCursor);
    }
    animateCursor();

    document.querySelectorAll('a, button, .project-card, .service-card, .experience-card').forEach(el => {
        el.addEventListener('mouseenter', () => cursorOutline.classList.add('hover'));
        el.addEventListener('mouseleave', () => cursorOutline.classList.remove('hover'));
    });
}

// ============================
// Progress Bar
// ============================
const progressBar = document.getElementById('progressBar');

window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrollPercent = (scrollTop / scrollHeight) * 100;
    progressBar.style.width = scrollPercent + '%';
});

// ============================
// Back to Top Button
// ============================
const backToTop = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 500) {
        backToTop.classList.add('visible');
    } else {
        backToTop.classList.remove('visible');
    }
});

backToTop.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ============================
// Navbar Scroll Effect
// ============================
const navbar = document.getElementById('navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    if (currentScroll > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    lastScroll = currentScroll;
});

// ============================
// Mobile Menu Toggle
// ============================
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');

if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
}

// ============================
// Smooth Scroll
// ============================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offset = 80;
            const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset;
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ============================
// Scroll Reveal Animation
// ============================
const revealElements = document.querySelectorAll('.about-text, .stat-card, .project-card, .contact-link');

const revealOnScroll = () => {
    revealElements.forEach(el => {
        const elementTop = el.getBoundingClientRect().top;
        const elementVisible = 100;
        if (elementTop < window.innerHeight - elementVisible) {
            el.classList.add('reveal', 'active');
        }
    });
};

window.addEventListener('scroll', revealOnScroll);
window.addEventListener('load', revealOnScroll);

// ============================
// Animated Counter
// ============================
const animateCounter = (el) => {
    const target = parseInt(el.getAttribute('data-count'));
    if (!target) return;
    const duration = 2000;
    const step = target / (duration / 16);
    let current = 0;

    const updateCount = () => {
        current += step;
        if (current < target) {
            el.textContent = Math.floor(current) + '+';
            requestAnimationFrame(updateCount);
        } else {
            el.textContent = target + '+';
        }
    };
    updateCount();
};

const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounter(entry.target);
            counterObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.stat-number').forEach(stat => counterObserver.observe(stat));

// ============================
// GitHub API Integration
// ============================
const GITHUB_USERNAME = '1986andersonbernardo-creator';

const fetchGitHubData = async () => {
    try {
        const [userRes, reposRes] = await Promise.all([
            fetch(`https://api.github.com/users/${GITHUB_USERNAME}`),
            fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=6`)
        ]);

        if (!userRes.ok || !reposRes.ok) throw new Error('Erro na API do GitHub');

        const userData = await userRes.json();
        const reposData = await reposRes.json();

        // Update stats
        const repoCount = document.getElementById('repoCount');
        const followersCount = document.getElementById('followersCount');
        const followingCount = document.getElementById('followingCount');

        if (repoCount) repoCount.textContent = userData.public_repos;
        if (followersCount) followersCount.textContent = userData.followers;
        if (followingCount) followingCount.textContent = userData.following;

        // Process languages
        const languages = {};
        reposData.forEach(repo => {
            if (repo.language) {
                languages[repo.language] = (languages[repo.language] || 0) + 1;
            }
        });

        const total = Object.values(languages).reduce((a, b) => a + b, 0);
        const languageColors = {
            JavaScript: '#f7df1e',
            HTML: '#e34c26',
            CSS: '#264de4',
            Python: '#3776ab',
            TypeScript: '#3178c6',
            Java: '#b07219',
            'C++': '#f34b7d',
            PHP: '#4f5d95',
            default: '#8b5cf6'
        };

        const languagesList = document.getElementById('languagesList');
        if (languagesList) {
            const sortedLanguages = Object.entries(languages)
                .sort((a, b) => b[1] - a[1])
                .slice(0, 5);

            languagesList.innerHTML = sortedLanguages.map(([lang, count]) => {
                const percent = Math.round((count / total) * 100);
                const color = languageColors[lang] || languageColors.default;
                return `
                    <div class="language-item">
                        <div class="language-name">
                            <span class="language-color" style="background-color: ${color}"></span>
                            ${lang}
                        </div>
                        <span class="language-percent">${percent}%</span>
                    </div>
                `;
            }).join('');
        }

        // Update repos list
        const reposList = document.getElementById('reposList');
        if (reposList) {
            reposList.innerHTML = reposData.map(repo => `
                <div class="repo-item">
                    <a href="${repo.html_url}" target="_blank" rel="noopener" class="repo-name">
                        ${repo.name}
                    </a>
                    <p class="repo-description">${repo.description || 'Sem descrição'}</p>
                    <div class="repo-meta">
                        <span>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <circle cx="12" cy="12" r="4"/>
                                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                            </svg>
                            ${repo.stargazers_count}
                        </span>
                        <span>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"/>
                            </svg>
                            ${repo.forks_count}
                        </span>
                    </div>
                </div>
            `).join('');
        }

    } catch (error) {
        console.error('Erro ao buscar dados do GitHub:', error);
        const repoCount = document.getElementById('repoCount');
        if (repoCount) repoCount.textContent = '--';
    }
};

fetchGitHubData();

// ============================
// Active Navigation Link
// ============================
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

const highlightNavLink = () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 150) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
};

window.addEventListener('scroll', highlightNavLink);

// ============================
// Performance: Debounce Scroll
// ============================
function debounce(func, wait = 10) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

const debouncedScroll = debounce(() => {
    revealOnScroll();
    highlightNavLink();
});

window.addEventListener('scroll', debouncedScroll);

// ============================
// Easter Egg: Console
// ============================
console.log('%c👋 Olá, recrutador! ', 'font-size: 20px; color: #6366f1; font-weight: bold;');
console.log('%cGostou do portfólio? Vamos conversar! ', 'font-size: 14px; color: #a0a0b0;');
console.log('%c📧 1986.andersonbernardo@gmail.com', 'font-size: 12px; color: #8b5cf6;');