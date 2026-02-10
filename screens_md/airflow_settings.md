# AIRFLOW SETTINGS

## Variabili (sorgente)
- gRDEeprom.sel_idxStepMotors (EEPROM): indice modalità velocità.
- gRDEeprom.Set_StepMotorsFSC_CAF[] / Set_StepMotors_CAP[] (EEPROM): soglie.

## Modifiche (scritture)
- Cambia modalità (Three speeds / Stepless) e soglie: salva in EEPROM.

## Riferimenti firmware
- KTS_SAMG_261\firmware\src\KTS\CLSpeedModeConfigForm.cpp
- KTS_SAMG_261\firmware\src\KTS\CLSpeedMode.cpp
- KTS_SAMG_261\firmware\src\KTS\RDEeprom.h
