# WEEKLY SETTINGS

## Variabili (sorgente)
- gRDEeprom.Enab_Fuction (EEPROM): bit ENAB_WEEKLY per attivazione.
- gRDEeprom.sDayProg[] (EEPROM): programma settimanale completo.
- gRDEeprom.SetPointTemp[] (EEPROM): setpoint temperatura per fasce.
- gRDEeprom.Set_Imbalance[] (EEPROM): sbilanciamento.

## Modifiche (scritture)
- Toggle ON/OFF: aggiorna bit ENAB_WEEKLY in gRDEeprom.Enab_Fuction.
- Program/Edit: aggiorna gRDEeprom.sDayProg[] e salva in EEPROM.
- View: sola lettura.
- Speed: usa step/velocita dai profili (gRDEeprom.sDayProg[].ConfigSpeed).

## Riferimenti firmware
- KTS_SAMG_261\firmware\src\KTS\CLWeeklyMainForm.cpp
- KTS_SAMG_261\firmware\src\KTS\CLWeeklyEditForm.cpp
- KTS_SAMG_261\firmware\src\KTS\CLWeeklyViewForm.cpp
- KTS_SAMG_261\firmware\src\KTS\CLWeekly.cpp
- KTS_SAMG_261\firmware\src\KTS\RDEeprom.h
