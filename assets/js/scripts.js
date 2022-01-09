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
// $('body').on('click', '.main-menu-trigger', function(e) {
// 	if(!$(this).hasClass('.main-menu-visible')) {
// 		mainMenuOpenClose(true);
// 	} else {
// 		mainMenuOpenClose(false);
// 	}
// 	e.stopPropagation();
// })
	// .on('click', function(e) {
	// 	if($('.main-menu-trigger').hasClass('main-menu-visible')) mainMenuOpenClose(false);
	// });
// $('body').on('click', function(e) {
// 	mainMenuOpenClose(false);
// });

// function mainMenuOpenClose(open) {
// 	open = (typeof open !== 'undefined') ? open : true;

// 	if(open) {
// 		$('.main-menu').show('slow').removeClass('hidden').addClass('visible');
// 		$('.main-menu-trigger').removeClass('main-menu-hidden').addClass('main-menu-visible');

// 	} else {
// 		$('.main-menu').removeClass('visible').addClass('hidden');
// 		$('.main-menu-trigger').removeClass('main-menu-visible').addClass('main-menu-hidden');
// 	}
// }

$(window).on('load scroll', function(e) {
    // Handle scroll
    if($(document).scrollTop() > scrollThreshold) {
        $('body').addClass('scrolled');
    } else {
        $('body').removeClass('scrolled');
    }
});

/*Start ------------ Title animation --------------*/
var sectionAnimations = document.querySelectorAll('section');

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

// main-menu-trigger