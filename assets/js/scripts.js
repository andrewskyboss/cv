var scrollThreshold = 50;

const mainMenuTrigger = document.querySelector(".main-menu-trigger");
const mainMenu = document.querySelector(".main-menu");

mainMenuTrigger.addEventListener("click", () => {
	mainMenuTrigger.classList.toggle("main-menu-visible");
	mainMenu.classList.toggle("visible");
})

document.querySelectorAll(".menu-link").forEach(n => n.addEventListener("click", ()=> {
	mainMenuTrigger.classList.remove("main-menu-visible");
	mainMenu.classList.remove("visible");
}))

/*----------- Mobile menu Open Close ----------*/

$(window).on('load scroll', function(e) {
    // Handle scroll
    if($(document).scrollTop() > scrollThreshold) {
        $('body').addClass('scrolled');
    } else {
        $('body').removeClass('scrolled');
    }
});

/*Start ------------ Title animation --------------*/
var sectionAnimations = document.querySelectorAll('.section-module');
const accordionAllTriggers = document.querySelectorAll('.work-history-item--trigger');

observer = new IntersectionObserver((entries) => {
	entries.forEach(entry => {
		if (entry.intersectionRatio > 0) {
			entry.target.classList.add('add-animation');
		} else {
			entry.target.classList.remove('add-animation');
		}
	});
});

sectionAnimations.forEach(sectionAnimation => {
	observer.observe(sectionAnimation);
});
accordionAllTriggers.forEach(accordionAllTrigger => {
    observer.observe(accordionAllTrigger);
});

/*----------- Accordion Open Close ----------*/


const accordionTriggers = document.querySelectorAll('.work-history-item--trigger');

accordionTriggers.forEach((trigger) => {
  trigger.addEventListener('click', expandAccordion);
});

function expandAccordion(event) {
    const { target: targetElement } = event;
    const isPanelExpanded = targetElement.getAttribute('aria-expanded');
    
    collapseAllAccordions();
    
    if (isPanelExpanded === "false") {
        targetElement.setAttribute('aria-expanded', true);
    } else {
        targetElement.setAttribute('aria-expanded', false);
    }
}

function collapseAllAccordions() {
    accordionTriggers.forEach((trigger) => {
        trigger.setAttribute('aria-expanded', false);
    });
}
