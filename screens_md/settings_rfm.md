# RFM CHANNEL SETTINGS

## Variabili (sorgente)
- gKTSEeprom.m_RFMChannel (EEPROM): canale RFM attuale.
- gKTSGlobal.ComLinkType / RFM status (gKTS): stato collegamento.

## Modifiche (scritture)
- Up/Down: aggiorna canale in gKTSEeprom e salva in EEPROM.
- Scan: avvia ricerca canale libero (logica in CLRFMSelectChannelForm).

## Comportamento UI
- Mostra lista canali e stato (free/busy/in progress).

## Riferimenti firmware
- KTS_SAMG_261\firmware\src\KTS\CLRFMSelectChannelForm.cpp
- KTS_SAMG_261\firmware\src\KTS\CLKTSEeprom.h
