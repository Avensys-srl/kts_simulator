/* --------------------------
   DATA MODEL (tree)
-------------------------- */
function node(name, children = [], opts = {}) {
  return { name, children, ...opts };
}

const SettingsP1 = node("Settings (Page 1/2)", [
  node("Language settings", [], { id: "settings_language" }),
  node("Screensaver", [], { id: "settings_screensaver" }),
  node("Date and time settings", [], { id: "settings_datetime" }),
  node("Weekly settings", [
    node("ON / OFF", [], { id: "weekly_toggle" }),
    node("Program", [], { id: "weekly_program" }),
    node("View", [], { id: "weekly_view" }),
    node("Clima settings", [], { id: "settings_clima" }),
    node("Speed", [], { id: "weekly_speed" })
  ], { id: "settings_weekly" })
], { pageGroup:"settings", pageIndex:1, pageTotal:2 });

const SettingsP2 = node("Settings (Page 2/2)", [
  node("Climate settings", [], { id: "settings_clima" }),
  node("Party settings", [], { id: "settings_party" }),
  node("Password settings", [], { id: "settings_password" }),
  node("Set RFM channel", [], { id: "settings_rfm" })
], { pageGroup:"settings", pageIndex:2, pageTotal:2 });

const InputSettings = node("Input settings", [
  node("Page 1/3", [
    node("Enable / Disable"),
    node("Regulation air flow (0-10 V)"),
    node("Input channel (INPUT 1 / INPUT 2)")
  ], { pageGroup:"input", pageIndex:1, pageTotal:3 }),
  node("Page 2/3", [
    node("Enable / Disable"),
    node("Season toggle (Summer / Winter)", [
      node("0 V = winter"),
      node("10 V = summer")
    ]),
    node("Target UNIT (fan)"),
    node("Target BPD (bypass damper)")
  ], { pageGroup:"input", pageIndex:2, pageTotal:3 }),
  node("Page 3/3", [
    node("Enable / Disable"),
    node("Fire alarm behavior", [
      node("Stop extract + stop supply"),
      node("Start extract + stop supply"),
      node("Stop extract + start supply"),
      node("Start extract + start supply")
    ])
  ], { pageGroup:"input", pageIndex:3, pageTotal:3 })
]);

const ServiceP1 = node("Page 1/6", [
  node("Disconnect accessories"),
  node("Ventilation control", [
    node("CAF"),
    node("FSC"),
    node("CAP"),
    node("CAP calibration procedure")
  ]),
  node("Airflow settings", [
    node("Three speeds"),
    node("Stepless (speed)")
  ]),
  InputSettings
], { pageGroup:"service", pageIndex:1, pageTotal:6 });

const Service = node("Service (password required)", [
  ServiceP1,
  node("Page 2/6", [
    node("Output settings"),
    node("BPD settings"),
    node("Unbalanced airflow"),
    node("Filter settings")
  ], { pageGroup:"service", pageIndex:2, pageTotal:6 }),
  node("Page 3/6", [
    node("RH settings"),
    node("CO2 settings"),
    node("VOC settings"),
    node("Temperature hysteresis")
  ], { pageGroup:"service", pageIndex:3, pageTotal:6 }),
  node("Page 4/6", [
    node("Report data (admin)"),
    node("Upgrade"),
    node("Change password"),
    node("Probes settings", [
      node("Temperature probe settings", [
        node("Return"),
        node("Supply")
      ])
    ])
  ], { pageGroup:"service", pageIndex:4, pageTotal:6 }),
  node("Page 5/6", [
    node("Modbus settings"),
    node("Test unit"),
    node("EEPROM reset"),
    node("Reference temperature settings")
  ], { pageGroup:"service", pageIndex:5, pageTotal:6 }),
  node("Page 6/6", [
    node("DSC update delay"),
    node("PIR settings"),
    node("Clean event settings")
  ], { pageGroup:"service", pageIndex:6, pageTotal:6 })
]);

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
]);

const Settings = node("Settings", [ SettingsP1, SettingsP2 ]);
const MENU = node("MENU", [ Settings, Service, Info ]);
const SET_BOX_INFO = node("SET BOX INFO");
const HOME = node("HOME", [ MENU, SET_BOX_INFO ]);
