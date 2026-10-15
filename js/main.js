// Vector Portfolio 2.0 interactions
const menuToggle = document.querySelector(".menu-toggle");
const nav = document.querySelector(".nav");
const navLinks = document.querySelectorAll(".nav-link");

if (menuToggle && nav) {
  menuToggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.setAttribute("aria-label", isOpen ? "Close navigation menu" : "Open navigation menu");
  });

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      nav.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.setAttribute("aria-label", "Open navigation menu");
    });
  });

  document.addEventListener("click", (event) => {
    if (!nav.contains(event.target) && !menuToggle.contains(event.target)) {
      nav.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.setAttribute("aria-label", "Open navigation menu");
    }
  });
}

const revealItems = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealItems.forEach((item) => revealObserver.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("is-visible"));
}

const backTop = document.querySelector(".back-top");
function updateBackTop() {
  if (backTop) backTop.classList.toggle("visible", window.scrollY > 500);
}
window.addEventListener("scroll", updateBackTop, { passive: true });
updateBackTop();
if (backTop) backTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));

const year = document.querySelector("#year");
if (year) year.textContent = new Date().getFullYear();

// Highlight the navigation link for the section currently in view.
const sections = document.querySelectorAll("main section[id], main section:not([id])");
if ("IntersectionObserver" in window) {
  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const id = entry.target.id;
      if (!id) return;
      navLinks.forEach((link) => {
        const active = link.getAttribute("href") === `#${id}`;
        link.classList.toggle("active", active);
      });
    });
  }, { rootMargin: "-35% 0px -55% 0px" });
  sections.forEach((section) => { if (section.id) sectionObserver.observe(section); });
}

// Email-app fallback for visitors who prefer to send their message through email.
const emailFallbackButton = document.getElementById('send-by-email');
if (emailFallbackButton) {
  emailFallbackButton.addEventListener('click', () => {
    const name = document.getElementById('visitor-name').value.trim();
    const email = document.getElementById('visitor-email').value.trim();
    const message = document.getElementById('visitor-message').value.trim();
    if (!name || !email || !message) {
      document.getElementById('form-note').textContent = 'Please fill in your name, email, and message first.';
      return;
    }
    const subject = encodeURIComponent('Portfolio enquiry from ' + name);
    const body = encodeURIComponent('Name: ' + name + '\\nReply email: ' + email + '\\n\\nMessage:\\n' + message);
    window.location.href = 'mailto:vectorempire.tech@gmail.com?subject=' + subject + '&body=' + body;
  });
}
const portfolioContactForm = document.getElementById('contact-form');
if (portfolioContactForm) {
  portfolioContactForm.addEventListener('submit', (event) => {
    if (portfolioContactForm.action.includes('YOUR_FORM_ID')) {
      event.preventDefault();
      document.getElementById('form-note').textContent = 'Online delivery is not connected yet. Create a Formspree form, replace YOUR_FORM_ID in index.html with your form ID, or use the email-app button.';
    }
  });
}
