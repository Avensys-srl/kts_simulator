/* --------------------------
   STATE
-------------------------- */
const state = {
  nav: {
    stack: [HOME],
    selectedIndex: 0
  },
  home: {
    unitOn: true,
    tLabel: "T. RETOUR",
    tValue: 15,
    tValueText: "15 \u00b0C",
    speedPct: 0
  },
  settings: {
    language: "EN",
    languageDraft: null,
    screensaverEnabled: true,
    screensaverMinutes: 10,
    weeklyEnabled: false,
    partyEnabled: false,
    partyMinutes: 60,
    passwordEnabled: false,
    rfmChannel: 1,
    climaPreheater: false,
    climaSummer: true,
    climaWinter: false,
    tempSun: 22,
    tempMoon: 18,
    menuPage: 0,
    languagePage: 0
  },
  timers: {
    homeInfoTimer: null
  }
};

/* --------------------------
   I18N
-------------------------- */
const I18N = window.KTS_I18N || { lang: {} };
function getLang(){ return state.settings.language || "EN"; }
function t(id, fallback){
  const lang = getLang();
  const langMap = I18N.lang && I18N.lang[lang];
  const enMap = I18N.lang && I18N.lang.EN;
  return (langMap && langMap[id]) || (enMap && enMap[id]) || fallback || id || "";
}
function nodeLabel(n){
  if(n && n.textId) return t(n.textId, n.name);
  return n && n.name ? n.name : "";
}

const DOC_MAP = {
  HOME: "screens_md/home.md",
  MENU: "screens_md/menu.md",
  Settings: "screens_md/settings_menu.md",
  SET_BOX_INFO: "screens_md/set_box_info.md",

  settings_language: "screens_md/settings_language.md",
  settings_screensaver: "screens_md/settings_screensaver.md",
  settings_datetime: "screens_md/settings_datetime.md",
  settings_weekly: "screens_md/settings_weekly.md",
  settings_clima: "screens_md/settings_clima.md",
  settings_party: "screens_md/settings_party.md",
  settings_password: "screens_md/settings_password.md",
  settings_rfm: "screens_md/settings_rfm.md",

  weekly_program: "screens_md/weekly_program.md",
  weekly_view: "screens_md/weekly_view.md",
  weekly_speed: "screens_md/weekly_speed.md",

  service_page_1: "screens_md/service_page_1.md",
  service_page_2: "screens_md/service_page_2.md",
  service_page_3: "screens_md/service_page_3.md",
  service_page_4: "screens_md/service_page_4.md",
  service_page_5: "screens_md/service_page_5.md",
  service_page_6: "screens_md/service_page_6.md",

  disconnect_accessories: "screens_md/disconnect_accessories.md",
  ventilation_control: "screens_md/ventilation_control.md",
  airflow_settings: "screens_md/airflow_settings.md",
  input_settings_page1: "screens_md/input_settings_page1.md",
  input_settings_page2: "screens_md/input_settings_page2.md",
  input_settings_page3: "screens_md/input_settings_page3.md",
  output_settings: "screens_md/output_settings.md",
  bpd_settings: "screens_md/bpd_settings.md",
  unbalanced_airflow: "screens_md/unbalanced_airflow.md",
  filter_settings: "screens_md/filter_settings.md",
  rh_settings: "screens_md/rh_settings.md",
  co2_settings: "screens_md/co2_settings.md",
  voc_settings: "screens_md/voc_settings.md",
  temperature_hysteresis: "screens_md/temperature_hysteresis.md",
  report_data_admin: "screens_md/report_data_admin.md",
  upgrade: "screens_md/upgrade.md",
  change_password: "screens_md/change_password.md",
  probes_settings: "screens_md/probes_settings.md",
  modbus_settings: "screens_md/modbus_settings.md",
  test_unit: "screens_md/test_unit.md",
  eeprom_reset: "screens_md/eeprom_reset.md",
  reference_temperature_settings: "screens_md/reference_temperature_settings.md",
  dsc_update_delay: "screens_md/dsc_update_delay.md",
  pir_settings: "screens_md/pir_settings.md",
  clean_event_settings: "screens_md/clean_event_settings.md",

  info_page_1: "screens_md/info_page_1.md",
  info_page_2: "screens_md/info_page_2.md",
  info_page_3: "screens_md/info_page_3.md"
};

const NAME_DOC_MAP = {
  "Disconnect accessories": "screens_md/disconnect_accessories.md",
  "Ventilation control": "screens_md/ventilation_control.md",
  "Airflow settings": "screens_md/airflow_settings.md",
  "Input settings": "screens_md/input_settings_page1.md",
  "Output settings": "screens_md/output_settings.md",
  "BPD settings": "screens_md/bpd_settings.md",
  "Unbalanced airflow": "screens_md/unbalanced_airflow.md",
  "Filter settings": "screens_md/filter_settings.md",
  "RH settings": "screens_md/rh_settings.md",
  "CO2 settings": "screens_md/co2_settings.md",
  "VOC settings": "screens_md/voc_settings.md",
  "Temperature hysteresis": "screens_md/temperature_hysteresis.md",
  "Report data (admin)": "screens_md/report_data_admin.md",
  "Upgrade": "screens_md/upgrade.md",
  "Change password": "screens_md/change_password.md",
  "Probes settings": "screens_md/probes_settings.md",
  "Modbus settings": "screens_md/modbus_settings.md",
  "Test unit": "screens_md/test_unit.md",
  "EEPROM reset": "screens_md/eeprom_reset.md",
  "Reference temperature settings": "screens_md/reference_temperature_settings.md",
  "DSC update delay": "screens_md/dsc_update_delay.md",
  "PIR settings": "screens_md/pir_settings.md",
  "Clean event settings": "screens_md/clean_event_settings.md"
};

function docPathForNode(n){
  if(!n) return null;
  if(n === HOME) return DOC_MAP.HOME;
  if(n === MENU) return DOC_MAP.MENU;
  if(n === Settings) return DOC_MAP.Settings;
  if(n === SET_BOX_INFO) return DOC_MAP.SET_BOX_INFO;
  if(n.id && DOC_MAP[n.id]) return DOC_MAP[n.id];
  if(n.pageGroup === "service" && n.pageIndex) return DOC_MAP[`service_page_${n.pageIndex}`];
  if(n.pageGroup === "info" && n.pageIndex) return DOC_MAP[`info_page_${n.pageIndex}`];
  if(n.name && NAME_DOC_MAP[n.name]) return NAME_DOC_MAP[n.name];
  return null;
}

