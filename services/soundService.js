'use strict';

var soundService = (function () {
	var mp3;
	var iosMedia = false;

	function play(src, onended) {
		if (iosMedia) {
			mp3 = new Media(
				src,
				function () { onended(); },
				function (e) { error.write(['Media error', src, e]); }
			);
			mp3.play();
		} else {
			mp3 = new Audio();
			mp3.onerror = function (e) { error.write(['mp3.onerror', src, e]); };
			mp3.onended = function () { onended(); };
			mp3.src = src;
			mp3.play();
		}
	}

	function pause() {
		mp3.pause();
	}

	function resume() {
		mp3.play();
	}

	function onDeviceReady() {
		if (typeof Media !== 'undefined' && device.platform === 'iOS') {
			iosMedia = true;
		}
	}

	if (typeof device !== 'undefined') {
		onDeviceReady();
	} else {
		document.addEventListener("deviceready", onDeviceReady, false);
	}

	return {
		play: play,
		pause: pause,
		resume: resume,
		testable: {
			onDeviceReady: onDeviceReady
		}
	};
})();