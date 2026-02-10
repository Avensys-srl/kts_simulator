# FILTER SETTINGS

## Variabili (sorgente)
- gRDEeprom.gg_manut_Filter (EEPROM): giorni manutenzione filtro.
- gRDEeprom.DPP_Threshold / DPP_FilterLevel (EEPROM): soglie DPP.
- gKTSGlobal.FilterInAlarm (gKTS): stato allarme filtro.

## Modifiche (scritture)
- Cambia soglie/periodi manutenzione: salva in EEPROM.

## Riferimenti firmware
- KTS_SAMG_261\firmware\src\KTS\CLFilterConfigForm.cpp
- KTS_SAMG_261\firmware\src\KTS\RDEeprom.h
