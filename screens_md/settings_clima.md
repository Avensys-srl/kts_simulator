# CLIMA SETTINGS

## Variabili (sorgente)
- gRDEeprom.SetPointTemp[0..1] (EEPROM): setpoint Sun/Moon.
- gRDEeprom.SetPointTemp_Heater (EEPROM): setpoint heater (se usato).
- gRDEeprom.Enab_Fuction (EEPROM): bit ENAB_PREHEATING / ENAB_HEATING / ENAB_COOLING.

## Modifiche (scritture)
- Toggle Preheater/Summer/Winter: aggiorna bit in gRDEeprom.Enab_Fuction.
- Up/Down Sun/Moon: aggiorna gRDEeprom.SetPointTemp[] (valori in decimi di C).
- OK: WriteEeprom dei setpoint e dei bit funzione.

## Comportamento UI
- Summer e Winter sono mutuamente esclusivi.
- Le frecce modificano i setpoint entro limiti definiti in firmware.

## Riferimenti firmware
- KTS_SAMG_261\firmware\src\KTS\CLTemperatureConfigForm.cpp
- KTS_SAMG_261\firmware\src\KTS\CLTemperature.cpp
- KTS_SAMG_261\firmware\src\KTS\RDEeprom.h
