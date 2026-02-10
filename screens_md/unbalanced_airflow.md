# UNBALANCED AIRFLOW

## Variabili (sorgente)
- gRDEeprom.Set_Imbalance[] (EEPROM): valore sbilanciamento.
- gRDEeprom.Enab_Fuction (EEPROM): bit ENAB_IMBALANCE.

## Modifiche (scritture)
- Modifica percentuale sbilanciamento e abilita funzione: salva in EEPROM.

## Riferimenti firmware
- KTS_SAMG_261\firmware\src\KTS\CLUnbalanceConfigForm.cpp
- KTS_SAMG_261\firmware\src\KTS\RDEeprom.h
