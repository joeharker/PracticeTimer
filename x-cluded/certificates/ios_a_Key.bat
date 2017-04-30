@echo off
echo down load openssl from https://slproweb.com/products/Win32OpenSSL.html

set keyname=timer_key

echo locating
cd "%~dp0"

echo generating the key
c:\OpenSSL-Win64\bin\openssl genrsa -des3 -out ios\%keyname%.key 2048

echo.
echo you only need to make a key once, then use it in all of your following ios batch files

pause
cls
