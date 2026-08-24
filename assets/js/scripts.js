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
// var index = 0;

// const show_slide = (i) => {
//   var images = document.getElementsByClassName("hero-image-slider-image");
//   var dots = document.getElementsByClassName("dot");

//   if (!images.length) return;

//   index += i;

//   if (index > images.length - 1) index = 0;
//   if (index < 0) index = images.length - 1;

//   for (let j = 0; j < images.length; j++) {
//     images[j].style.display = "none";
//   }

//   for (let j = 0; j < dots.length; j++) {
//     dots[j].className = dots[j].className.replace(" active", "");
//   }

//   images[index].style.display = "block";
//   if (dots[index]) {
//     dots[index].className += " active";
//   }
// };

// window.addEventListener("DOMContentLoaded", () => {
//   show_slide(0);
// });



/*----------- Hero Image Slider (Auto + Manual) ----------*/
let slideIndex = 0;
let slideInterval = null;
const AUTO_PLAY_DELAY = 4500; // 6 seconds auto-switch

// Core function to update visible image and dot state
function show_slide(n) {
  const images = document.getElementsByClassName("hero-image-slider-image");
  const dots = document.getElementsByClassName("dot");

  if (!images.length) return;

  // Calculate slide index boundary
  if (n >= images.length) {
    slideIndex = 0;
  } else if (n < 0) {
    slideIndex = images.length - 1;
  } else {
    slideIndex = n;
  }

  // Hide all images
  for (let i = 0; i < images.length; i++) {
    images[i].style.display = "none";
  }

  // Remove active state from all dots
  for (let i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }

  // Activate target slide and dot
  images[slideIndex].style.display = "block";
  if (dots[slideIndex]) {
    dots[slideIndex].className += " active";
  }
}

// Timer controls for automatic play
function startAutoSlide() {
  stopAutoSlide();
  slideInterval = setInterval(() => {
    show_slide(slideIndex + 1);
  }, AUTO_PLAY_DELAY);
}

function stopAutoSlide() {
  if (slideInterval) clearInterval(slideInterval);
}

// Manual trigger handler (resets the auto-play timer)
function handleManualSlide(targetIndex) {
  show_slide(targetIndex);
  startAutoSlide();
}

// Initialize listeners and slider behavior
window.addEventListener("DOMContentLoaded", () => {
  const images = document.getElementsByClassName("hero-image-slider-image");
  if (!images.length) return;

  // Initial load
  show_slide(0);
  startAutoSlide();

  // Attach listener to existing #prev button
  const prevBtn = document.getElementById("prev");
  if (prevBtn) {
    prevBtn.removeAttribute("onclick"); // Clear inline attribute override
    prevBtn.addEventListener("click", (e) => {
      e.preventDefault();
      handleManualSlide(slideIndex - 1);
    });
  }

  // Attach listener to existing #next button
  const nextBtn = document.getElementById("next");
  if (nextBtn) {
    nextBtn.removeAttribute("onclick"); // Clear inline attribute override
    nextBtn.addEventListener("click", (e) => {
      e.preventDefault();
      handleManualSlide(slideIndex + 1);
    });
  }

  // Attach listeners to each .dot based on its index position
  const dots = document.querySelectorAll(".dots .dot");
  dots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
      handleManualSlide(index);
    });
  });

  // Pause timer when mouse hovers over slider container
  const sliderContainer = document.querySelector(".hero-image-slider") || document.querySelector(".hero");
  if (sliderContainer) {
    sliderContainer.addEventListener("mouseenter", stopAutoSlide);
    sliderContainer.addEventListener("mouseleave", startAutoSlide);
  }
});

/*----------- Card Background Image Slideshow ----------*/
function initCardSlideshows() {
  const slideshows = document.querySelectorAll('.card-slideshow');
  const SLIDE_INTERVAL = 3500; // 3.5 seconds per slide transition

  slideshows.forEach((slideshow, cardIndex) => {
    const slides = slideshow.querySelectorAll('.slide-img');
    if (slides.length <= 1) return;

    let currentIndex = 0;

    // Stagger start times slightly for adjacent cards so they don't cycle in exact unison
    setTimeout(() => {
      setInterval(() => {
        slides[currentIndex].classList.remove('active');
        currentIndex = (currentIndex + 1) % slides.length;
        slides[currentIndex].classList.add('active');
      }, SLIDE_INTERVAL);
    }, cardIndex * 400);
  });
}

window.addEventListener('DOMContentLoaded', initCardSlideshows);

