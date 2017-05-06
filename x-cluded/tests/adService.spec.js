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
		adService.testable.setDevice(device);
	});

	it('GIVEN nominal WHEN deviceready THEN createBanner will be called', function () {
		adService.onDeviceReady();
		expect(AdMob.createBanner).toHaveBeenCalled();
	});
});