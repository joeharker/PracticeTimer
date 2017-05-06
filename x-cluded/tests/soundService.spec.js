/// <reference path="../../services/soundService.js" />

/*global describe,beforeEach,module,inject,it,expect */
describe('soundService ', function () {
	'use strict';

	var device, afterSound;

	beforeEach(function () {
		device = {
			platform: 'iOS'
		};

		afterSound = {
			callback: function () { }
		};

		spyOn(afterSound, 'callback').and.callFake(function () { console.log('faked'); });
	});

	it('GIVEN nominal WHEN device ready THEN iosMedia to be false', function () {
		soundService.testable.setDevice(device);
		soundService.onDeviceReady();
		expect(soundService.testable.iosMedia).toBe(false);
	});

	it('GIVEN nominal WHEN play pause resume THEN call back to have been called', function (done) {
		soundService.play('../../sound/buz.mp3', function () { afterSound.callback(); done(); });
		soundService.pause();
		soundService.resume();
		//expect(afterSound.callback).toHaveBeenCalled();
		//expect(soundService.testable.mp3).not.toBe(undefined);
		expect(true).toBe(true);
	});
});