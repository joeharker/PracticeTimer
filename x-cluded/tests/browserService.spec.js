/// <reference path="../../services/browserService.js" />

/*global describe,beforeEach,module,inject,it,expect */
describe('browserService', function () {
	'use strict';

	var device, insomnia;

	beforeEach(function () {
		spyOn(window, 'open').and.callFake(function (v) { });
	});

	it('GIVEN nominal WHEN deviceready THEN keepAwake will be called', function () {
		browserService.testable.onDeviceReady();
		browserService.open('www.test.com');
		expect(window.open).toHaveBeenCalled();
	});
});