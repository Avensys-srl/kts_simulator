/* --------------------------
   DATA MODEL (tree)
-------------------------- */
function node(name, children = [], opts = {}) {
  return { name, children, ...opts };
}

const SettingsP1 = node("Settings (Page 1/2)", [
  node("Language settings", [], { id: "settings_language", textId: "CLTextId_SELECTION_LANGUAGE" }),
  node("Screensaver", [], { id: "settings_screensaver", textId: "CLTextId_CONFIG_SCREEN_SAVER" }),
  node("Date and time settings", [], { id: "settings_datetime", textId: "CLTextId_DATE_SETTINGS" }),
  node("Weekly settings", [
    node("ON / OFF", [], { id: "weekly_toggle" }),
    node("Program", [], { id: "weekly_program", textId: "CLTextId_PROGRAM" }),
    node("View", [], { id: "weekly_view", textId: "CLTextId_VIEW" }),
    node("Clima settings", [], { id: "settings_clima", textId: "CLTextId_CLIMA_SETTINGS" }),
    node("Speed", [], { id: "weekly_speed", textId: "CLTextId_SPEED" })
  ], { id: "settings_weekly", textId: "CLTextId_WEEKLY_PROGRAMMER" })
], { pageGroup:"settings", pageIndex:1, pageTotal:2, textId: "CLTextId_SETTINGS" });

const SettingsP2 = node("Settings (Page 2/2)", [
  node("Climate settings", [], { id: "settings_clima", textId: "CLTextId_CLIMA_SETTINGS" }),
  node("Party settings", [], { id: "settings_party", textId: "CLTextId_PARTY_SETTINGS" }),
  node("Password settings", [], { id: "settings_password", textId: "CLTextId_PASSWORD_SETTINGS" }),
  node("Set RFM channel", [], { id: "settings_rfm", textId: "CLTextId_RFM__CHANGE_CHANNEL" })
], { pageGroup:"settings", pageIndex:2, pageTotal:2, textId: "CLTextId_SETTINGS" });

const InputSettings = node("Input settings", [
  node("Page 1/3", [
    node("Enable / Disable"),
    node("Regulation air flow (0-10 V)"),
    node("Input channel (INPUT 1 / INPUT 2)")
], { pageGroup:"input", pageIndex:1, pageTotal:3, textId: "CLTextId_INPUT_CONFIG" }),
  node("Page 2/3", [
    node("Enable / Disable"),
    node("Season toggle (Summer / Winter)", [
      node("0 V = winter"),
      node("10 V = summer")
    ]),
    node("Target UNIT (fan)"),
    node("Target BPD (bypass damper)")
], { pageGroup:"input", pageIndex:2, pageTotal:3, textId: "CLTextId_INPUT_CONFIG" }),
  node("Page 3/3", [
    node("Enable / Disable"),
    node("Fire alarm behavior", [
      node("Stop extract + stop supply"),
      node("Start extract + stop supply"),
      node("Stop extract + start supply"),
      node("Start extract + start supply")
    ])
], { pageGroup:"input", pageIndex:3, pageTotal:3, textId: "CLTextId_INPUT_CONFIG" })
], { textId: "CLTextId_INPUT_CONFIG" });

const ServiceP1 = node("Page 1/6", [
  node("Disconnect accessories", [], { textId: "CLTextId_DISCONNECT_ACCESSORY" }),
  node("Ventilation control", [
    node("CAF"),
    node("FSC"),
    node("CAP"),
    node("CAP calibration procedure")
  ], { textId: "CLTextId_VENTILATION_CONTROL" }),
  node("Airflow settings", [
    node("Three speeds"),
    node("Stepless (speed)")
  ], { textId: "CLTextId_AIRFLOW_CONFIG" }),
  InputSettings
], { pageGroup:"service", pageIndex:1, pageTotal:6 });

const Service = node("Service (password required)", [
  ServiceP1,
  node("Page 2/6", [
    node("Output settings", [], { id: "output_settings", textId: "CLTextId_OUTPUT_CONFIG" }),
    node("BPD settings", [], { id: "bpd_settings", textId: "CLTextId_BPD_SETTINGS" }),
    node("Unbalanced airflow", [], { id: "unbalanced_airflow", textId: "CLTextId_UNBALANCE_AIRFLOW" }),
    node("Filter settings", [], { textId: "CLTextId_FILTER_SETTINGS" })
  ], { pageGroup:"service", pageIndex:2, pageTotal:6 }),
  node("Page 3/6", [
    node("RH settings", [], { textId: "CLTextId_RH_SETTINGS" }),
    node("CO2 settings", [], { textId: "CLTextId_CO2_SETTINGS" }),
    node("VOC settings", [], { textId: "CLTextId_VOC_CONFIG" }),
    node("Temperature hysteresis", [], { textId: "CLTextId_TEMPERATURE_HYSTERESIS" })
  ], { pageGroup:"service", pageIndex:3, pageTotal:6 }),
  node("Page 4/6", [
    node("Report data (admin)", [], { textId: "CLTextId_REPORT_DATA" }),
    node("Upgrade", [], { textId: "CLTextId_UPGRADE" }),
    node("Change password", [], { textId: "CLTextId_CHANGE_PASSWORD" }),
    node("Probes settings", [
      node("Temperature probe settings", [
        node("Return", [], { textId: "CLTextId_RETURN" }),
        node("Supply", [], { textId: "CLTextId_SUPPLY" })
      ])
    ], { textId: "CLTextId_PROBES_SETTINGS" })
  ], { pageGroup:"service", pageIndex:4, pageTotal:6 }),
  node("Page 5/6", [
    node("Modbus settings", [], { textId: "CLTextId_MODBUS_SETTINGS" }),
    node("Test unit"),
    node("EEPROM reset"),
    node("Reference temperature settings", [], { textId: "CLTextId_REFERENCE_T_SETTING" })
  ], { pageGroup:"service", pageIndex:5, pageTotal:6 }),
  node("Page 6/6", [
    node("DSC update delay"),
    node("PIR settings"),
    node("Clean event settings", [], { textId: "CLTextId_CLEAN_EVENT_UPDATE" })
  ], { pageGroup:"service", pageIndex:6, pageTotal:6 })
], { textId: "CLTextId_SERVICE" });

const Info = node("Info", [
  node("Page 1/3", [
    node("Device ID"),
    node("Serial ID"),
    node("Firmware version"),
    node("Software version"),
    node("Hardware version"),
    node("Unit type"),
    node("KTS type (Basic / Extra)"),
    node("Counter"),
    node("Probes")
  ], { pageGroup:"info", pageIndex:1, pageTotal:3 }),
  node("Page 2/3", [ node("QR code (unit summary)") ], { pageGroup:"info", pageIndex:2, pageTotal:3 }),
  node("Page 3/3", [
    node("Accessories list", [
      node("HWD"),
      node("MBUS"),
      node("BPD"),
      node("CWD"),
      node("DPP V2"),
      node("INP"),
      node("OUT"),
      node("EPBD"),
      node("CAPS"),
      node("CAPR")
    ])
  ], { pageGroup:"info", pageIndex:3, pageTotal:3 })
], { textId: "CLTextId_INFO" });

const Settings = node("Settings", [ SettingsP1, SettingsP2 ], { textId: "CLTextId_SETTINGS" });
const MENU = node("MENU", [ Settings, Service, Info ], { textId: "CLTextId_MENU" });
const SET_BOX_INFO = node("SET BOX INFO", [], { textId: "CLTextId_CONFIG_BOX_INFO" });
const HOME = node("HOME", [ MENU, SET_BOX_INFO ]);
