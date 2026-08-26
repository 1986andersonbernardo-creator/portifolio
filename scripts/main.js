const backToTop = document.getElementById("backToTop");
const navbar = document.getElementById("navbar");
const navToggle = document.getElementById("navToggle");
const navMenu = document.getElementById("navMenu");
const progressBar = document.getElementById("progressBar");

const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".nav-link");

if (navToggle && navMenu) {
  navToggle.addEventListener("click", () => {
    navToggle.classList.toggle("active");
    navMenu.classList.toggle("active");
  });

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      navToggle.classList.remove("active");
      navMenu.classList.remove("active");
    });
  });
}

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    const target = document.querySelector(this.getAttribute("href"));
    if (!target) return;
    e.preventDefault();
    const offset = 80;
    const targetPosition =
      target.getBoundingClientRect().top + window.pageYOffset - offset;
    window.scrollTo({ top: targetPosition, behavior: "smooth" });
  });
});

const revealElements = document.querySelectorAll(
  ".about-text, .stat-card, .project-card, .contact-link, .differential-card, .tech-card",
);
const revealOnScroll = () => {
  revealElements.forEach((el) => {
    const elementTop = el.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;
    if (elementTop < windowHeight - 100) el.classList.add("active");
  });
};

const highlightNavLink = () => {
  let current = "";
  sections.forEach((section) => {
    if (pageYOffset >= section.offsetTop - 150)
      current = section.getAttribute("id");
  });
  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href") === `#${current}`)
      link.classList.add("active");
  });
};

function debounce(func, wait = 10) {
  let timeout;
  return function executedFunction(...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

const handleScroll = debounce(() => {
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  const scrollHeight =
    document.documentElement.scrollHeight -
    document.documentElement.clientHeight;
  if (progressBar)
    progressBar.style.width = `${(scrollTop / scrollHeight) * 100}%`;

  if (backToTop) {
    if (window.pageYOffset > 500) backToTop.classList.add("visible");
    else backToTop.classList.remove("visible");
  }

  if (navbar) {
    if (window.pageYOffset > 50) navbar.classList.add("scrolled");
    else navbar.classList.remove("scrolled");
  }

  revealOnScroll();
  highlightNavLink();
});

window.addEventListener("scroll", handleScroll);
window.addEventListener("load", () => {
  revealOnScroll();
  highlightNavLink();
  handleScroll();
});

if (backToTop) {
  backToTop.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

const githubLink = document.querySelector(
  'a[href="https://github.com/1986andersonbernardo-creator"]',
);
if (githubLink)
  githubLink.setAttribute(
    "aria-label",
    "Abrir perfil do GitHub de Anderson Bernardo",
  );

console.log("Anderson Bernardo — portfólio carregado");
