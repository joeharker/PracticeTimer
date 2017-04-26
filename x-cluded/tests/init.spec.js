/// <reference path="../../pages/init/init.js" />

/*global describe,beforeEach,module,inject,it,expect */
describe('init', function () {
	'use strict';

	var device, insomnia;

	beforeEach(function () {
		device = {
			platform: 'iOS'
		};

		insomnia = {
			keepAwake: function () { }
		};

		window.plugins = {
			insomnia: insomnia
		};

		spyOn(insomnia, 'keepAwake').and.callFake(function () { });

		init.testable.setDevice(device);
	});

	it('GIVEN nominal WHEN deviceready THEN keepAwake will be called', function () {
		init.testable.onDeviceReady();
		expect(insomnia.keepAwake).toHaveBeenCalled();
	});
});