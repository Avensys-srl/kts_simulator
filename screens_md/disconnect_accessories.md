# DISCONNECT ACCESSORIES

## Variabili (sorgente)
- gRDEeprom.AccessoyHW[] (EEPROM): bitmask accessori installati.

## Modifiche (scritture)
- Toggle rimozione accessorio: aggiorna AccessoyHW[] e salva in EEPROM.

## Comportamento UI
- Visualizza lista accessori e permette rimozione/risincronizzazione.

## Riferimenti firmware
- KTS_SAMG_261\firmware\src\KTS\CLAccessoryManagerForm.cpp
- KTS_SAMG_261\firmware\src\KTS\CLAccessory.cpp
- KTS_SAMG_261\firmware\src\KTS\RDEeprom.h
