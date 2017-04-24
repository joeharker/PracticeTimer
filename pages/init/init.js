var init = (function (log, config) {
	log.init(config.debug);
	log.write(location);

	function onDeviceReady() {
        if (device.platform === 'iOS') {
            var link = document.createElement('link');
            link.rel = 'stylesheet';
            link.href = 'pages/init/ios.css';
            document.getElementsByTagName('head')[0].appendChild(link);
        }

        if (window.plugins && window.plugins.insomnia) {
            window.plugins.insomnia.keepAwake();
        }
    }

    if (typeof device !== 'undefined') {
        onDeviceReady();
    } else {
        document.addEventListener("deviceready", onDeviceReady, false);
	}

	return {
		testable: {
			onDeviceReady: onDeviceReady,
			setDevice: function (ref) { device = ref; }
		}
	}
})(logService, configService);
