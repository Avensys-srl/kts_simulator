# SCREENSAVER SETTINGS

## Variabili (sorgente)
- gKTSEeprom.m_ScreensaverEnabled (EEPROM): abilitazione screensaver.
- gKTSEeprom.m_ScreensaverMinutes (EEPROM): minuti di attesa.
- gKTSGlobal.ScreenSaver_LastTouchedMilliseconds (gKTS): timestamp ultimo touch.

## Modifiche (scritture)
- ON/OFF: CLKTSEeprom::SetScreensaver(enabled, minutes) -> salva in EEPROM.
- Up/Down: modifica minuti (limiti applicati) e salva in EEPROM.

## Comportamento UI
- Se OFF: le frecce non modificano i minuti.
- Se ON: freccia su aumenta, giu diminuisce.

## Riferimenti firmware
- KTS_SAMG_261\firmware\src\KTS\CLScreenSaverConfigForm.cpp
- KTS_SAMG_261\firmware\src\KTS\CLKTSEeprom.h
- KTS_SAMG_261\firmware\src\KTS\CLScreenSaver.cpp
