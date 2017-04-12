/// <reference path="../../services/memoryService.js" />

/*global describe,beforeEach,module,inject,it,expect */
describe('memoryService', function () {
	'use strict';

	it('Given any, When memoryService.set Then memoryService.get returns the value', function () {
		var random = Math.floor((Math.random() * 100) + 1);
		memoryService.set('random', random);
		var test = memoryService.get('random');
		expect(test).toBe(random);
	});

	it('Given saved memory items, When memoryService.reset Then memoryService.get does not return the value', function () {
		var random = Math.floor((Math.random() * 100) + 1);
		memoryService.set('random', random);
		memoryService.reset();
		var test = memoryService.get('random');
		expect(test).not.toBe(random);
	});
});
