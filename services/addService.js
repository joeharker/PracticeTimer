'use strict';

var addService = (function () {
	var adid = '';

	function onDeviceReady() {
		if (device.platform === 'iOS') {
			adid = 'ca-app-pub-1438477418297657/9881492520';
		} else {
			adid = 'ca-app-pub-1438477418297657/3974559721';
		}
		if (typeof AdMob !== 'undefined') {
			if (AdMob) {
				AdMob.createBanner({
					adId: adid,
					position: AdMob.AD_POSITION.BOTTOM_CENTER,
					autoShow: true,
					bgColor: 'brown'
				});
			}
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
			setDevice: function (r) { device = r; }
		}
	};
})();