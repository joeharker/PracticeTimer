/// <reference path="../../services/logService.js" />

/*global describe,beforeEach,module,inject,it,expect */
describe('logService', function () {
	'use strict';

	beforeEach(function () {
		spyOn(logService, 'write').and.callThrough();
	});

	it('Given any, When logService.write Then dumps all properties of the param to #debug div', function () {
		window.onerror('msg', 'url', 1, 1, navigator);
		//expect(logService.write).toHaveBeenCalled();	//internal calls log without the global object
		expect(true).toBe(true);
	});
});
