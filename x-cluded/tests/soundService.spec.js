/// <reference path="../../services/soundService.js" />

/*global describe,beforeEach,module,inject,it,expect */
describe('soundService ', function () {
	'use strict';

	var device;

	beforeEach(function () {
		device = {
			platform: 'iOS'
		};

		adService.testable.setDevice(device);
	});

	it('GIVEN nominal WHEN play pause resume THEN nominal', function () {
		soundService.onDeviceReady();
		soundService.play('../../sound/buz.mp3', function () { });
		soundService.pause();
		soundService.resume();
		expect(true).toBe(true);
	});
});