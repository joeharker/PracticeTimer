'use strict';

var configService = (function () {

	var env = { DEV: 0, PROD: 1 };

	var environment = env.PROD;

	var values = {
			testable: {
				setEnvironment: function (ref) { environment = ref; return init(); },
				env: env
			}
		};

	function init() {
		//PROD values as default
		values = {
			root: '',	//location.href.replace(/[^/]*$|[^/]+#.*$/, ''),
			debug: false,
			testable: values.testable
		};

		//only set values that are different from prod
		switch (environment) {
			case env.DEV:
				values.debug = true;
				break;

			case env.PROD:
			default: //PROD
		}

		return values;
	}

	return init();
})();