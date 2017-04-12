'use strict';

var memoryService =  (function () {
	return {
    	set: function (key, val) {
    		window.localStorage.setItem(key, JSON.stringify(val));
    	},

    	get: function (key) {
    		return JSON.parse(window.localStorage.getItem(key));
    	},

    	reset: function () {
    		window.localStorage.clear();
    	}
	}
})();