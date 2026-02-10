# DATE & TIME SETTINGS

## Variabili (sorgente)
- RTC (Rtc_Pcf8563): data e ora correnti.
- gKTSGlobal.ScreenSaver_LastTouchedMilliseconds (gKTS): touch activity.

## Modifiche (scritture)
- Salvataggio nuova data/ora nel RTC tramite funzioni di Rtc_Pcf8563.

## Comportamento UI
- Permette modifica data e ora con conferma OK.

## Riferimenti firmware
- KTS_SAMG_261\firmware\src\KTS\CLSelectionDateForm.cpp
- KTS_SAMG_261\firmware\src\KTS\CLSelectionTimeForm.cpp
- KTS_SAMG_261\firmware\src\KTS\Rtc_Pcf8563.cpp
