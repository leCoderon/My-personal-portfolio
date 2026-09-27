/*==============================================================================
  Portfolio — Ismael Camara
  Interactions : navigation, accordéon, onglets, modales, thème, formulaire
==============================================================================*/

/*==================== MENU MOBILE ====================*/
const navMenu = document.getElementById("nav-menu");
const navToggle = document.getElementById("nav-toggle");
const navClose = document.getElementById("nav-close");

if (navToggle && navMenu) {
  navToggle.addEventListener("click", () => {
    navMenu.classList.add("show-menu");
  });
}

if (navClose && navMenu) {
  navClose.addEventListener("click", () => {
    navMenu.classList.remove("show-menu");
  });
}

const navLinks = document.querySelectorAll(".nav__link");
navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    if (navMenu) navMenu.classList.remove("show-menu");
  });
});

/*==================== ACCORDÉON COMPÉTENCES ====================*/
const skillsContent = document.querySelectorAll(".skills__content");
const skillsHeader = document.querySelectorAll(".skills__header");

function toggleSkills() {
  const parent = this.parentNode;
  const isClosed = parent.classList.contains("skills__close");

  skillsContent.forEach((content) => {
    content.classList.remove("skills__open");
    content.classList.add("skills__close");
    const header = content.querySelector(".skills__header");
    if (header) header.setAttribute("aria-expanded", "false");
  });

  if (isClosed) {
    parent.classList.remove("skills__close");
    parent.classList.add("skills__open");
    this.setAttribute("aria-expanded", "true");
  }
}

skillsHeader.forEach((header) => {
  header.addEventListener("click", toggleSkills);
});

/*==================== ONGLETS PARCOURS ====================*/
const tabs = document.querySelectorAll("[data-target]");
const tabContents = document.querySelectorAll("[data-content]");

tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    const target = document.querySelector(tab.dataset.target);
    if (!target) return;

    tabs.forEach((item) => {
      item.classList.remove("qualification__active");
      item.setAttribute("aria-selected", "false");
    });

    tabContents.forEach((content) => {
      content.classList.remove("qualification__active");
      content.hidden = true;
    });

    tab.classList.add("qualification__active");
    tab.setAttribute("aria-selected", "true");
    target.classList.add("qualification__active");
    target.hidden = false;
  });
});

/*==================== MODALES PARCOURS ====================*/
const modalButtons = document.querySelectorAll(".services__button");
const modalCloses = document.querySelectorAll(".services__modal-close");
let lastFocusedElement = null;

function closeAllModals() {
  document.querySelectorAll(".services__modal.active-modal").forEach((modal) => {
    modal.classList.remove("active-modal");
  });
  if (lastFocusedElement) {
    lastFocusedElement.focus();
    lastFocusedElement = null;
  }
}

modalButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const card = button.closest(".qualification__card");
    const modal = card ? card.querySelector(".services__modal") : null;
    if (!modal) return;

    lastFocusedElement = button;
    modal.classList.add("active-modal");

    const closeButton = modal.querySelector(".services__modal-close");
    if (closeButton) closeButton.focus();
  });
});

modalCloses.forEach((closeButton) => {
  closeButton.addEventListener("click", closeAllModals);
});

document.querySelectorAll(".services__modal").forEach((modal) => {
  modal.addEventListener("click", (event) => {
    if (event.target === modal) closeAllModals();
  });
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeAllModals();
});

/*======================= Portfolio Swiper ===================*/
var swiper = new Swiper(".portfolio__container", {
  cssMode: true,
  loop: true,

  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
});

/*==================== LIEN ACTIF AU DÉFILEMENT ====================*/
const sections = document.querySelectorAll("section[id]");
const navMenuLinks = document.querySelectorAll(".nav__menu a[href^='#']");
const linkBySectionId = {};

navMenuLinks.forEach((link) => {
  const id = link.getAttribute("href").slice(1);
  if (id) linkBySectionId[id] = link;
});

if ("IntersectionObserver" in window && sections.length) {
  const activeLinkObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const link = linkBySectionId[entry.target.id];
        if (!link) return;

        navMenuLinks.forEach((item) => item.classList.remove("active-link"));
        link.classList.add("active-link");
      });
    },
    { rootMargin: "-45% 0px -50% 0px" },
  );

  sections.forEach((section) => activeLinkObserver.observe(section));
}

/*==================== EN-TÊTE ET BOUTON RETOUR EN HAUT ====================*/
const header = document.getElementById("header");
const scrollUpButton = document.getElementById("scroll-up");

