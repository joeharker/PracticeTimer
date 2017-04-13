/// <reference path="../../js/config.js" />

/*global describe,beforeEach,module,inject,it,expect */
describe('config', function () {
	'use strict';

	it('Given any, When config Then there is a value for stripekey', function () {
		expect(config.stripekey).not.toBe(undefined);
	});

	it('Given any, When config Then there is a value for debug', function () {
		expect(config.debug).not.toBe(undefined);
	});

	it('Given DEV environment, When config Then there are values', function () {
		config = config.testable.setEnvironment(config.testable.env.DEV);
		expect(config.stripekey).toContain('test');
	});

	it('Given Prod environment, When config Then there are values', function () {
		config = config.testable.setEnvironment(config.testable.env.PROD);
		expect(config.stripekey).toContain('live');
	});
});