@echo off
echo build an .apk with the keystore from the last batch cirt then rename the .apk and copy it to "android\App-temp.apk"

echo locating
cd "%~dp0"

echo signing
"c:\Program Files\Java\jdk1.8.0_131\bin\jarsigner.exe" -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore Android\App.keystore Android\App-temp.apk App

echo aligning
"C:\Apps\zipalign\zipalign.exe" -v 4 Android\App-temp.apk Android\App.apk

pause
cls