const SEARCH_I18N = {
  EN: {
    placeholder: "Search screen... e.g. Probes settings, Climate settings, Fire alarm...",
    clear: "CLEAR",
    hint: [
      "Type 2+ characters to see results.",
      "Click a result to open the screen and see the full path.",
      "If the unit is OFF (blackout), navigation is blocked: turn it on with the power button."
    ],
    pill: "Path available"
  },
  IT: {
    placeholder: "Cerca schermata... es: Probes settings, Climate settings, Fire alarm...",
    clear: "PULISCI",
    hint: [
      "Scrivi 2+ caratteri per vedere i risultati.",
      "Clicca un risultato per aprire direttamente la schermata e vedere il percorso completo.",
      "Se l'unità è OFF (blackout), la navigazione viene bloccata: riaccendi con il tasto power."
    ],
    pill: "Percorso disponibile"
  },
  DE: {
    placeholder: "Bildschirm suchen... z. B. Probes settings, Climate settings, Fire alarm...",
    clear: "LÖSCHEN",
    hint: [
      "Gib 2+ Zeichen ein, um Ergebnisse zu sehen.",
      "Klicke ein Ergebnis, um den Bildschirm zu öffnen und den Pfad zu sehen.",
      "Wenn das Gerät AUS ist (blackout), ist die Navigation gesperrt: mit Power einschalten."
    ],
    pill: "Pfad verfügbar"
  },
  FR: {
    placeholder: "Rechercher écran... ex : Probes settings, Climate settings, Fire alarm...",
    clear: "EFFACER",
    hint: [
      "Saisissez 2+ caractères pour voir les résultats.",
      "Cliquez un résultat pour ouvrir l’écran et voir le chemin complet.",
      "Si l’unité est OFF (blackout), la navigation est bloquée : rallumez avec le bouton power."
    ],
    pill: "Chemin disponible"
  },
  NL: {
    placeholder: "Scherm zoeken... bijv. Probes settings, Climate settings, Fire alarm...",
    clear: "WISSEN",
    hint: [
      "Typ 2+ tekens om resultaten te zien.",
      "Klik op een resultaat om het scherm te openen en het volledige pad te zien.",
      "Als de unit UIT is (blackout), is navigatie geblokkeerd: zet aan met de power-knop."
    ],
    pill: "Pad beschikbaar"
  },
  DK: {
    placeholder: "Søg skærm... fx Probes settings, Climate settings, Fire alarm...",
    clear: "RYD",
    hint: [
      "Skriv 2+ tegn for at se resultater.",
      "Klik på et resultat for at åbne skærmen og se hele stien.",
      "Hvis enheden er OFF (blackout), er navigation blokeret: tænd med power-knappen."
    ],
    pill: "Sti tilgængelig"
  },
  PT: {
    placeholder: "Pesquisar ecrã... ex: Probes settings, Climate settings, Fire alarm...",
    clear: "LIMPAR",
    hint: [
      "Escreva 2+ caracteres para ver resultados.",
      "Clique num resultado para abrir o ecrã e ver o caminho completo.",
      "Se a unidade estiver OFF (blackout), a navegação é bloqueada: ligue com o botão power."
    ],
    pill: "Caminho disponível"
  },
  PL: {
    placeholder: "Szukaj ekranu... np. Probes settings, Climate settings, Fire alarm...",
    clear: "WYCZYŚĆ",
    hint: [
      "Wpisz 2+ znaki, aby zobaczyć wyniki.",
      "Kliknij wynik, aby otworzyć ekran i zobaczyć pełną ścieżkę.",
      "Jeśli jednostka jest OFF (blackout), nawigacja jest zablokowana: włącz przyciskiem power."
    ],
    pill: "Ścieżka dostępna"
  },
  SL: {
    placeholder: "Išči zaslon... npr. Probes settings, Climate settings, Fire alarm...",
    clear: "POČISTI",
    hint: [
      "Vnesi 2+ znaka za prikaz rezultatov.",
      "Klikni rezultat za odpiranje zaslona in ogled celotne poti.",
      "Če je enota OFF (blackout), je navigacija blokirana: vključi s tipko power."
    ],
    pill: "Pot na voljo"
  },
  HU: {
    placeholder: "Képernyő keresése... pl. Probes settings, Climate settings, Fire alarm...",
    clear: "TÖRLÉS",
    hint: [
      "Írj be 2+ karaktert az eredményekhez.",
      "Kattints egy találatra a képernyő megnyitásához és az útvonal megtekintéséhez.",
      "Ha az egység OFF (blackout), a navigáció le van tiltva: kapcsold be a power gombbal."
    ],
    pill: "Útvonal elérhető"
  },
  RO: {
    placeholder: "Caută ecran... ex: Probes settings, Climate settings, Fire alarm...",
    clear: "ȘTERGE",
    hint: [
      "Scrie 2+ caractere pentru a vedea rezultate.",
      "Apasă un rezultat pentru a deschide ecranul și a vedea calea completă.",
      "Dacă unitatea este OFF (blackout), navigarea este blocată: pornește cu butonul power."
    ],
    pill: "Cale disponibilă"
  },
  BG: {
    placeholder: "Търси екран... напр. Probes settings, Climate settings, Fire alarm...",
    clear: "ИЗЧИСТИ",
    hint: [
      "Въведи 2+ символа за резултати.",
      "Кликни резултат, за да отвориш екрана и да видиш пълния път.",
      "Ако устройството е OFF (blackout), навигацията е блокирана: включи с power бутона."
    ],
    pill: "Път наличен"
  },
  TR: {
    placeholder: "Ekran ara... örn: Probes settings, Climate settings, Fire alarm...",
    clear: "TEMİZLE",
    hint: [
      "Sonuçlar için 2+ karakter yazın.",
      "Ekranı açmak ve yolu görmek için bir sonuca tıklayın.",
      "Birim OFF (blackout) ise gezinme engellenir: power tuşu ile açın."
    ],
    pill: "Yol mevcut"
  }
};

function tSearch(key){
  const lang = getLang();
  const map = SEARCH_I18N[lang] || SEARCH_I18N.EN;
  return map[key] || SEARCH_I18N.EN[key];
}

/* --------------------------
   Page variables registry
-------------------------- */
const pageVars = {
  set_box_info: {
    intervalMs: 5000,
    selectedIds: ["t_return", "t_fresh"]
  },
  home: {
    speedStep: 1
  }
};

/* --------------------------
   SET BOX INFO state
-------------------------- */
const setBoxItems = [
  { id: "t_return", label: "T. RETURN", textId: "CLTextId_TRETURN", active: true, value: "19 \u00b0C" },
  { id: "acc_clima", label: "ACC. CLIMA", textId: "CLTextId_BOXINFO_ACCESSORY_CLIMA", active: false },
  { id: "probes", label: "PROBES", textId: "CLTextId_PROBES", active: false, value: "OK" },
  { id: "t_fresh", label: "T. FRESH", textId: "CLTextId_TFRESH", active: true, value: "12 \u00b0C" },
  { id: "defrost", label: "DEFROST", textId: "CLTextId_DEFROST", active: false },
  { id: "filters", label: "FILTERS", textId: "CLTextId_FILTERS", active: false, value: "CLEAN" },
  { id: "bypass", label: "BYPASS", textId: "CLTextId_BYPASS", active: false, value: "AUTO" }
];

let homeInfoIndex = 0;

function savePageVars(){
  try{
    localStorage.setItem("kts.pageVars", JSON.stringify(pageVars));
  }catch(e){
    // ignore storage errors
  }
}

