# HOME

## Variabili (sorgente)
- gKTSGlobal.RunningMode (gKTS): stato generale unita (power off, init, fire alarm, ecc.).
- gKTSGlobal.InAlarm / FilterInAlarm (gKTS): stato allarme e filtro.
- gKTSData.Status_Unit (Polling): stato operativo e flag (RH/CO2/VOC max, bypass, ecc.).
- gKTSData.Measure_Temp[] (Polling): temperature sonde (Return/Fresh).
- gKTSData.IncreaseSpeed_RH_CO2 (Polling): incremento velocita per RH/CO2.
- gKTSDebugData.*_Status (Debug): stati accessori clima (preheater/heater/cooler).
- gRDEeprom.Set_Power_ON (EEPROM): stato power memorizzato.
- gRDEeprom.sel_idxStepMotors (EEPROM): indice modalita velocita/step.
- gRDEeprom.Set_StepMotorsFSC_CAF[] / Set_StepMotors_CAP[] (EEPROM): soglie/step velocita.

## Modifiche (scritture)
- Power ON/OFF: modifica gRDEeprom.Set_Power_ON e aggiorna la running mode.
- Velocita (stepless/three speed): scrive gRDEeprom.sel_idxStepMotors e/o Set_StepMotors* tramite WriteEeprom.
- Selezione velocita/step: aggiorna EEPROM per soglie e indice step.

## Comportamento UI
- Se unita OFF: controlli bloccati e schermata in blackout.
- Aggiornamento dinamico delle icone in base a gKTSData/gKTSDebugData.

## Riferimenti firmware
- KTS_SAMG_261\firmware\src\KTS\CLMainForm.cpp
- KTS_SAMG_261\firmware\src\KTS\RDEeprom.h
