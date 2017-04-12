@echo off
echo generate most of your icons and screens at http://pgicons.abiro.com

set iview="C:\Program Files\IrfanView\i_view64.exe"
set root=%~dp0

echo locating %~dp0
cd "%~dp0"

echo converting icons
%iview% "%root%..\notes\iconoriginal.png" /resize=(87,87) /resample /convert="%root%..\..\res\icons\ios\icon-small@3x.png"
%iview% "%root%..\notes\iconoriginal.png" /resize=(167,167) /resample /convert="%root%..\..\res\icons\ios\icon-83.5@2x.png"

echo converting splash screens
%iview% "%root%..\notes\splashoriginal.png" /resize=(1920,1080) /resample /convert="%root%..\..\res\screens\ios\screen-iphone-portrait-6plus.png"
%iview% "%root%..\notes\splashoriginal.png" /resize=(1334,750) /resample /convert="%root%..\..\res\screens\ios\screen-Default-portrait-667h.png"
%iview% "%root%..\notes\splashoriginal.png" /resize=(480,320) /resample /convert="%root%..\..\res\screens\ios\screen-iphone-land.png"
%iview% "%root%..\notes\splashoriginal.png" /resize=(960,640) /resample /convert="%root%..\..\res\screens\ios\screen-iphone-land-2x.png"
%iview% "%root%..\notes\splashoriginal.png" /resize=(1136,640) /resample /convert="%root%..\..\res\screens\ios\screen-iphone-land-568h-2x.png"
%iview% "%root%..\notes\splashoriginal.png" /resize=(1334,750) /resample /convert="%root%..\..\res\screens\ios\screen-iphone-land-667h.png"
%iview% "%root%..\notes\splashoriginal.png" /resize=(2208,1242) /resample /convert="%root%..\..\res\screens\ios\screen-iphone-land-736h.png"
%iview% "%root%..\notes\splashoriginal.png" /resize=(1024,768) /resample /convert="%root%..\..\res\screens\ios\screen-ipad-land.png"
%iview% "%root%..\notes\splashoriginal.png" /resize=(2048,1536) /resample /convert="%root%..\..\res\screens\ios\screen-ipad-land-2x.png"
%iview% "%root%..\notes\splashoriginal.png" /resize=(1920,1080) /resample /convert="%root%..\..\res\screens\ios\screen-iphone-land-6plus.png"
%iview% "%root%..\notes\splashoriginal.png" /resize=(1334,750) /resample /convert="%root%..\..\res\screens\ios\screen-Default-land-667h.png"

pause
cls