function loadPageVars(){
  try{
    const raw = localStorage.getItem("kts.pageVars");
    if(!raw) return;
    const parsed = JSON.parse(raw);
    if(parsed && parsed.set_box_info && Array.isArray(parsed.set_box_info.selectedIds)){
      pageVars.set_box_info.selectedIds = parsed.set_box_info.selectedIds.slice();
    }
  }catch(e){
    // ignore storage errors
  }
}

function saveLanguage(){
  try{
    localStorage.setItem("kts.language", state.settings.language);
  }catch(e){
    // ignore storage errors
  }
}

function loadLanguage(){
  try{
    const val = localStorage.getItem("kts.language");
    if(val) state.settings.language = val;
  }catch(e){
    // ignore storage errors
  }
}

function applyStaticTranslations(){
  const btnBack = document.getElementById("btnBack");
  const btnOk = document.getElementById("btnOk");
  const btnHome = document.getElementById("btnHome");
  if(btnBack) btnBack.textContent = t("CLTextId_BACK");
  if(btnOk) btnOk.textContent = "OK";
  if(btnHome) btnHome.textContent = "HOME";
  const searchClear = document.getElementById("searchClear");
  if(searchClear) searchClear.textContent = tSearch("clear");
  const searchInput = document.getElementById("searchInput");
  if(searchInput) searchInput.setAttribute("placeholder", tSearch("placeholder"));
  const searchHint = document.querySelector(".searchHint");
  if(searchHint){
    const lines = tSearch("hint");
    searchHint.innerHTML = `- ${lines[0]}<br/>- ${lines[1]}<br/>- ${lines[2]}`;
  }
}

/* --------------------------
   Helpers
-------------------------- */
function current(){ return state.nav.stack[state.nav.stack.length-1]; }
function kids(n){ return n.children || []; }
function isLeaf(n){ return !n.children || n.children.length===0; }
function pathText(){ return state.nav.stack.map(x=>nodeLabel(x)).join(" \u2192 "); }
function clampSel(){
  const k = kids(current());
  if(k.length===0){ state.nav.selectedIndex=0; return; }
  state.nav.selectedIndex = Math.max(0, Math.min(state.nav.selectedIndex, k.length-1));
}

function isScreenNode(n){
  return !!(n && n.id);
}

function renderSettingsLanguage(){
  const screen = document.getElementById("screen");
  const langs = [
    { id: "EN", flag: "uk" },
    { id: "IT", flag: "it" },
    { id: "DE", flag: "de" },
    { id: "NL", flag: "nl" },
    { id: "FR", flag: "fr" },
    { id: "PL", flag: "pl" },
    { id: "DK", flag: "dk" },
    { id: "RO", flag: "ro" },
    { id: "BG", flag: "bg" },
    { id: "HU", flag: "hu" },
    { id: "SL", flag: "sl" },
    { id: "PT", flag: "pt" }
  ];
  const pageSize = 6;
  const pageCount = Math.ceil(langs.length / pageSize);
  const page = Math.max(0, Math.min(state.settings.languagePage, pageCount - 1));
  const pageItems = langs.slice(page * pageSize, page * pageSize + pageSize);
  const selectedLang = state.settings.languageDraft || state.settings.language;
  screen.innerHTML = `
    <div class="formScreen">
      <div class="formTitle">${t("CLTextId_SELECT_LANGUAGE")} <span class="formPage">${page + 1}/${pageCount}</span></div>
      <div class="langGrid">
        ${pageItems.map(l => `
          <div class="langBtn ${selectedLang===l.id ? "selected" : ""}" data-lang="${l.id}">
            <div class="flag ${l.flag}"></div>
          </div>
        `).join("")}
      </div>
      <div class="formFooter">
        <button class="formOk">OK</button>
        <button class="formBack">${t("CLTextId_BACK")}</button>
        <button class="formPrev">&lt;&lt;</button>
        <button class="formNext">&gt;&gt;</button>
        <button class="formHome">HOME</button>
      </div>
    </div>
  `;
  screen.querySelectorAll(".langBtn").forEach(btn=>{
    btn.addEventListener("click", ()=>{
      state.settings.languageDraft = btn.getAttribute("data-lang");
      renderSettingsLanguage();
    });
  });
  screen.querySelector(".formBack").addEventListener("click", ()=>{
    state.settings.languageDraft = null;
    goBack();
  });
  screen.querySelector(".formOk").addEventListener("click", ()=>{
    if(state.settings.languageDraft){
      state.settings.language = state.settings.languageDraft;
      state.settings.languageDraft = null;
      saveLanguage();
      applyStaticTranslations();
      buildIndex();
      buildNavTree();
      const list = search(searchInput.value);
      renderResults(list);
    }
    goBack();
  });
  screen.querySelector(".formPrev").addEventListener("click", ()=>{
    state.settings.languagePage = Math.max(0, page - 1);
    renderSettingsLanguage();
  });
  screen.querySelector(".formNext").addEventListener("click", ()=>{
    state.settings.languagePage = Math.min(pageCount - 1, page + 1);
    renderSettingsLanguage();
  });
  screen.querySelector(".formHome").addEventListener("click", ()=>{
    state.settings.languageDraft = null;
    goHome();
  });
}

function renderSettingsScreensaver(){
  const screen = document.getElementById("screen");
  screen.innerHTML = `
    <div class="formScreen">
      <div class="formTitle">${t("CLTextId_CONFIG_SCREEN_SAVER")}</div>
      <div class="ssRow">
        <div class="formBtn ${state.settings.screensaverEnabled ? "on" : "off"}" id="ssToggle">
          ${state.settings.screensaverEnabled ? "ON" : "OFF"}
        </div>
        <div class="ssFrame">
          ${state.settings.screensaverMinutes} min
        </div>
        <div class="ssCol">
          <div class="formBtn" id="ssUp">▲</div>
          <div class="formBtn" id="ssDn">▼</div>
        </div>
      </div>
      <div class="formFooter">
        <button class="formOk">OK</button>
        <button class="formBack">${t("CLTextId_BACK")}</button>
      </div>
    </div>
  `;
  screen.querySelector("#ssToggle").addEventListener("click", ()=>{
    state.settings.screensaverEnabled = !state.settings.screensaverEnabled;
    renderSettingsScreensaver();
  });
  screen.querySelector("#ssUp").addEventListener("click", ()=>{
    if(!state.settings.screensaverEnabled) return;
    state.settings.screensaverMinutes = Math.min(60, state.settings.screensaverMinutes + 1);
    renderSettingsScreensaver();
  });
  screen.querySelector("#ssDn").addEventListener("click", ()=>{
    if(!state.settings.screensaverEnabled) return;
    state.settings.screensaverMinutes = Math.max(1, state.settings.screensaverMinutes - 1);
    renderSettingsScreensaver();
  });
  screen.querySelector(".formBack").addEventListener("click", goBack);
  screen.querySelector(".formOk").addEventListener("click", goBack);
}

