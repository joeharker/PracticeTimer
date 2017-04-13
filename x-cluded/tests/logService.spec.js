/// <reference path="../../services/logService.js" />

/*global describe,beforeEach,module,inject,it,expect */
describe('logService', function () {
	'use strict';
	var debug;

	beforeEach(function () {
		logService.init(true);
		debug = document.getElementById('debug');
		if (debug) {
			debug.style.height = '5px';
			debug.style.overflow = 'scroll';
		}
	});

	it('Given debug, When window.onerror logService.write Then dumps all properties of the param to #debug div', function () {
		window.onload();
		window.onerror('msg', 'url', 1, 1, navigator);
		var debug = document.getElementById('debug');
		expect(debug.innerHTML.indexOf('[object Navigator]')).not.toBe(-1);
	});

	it('Given debug, When logService.write The message is written to #debug div', function () {
		var message = 'test error';
		logService.write(message);
		expect(debug.innerHTML.indexOf(message)).not.toBe(-1);
	});
});