# WEEKLY SPEED

## Variabili (sorgente)
- gRDEeprom.sDayProg[].ConfigSpeed (EEPROM): step velocita per fasce.
- gRDEeprom.sel_idxStepMotors / Set_StepMotors* (EEPROM): soglie velocita.

## Modifiche (scritture)
- Selezione step/velocita: aggiorna gRDEeprom.sDayProg[].ConfigSpeed e salva in EEPROM.

## Riferimenti firmware
- KTS_SAMG_261\firmware\src\KTS\CLWeeklyEditForm.cpp
- KTS_SAMG_261\firmware\src\KTS\CLSpeedMode.cpp
- KTS_SAMG_261\firmware\src\KTS\RDEeprom.h
