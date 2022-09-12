/*jshint esversion: 6 */
/*----------- Contact Form ----------*/

window.onload = function() {

	document.getElementById('confirmation-title').textContent = '';

	document.getElementById('contact-us-form').addEventListener('submit', function(event) {
	event.preventDefault();

		emailjs.sendForm('service_u9b5bpg', 'template_4bc1e0j', this)
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