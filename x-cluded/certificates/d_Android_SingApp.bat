@echo off
echo build an .apk with the keystore from the last batch cirt then rename the .apk and copy it to "Android\App-release.apk"

echo locating
cd "%~dp0"

echo signing
"C:\Program Files\Java\jdk1.7.0_79\bin\jarsigner.exe" -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore Android\App.keystore Android\App-release.apk App

echo aligning
zipalign\zipalign -v 4 Android\App-release.apk Android\App.apk

pause
cls
