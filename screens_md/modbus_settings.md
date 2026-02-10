# MODBUS SETTINGS

## Variabili (sorgente)
- gRDEeprom.AddrUnit (EEPROM): indirizzo Modbus/Unit ID.
- gKTSData (Polling): stato e versione modbus (via debug/poll).

## Modifiche (scritture)
- Up/Down: modifica AddrUnit e salva in EEPROM.

## Riferimenti firmware
- KTS_SAMG_261\firmware\src\KTS\CLModBusConfigForm.cpp
- KTS_SAMG_261\firmware\src\KTS\RDEeprom.h
