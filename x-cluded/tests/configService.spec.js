/// <reference path="../../services/configService.js" />

/*global describe,beforeEach,module,inject,it,expect */
describe('configService', function () {
	'use strict';

	it('GIVEN any, WHEN configService THEN there is a value for debug', function () {
		expect(configService.debug).not.toBe(undefined);
	});

	it('GIVEN any, WHEN configService THEN there is a value for root', function () {
		expect(configService.root).not.toBe(undefined);
	});
});