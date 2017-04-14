/// <reference path="../../services/configService.js" />

/*global describe,beforeEach,module,inject,it,expect */
describe('configService', function () {
	'use strict';

	it('Given any, When configService Then there is a value for stripekey', function () {
		expect(configService.stripekey).not.toBe(undefined);
	});

	it('Given any, When configService Then there is a value for debug', function () {
		expect(configService.debug).not.toBe(undefined);
	});

	it('Given DEV environment, When config Then there are values', function () {
		configService = configService.testable.setEnvironment(configService.testable.env.DEV);
		expect(configService.stripekey).toContain('test');
	});

	it('Given Prod environment, When config Then there are values', function () {
		configService = configService.testable.setEnvironment(configService.testable.env.PROD);
		expect(configService.stripekey).toContain('live');
	});
});