function onScroll() {
  const scrollY = window.scrollY;

  if (header) header.classList.toggle("scroll-header", scrollY >= 80);
  if (scrollUpButton) scrollUpButton.classList.toggle("show-scroll", scrollY >= 560);
}

if (scrollUpButton) {
  scrollUpButton.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

window.addEventListener("scroll", onScroll, { passive: true });
onScroll();

/*==================== APPARITION AU DÉFILEMENT ====================*/
const revealTargets = document.querySelectorAll(
  ".section__kicker, .section__title, .section__subtitle, .home__content, .about__container, .skills__column, .qualification__container, .portfolio__container, .contact__info, .contact__form",
);

if ("IntersectionObserver" in window && revealTargets.length) {
  revealTargets.forEach((element) => element.classList.add("reveal"));

  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -40px 0px" },
  );

  revealTargets.forEach((element) => revealObserver.observe(element));
}

/*==================== THÈME CLAIR / SOMBRE ====================*/
const themeButton = document.getElementById("theme-button");
const darkTheme = "dark-theme";
const iconTheme = "uil-sun";

const selectedTheme = localStorage.getItem("selected-theme");
const selectedIcon = localStorage.getItem("selected-icon");

const getCurrentTheme = () => (document.body.classList.contains(darkTheme) ? "dark" : "light");
const getCurrentIcon = () => (themeButton.classList.contains(iconTheme) ? "uil-moon" : "uil-sun");

if (themeButton) {
  if (selectedTheme) {
    document.body.classList[selectedTheme === "dark" ? "add" : "remove"](darkTheme);
    themeButton.classList[selectedIcon === "uil-moon" ? "add" : "remove"](iconTheme);
  }

  themeButton.addEventListener("click", () => {
    document.body.classList.toggle(darkTheme);
    themeButton.classList.toggle(iconTheme);
    localStorage.setItem("selected-theme", getCurrentTheme());
    localStorage.setItem("selected-icon", getCurrentIcon());
  });
}

/*==================== FORMULAIRE DE CONTACT (FORMSPREE) ====================*/
const contactForm = document.getElementById("contact-form");
const contactStatus = document.getElementById("contact-status");
const contactSubmit = document.getElementById("contact-submit");

if (contactForm && contactStatus && contactSubmit) {
  contactForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    if (!contactForm.checkValidity()) {
      contactForm.reportValidity();
      return;
    }

    const action = contactForm.getAttribute("action") || "";

    /* Repli WhatsApp tant qu'aucun identifiant Formspree n'est configuré. */
    if (action.includes("VOTRE_ID")) {
      const data = new FormData(contactForm);
      const whatsappButton = document.querySelector(".button--whatsapp");
      const whatsappBase = whatsappButton
        ? whatsappButton.href.split("?")[0]
        : "https://wa.me/2250584784581";

      const text = [
        "Bonjour Ismael, je vous contacte depuis votre portfolio.",
        "",
        "Nom : " + data.get("name"),
        "Email : " + data.get("email"),
        "",
        "Message :",
        data.get("message"),
      ].join("\r\n");

      const whatsappUrl = whatsappBase + "?text=" + encodeURIComponent(text);
      const opened = window.open(whatsappUrl, "_blank", "noopener");

      if (!opened) window.location.href = whatsappUrl;

      contactStatus.textContent =
        "WhatsApp s'ouvre avec votre message pré-rempli. Vous pouvez aussi écrire à camara9ismael@gmail.com.";
      contactStatus.className = "contact__status is-success";
      return;
    }

    const originalContent = contactSubmit.innerHTML;
    contactSubmit.disabled = true;
    contactSubmit.textContent = "Envoi en cours…";
    contactStatus.textContent = "";
    contactStatus.className = "contact__status";

    try {
      const response = await fetch(action, {
        method: "POST",
        body: new FormData(contactForm),
        headers: { Accept: "application/json" },
      });

      if (!response.ok) throw new Error("Requête refusée");

      contactForm.reset();
      contactStatus.textContent = "Merci ! Votre message a bien été envoyé.";
      contactStatus.className = "contact__status is-success";
    } catch (error) {
      contactStatus.textContent =
        "Oups, l'envoi a échoué. Écrivez-moi directement à camara9ismael@gmail.com.";
      contactStatus.className = "contact__status is-error";
    } finally {
      contactSubmit.disabled = false;
      contactSubmit.innerHTML = originalContent;
    }
  });
}

/*==================== ANNÉE DU PIED DE PAGE ====================*/
const yearElement = document.getElementById("year");
if (yearElement) yearElement.textContent = new Date().getFullYear();
