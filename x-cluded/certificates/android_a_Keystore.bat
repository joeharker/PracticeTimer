@echo off
echo download the "JDK install (Java SE)" at http://www.oracle.com/technetwork/java/javase/downloads/index.html

echo locating
cd "%~dp0"

echo generating the private key
"c:\Program Files\Java\jdk1.8.0_131\bin\keytool.exe" -genkey -v -keystore android\App.keystore -alias App -keyalg RSA -keysize 2048 -validity 10000

echo use App.keystore at https://build.phonegap.com/apps/
echo your alias is "App"
pause
cls
