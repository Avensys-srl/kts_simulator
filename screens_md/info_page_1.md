# INFO - Page 1/3

## Variabili (sorgente)
- gRDEeprom.AddrUnit (EEPROM): Device ID.
- gRDEeprom.SerialString (EEPROM): Serial ID.
- gRDEeprom.SW_Vers / HW_Vers (EEPROM): versioni.
- gRDEeprom.Type_func (EEPROM): tipo unità (Basic/Plus/Extra).
- gKTSGlobal.Counter / gRDEeprom.hour_runnig (gKTS/EEPROM): contatori.
- gKTSData.Measure_Temp[] (Polling): probes.

## Modifiche (scritture)
- Nessuna (sola lettura).

## Riferimenti firmware
- KTS_SAMG_261\firmware\src\KTS\CLInfoForm.cpp
- KTS_SAMG_261\firmware\src\KTS\RDEeprom.h
