(function (donate) {
	donate.setDonation('stripe', 1.00);
	if (window.plugins && window.plugins.insomnia){
		window.plugins.insomnia.keepAwake();
	}
})(donateService);