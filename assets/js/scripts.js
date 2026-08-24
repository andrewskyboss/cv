/*----------- Mobile menu Open Close ----------*/
var scrollThreshold = 50;

const mainMenuTrigger = document.querySelector(".main-menu-trigger");
const mainMenu = document.querySelector(".main-menu");

if (mainMenuTrigger && mainMenu) {
  mainMenuTrigger.addEventListener("click", () => {
    mainMenuTrigger.classList.toggle("main-menu-visible");
    mainMenu.classList.toggle("visible");
  });

  document.querySelectorAll(".menu-link").forEach((n) =>
    n.addEventListener("click", () => {
      mainMenuTrigger.classList.remove("main-menu-visible");
      mainMenu.classList.remove("visible");
    })
  );
}

/*----------- Page adding scrolled class (Vanilla JS Fix) ----------*/
function handleScrollClass() {
  if (window.scrollY > scrollThreshold) {
    document.body.classList.add("scrolled");
  } else {
    document.body.classList.remove("scrolled");
  }
}

window.addEventListener("scroll", handleScrollClass, { passive: true });
window.addEventListener("DOMContentLoaded", handleScrollClass);

/*----------- Title animation --------------*/
var sectionAnimations = document.querySelectorAll(".section-module");
var accordionAllTriggers = document.querySelectorAll(".work-history-item--trigger");
var skillsItems = document.querySelectorAll(".skills-item");

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.intersectionRatio > 0) {
        entry.target.classList.add("add-animation");
      } else {
        entry.target.classList.remove("add-animation");
      }
    });
  });

  sectionAnimations.forEach((el) => observer.observe(el));
  accordionAllTriggers.forEach((el) => observer.observe(el));
  skillsItems.forEach((el) => observer.observe(el));
}

/*----------- Accordion Open Close ----------*/
const accordionTriggers = document.querySelectorAll(".work-history-item--trigger");

accordionTriggers.forEach((trigger) => {
  trigger.addEventListener("click", expandAccordion);
});

function expandAccordion(event) {
  const { currentTarget: targetElement } = event;
  const isPanelExpanded = targetElement.getAttribute("aria-expanded");

  collapseAllAccordions();

  if (isPanelExpanded === "false" || !isPanelExpanded) {
    targetElement.setAttribute("aria-expanded", "true");
  } else {
    targetElement.setAttribute("aria-expanded", "false");
  }
}

function collapseAllAccordions() {
  accordionTriggers.forEach((trigger) => {
    trigger.setAttribute("aria-expanded", "false");
  });
}

/*----------- Scroll to top (Vanilla JS Fix) ----------*/
const btn = document.querySelector(".btt-link");

if (btn) {
  window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
      btn.classList.add("show");
    } else {
      btn.classList.remove("show");
    }
  });

  btn.addEventListener("click", (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  });
}

/*----------- Hero Image Slider ----------*/
var index = 0;

const show_slide = (i) => {
  var images = document.getElementsByClassName("hero-image-slider-image");
  var dots = document.getElementsByClassName("dot");

  if (!images.length) return;

  index += i;

  if (index > images.length - 1) index = 0;
  if (index < 0) index = images.length - 1;

  for (let j = 0; j < images.length; j++) {
    images[j].style.display = "none";
  }

  for (let j = 0; j < dots.length; j++) {
    dots[j].className = dots[j].className.replace(" active", "");
  }

  images[index].style.display = "block";
  if (dots[index]) {
    dots[index].className += " active";
  }
};

window.addEventListener("DOMContentLoaded", () => {
  show_slide(0);
});
