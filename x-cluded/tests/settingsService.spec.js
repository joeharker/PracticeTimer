/// <reference path="../../services/settingsService.js" />

/*global describe,beforeEach,module,inject,it,expect */
describe('settingsService', function () {
	'use strict';

	beforeEach(function () {
		memoryService.reset();
	});

	it('Given init, When settingsService.practice Then settingsService.practice.magRounds defaults to 10', function () {
		expect(settingsService.practice.magRounds).toEqual(10);
		memoryService.reset();
	});
});
