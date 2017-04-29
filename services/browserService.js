'use strict';

var browserService = (function () {
	var target = '_blank';

	function open(url) {
		window.open(url, target);
	}

	function onDeviceReady() {
		target = '_system';
	}

	return {
		open: open,
		onDeviceReady: onDeviceReady
	};
})();