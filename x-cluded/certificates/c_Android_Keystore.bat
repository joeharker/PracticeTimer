@echo off
echo download the JRE at http://www.oracle.com/technetwork/java/javase/downloads/jre7-downloads-1880261.html

echo locating
cd "%~dp0"

echo generating the private key
"C:\Program Files\Java\jdk1.7.0_79\jre\bin\keytool.exe" -genkey -v -keystore Android\App.keystore -alias App -keyalg RSA -keysize 2048 -validity 10000

echo use App.keystore at https://build.phonegap.com/apps/
echo your alias is "App"
pause
cls
