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
  timers: {
    homeInfoTimer: null
  }
};

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
  { id: "t_return", label: "T. RETURN", active: true, value: "19 \u00b0C" },
  { id: "acc_clima", label: "ACC. CLIMA", active: false },
  { id: "probes", label: "PROBES", active: false, value: "OK" },
  { id: "t_fresh", label: "T. FRESH", active: true, value: "12 \u00b0C" },
  { id: "defrost", label: "DEFROST", active: false },
  { id: "filters", label: "FILTERS", active: false, value: "CLEAN" },
  { id: "bypass", label: "BYPASS", active: false, value: "AUTO" }
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

/* --------------------------
   Helpers
-------------------------- */
function current(){ return state.nav.stack[state.nav.stack.length-1]; }
function kids(n){ return n.children || []; }
function isLeaf(n){ return !n.children || n.children.length===0; }
function pathText(){ return state.nav.stack.map(x=>x.name).join(" \u2192 "); }
function clampSel(){
  const k = kids(current());
  if(k.length===0){ state.nav.selectedIndex=0; return; }
  state.nav.selectedIndex = Math.max(0, Math.min(state.nav.selectedIndex, k.length-1));
}

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
  state.home.tLabel = first.label;
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
    state.home.tLabel = next.label;
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

      <div class="menuBtn px" id="homeMenu">MENU</div>

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

  where.textContent = current().name;
  path.textContent = pathText();

  const k = kids(current());
  clampSel();

  count.textContent = `${k.length} item(s)`;
  sel.textContent = `Selected: ${k[state.nav.selectedIndex] ? k[state.nav.selectedIndex].name : "\u2014"}`;

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
          <div class="label">${c.name}</div>
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
      if(chosen && !isLeaf(chosen)) enterSelected();
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

  where.textContent = current().name;
  path.textContent = pathText();

  const k = kids(current());
  const tiles = k.map((c, idx) => (
    `<div class="menuTile" data-idx="${idx}">${c.name}</div>`
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

  where.textContent = current().name;
  path.textContent = pathText();

  if(pageVars.set_box_info && Array.isArray(pageVars.set_box_info.selectedIds)){
    setBoxItems.forEach(item => {
      item.active = pageVars.set_box_info.selectedIds.includes(item.id);
    });
  }

  const tiles = setBoxItems.map((item) => {
    const activeClass = item.active ? " green" : "";
    return `<div class="setBoxBtn${activeClass}" data-id="${item.id}">${item.label}</div>`;
  }).join("");

  screen.innerHTML = `
    <div class="setBoxScreen">
      <div class="setBoxTitle">SET BOX INFO</div>
      <div class="setBoxGrid">
        ${tiles}
      </div>
      <div class="setBoxBottom">
        <div class="setBoxBtn ok">OK</div>
        <div class="setBoxBtn back">BACK</div>
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

  where.textContent = current().name;
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
  if(current() === SET_BOX_INFO){
    renderSetBoxInfo();
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
  if(chosen && !isLeaf(chosen)){
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

function buildIndex(){
  index = [];
  const root = HOME;

  function walk(n, pathNodes){
    const newPath = [...pathNodes, n];
    if(n !== HOME){ // exclude HOME from results if you want
      index.push({
        label: n.name,
        node: n,
        pathNodes: newPath,
        pathText: newPath.map(x=>x.name).join(" \u2192 "),
        depth: newPath.length
      });
    }
    (n.children || []).forEach(ch => walk(ch, newPath));
  }
  walk(root, []);
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
      <div class="pill">Path available</div>
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
buildIndex();
render();

