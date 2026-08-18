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

// Exposed directly to window so inline onclick="show_slide(...)" attributes continue working
window.show_slide = function(n) {
  const slides = document.querySelectorAll(".hero-image-slider-image");
  const dots = document.querySelectorAll(".dot");

  if (!slides.length || isAnimating) return;

  // Calculate next slide index with wrap-around logic
  let nextSlideIndex = currentSlideIndex + n;
  if (nextSlideIndex >= slides.length) nextSlideIndex = 0;
  if (nextSlideIndex < 0) nextSlideIndex = slides.length - 1;

  // Initial page load setup or static switch
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

  // Layer next slide on top and trigger keyframe animation over the previous image
  slides.forEach((slide) => slide.classList.remove("slideFromRight"));
  nextSlide.classList.add("slideFromRight");

  // Update navigation dots
  dots.forEach((dot, idx) => dot.classList.toggle("active", idx === nextSlideIndex));

  // Finalize active class when animation completes (0.5s matching CSS duration)
  setTimeout(() => {
    slides.forEach((slide) => slide.classList.remove("active", "slideFromRight"));
    nextSlide.classList.add("active");
    currentSlideIndex = nextSlideIndex;
    isAnimating = false;
  }, 500);
};

// Bind listeners once DOM content is ready
document.addEventListener("DOMContentLoaded", () => {
  const prevBtn = document.getElementById("prev");
  const nextBtn = document.getElementById("next");

  if (prevBtn) {
    prevBtn.addEventListener("click", (e) => {
      e.preventDefault();
      window.show_slide(-1);
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener("click", (e) => {
      e.preventDefault();
      window.show_slide(1);
    });
  }

  // Initialize first slide display
  window.show_slide(0);
});
