# PROBES SETTINGS

## Variabili (sorgente)
- gRDEeprom.Calibr[] (EEPROM): calibrazioni sonde.
- gKTSData.Measure_Temp[] (Polling): misure sonde.

## Modifiche (scritture)
- Calibrazione sonde: aggiorna Calibr[] e salva in EEPROM.

## Riferimenti firmware
- KTS_SAMG_261\firmware\src\KTS\CLProbesSettingsForm.cpp
- KTS_SAMG_261\firmware\src\KTS\RDEeprom.h
