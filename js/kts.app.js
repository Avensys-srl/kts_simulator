/* --------------------------
   NAV STATE
-------------------------- */
let stack = [HOME];
let selectedIndex = 0;

/* --------------------------
   HOME simulated values
-------------------------- */
let unitOn = true;
let tLabel = "T. RETOUR";
let tValue = 15;
let speedPct = 20;

/* --------------------------
   Helpers
-------------------------- */
function current(){ return stack[stack.length-1]; }
function kids(n){ return n.children || []; }
function isLeaf(n){ return !n.children || n.children.length===0; }
function pathText(){ return stack.map(x=>x.name).join(" \u2192 "); }
function clampSel(){
  const k = kids(current());
  if(k.length===0){ selectedIndex=0; return; }
  selectedIndex = Math.max(0, Math.min(selectedIndex, k.length-1));
}

/* Wedge segments: fill from bottom, right trapezoid */
function buildWedgeSegmentsHTML(segmentCount, pct){
  const activeCount = Math.round((pct/100) * segmentCount);
  const topW = 1.00;
  const bottomW = 0.22;

  let s = "";
  for(let i=0;i<segmentCount;i++){
    const isOn = i >= (segmentCount - activeCount);
    const w = topW - (i * (topW - bottomW) / (segmentCount - 1));
    s += `<span class="${isOn ? 'active' : ''}" style="width:${(w*100).toFixed(1)}%"></span>`;
  }
  return s;
}

/* OFF blackout */
function syncOffState(){
  const root = document.getElementById("ktsRoot");
  if(!unitOn) root.classList.add("off-state");
  else root.classList.remove("off-state");
}

/* --------------------------
   Render HOME
-------------------------- */
function renderHome(){
  const screen = document.getElementById("screen");

  const timeText = "05:05  MAR";
  const dateText = "25/03/2040";
  const strokeColor = unitOn ? "var(--green)" : "var(--red)";
  const segCount = 22;

  screen.innerHTML = `
    <div class="home">
      <div class="leftArea">
        <div class="box powerBox">
          <div class="powerBtn" id="pwrBtn" title="Power ON/OFF">
            <svg viewBox="0 0 64 64" aria-label="Power" style="width:78px;height:78px">
              <circle cx="32" cy="32" r="23" fill="none" stroke="${strokeColor}" stroke-width="8"/>
              <line x1="32" y1="10" x2="32" y2="29" stroke="${strokeColor}" stroke-width="8" stroke-linecap="round"/>
            </svg>
          </div>
        </div>

        <div class="box tempBox">
          <div class="px label">${tLabel}\n${tValue} \u00b0C</div>
        </div>
      </div>

      <div class="box speedBox">
        <div class="speed-wedge" aria-label="Speed wedge">
          <div class="segments" id="segments">
            ${buildWedgeSegmentsHTML(segCount, unitOn ? speedPct : 0)}
          </div>
        </div>

        <div class="arrows">
          <div class="kbtn arrowBtn ${unitOn ? '' : 'disabled'}" id="spdUp"><div class="tri up"></div></div>
          <div class="kbtn arrowBtn ${unitOn ? '' : 'disabled'}" id="spdDn"><div class="tri down"></div></div>
        </div>

        <div class="pct px" id="pctLabel">${unitOn ? speedPct : 0} %</div>
      </div>

      <div class="menuBtn px" id="homeMenu">MENU</div>

      <div class="box datetime px">
        <div>${timeText}</div>
        <div>${dateText}</div>
      </div>
    </div>
  `;

  document.getElementById("homeMenu").addEventListener("click", () => {
    if(!unitOn) return;
    stack.push(MENU);
    selectedIndex = 0;
    render();
  });

  document.getElementById("pwrBtn").addEventListener("click", () => {
    unitOn = !unitOn;
    if(!unitOn) speedPct = 0;
    syncOffState();
    renderHome();
    updateButtons();
    // Search navigation is blocked in OFF (handled in goToPath)
  });

  document.getElementById("spdUp").addEventListener("click", () => {
    if(!unitOn) return;
    speedPct = Math.min(100, speedPct + 5);
    renderHome();
  });
  document.getElementById("spdDn").addEventListener("click", () => {
    if(!unitOn) return;
    speedPct = Math.max(0, speedPct - 5);
    renderHome();
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
  sel.textContent = `Selected: ${k[selectedIndex] ? k[selectedIndex].name : "\u2014"}`;

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
      selectedIndex = parseInt(it.getAttribute("data-idx"),10);
      const chosen = kids(current())[selectedIndex];
      if(chosen && !isLeaf(chosen)) enterSelected();
      else render();
    });
  });

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
    updateButtons();
    return;
  }
  renderList();
}

/* --------------------------
   Navigation
-------------------------- */
function goHome(){ if(!unitOn) return; stack = [HOME]; selectedIndex = 0; render(); }
function goBack(){ if(!unitOn) return; if(stack.length>1){ stack.pop(); selectedIndex=0; render(); } }
function enterSelected(){
  if(!unitOn) return;
  const k = kids(current());
  const chosen = k[selectedIndex];
  if(chosen && !isLeaf(chosen)){
    stack.push(chosen);
    selectedIndex = 0;
    render();
  }
}
function pageStep(dir){
  if(!unitOn) return;
  const cur = current();
  if(stack.length < 2) return;

  const parent = stack[stack.length-2];
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

  stack[stack.length-1] = group[nextPos].n;
  selectedIndex=0;
  render();
}
function updateButtons(){
  const btnBack = document.getElementById("btnBack");
  const btnHome = document.getElementById("btnHome");
  const btnPrev = document.getElementById("btnPrev");
  const btnNext = document.getElementById("btnNext");
  const btnOk   = document.getElementById("btnOk");

  btnBack.disabled = (!unitOn) || (stack.length <= 1);
  btnHome.disabled = (!unitOn) || (stack.length === 1);
  btnOk.disabled   = (!unitOn) || (current() === HOME) || (kids(current()).length === 0);

  let canPrev=false, canNext=false;
  if(unitOn && stack.length >= 2){
    const cur = current();
    const parent = stack[stack.length-2];
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
  if(!unitOn) return; // blocked when OFF
  // pathNodes starts with HOME, then MENU, then...
  stack = [HOME];
  for(let i=1;i<pathNodes.length;i++){
    stack.push(pathNodes[i]);
  }
  selectedIndex = 0;
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
buildIndex();
render();