# PASSWORD SETTINGS

## Variabili (sorgente)
- gRDEeprom.servicePassword[5] (EEPROM): password service.
- gRDEeprom.endUserPassword[5] (EEPROM): password utente.
- gRDEeprom.Enab_Fuction (EEPROM): bit ENAB_PASSWORD.

## Modifiche (scritture)
- Cambio password: aggiorna servicePassword/endUserPassword e salva in EEPROM.
- ON/OFF password: aggiorna bit ENAB_PASSWORD in Enab_Fuction.

## Comportamento UI
- Inserimento numerico a 5 cifre.
- Conferma con OK e validazione.

## Riferimenti firmware
- KTS_SAMG_261\firmware\src\KTS\CLPasswordForm.cpp
- KTS_SAMG_261\firmware\src\KTS\RDEeprom.h
