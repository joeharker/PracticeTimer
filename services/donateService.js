'use strict';

var donateService = (function () {
	function setDonation(id, val) {
		val = parseFloat(val);

		if (!isNaN(val)) {
			val = parseInt(val * 100);

			var script = document.createElement('script');
			script.async = false;
			script.src = 'https://checkout.stripe.com/checkout.js';
			script.className = 'stripe-button';
			script.setAttribute('data-key', 'pk_test_ieWVvtwMZ6fzqAOFolvkG2os');
			script.setAttribute('data-amount', val);
			script.setAttribute('data-name', 'Joe Harker');
			script.setAttribute('data-description', 'Dry Practice App');
			script.setAttribute('data-image', 'https://s3.amazonaws.com/stripe-uploads/acct_1A7FYZJc5kpU4H77merchant-icon-1491881283747-icon.128.png');
			script.setAttribute('data-zip-code', 'true');
			script.setAttribute('data-label', 'Donate');
			script.setAttribute('data-bitcoin', 'true');
			script.setAttribute('data-locale', 'auto');

			document.getElementById(id).innerHTML = '';
			document.getElementById(id).appendChild(script);
		}
	}

	return {
		setDonation: setDonation
	}
})();