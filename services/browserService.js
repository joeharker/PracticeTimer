'use strict';

var browserService = (function () {
	var target = '_blank';

	function open(url) {
		window.open(url, target);
	}

	function onDeviceReady() {
		target = '_system';
	}

	if (typeof device !== 'undefined') {
		onDeviceReady();
	} else {
		document.addEventListener("deviceready", onDeviceReady, false);
	}

	return {
		open: open
	};
})();