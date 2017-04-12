@echo off

echo locating
cd "%~dp0"

echo generating the key
c:\OpenSSL-Win64\bin\openssl genrsa -des3 -out iOS\iosProd.key 2048

echo generating Certificate Signing Request
c:\OpenSSL-Win64\bin\openssl req -new -key iOS\iosProd.key -out iOS\iosProd.certSigningRequest -subj "/emailAddress=n.benson@chipotle.com, CN=Chipotle, C=US"

echo GOTO https://developer.apple.com/account/overview.action
pause
cls