function renderSettingsDateTime(){
  const screen = document.getElementById("screen");
  const now = new Date();
  const dateText = now.toLocaleDateString("it-IT");
  const timeText = now.toLocaleTimeString("it-IT", { hour: "2-digit", minute: "2-digit" });
  screen.innerHTML = `
    <div class="formScreen">
      <div class="formTitle">${t("CLTextId_DATE_SETTINGS")}</div>
      <div class="formRow">
        <div class="formFrame wide">
          <div class="formLabel">${t("CLTextId_DATE")}</div>
          <div class="formValue">${dateText}</div>
        </div>
        <div class="formFrame wide">
          <div class="formLabel">${t("CLTextId_TIME")}</div>
          <div class="formValue">${timeText}</div>
        </div>
      </div>
      <div class="formFooter">
        <button class="formOk">OK</button>
        <button class="formBack">${t("CLTextId_BACK")}</button>
      </div>
    </div>
  `;
  screen.querySelector(".formBack").addEventListener("click", goBack);
  screen.querySelector(".formOk").addEventListener("click", goBack);
}

function renderSettingsWeekly(){
  const screen = document.getElementById("screen");
  screen.innerHTML = `
    <div class="formScreen">
      <div class="formTitle">${t("CLTextId_WEEKLY_SETTINGS")}</div>
      <div class="formRow">
        <div class="formBtn ${state.settings.weeklyEnabled ? "on" : "off"}" id="weeklyToggle">
          ${state.settings.weeklyEnabled ? "ON" : "OFF"}
        </div>
        <div class="formCol wide">
          <div class="formBtn" data-nav="weekly_program">${t("CLTextId_PROGRAM")}</div>
          <div class="formBtn" data-nav="weekly_view">${t("CLTextId_VIEW")}</div>
        </div>
      </div>
      <div class="formRow">
        <div class="formBtn" data-nav="settings_clima">${t("CLTextId_CLIMA_SETTINGS")}</div>
        <div class="formBtn" data-nav="weekly_speed">${t("CLTextId_SPEED")}</div>
      </div>
      <div class="formFooter">
        <button class="formOk">OK</button>
        <button class="formBack">${t("CLTextId_BACK")}</button>
      </div>
    </div>
  `;
  screen.querySelector("#weeklyToggle").addEventListener("click", ()=>{
    state.settings.weeklyEnabled = !state.settings.weeklyEnabled;
    renderSettingsWeekly();
  });
  screen.querySelectorAll("[data-nav]").forEach(btn=>{
    btn.addEventListener("click", ()=>{
      const id = btn.getAttribute("data-nav");
      const textIdMap = {
        weekly_program: "CLTextId_WEEKLY_PROGRAMMER",
        weekly_view: "CLTextId_VIEW",
        weekly_speed: "CLTextId_SPEED",
        settings_clima: "CLTextId_CLIMA_SETTINGS"
      };
      const node = { name: btn.textContent.trim(), id, textId: textIdMap[id] };
      state.nav.stack.push(node);
      state.nav.selectedIndex = 0;
      render();
    });
  });
  screen.querySelector(".formBack").addEventListener("click", goBack);
  screen.querySelector(".formOk").addEventListener("click", goBack);
}

function renderSettingsClima(){
  const screen = document.getElementById("screen");
  const sunPct = Math.round(((state.settings.tempSun - 15) / (32 - 15)) * 100);
  const moonPct = Math.round(((state.settings.tempMoon - 15) / (32 - 15)) * 100);
  screen.innerHTML = `
    <div class="formScreen">
      <div class="formTitle">${t("CLTextId_CLIMA_SETTINGS")}</div>
      <div class="climaLayout">
        <div class="climaToggleCol">
          <div class="formBtn ${state.settings.climaPreheater ? "on" : "off"}" id="preheater">${t("CLTextId_PREHEATER")}</div>
          <div class="formBtn ${state.settings.climaSummer ? "on" : "off"}" id="summer">${t("CLTextId_SUMMER")}</div>
          <div class="formBtn ${state.settings.climaWinter ? "on" : "off"}" id="winter">${t("CLTextId_WINTER")}</div>
        </div>
        <div class="climaPanels">
          <div class="climaFrame">
            <div class="formLabel">${t("CLTextId_SUN")}</div>
            <div class="climaBar"><div class="climaBarFill" style="height:${sunPct}%"></div></div>
            <div class="climaBtns">
              <div class="formBtn" id="sunUp">▲</div>
              <div class="formBtn" id="sunDn">▼</div>
              <div class="climaTemp">${state.settings.tempSun} °C</div>
            </div>
          </div>
          <div class="climaFrame">
            <div class="formLabel">MOON</div>
            <div class="climaBar"><div class="climaBarFill" style="height:${moonPct}%"></div></div>
            <div class="climaBtns">
              <div class="formBtn" id="moonUp">▲</div>
              <div class="formBtn" id="moonDn">▼</div>
              <div class="climaTemp">${state.settings.tempMoon} °C</div>
            </div>
          </div>
        </div>
      </div>
      <div class="formFooter">
        <button class="formOk">OK</button>
        <button class="formBack">${t("CLTextId_BACK")}</button>
      </div>
    </div>
  `;
  screen.querySelector("#preheater").addEventListener("click", ()=>{
    state.settings.climaPreheater = !state.settings.climaPreheater;
    renderSettingsClima();
  });
  screen.querySelector("#summer").addEventListener("click", ()=>{
    state.settings.climaSummer = !state.settings.climaSummer;
    if(state.settings.climaSummer) state.settings.climaWinter = false;
    renderSettingsClima();
  });
  screen.querySelector("#winter").addEventListener("click", ()=>{
    state.settings.climaWinter = !state.settings.climaWinter;
    if(state.settings.climaWinter) state.settings.climaSummer = false;
    renderSettingsClima();
  });
  screen.querySelector("#sunUp").addEventListener("click", ()=>{
    state.settings.tempSun = Math.min(32, state.settings.tempSun + 1);
    renderSettingsClima();
  });
  screen.querySelector("#sunDn").addEventListener("click", ()=>{
    state.settings.tempSun = Math.max(15, state.settings.tempSun - 1);
    renderSettingsClima();
  });
  screen.querySelector("#moonUp").addEventListener("click", ()=>{
    state.settings.tempMoon = Math.min(32, state.settings.tempMoon + 1);
    renderSettingsClima();
  });
  screen.querySelector("#moonDn").addEventListener("click", ()=>{
    state.settings.tempMoon = Math.max(15, state.settings.tempMoon - 1);
    renderSettingsClima();
  });
  screen.querySelector(".formBack").addEventListener("click", goBack);
  screen.querySelector(".formOk").addEventListener("click", goBack);
}

