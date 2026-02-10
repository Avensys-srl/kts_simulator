# WEEKLY PROGRAM

## Variabili (sorgente)
- gRDEeprom.sDayProg[] (EEPROM): programmazione fasce orarie.
- gRDEeprom.SetPointTemp[] (EEPROM): setpoint associati alle fasce.
- gRDEeprom.Set_Imbalance[] (EEPROM): sbilanciamento per fasce.

## Modifiche (scritture)
- Modifica fasce orarie e configurazioni: aggiorna gRDEeprom.sDayProg e salva in EEPROM.

## Riferimenti firmware
- KTS_SAMG_261\firmware\src\KTS\CLWeeklyEditForm.cpp
- KTS_SAMG_261\firmware\src\KTS\CLWeeklyDaysEditForm.cpp
- KTS_SAMG_261\firmware\src\KTS\CLWeekly.cpp
