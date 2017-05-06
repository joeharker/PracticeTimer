'use strict';

var soundService = (function (error) {
	var iosMedia = false;
	var mp3;

	function play(src, onended) {
		if (iosMedia) {
			mp3 = new Media(
				src,
				function () { onended(); },
				function (e) { error.write(['Media error', src, e]); }
			);
			mp3.play();
		} else {
			mp3 = new Audio(src);
			mp3.onended = function () { onended(); };
			mp3.onerror = function (e) { error.write(['mp3.onerror', src, e]); };
			mp3.oncanplaythrough = function () { mp3.play(); };
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

	return {
		play: play,
		pause: pause,
		resume: resume,
		onDeviceReady: onDeviceReady,
		testable: {
			iosMedia: iosMedia,
			mp3: mp3,
			setDevice: function (r) { device = r; }
		}
	};
})(logService);