function renderSettingsParty(){
  const screen = document.getElementById("screen");
  screen.innerHTML = `
    <div class="formScreen">
      <div class="formTitle">${t("CLTextId_SET_PARTY_TIMER")}</div>
      <div class="formRow">
        <div class="formBtn ${state.settings.partyEnabled ? "on" : "off"}" id="partyToggle">
          ${state.settings.partyEnabled ? "ON" : "OFF"}
        </div>
        <div class="formFrame">
          <div class="formValue">${state.settings.partyMinutes} min</div>
        </div>
        <div class="formCol">
          <div class="formBtn" id="partyUp">▲</div>
          <div class="formBtn" id="partyDn">▼</div>
        </div>
      </div>
      <div class="formFooter">
        <button class="formOk">OK</button>
        <button class="formBack">${t("CLTextId_BACK")}</button>
      </div>
    </div>
  `;
  screen.querySelector("#partyToggle").addEventListener("click", ()=>{
    state.settings.partyEnabled = !state.settings.partyEnabled;
    renderSettingsParty();
  });
  screen.querySelector("#partyUp").addEventListener("click", ()=>{
    if(!state.settings.partyEnabled) return;
    state.settings.partyMinutes = Math.min(240, state.settings.partyMinutes + 5);
    renderSettingsParty();
  });
  screen.querySelector("#partyDn").addEventListener("click", ()=>{
    if(!state.settings.partyEnabled) return;
    state.settings.partyMinutes = Math.max(15, state.settings.partyMinutes - 5);
    renderSettingsParty();
  });
  screen.querySelector(".formBack").addEventListener("click", goBack);
  screen.querySelector(".formOk").addEventListener("click", goBack);
}

function renderSettingsPassword(){
  const screen = document.getElementById("screen");
  screen.innerHTML = `
    <div class="formScreen">
      <div class="formTitle">${t("CLTextId_PASSWORD_SETTINGS")}</div>
      <div class="formRow">
        <div class="formBtn ${state.settings.passwordEnabled ? "on" : "off"}" id="pwdToggle">
          ${state.settings.passwordEnabled ? "ON" : "OFF"}
        </div>
        <div class="formBtn wide" id="pwdChange">${t("CLTextId_CHANGE_PASSWORD")}</div>
      </div>
      <div class="formFooter">
        <button class="formOk">OK</button>
        <button class="formBack">${t("CLTextId_BACK")}</button>
      </div>
    </div>
  `;
  screen.querySelector("#pwdToggle").addEventListener("click", ()=>{
    state.settings.passwordEnabled = !state.settings.passwordEnabled;
    renderSettingsPassword();
  });
  screen.querySelector("#pwdChange").addEventListener("click", ()=>{
    // placeholder action
    renderSettingsPassword();
  });
  screen.querySelector(".formBack").addEventListener("click", goBack);
  screen.querySelector(".formOk").addEventListener("click", goBack);
}

function renderSettingsRfm(){
  const screen = document.getElementById("screen");
  const channels = Array.from({length: 8}, (_,i)=>i+1);
  screen.innerHTML = `
    <div class="formScreen">
      <div class="formTitle">${t("CLTextId_RFM__CHANGE_CHANNEL")}</div>
      <div class="formRow">
        <div class="formFrame wide">
          ${channels.map(ch => `<div class="formListItem ${state.settings.rfmChannel===ch ? "selected" : ""}">[${String(ch).padStart(2,"0")}] OK</div>`).join("")}
        </div>
        <div class="formCol">
          <div class="formBtn" id="rfmUp">▲</div>
          <div class="formBtn" id="rfmDn">▼</div>
          <div class="formBtn" id="rfmScan">SCAN</div>
        </div>
      </div>
      <div class="formFooter">
        <button class="formOk">OK</button>
        <button class="formBack">${t("CLTextId_BACK")}</button>
      </div>
    </div>
  `;
  screen.querySelector("#rfmUp").addEventListener("click", ()=>{
    state.settings.rfmChannel = Math.max(1, state.settings.rfmChannel - 1);
    renderSettingsRfm();
  });
  screen.querySelector("#rfmDn").addEventListener("click", ()=>{
    state.settings.rfmChannel = Math.min(8, state.settings.rfmChannel + 1);
    renderSettingsRfm();
  });
  screen.querySelector("#rfmScan").addEventListener("click", ()=>{
    renderSettingsRfm();
  });
  screen.querySelector(".formBack").addEventListener("click", goBack);
  screen.querySelector(".formOk").addEventListener("click", goBack);
}

function renderSettingsMenu(){
  const screen = document.getElementById("screen");
  const pages = [SettingsP1, SettingsP2];
  const page = Math.max(0, Math.min(state.settings.menuPage, pages.length - 1));
  const items = (pages[page].children || []).slice(0, 4);

  screen.innerHTML = `
    <div class="formScreen settingsMenu">
      <div class="formTitle">${t("CLTextId_SETTINGS")} <span class="formPage">${page + 1}/${pages.length}</span></div>
      <div class="settingsList">
        ${items.map((c, idx) => `
          <div class="settingsBtn" data-idx="${idx}">${nodeLabel(c).toUpperCase()}</div>
        `).join("")}
      </div>
      <div class="settingsArrow prev">&lt;</div>
      <div class="settingsArrow next">&gt;</div>
      <div class="settingsHome">HOME</div>
    </div>
  `;

  screen.querySelectorAll(".settingsBtn").forEach(btn=>{
    btn.addEventListener("click", ()=>{
      const idx = parseInt(btn.getAttribute("data-idx"),10);
      const chosen = items[idx];
      if(chosen){
        state.nav.stack.push(chosen);
        state.nav.selectedIndex = 0;
        render();
      }
    });
  });

  screen.querySelector(".settingsArrow.prev").addEventListener("click", ()=>{
    state.settings.menuPage = Math.max(0, page - 1);
    renderSettingsMenu();
  });
  screen.querySelector(".settingsArrow.next").addEventListener("click", ()=>{
    state.settings.menuPage = Math.min(pages.length - 1, page + 1);
    renderSettingsMenu();
  });
  screen.querySelector(".settingsHome").addEventListener("click", goHome);
}

function renderWeeklyProgram(){
  const screen = document.getElementById("screen");
  screen.innerHTML = `
    <div class="formScreen">
      <div class="formTitle">${t("CLTextId_WEEKLY_PROGRAMMER")}</div>
      <div class="formHint">Placeholder for weekly edit flow.</div>
      <div class="formFooter">
        <button class="formOk">OK</button>
        <button class="formBack">${t("CLTextId_BACK")}</button>
      </div>
    </div>
  `;
  screen.querySelector(".formBack").addEventListener("click", goBack);
  screen.querySelector(".formOk").addEventListener("click", goBack);
}

function renderWeeklyView(){
  const screen = document.getElementById("screen");
  screen.innerHTML = `
    <div class="formScreen">
      <div class="formTitle">${t("CLTextId_VIEW")}</div>
      <div class="formHint">Placeholder for weekly view.</div>
      <div class="formFooter">
        <button class="formOk">OK</button>
        <button class="formBack">${t("CLTextId_BACK")}</button>
      </div>
    </div>
  `;
  screen.querySelector(".formBack").addEventListener("click", goBack);
  screen.querySelector(".formOk").addEventListener("click", goBack);
}

