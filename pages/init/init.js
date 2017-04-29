'use strict';

var init = (function (log, config, browser, sound, ad) {
	log.init(config.debug);

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

		browser.onDeviceReady();
		sound.onDeviceReady();
		ad.onDeviceReady();
    }

	log.write(['typeof device', typeof device]);
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
})(logService, configService, browserService, soundService, adService);
