
/*----------- Mobile menu Open Close ----------*/
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

/*----------- Page adding scrolled class ----------*/

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
var accordionAllTriggers = document.querySelectorAll('.work-history-item--trigger');
var skillsItems = document.querySelectorAll('.skills-item');

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
skillsItems.forEach(skillsItem => {
    observer.observe(skillsItem);
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

/*----------- Scroll to top ----------*/
var btn = $('.btt-link');

$(window).scroll(function() {
  if ($(window).scrollTop() > 300) {
    btn.addClass('show');
  } else {
    btn.removeClass('show');
  }
});

btn.on('click', function(e) {
  e.preventDefault();
  $('html, body').animate({scrollTop:0}, '800');
});

/*----------- Accordion Open Close ----------*/
var index = 0;

show_slide = (i) => {
  //increment/decrement slide index
  index += i;

  //grab all the images
  var images = document.getElementsByClassName("hero-image-slider-image");
  //grab all the dots
  var dots = document.getElementsByClassName("dot");

  // hide all the images
  for (i = 0; i < images.length; i++) 
    images[i].style.display = "none";
  
  // remove the active class from the dot
  for (i = 0; i < dots.length; i++) 
    dots[i].className = dots[i].className.replace(" active", "");
  
  // if index is greater than the amount of images (set it to zero)
  if (index > images.length - 1) 
    index = 0 ;
  
  // if index is less than zero (set it to the length of images)
  if (index < 0)
    index = images.length - 1;

  // only display the image that's next or previous
  images[index].style.display = "block";
  // only make the current dot active
  dots[index].className += " active";

}

window.addEventListener("onload", show_slide(index));

window.onload = function() {

	document.getElementById('confirmation-title').textContent = '';

	document.getElementById('contact-us-form').addEventListener('submit', function(event) {
	event.preventDefault();

		emailjs.sendForm('service_u9b5bpg', 'template_a26hqai', this)
		.then(function() {
			console.log('SUCCESS!');
			$('.form-input').val('');
			document.getElementById('confirmation-title').textContent = 'Thank You. I will be in touch with you';

		}, function(error) {
			console.log('FAILED...', error);
			document.getElementById('confirmation-title').textContent = 'Sorry, something went wrong. Try Later.';
		});
	});
};