function renderWeeklySpeed(){
  const screen = document.getElementById("screen");
  screen.innerHTML = `
    <div class="formScreen">
      <div class="formTitle">${t("CLTextId_SPEED")}</div>
      <div class="formHint">Placeholder for speed selection.</div>
      <div class="formFooter">
        <button class="formOk">OK</button>
        <button class="formBack">${t("CLTextId_BACK")}</button>
      </div>
    </div>
  `;
  screen.querySelector(".formBack").addEventListener("click", goBack);
  screen.querySelector(".formOk").addEventListener("click", goBack);
}

const screenRenderers = {
  settings_language: renderSettingsLanguage,
  settings_screensaver: renderSettingsScreensaver,
  settings_datetime: renderSettingsDateTime,
  settings_weekly: renderSettingsWeekly,
  settings_clima: renderSettingsClima,
  settings_party: renderSettingsParty,
  settings_password: renderSettingsPassword,
  settings_rfm: renderSettingsRfm,
  weekly_program: renderWeeklyProgram,
  weekly_view: renderWeeklyView,
  weekly_speed: renderWeeklySpeed
};

function getActiveSetBoxItems(){
  return setBoxItems.filter(x => x.active);
}

function stopHomeInfoRotation(){
  if(state.timers.homeInfoTimer){ clearInterval(state.timers.homeInfoTimer); state.timers.homeInfoTimer = null; }
}

function startHomeInfoRotation(){
  stopHomeInfoRotation();
  const items = getActiveSetBoxItems();
  if(items.length === 0){
    state.home.tLabel = "";
    state.home.tValueText = "";
    if(current() === HOME) renderHome();
    return;
  }

  homeInfoIndex = 0;
  const first = items[homeInfoIndex % items.length];
  state.home.tLabel = first.textId ? t(first.textId, first.label) : first.label;
  state.home.tValueText = first.value || `${state.home.tValue} \u00b0C`;
  if(current() === HOME) renderHome();
  homeInfoIndex += 1;

  state.timers.homeInfoTimer = setInterval(() => {
    const list = getActiveSetBoxItems();
    if(list.length === 0){
      stopHomeInfoRotation();
      state.home.tLabel = "";
      state.home.tValueText = "";
      if(current() === HOME) renderHome();
      return;
    }
    const next = list[homeInfoIndex % list.length];
    state.home.tLabel = next.textId ? t(next.textId, next.label) : next.label;
    state.home.tValueText = next.value || `${state.home.tValue} \u00b0C`;
    homeInfoIndex += 1;
    if(current() === HOME) renderHome();
  }, pageVars.set_box_info.intervalMs);
}

/* Wedge segments: fill from bottom, right trapezoid */
function buildWedgeSegmentsHTML(barCount, pct, step){
  const stepVal = Math.max(1, step || 1);
  const totalLayers = Math.round(100 / stepVal);
  let activeLayers = Math.ceil((pct/100) * totalLayers);
  if(pct > 0 && activeLayers === 0) activeLayers = 1;
  const topW = 1.00;
  const bottomW = 0;
  const align = "right";

  const rows = [];
  for(let barIndex = 0; barIndex < barCount; barIndex++){
    const idxFromBottom = (barCount - 1) - barIndex;
    const layersOn = Math.max(0, Math.min(3, activeLayers - (idxFromBottom * 3)));
    const w = barCount > 1
      ? (topW - (barIndex * (topW - bottomW) / (barCount - 1)))
      : topW;
    let row = `<div class="segRow" style="width:${(w*100).toFixed(3)}%;align-self:${align}">`;
    for(let l=0;l<3;l++){
      row += `<span class="segLayer${l < layersOn ? " active" : ""}"></span>`;
    }
    row += `</div>`;
    rows.push(row);
  }

  return rows.join("");
}

/* OFF blackout */
function syncOffState(){
  const root = document.getElementById("ktsRoot");
  if(!state.home.unitOn) root.classList.add("off-state");
  else root.classList.remove("off-state");
}

/* --------------------------
   Render HOME
-------------------------- */
function renderHome(){
  const screen = document.getElementById("screen");

  const timeText = "05:05  MAR";
  const dateText = "25/03/2040";
  const strokeColor = state.home.unitOn ? "var(--green)" : "var(--red)";
  const barCount = Math.max(1, Math.ceil(100 / (pageVars.home.speedStep * 3)));

  screen.innerHTML = `
    <div class="home">
      <div class="leftArea">
        <div class="box powerBox">
          <div class="powerBtn" id="pwrBtn" title="Power ON/OFF">
            <svg viewBox="0 0 64 64" aria-label="Power" class="powerIcon">
              <circle cx="32" cy="32" r="22" fill="none" stroke="${strokeColor}" stroke-width="10" stroke-linecap="butt"/>
              <line x1="32" y1="8" x2="32" y2="28" stroke="${strokeColor}" stroke-width="10" stroke-linecap="butt"/>
            </svg>
          </div>
        </div>

        <div class="box tempBox">
          <div class="px label">${state.home.tLabel}\n${state.home.tValueText}</div>
        </div>
      </div>

      <div class="box speedBox">
        <div class="speed-wedge" aria-label="Speed wedge">
          <div class="wedgeWrap">
            <div class="segments" id="segments">
              ${buildWedgeSegmentsHTML(barCount, state.home.unitOn ? state.home.speedPct : 0, pageVars.home.speedStep)}
            </div>
          </div>
        </div>
        <div class="wedgePct px" id="pctLabel">${state.home.unitOn ? state.home.speedPct : 0} %</div>

        <div class="arrows">
          <div class="kbtn arrowBtn ${state.home.unitOn ? '' : 'disabled'}" id="spdUp"><div class="tri up"></div></div>
          <div class="kbtn arrowBtn ${state.home.unitOn ? '' : 'disabled'}" id="spdDn"><div class="tri down"></div></div>
        </div>

      </div>

      <div class="menuBtn px" id="homeMenu">${t("CLTextId_MENU")}</div>

      <div class="box datetime px">
        <div>${timeText}</div>
        <div>${dateText}</div>
      </div>
    </div>
  `;

  document.getElementById("homeMenu").addEventListener("click", () => {
    if(!state.home.unitOn) return;
    state.nav.stack.push(MENU);
    state.nav.selectedIndex = 0;
    render();
  });

  document.getElementById("pwrBtn").addEventListener("click", () => {
    state.home.unitOn = !state.home.unitOn;
    if(!state.home.unitOn) state.home.speedPct = 0;
    syncOffState();
    renderHome();
    updateButtons();
    // Search navigation is blocked in OFF (handled in goToPath)
  });

  document.getElementById("spdUp").addEventListener("click", () => {
    if(!state.home.unitOn) return;
    state.home.speedPct = Math.min(100, state.home.speedPct + pageVars.home.speedStep);
    renderHome();
  });
  document.getElementById("spdDn").addEventListener("click", () => {
    if(!state.home.unitOn) return;
    state.home.speedPct = Math.max(0, state.home.speedPct - pageVars.home.speedStep);
    renderHome();
  });

  document.querySelector(".tempBox").addEventListener("click", () => {
    if(!state.home.unitOn) return;
    state.nav.stack.push(SET_BOX_INFO);
    state.nav.selectedIndex = 0;
    render();
  });

}

