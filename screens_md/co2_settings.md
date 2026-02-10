# CO2 SETTINGS

## Variabili (sorgente)
- gRDEeprom.SetPoint_CO2 (EEPROM): soglia CO2.
- gRDEeprom.SetPoint_Airflow_CO2 (EEPROM): setpoint airflow per CO2.
- gKTSData.Measure_CO2_max (Polling): misura CO2.

## Modifiche (scritture)
- Modifica setpoint CO2 e airflow: salva in EEPROM.

## Riferimenti firmware
- KTS_SAMG_261\firmware\src\KTS\CLCO2ConfigForm.cpp
- KTS_SAMG_261\firmware\src\KTS\RDEeprom.h
