# LANGUAGE SETTINGS

## Variabili (sorgente)
- gKTSGlobal.LanguageId (gKTS): lingua attiva corrente.
- gKTSEeprom.m_Language (EEPROM): lingua salvata in EEPROM (CLKTSEeprom).

## Modifiche (scritture)
- OK conferma: CLKTS::SetLanguage() -> aggiorna gKTSGlobal.LanguageId e salva in EEPROM (CLKTSEeprom::SetLanguage / RTC EEPROM).

## Comportamento UI
- Selezione bandiera aggiorna la lingua selezionata.
- OK applica e salva.

## Riferimenti firmware
- KTS_SAMG_261\firmware\src\KTS\CLSelectionLanguageForm.cpp
- KTS_SAMG_261\firmware\src\KTS\CLKTSEeprom.h
- KTS_SAMG_261\firmware\src\KTS\CLLocalitation.cpp