/* --------------------------
   Render LIST
-------------------------- */
function renderList(){
  const screen = document.getElementById("screen");
  const where = document.getElementById("where");
  const path = document.getElementById("path");
  const count = document.getElementById("count");
  const sel = document.getElementById("sel");

  where.textContent = nodeLabel(current());
  path.textContent = pathText();

  const k = kids(current());
  clampSel();

  count.textContent = `${k.length} item(s)`;
  sel.textContent = `Selected: ${k[state.nav.selectedIndex] ? nodeLabel(k[state.nav.selectedIndex]) : "\u2014"}`;

  if(k.length===0){
    screen.innerHTML = `
      <div class="grid">
        <div class="item" style="cursor:default">
          <div>
            <div class="label">No items</div>
            <div class="hint">Use BACK to go up</div>
          </div>
          <div class="right"><span class="dot leaf"></span></div>
        </div>
      </div>
    `;
    updateButtons();
    return;
  }

  let html = `<div class="grid">`;
  k.forEach((c, idx) => {
    const dot = isLeaf(c) ? "dot leaf" : "dot node";
    const hint = isLeaf(c) ? "Leaf" : `${kids(c).length} sub-item(s)`;
    const enterTxt = isLeaf(c) ? "" : "Enter ->";
    html += `
      <div class="item" data-idx="${idx}">
        <div>
          <div class="label">${nodeLabel(c)}</div>
          <div class="hint">${hint}</div>
        </div>
        <div class="right">
          <span class="${dot}"></span>
          <span>${enterTxt}</span>
        </div>
      </div>
    `;
  });
  html += `</div>`;
  screen.innerHTML = html;

  screen.querySelectorAll(".item").forEach(it=>{
    it.addEventListener("click", ()=>{
      state.nav.selectedIndex = parseInt(it.getAttribute("data-idx"),10);
      const chosen = kids(current())[state.nav.selectedIndex];
      if(chosen && (!isLeaf(chosen) || isScreenNode(chosen))) enterSelected();
      else render();
    });
  });

  updateButtons();
}

/* --------------------------
   Render MENU (tiles)
-------------------------- */
function renderMenu(){
  const screen = document.getElementById("screen");
  const where = document.getElementById("where");
  const path = document.getElementById("path");

  where.textContent = nodeLabel(current());
  path.textContent = pathText();

  const k = kids(current());
  const tiles = k.map((c, idx) => (
    `<div class="menuTile" data-idx="${idx}">${nodeLabel(c)}</div>`
  )).join("");

  screen.innerHTML = `
    <div class="menuScreen">
      ${tiles}
      <div class="homeFab" id="menuHome" title="Home">
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M12 3l9 7h-2v9h-5v-6h-4v6H5v-9H3l9-7z"></path>
        </svg>
      </div>
    </div>
  `;

  screen.querySelectorAll(".menuTile").forEach(it=>{
    it.addEventListener("click", ()=>{
      const idx = parseInt(it.getAttribute("data-idx"),10);
      state.nav.selectedIndex = idx;
      const chosen = kids(current())[state.nav.selectedIndex];
      if(chosen){
        state.nav.stack.push(chosen);
        state.nav.selectedIndex = 0;
        render();
      }
    });
  });

  document.getElementById("menuHome").addEventListener("click", goHome);

  updateButtons();
}

/* --------------------------
   Render SET BOX INFO
-------------------------- */
function renderSetBoxInfo(){
  const screen = document.getElementById("screen");
  const where = document.getElementById("where");
  const path = document.getElementById("path");

  where.textContent = nodeLabel(current());
  path.textContent = pathText();

  if(pageVars.set_box_info && Array.isArray(pageVars.set_box_info.selectedIds)){
    setBoxItems.forEach(item => {
      item.active = pageVars.set_box_info.selectedIds.includes(item.id);
    });
  }

  const tiles = setBoxItems.map((item) => {
    const activeClass = item.active ? " green" : "";
    const label = item.textId ? t(item.textId, item.label) : item.label;
    return `<div class="setBoxBtn${activeClass}" data-id="${item.id}">${label}</div>`;
  }).join("");

  screen.innerHTML = `
    <div class="setBoxScreen">
      <div class="setBoxTitle">${t("CLTextId_CONFIG_BOX_INFO")}</div>
      <div class="setBoxGrid">
        ${tiles}
      </div>
      <div class="setBoxBottom">
        <div class="setBoxBtn ok">OK</div>
        <div class="setBoxBtn back">${t("CLTextId_BACK")}</div>
        <div class="spacer"></div>
        <div class="homeFab" id="setBoxHome" title="Home">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M12 3l9 7h-2v9h-5v-6h-4v6H5v-9H3l9-7z"></path>
          </svg>
        </div>
      </div>
    </div>
  `;

  screen.querySelectorAll(".setBoxGrid .setBoxBtn").forEach(btn=>{
    btn.addEventListener("click", ()=>{
      const id = btn.getAttribute("data-id");
      const item = setBoxItems.find(x => x.id === id);
      if(!item) return;
      item.active = !item.active;
      pageVars.set_box_info.selectedIds = setBoxItems
        .filter(x => x.active)
        .map(x => x.id);
      savePageVars();
      renderSetBoxInfo();
      startHomeInfoRotation();
    });
  });

  screen.querySelector(".setBoxBtn.back").addEventListener("click", goBack);
  screen.querySelector(".setBoxBtn.ok").addEventListener("click", goBack);
  document.getElementById("setBoxHome").addEventListener("click", goHome);

  updateButtons();
}

/* --------------------------
   Main render
-------------------------- */
function render(){
  const where = document.getElementById("where");
  const path = document.getElementById("path");

  where.textContent = nodeLabel(current());
  path.textContent = pathText();

  if(current() === HOME){
    document.getElementById("count").textContent = "\u2014";
    document.getElementById("sel").textContent = "Selected: \u2014";
    syncOffState();
    renderHome();
    startHomeInfoRotation();
    updateButtons();
    return;
  }
  if(current() === MENU){
    renderMenu();
    return;
  }
  if(current() === Settings){
    renderSettingsMenu();
    updateButtons();
    return;
  }
  if(current() === SET_BOX_INFO){
    renderSetBoxInfo();
    return;
  }
  if(isScreenNode(current()) && screenRenderers[current().id]){
    screenRenderers[current().id]();
    updateButtons();
    return;
  }
  renderList();
}

