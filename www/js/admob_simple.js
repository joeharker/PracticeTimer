if(typeof AdMob !== "undefined"){
    var admobid = {};
    if (/(android)/i.test(navigator.userAgent)) {
        admobid = { // for Android
            banner: 'ca-app-pub-1438477418297657/3974559721',
            interstitial: ''
        };
    } else if (/(ipod|iphone|ipad)/i.test(navigator.userAgent)) {
        admobid = { // for iOS
            banner: 'ca-app-pub-1438477418297657/9881492520',
            interstitial: ''
        };
    } else {
        admobid = { // for Windows Phone
            banner: 'ca-app-pub-1438477418297657/3974559721',
            interstitial: ''
        };
    }

    function initApp() {
        if (AdMob) {
            AdMob.createBanner({
                adId: admobid.banner,
                position: AdMob.AD_POSITION.BOTTOM_CENTER,
                autoShow: true
            });
        }
    }

    document.addEventListener('deviceready', initApp, false);
}