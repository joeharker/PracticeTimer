/// <reference path="../../services/adService.js" />

/*global describe,beforeEach,module,inject,it,expect */
describe('adService ', function () {
	'use strict';

	var AdMob, device;

	beforeEach(function () {
		device = {
			platform: 'iOS'
		};

		AdMob = {
			createBanner: function (a) { },
			AD_POSITION: { BOTTOM_CENTER: '' }
		};

		spyOn(AdMob, 'createBanner').and.callFake(function (a) { });

		adService.testable.setAdMob(AdMob);
	});

	it('GIVEN nominal WHEN deviceready THEN createBanner will be called', function () {
		device.platform = '';
		adService.testable.setDevice(device);
		adService.onDeviceReady();
		expect(AdMob.createBanner).toHaveBeenCalled();
	});

	it('GIVEN iOS WHEN deviceready THEN createBanner will be called', function () {
		adService.testable.setDevice(device);
		adService.onDeviceReady();
		expect(AdMob.createBanner).toHaveBeenCalled();
	});
});