/* --------------------------
   Navigation
-------------------------- */
function goHome(){ if(!state.home.unitOn) return; state.nav.stack = [HOME]; state.nav.selectedIndex = 0; render(); }
function goBack(){ if(!state.home.unitOn) return; if(state.nav.stack.length>1){ state.nav.stack.pop(); state.nav.selectedIndex=0; render(); } }
function enterSelected(){
  if(!state.home.unitOn) return;
  const k = kids(current());
  const chosen = k[state.nav.selectedIndex];
  if(!chosen) return;
  if(!isLeaf(chosen) || isScreenNode(chosen)){
    state.nav.stack.push(chosen);
    state.nav.selectedIndex = 0;
    render();
  }
}
function pageStep(dir){
  if(!state.home.unitOn) return;
  const cur = current();
  if(state.nav.stack.length < 2) return;

  const parent = state.nav.stack[state.nav.stack.length-2];
  const siblings = kids(parent);
  const idx = siblings.findIndex(s=>s===cur);
  if(idx<0 || !cur.pageGroup) return;

  const group = siblings
    .map((n,i)=>({n,i}))
    .filter(x=>x.n.pageGroup === cur.pageGroup)
    .sort((a,b)=>(a.n.pageIndex||0)-(b.n.pageIndex||0));

  const pos = group.findIndex(x=>x.n===cur);
  const nextPos = pos + dir;
  if(nextPos<0 || nextPos>=group.length) return;

  state.nav.stack[state.nav.stack.length-1] = group[nextPos].n;
  state.nav.selectedIndex=0;
  render();
}
function updateButtons(){
  const btnBack = document.getElementById("btnBack");
  const btnHome = document.getElementById("btnHome");
  const btnPrev = document.getElementById("btnPrev");
  const btnNext = document.getElementById("btnNext");
  const btnOk   = document.getElementById("btnOk");

  btnBack.disabled = (!state.home.unitOn) || (state.nav.stack.length <= 1);
  btnHome.disabled = (!state.home.unitOn) || (state.nav.stack.length === 1);
  btnOk.disabled   = (!state.home.unitOn) || (current() === HOME) || (kids(current()).length === 0);

  let canPrev=false, canNext=false;
  if(state.home.unitOn && state.nav.stack.length >= 2){
    const cur = current();
    const parent = state.nav.stack[state.nav.stack.length-2];
    if(cur.pageGroup){
      const siblings = kids(parent);
      const group = siblings
        .filter(n => n.pageGroup === cur.pageGroup)
        .sort((a,b)=>(a.pageIndex||0)-(b.pageIndex||0));
      const pos = group.findIndex(n=>n===cur);
      canPrev = group.length>1 && pos>0;
      canNext = group.length>1 && pos<group.length-1;
    }
  }
  btnPrev.disabled = !canPrev;
  btnNext.disabled = !canNext;
}

/* Buttons */
document.getElementById("btnHome").addEventListener("click", goHome);
document.getElementById("btnBack").addEventListener("click", goBack);
document.getElementById("btnOk").addEventListener("click", enterSelected);
document.getElementById("btnPrev").addEventListener("click", ()=>pageStep(-1));
document.getElementById("btnNext").addEventListener("click", ()=>pageStep(+1));

/* --------------------------
   SEARCH INDEX
-------------------------- */
let index = []; // { label, node, pathNodes, pathText, depth }
let navPathMap = new Map();

function buildIndex(){
  index = [];
  const root = HOME;

  function walk(n, pathNodes){
    const newPath = [...pathNodes, n];
    if(n !== HOME){ // exclude HOME from results if you want
      index.push({
        label: nodeLabel(n),
        node: n,
        pathNodes: newPath,
        pathText: newPath.map(x=>nodeLabel(x)).join(" \u2192 "),
        depth: newPath.length
      });
    }
    (n.children || []).forEach(ch => walk(ch, newPath));
  }
  walk(root, []);
}

function buildNavTree(){
  const root = HOME;
  let idCounter = 0;
  navPathMap = new Map();

  function nodeHtml(n, pathNodes){
    const newPath = [...pathNodes, n];
    const pathId = `p${idCounter++}`;
    navPathMap.set(pathId, newPath);
    const docPath = docPathForNode(n);
    const docLink = docPath
      ? `<a class="navDoc" href="${docPath}" target="_blank" rel="noopener">DOC</a>`
      : "";
    const label = `<span class="navLabel" data-path="${pathId}">${nodeLabel(n)}</span>${docLink}`;
    const children = kids(n);
    if(children.length > 0){
      const openAttr = n === HOME ? " open" : "";
      return `
        <details class="navGroup"${openAttr}>
          <summary><span class="navCaret">\u25B8</span>${label}</summary>
          <div class="navChildren">
            ${children.map(ch => nodeHtml(ch, newPath)).join("")}
          </div>
        </details>
      `;
    }
    return `<div class="navLeaf">${label}</div>`;
  }

  const treeEl = document.getElementById("navTree");
  if(!treeEl) return;
  treeEl.innerHTML = nodeHtml(root, []);
  treeEl.querySelectorAll("details.navGroup").forEach(d => { d.open = true; });
  treeEl.querySelectorAll(".navLabel").forEach(labelEl=>{
    labelEl.addEventListener("click", (e)=>{
      e.stopPropagation();
      const id = labelEl.getAttribute("data-path");
      const pathNodes = navPathMap.get(id);
      if(pathNodes) goToPath(pathNodes);
    });
  });
}

function normalize(s){
  return (s||"")
    .toLowerCase()
    .replace(/\s+/g," ")
    .trim();
}

function search(q){
  const qq = normalize(q);
  if(qq.length < 2) return [];
  return index
    .filter(r => normalize(r.label).includes(qq) || normalize(r.pathText).includes(qq))
    .sort((a,b) => a.depth - b.depth || a.label.localeCompare(b.label))
    .slice(0, 25);
}

/* Navigate directly to a path */
function goToPath(pathNodes){
  if(!state.home.unitOn) return; // blocked when OFF
  // pathNodes starts with HOME, then MENU, then...
  state.nav.stack = [HOME];
  for(let i=1;i<pathNodes.length;i++){
    state.nav.stack.push(pathNodes[i]);
  }
  state.nav.selectedIndex = 0;
  render();
}

/* Search UI */
const searchInput = document.getElementById("searchInput");
const resultsEl = document.getElementById("results");
const searchClear = document.getElementById("searchClear");

function renderResults(list){
  if(list.length === 0){
    resultsEl.classList.remove("active");
    resultsEl.innerHTML = "";
    return;
  }
  resultsEl.classList.add("active");
  resultsEl.innerHTML = list.map((r, idx) => `
    <div class="resItem" data-idx="${idx}">
      <div class="resTitle">${r.label}</div>
      <div class="resPath">${r.pathText}</div>
      <div class="pill">${tSearch("pill")}</div>
    </div>
  `).join("");

  resultsEl.querySelectorAll(".resItem").forEach(el=>{
    el.addEventListener("click", ()=>{
      const idx = parseInt(el.getAttribute("data-idx"),10);
      const picked = list[idx];
      if(!picked) return;
      goToPath(picked.pathNodes);
      // after jump show path in top bar automatically
    });
  });
}

searchInput.addEventListener("input", ()=>{
  const list = search(searchInput.value);
  renderResults(list);
});

searchInput.addEventListener("keydown", (e)=>{
  if(e.key === "Enter"){
    const list = search(searchInput.value);
    if(list.length > 0){
      goToPath(list[0].pathNodes);
    }
  }
});

searchClear.addEventListener("click", ()=>{
  searchInput.value = "";
  renderResults([]);
  searchInput.focus();
});

/* Init */
loadPageVars();
loadLanguage();
buildIndex();
buildNavTree();
applyStaticTranslations();
render();

