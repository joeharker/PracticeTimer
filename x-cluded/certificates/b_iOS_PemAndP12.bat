@echo off

echo locating
cd "%~dp0"

echo generating the PEM
c:\OpenSSL-Win64\bin\openssl x509 -in iOS\ios_distributionProd.cer -inform DER -out iOS\ios_distributionProd.pem -outform PEM

echo generating the P12
c:\OpenSSL-Win64\bin\openssl pkcs12 -export -inkey iOS\iosProd.key -in iOS\ios_distributionProd.pem -out iOS\ios_distributionProd.p12

echo GOTO https://developer.apple.com/account/ios/certificate/
pause
cls
