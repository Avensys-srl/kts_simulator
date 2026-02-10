# SET BOX INFO (configurazione box in Home)

## Variabili (sorgente)
- gKTSEeprom.m_DesktopBoxInfo (EEPROM): bitmask elementi visualizzati in Home.
- gKTSData.Measure_Temp[] (Polling): T. Return / T. Fresh.
- gKTSData.Measure_RH_max (Polling): RH.
- gKTSData.Measure_CO2_max (Polling): CO2.
- gKTSData.Measure_VOC_max (Polling): VOC.
- gKTSDebugData.*_Status (Debug): stato accessori clima (preheater/heater/cooler).
- gRDEeprom.Config_Bypass (EEPROM): stato/config bypass.

## Modifiche (scritture)
- Toggle dei riquadri: aggiorna m_DesktopBoxInfo e salva in EEPROM (CLBoxInfo::Write).

## Comportamento UI
- I riquadri attivi (verdi) vengono alternati in Home con intervallo fisso.

## Riferimenti firmware
- KTS_SAMG_261\firmware\src\KTS\CLBoxInfoConfigForm.cpp
- KTS_SAMG_261\firmware\src\KTS\CLBoxInfo.cpp
- KTS_SAMG_261\firmware\src\KTS\CLKTSEeprom.h
- KTS_SAMG_261\firmware\src\KTS\RDEeprom.h
