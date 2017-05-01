@echo off

set keyname=timer_key
set filename=timer_dev

echo locating
cd "%~dp0"

echo generating the PEM
c:\OpenSSL-Win64\bin\openssl x509 -in ios\%filename%.cer -inform DER -out ios\%filename%.pem -outform PEM

echo generating the P12
c:\OpenSSL-Win64\bin\openssl pkcs12 -export -inkey ios\%keyname%.key -in ios\%filename%.pem -out ios\%filename%.p12

echo.
echo go to https://build.phonegap.com/people/edit
echo upload the .p12 and .mobileprovision
echo.
echo go to https://itunesconnect.apple.com/
echo to start prepping your app
echo.
echo go to https://itunes.apple.com/us/app/xcode/id497799835?ls=1&mt=12
echo to get xcode

pause
cls
