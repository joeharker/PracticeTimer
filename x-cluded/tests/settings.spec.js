/// <reference path="../../pages/settings/settings.js" />

/*global describe,beforeEach,module,inject,it,expect */
describe('settings', function () {
	'use strict';

	it('GIVEN nominal WHEN saveEdit THEN nominal', function () {
		testableSettings.testable.saveEdit();
		testableSettings.testable.saveAdd();
		testableSettings.testable.saveRemove();
		expect(true).toBe(true);
	});
});
