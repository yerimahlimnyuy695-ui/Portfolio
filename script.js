"use strict";


const navToggle = document.getElementById("navToggle");
const siteNav = document.getElementById("siteNav");

navToggle.addEventListener("click", () => {
  const isOpen = siteNav.classList.toggle("open");
  navToggle.setAttribute("aria-expanded", String(isOpen));
});

siteNav.addEventListener("click", (event) => {
  if (event.target.tagName === "A") {
    siteNav.classList.remove("open");
    navToggle.setAttribute("aria-expanded", "false");
  }
});


const swatches = document.querySelectorAll(".swatch");
const STORAGE_KEY = "portfolio-accent";

function setAccent(color) {
  document.documentElement.style.setProperty("--accent", color);
  swatches.forEach((swatch) => {
    swatch.setAttribute("aria-pressed", String(swatch.dataset.color === color));
  });
}

swatches.forEach((swatch) => {
  swatch.addEventListener("click", () => {
    setAccent(swatch.dataset.color);
    try {
      localStorage.setItem(STORAGE_KEY, swatch.dataset.color);
    } catch (error) {
  
    }
  });
});

try {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved) setAccent(saved);
} catch (error) {
  
}


const navLinks = document.querySelectorAll(".site-nav a");
const sections = document.querySelectorAll("main section[id]");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      navLinks.forEach((link) => {
        link.classList.toggle("active", link.getAttribute("href") === "#" + entry.target.id);
      });
    });
  },
  { rootMargin: "-40% 0px -55% 0px" }
);
sections.forEach((section) => observer.observe(section));


const form = document.getElementById("contactForm");
const status = document.getElementById("formStatus");


const RECIPIENT = "yerimahlimnyuy695@gmail.com";

const rules = {
  name: (value) => (value.trim() ? "" : "Enter your name."),
  email: (value) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim()) ? "" : "Enter a valid email address, like name@example.com.",
  message: (value) => (value.trim().length >= 10 ? "" : "Write a message of at least 10 characters."),
};

function validateField(field) {
  const message = rules[field.name](field.value);
  document.getElementById(field.name + "Error").textContent = message;
  field.setAttribute("aria-invalid", String(Boolean(message)));
  return !message;
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  status.textContent = "";

  const fields = Array.from(form.elements).filter((el) => el.name in rules);
  const results = fields.map(validateField);
  if (results.includes(false)) {
    fields[results.indexOf(false)].focus();
    return;
  }

  const subject = encodeURIComponent("Portfolio message from " + form.name.value.trim());
  const body = encodeURIComponent(form.message.value.trim() + "\n\nReply to: " + form.email.value.trim());
  window.location.href = "mailto:" + RECIPIENT + "?subject=" + subject + "&body=" + body;

  status.textContent = "Opening your email app with the message ready to send.";
  form.reset();
});


document.getElementById("year").textContent = new Date().getFullYear();
