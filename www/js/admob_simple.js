if(typeof AdMob !== "undefined"){
    var admobid = {};
    if (/(android)/i.test(navigator.userAgent)) {
        admobid = {
// for Android
            banner: 'ca-app-pub-1438477418297657/3974559721'
        };
    } else if (/(ipod|iphone|ipad)/i.test(navigator.userAgent)) {
        admobid = {
// for iOS
            banner: 'ca-app-pub-1438477418297657/9881492520'
        };
    } else {
        admobid = {
// for Windows Phone
            banner: 'ca-app-pub-1438477418297657/3974559721'
        };
    }

    if ((/(ipad|iphone|ipod|android|windows phone)/i.test(navigator.userAgent))) {
        document.addEventListener('deviceready', initApp, false);
    } else {
        initApp();
    }

    function initApp() {
        if (!AdMob) {
            alert('admob plugin not ready');
            return;
        }

        AdMob.createBanner({
            adId: admobid.banner,
            overlap: false,
            offsetTopBar: false,
            position: AdMob.AD_POSITION.BOTTOM_CENTER,
            bgColor: 'black'
        });
    }
}