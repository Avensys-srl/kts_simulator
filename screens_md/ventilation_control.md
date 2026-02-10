# VENTILATION CONTROL

## Variabili (sorgente)
- gRDEeprom.Enab_Fuction (EEPROM): bit ENAB_CAF / ENAB_CAP / ENAB_FSC.

## Modifiche (scritture)
- Selezione CAF/FSC/CAP: aggiorna Enab_Fuction e salva in EEPROM.

## Riferimenti firmware
- KTS_SAMG_261\firmware\src\KTS\CLSelectionVentilationControlForm.cpp
- KTS_SAMG_261\firmware\src\KTS\CLVentilationControl.cpp
- KTS_SAMG_261\firmware\src\KTS\RDEeprom.h
