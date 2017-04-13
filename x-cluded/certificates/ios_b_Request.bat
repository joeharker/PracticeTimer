@echo off

set keyname=timer_key
set filename=timer_dev

echo locating
cd "%~dp0"

echo generating Certificate Signing Request
c:\OpenSSL-Win64\bin\openssl req -new -key ios\%keyname%.key -out ios\%filename%.certSigningRequest -subj "/emailAddress=joeharker@007dev.com, CN=007Dev, C=US"

echo.
echo GOTO https://developer.apple.com/account/overview.action
echo Certificates [+]
echo Provisioning Profiles [+]
echo Rename the .cer to %filename%.cer

pause
cls
