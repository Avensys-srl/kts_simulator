# TEMPERATURE HYSTERESIS

## Variabili (sorgente)
- gRDEeprom.hister_Temp_Hot[] / hister_Temp_Cold[] (EEPROM): isteresi caldo/freddo.
- gRDEeprom.hister_AWP_Temp_Hot[] / hister_AWP_Temp_Cold[] (EEPROM): isteresi con AWP.

## Modifiche (scritture)
- Modifica isteresi: salva in EEPROM.

## Riferimenti firmware
- KTS_SAMG_261\firmware\src\KTS\CLHysteresisTemperatureConfigForm.cpp
- KTS_SAMG_261\firmware\src\KTS\CLTemperature.cpp
- KTS_SAMG_261\firmware\src\KTS\RDEeprom.h
