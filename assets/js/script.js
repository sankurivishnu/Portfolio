'use strict';

// element toggle function
const elementToggleFunc = function (elem) {
  if (elem) elem.classList.toggle("active");
}

// sidebar variables & toggle functionality
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

if (sidebarBtn && sidebar) {
  sidebarBtn.addEventListener("click", function () { elementToggleFunc(sidebar); });
}

// testimonials variables
const testimonialsItem = document.querySelectorAll("[data-testimonials-item]");
const modalContainer = document.querySelector("[data-modal-container]");
const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
const overlay = document.querySelector("[data-overlay]");

// modal variables
const modalImg = document.querySelector("[data-modal-img]");
const modalTitle = document.querySelector("[data-modal-title]");
const modalText = document.querySelector("[data-modal-text]");

// modal toggle function
const testimonialsModalFunc = function () {
  if (modalContainer && overlay) {
    modalContainer.classList.toggle("active");
    overlay.classList.toggle("active");
  }
}

// add click event to all modal items
for (let i = 0; i < testimonialsItem.length; i++) {
  testimonialsItem[i].addEventListener("click", function () {
    if (modalImg && modalTitle && modalText) {
      modalImg.src = this.querySelector("[data-testimonials-avatar]").src;
      modalImg.alt = this.querySelector("[data-testimonials-avatar]").alt;
      modalTitle.innerHTML = this.querySelector("[data-testimonials-title]").innerHTML;
      modalText.innerHTML = this.querySelector("[data-testimonials-text]").innerHTML;
      testimonialsModalFunc();
    }
  });
}

// add click event to modal close button & overlay if present
if (modalCloseBtn) modalCloseBtn.addEventListener("click", testimonialsModalFunc);
if (overlay) overlay.addEventListener("click", testimonialsModalFunc);

// custom select variables
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-selecct-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");

if (select) {
  select.addEventListener("click", function () { elementToggleFunc(this); });
}

// add event in all select items
for (let i = 0; i < selectItems.length; i++) {
  selectItems[i].addEventListener("click", function () {
    let selectedValue = this.innerText.toLowerCase();
    if (selectValue) selectValue.innerText = this.innerText;
    if (select) elementToggleFunc(select);
    filterFunc(selectedValue);
  });
}

// filter variables
const filterItems = document.querySelectorAll("[data-filter-item]");

const filterFunc = function (selectedValue) {
  for (let i = 0; i < filterItems.length; i++) {
    if (selectedValue === "all") {
      filterItems[i].classList.add("active");
    } else if (selectedValue === filterItems[i].dataset.category) {
      filterItems[i].classList.add("active");
    } else {
      filterItems[i].classList.remove("active");
    }
  }
}

// add event in all filter button items
let lastClickedBtn = filterBtn[0];

for (let i = 0; i < filterBtn.length; i++) {
  filterBtn[i].addEventListener("click", function () {
    let selectedValue = this.innerText.toLowerCase();
    if (selectValue) selectValue.innerText = this.innerText;
    filterFunc(selectedValue);

    if (lastClickedBtn) lastClickedBtn.classList.remove("active");
    this.classList.add("active");
    lastClickedBtn = this;
  });
}

// contact form variables
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

// add event to all form input fields
for (let i = 0; i < formInputs.length; i++) {
  formInputs[i].addEventListener("input", function () {
    if (form && formBtn) {
      if (form.checkValidity()) {
        formBtn.removeAttribute("disabled");
      } else {
        formBtn.setAttribute("disabled", "");
      }
    }
  });
}

// contact form submission handler
if (form) {
  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const fullNameInput = form.querySelector('[name="fullname"]');
    const emailInput = form.querySelector('[name="email"]');
    const messageInput = form.querySelector('[name="message"]');

    const name = fullNameInput ? fullNameInput.value.trim() : "";
    const email = emailInput ? emailInput.value.trim() : "";
    const message = messageInput ? messageInput.value.trim() : "";

    const mailtoUrl = `mailto:sankurivishnu@gmail.com?subject=Portfolio Contact from ${encodeURIComponent(name)}&body=Name: ${encodeURIComponent(name)}%0AEmail: ${encodeURIComponent(email)}%0AMessage:%0A${encodeURIComponent(message)}`;

    window.location.href = mailtoUrl;

    const responseMsg = form.querySelector(".form-response-msg");
    if (responseMsg) {
      responseMsg.style.display = "block";
      responseMsg.innerText = `Thank you, ${name}! Opening your email client to send message to sankurivishnu@gmail.com.`;
    }

    form.reset();
    if (formBtn) formBtn.setAttribute("disabled", "");
  });
}

// Global Event Delegation for Page Navigation
document.addEventListener("click", function (e) {
  const navBtn = e.target.closest("[data-nav-link]");
  if (!navBtn) return;

  e.preventDefault();
  const targetPage = (navBtn.getAttribute("data-nav-link") || navBtn.innerText).trim().toLowerCase();

  const pages = document.querySelectorAll("[data-page]");
  const navLinks = document.querySelectorAll("[data-nav-link]");

  pages.forEach(function (page) {
    if (page.dataset.page === targetPage) {
      page.classList.add("active");
    } else {
      page.classList.remove("active");
    }
  });

  navLinks.forEach(function (link) {
    const linkTarget = (link.getAttribute("data-nav-link") || link.innerText).trim().toLowerCase();
    if (linkTarget === targetPage) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });

  window.scrollTo(0, 0);
});