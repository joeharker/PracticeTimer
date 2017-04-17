(function (donate, log, config) {
    log.init(config.debug);

    function onDeviceReady() {
        if (device.platform === 'iOS') {
            var link = document.createElement('link');
            link.rel = 'stylesheet';
            link.href = 'pages/init/ios.css';
            document.getElementsByTagName('head')[0].appendChild(link);
        }

        if (window.plugins && window.plugins.insomnia) {
            window.plugins.insomnia.keepAwake();
        }
    }

	donate.setDonation('stripe', 1.00);

    if (typeof device !== 'undefined') {
        onDeviceReady();
    } else {
        document.addEventListener("deviceready", onDeviceReady, false);
    }
})(donateService, logService, configService);
