/*----------- Mobile menu Open Close ----------*/
const scrollThreshold = 50;

const mainMenuTrigger = document.querySelector(".main-menu-trigger");
const mainMenu = document.querySelector(".main-menu");

if (mainMenuTrigger && mainMenu) {
  mainMenuTrigger.addEventListener("click", () => {
    mainMenuTrigger.classList.toggle("main-menu-visible");
    mainMenu.classList.toggle("visible");
  });

  document.querySelectorAll(".menu-link").forEach((link) => {
    link.addEventListener("click", () => {
      mainMenuTrigger.classList.remove("main-menu-visible");
      mainMenu.classList.remove("visible");
    });
  });
}

/*----------- Page adding scrolled class ----------*/
const handleScroll = () => {
  if (window.scrollY > scrollThreshold) {
    document.body.classList.add("scrolled");
  } else {
    document.body.classList.remove("scrolled");
  }
};

window.addEventListener("scroll", handleScroll);
window.addEventListener("load", handleScroll);

/*Start ------------ Title animation --------------*/
const sectionAnimations = document.querySelectorAll(".section-module");
const accordionAllTriggers = document.querySelectorAll(".work-history-item--trigger");
const skillsItems = document.querySelectorAll(".skills-item");

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.intersectionRatio > 0) {
      entry.target.classList.add("add-animation");
    } else {
      entry.target.classList.remove("add-animation");
    }
  });
});

sectionAnimations.forEach((item) => observer.observe(item));
accordionAllTriggers.forEach((item) => observer.observe(item));
skillsItems.forEach((item) => observer.observe(item));

/*----------- Accordion Open Close ----------*/
const accordionTriggers = document.querySelectorAll(".work-history-item--trigger");

function collapseAllAccordions() {
  accordionTriggers.forEach((trigger) => {
    trigger.setAttribute("aria-expanded", "false");
  });
}

function expandAccordion(event) {
  const targetElement = event.currentTarget;
  const isPanelExpanded = targetElement.getAttribute("aria-expanded");

  collapseAllAccordions();

  if (isPanelExpanded === "false") {
    targetElement.setAttribute("aria-expanded", "true");
  } else {
    targetElement.setAttribute("aria-expanded", "false");
  }
}

accordionTriggers.forEach((trigger) => {
  trigger.addEventListener("click", expandAccordion);
});

/*----------- Scroll to top ----------*/
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
let currentSlideIndex = 0;
let isAnimating = false;

const show_slide = (n) => {
  const slides = document.querySelectorAll(".hero-image-slider-image");
  const dots = document.querySelectorAll(".dot");

  if (!slides.length || isAnimating) return;

  const currentSlide = slides[currentSlideIndex];

  // Calculate new target index with wrap-around logic
  let nextSlideIndex = currentSlideIndex + n;
  if (nextSlideIndex >= slides.length) nextSlideIndex = 0;
  if (nextSlideIndex < 0) nextSlideIndex = slides.length - 1;

  // Handle initial display setup or static transition
  if (n === 0 || currentSlideIndex === nextSlideIndex) {
    slides.forEach((slide, idx) => {
      slide.classList.toggle("active", idx === nextSlideIndex);
      slide.classList.remove("slideFromRight");
    });
    dots.forEach((dot, idx) => dot.classList.toggle("active", idx === nextSlideIndex));
    currentSlideIndex = nextSlideIndex;
    return;
  }

  isAnimating = true;
  const nextSlide = slides[nextSlideIndex];

  // Animate next slide on top of current slide
  slides.forEach((slide) => slide.classList.remove("slideFromRight"));
  nextSlide.classList.add("slideFromRight");

  // Update dots
  dots.forEach((dot, idx) => dot.classList.toggle("active", idx === nextSlideIndex));

  // Sync state after CSS animation finishes (0.5s)
  setTimeout(() => {
    slides.forEach((slide) => slide.classList.remove("active", "slideFromRight"));
    nextSlide.classList.add("active");
    currentSlideIndex = nextSlideIndex;
    isAnimating = false;
  }, 500);
};

// Initialize initial slide on load
window.addEventListener("DOMContentLoaded", () => {
  show_slide(0);
});
