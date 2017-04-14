(function (donate) {
	donate.setDonation('stripe', 1.00);

	if (device && device.platform === 'iOS') {
		var link = document.createElement('link');
		link.rel = 'stylesheet';
		link.href = 'pages/init/ios.css';
		document.getElementsByTagName('head')[0].appendChild(link);
	}

	if (window.plugins && window.plugins.insomnia){
		window.plugins.insomnia.keepAwake();
	}
})(donateService);