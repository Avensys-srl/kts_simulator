# PARTY SETTINGS

## Variabili (sorgente)
- gRDEeprom.Set_TimeBoost (EEPROM): minuti di boost.
- gRDEeprom.Enab_Fuction (EEPROM): bit ENAB_BOOST (abilitazione party).

## Modifiche (scritture)
- ON/OFF: aggiorna ENAB_BOOST.
- Up/Down: modifica gRDEeprom.Set_TimeBoost a step di 5 minuti (range 15..240).
- OK: WriteEeprom di Set_TimeBoost e Enab_Fuction.

## Comportamento UI
- Se OFF: le frecce non modificano i minuti.

## Riferimenti firmware
- KTS_SAMG_261\firmware\src\KTS\CLPartyConfigForm.cpp
- KTS_SAMG_261\firmware\src\KTS\RDEeprom.h
