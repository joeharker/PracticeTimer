'use strict';

var configService = (function () {
	var env = { DEV: 0, PROD: 1 };

	var environment = env.DEV;

	var values = {
			testable: {
				setEnvironment: function (ref) { environment = ref; return init(); },
				env: env
			}
		};

	function init() {
		//PROD values as default
		values = {
			stripekey: 'pk_live_g4pIacdbYnc0Tc3qxziw071R',
			debug: false,
			testable: values.testable
		};

		//only set values that are different from prod
		switch (environment) {
			case env.DEV:
				values.stripekey = 'pk_test_ieWVvtwMZ6fzqAOFolvkG2os';
				values.debug = true;
				break;

			case env.PROD:
			default: //PROD
		}

		return values;
	}
	
	return init();
})();