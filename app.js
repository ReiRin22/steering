const ASSIGNMENT_KEY = "steering-progress-dashboard:assignments:v2";

const phaseLabels = Array.from({ length: 11 }, (_, index) => `Phase ${index}`);
let structureItems = [];
let scannedItems = [];
let dashboardData = { items: [], owners: [], generatedAt: "" };
let visibleItems = [];
let selectedId = null;
let currentView = "cards";
let selectedLv1 = "";
let selectedLv2 = "";

const cardList = document.querySelector("#cardList");
const cardsView = document.querySelector("#cardsView");
const treeView = document.querySelector("#treeView");
const cardsViewButton = document.querySelector("#cardsViewButton");
const treeViewButton = document.querySelector("#treeViewButton");
const treeScope = document.querySelector("#treeScope");
const treeTableBody = document.querySelector("#treeTableBody");
const emptyDetail = document.querySelector("#emptyDetail");
const detailForm = document.querySelector("#detailForm");
const searchInput = document.querySelector("#searchInput");
const ownerFilter = document.querySelector("#ownerFilter");
const phaseFilter = document.querySelector("#phaseFilter");
const selectFolderButton = document.querySelector("#resetButton");

const detailCode = document.querySelector("#detailCode");
const detailTitle = document.querySelector("#detailTitle");
const detailStatus = document.querySelector("#detailStatus");
const ownerInput = document.querySelector("#ownerInput");
const phaseInput = document.querySelector("#phaseInput");
const bffPhaseInput = document.querySelector("#bffPhaseInput");
const statusInput = document.querySelector("#statusInput");
const noteInput = document.querySelector("#noteInput");
const guideText = document.querySelector("#guideText");
const guideSteps = document.querySelector("#guideSteps");
const steeringLink = document.querySelector("#steeringLink");
const featurePath = document.querySelector("#featurePath");

const UNASSIGNED_OWNER = "Unassigned";

const statusLabels = {
  "not-started": "Not started",
  implement: "Implementing",
  blocked: "Blocked",
  review: "Review",
  done: "Done",
};

const guideStepsByPhase = {
  0: ["Confirm scope and target files", "Split component and API responsibilities", "Record shared decisions in the tasklist"],
  1: ["Confirm directory structure", "Define shared BFF schemas", "Define ViewModel types"],
  2: ["Implement API callers", "Implement repositories", "Confirm types and error boundaries"],
  3: ["Collect screen state in the store", "Keep ViewModel state in the UI", "Expose simple actions for hooks"],
  4: ["Move initialization and side effects into hooks", "Separate side effects from UI", "Clean hook return values"],
  5: ["Split JSX into molecules and organisms", "Keep RECxxx.tsx small", "Check import paths"],
  6: ["Wire core events", "Implement save and cancel flows", "Check duplicate submission guards"],
  7: ["Implement validation rules", "Normalize API error display", "Check feature-specific behavior"],
  8: ["Check Storybook setup", "Add molecule stories", "Add organism stories"],
  9: ["Add MSW-backed stories", "Write tests with the AAA pattern", "Check Vitest and CI settings"],
  10: ["Confirm E2E routes", "Run Playwright, Vitest, and Storybook checks", "Update README and session log"],
  11: ["All phases complete", "Move to review", "Record remaining issues in the session log"],
};

init();

async function init() {
  bindEvents();
  await loadStructureMap();
  dashboardData = buildDashboardData([]);
  render();
}

function bindEvents() {
  selectFolderButton.textContent = "Scan";
  selectFolderButton.addEventListener("click", selectAndScanFolder);
  cardsViewButton.addEventListener("click", () => switchView("cards"));
  treeViewButton.addEventListener("click", () => switchView("tree"));

  searchInput.addEventListener("input", render);
  ownerFilter.addEventListener("change", render);
  phaseFilter.addEventListener("change", render);

  detailForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const item = dashboardData.items.find((entry) => entry.id === selectedId);
    if (!item) return;

    item.owner = ownerInput.value.trim() || UNASSIGNED_OWNER;
    item.status = statusInput.value;
    item.note = noteInput.value.trim();
    item.fePhase = Number(phaseInput.value);
    item.bffPhase = Number(bffPhaseInput.value);

    saveAssignments(dashboardData.items);
    dashboardData = buildDashboardData(scannedItems);
    selectedId = item.id;
    render();
  });
}

async function loadStructureMap() {
  structureItems = [];
}

async function selectAndScanFolder() {
  if (!window.showDirectoryPicker) {
    window.alert("This browser cannot read folders. Please open this dashboard in Edge or Chrome.");
    return;
  }

  let selected;
  try {
    selected = await window.showDirectoryPicker({ mode: "read" });
  } catch (error) {
    if (error.name === "AbortError") {
      return;
    }
    window.alert(`Folder selection error: ${error.message}`);
    return;
  }

  const sharedHandle = await getDirectoryHandleIfExists(selected, ".steering-shared");
  if (sharedHandle) {
    scannedItems = await scanSteering(sharedHandle, ".steering-shared");
    dashboardData = buildDashboardData(scannedItems);
    ensureTreeSelection();
    selectedId = dashboardData.items[0]?.id ?? null;
    render();
    return;
  }

  const context = await resolveScanContext(selected);
  if (!context.steeringHandle) {
    window.alert("Please select a repository root that contains .steering-shared or .steering.");
    return;
  }

  if (context.structureHandle) {
    const structureText = await readFileAsText(context.structureHandle);
    structureItems = parseStructureText(structureText);
  }

  scannedItems = await scanSteering(context.steeringHandle, context.steeringName);
  dashboardData = buildDashboardData(scannedItems);
  ensureTreeSelection();
  selectedId = dashboardData.items[0]?.id ?? null;
  render();
}

async function resolveScanContext(handle) {
  if (handle.name === ".steering") {
    return { steeringHandle: handle, steeringName: ".steering", structureHandle: null };
  }

  const steeringHandle = await getDirectoryHandleIfExists(handle, ".steering");
  const claudeHandle = await getDirectoryHandleIfExists(handle, ".claude");
  const commandsHandle = claudeHandle ? await getDirectoryHandleIfExists(claudeHandle, "commands") : null;
  const structureHandle = commandsHandle ? await getFileHandleIfExists(commandsHandle, "structure_2.md") : null;

  return { steeringHandle, steeringName: ".steering", structureHandle };
}

async function scanSteering(steeringHandle, steeringName) {
  const states = [];
  await walkDirectory(steeringHandle, async ({ fileHandle, relativePath }) => {
    if (!relativePath.endsWith("/state.md")) return;
    if (relativePath.startsWith("progress-dashboard/")) return;
    const text = await readFileAsText(fileHandle);
    states.push(parseStateFile(text, `${steeringName}/${relativePath}`));
  });
  return states.map(toDashboardItemFromState);
}

async function walkDirectory(directoryHandle, onFile, prefix = "") {
  for await (const entry of directoryHandle.values()) {
    const relativePath = prefix ? `${prefix}/${entry.name}` : entry.name;
    if (entry.kind === "file") {
      await onFile({ fileHandle: entry, relativePath });
    } else if (entry.kind === "directory") {
      await walkDirectory(entry, onFile, relativePath);
    }
  }
}

async function getDirectoryHandleIfExists(parent, name) {
  try {
    return await parent.getDirectoryHandle(name);
  } catch {
    return null;
  }
}

async function getFileHandleIfExists(parent, name) {
  try {
    return await parent.getFileHandle(name);
  } catch {
    return null;
  }
}

async function readFileAsText(fileHandle) {
  const file = await fileHandle.getFile();
  return file.text();
}

function parseStructureText(text) {
  const items = [];
  let lv1 = "";
  let lv2 = "";

  for (const line of text.split(/\r?\n/)) {
    if (!line.includes("# LV")) continue;

    const dirMatch = line.match(/([A-Za-z0-9_-]+)\//);
    const levelMatch = line.match(/#\s+(LV[123]):\s+(.+?)(?:\s+\[([A-Z]+\d+)\])?\s*$/);
    if (!dirMatch || !levelMatch) continue;

    const dir = dirMatch[1];
    const level = levelMatch[1];
    const label = levelMatch[2];
    const featureId = levelMatch[3];
    if (dir.includes("LV")) continue;

    if (level === "LV1") {
      lv1 = dir;
      lv2 = "";
    } else if (level === "LV2") {
      lv2 = dir;
    } else if (level === "LV3") {
      items.push({
        featureId: featureId || dir.toUpperCase(),
        featureName: label.trim(),
        lv1,
        lv2,
        lv3: dir,
        featurePath: ["product/frontend/src/features", lv1, lv2, dir].filter(Boolean).join("/"),
      });
    }
  }

  return items;
}

function parseStateFile(text, statePath) {
  const parts = statePath.split("/");
  const first = parts[1] ?? "";
  const second = parts[2] ?? "";
  const owner = /^\d{8}-/.test(first) ? UNASSIGNED_OWNER : first || UNASSIGNED_OWNER;
  const featureFolder = /^\d{8}-/.test(first) ? first : second;
  const featureId = readFrontMatter(text, "feature_id") || extractFeatureId(featureFolder) || "UNKNOWN";
  const featureName = readFrontMatter(text, "feature_name") || featureFolder;
  const completed = [...text.matchAll(/Phase\s+(\d+):/g)].map((match) => Number(match[1]));
  const completedPhase = completed.length ? Math.max(...completed) : -1;
  const layer = /(^|\/)bff(\/|-|_|$)/i.test(statePath) ? "BFF" : "FE";

  return {
    owner,
    featureFolder,
    featureSlug: featureFolder.replace(/^\d{8}-/, ""),
    featureId,
    featureName,
    completedPhase,
    layer,
    status: readFrontMatter(text, "phase") === "done" ? "done" : "implement",
    progress: readFrontMatter(text, "progress"),
    steeringPath: statePath,
  };
}

function toDashboardItemFromState(state) {
  const fromStructure =
    structureItems.find((item) => item.featureId === state.featureId) ??
    structureItems.find((item) => normalize(item.lv3).includes(normalize(state.featureSlug))) ??
    {};

  return {
    id: makeId(state.featureId, state.owner, fromStructure.lv3 || state.featureSlug),
    featureId: state.featureId,
    featureName: fromStructure.featureName || state.featureName,
    lv1: fromStructure.lv1 || "",
    lv2: fromStructure.lv2 || "",
    lv3: fromStructure.lv3 || state.featureSlug,
    featurePath: fromStructure.featurePath || "",
    owner: state.owner,
    status: state.status,
    fePhase: state.layer === "FE" ? state.completedPhase : -1,
    bffPhase: state.layer === "BFF" ? state.completedPhase : -1,
    note: state.progress,
    steeringPath: state.steeringPath,
  };
}

function buildDashboardData(states) {
  const keyed = new Map();

  for (const feature of structureItems) {
    const id = makeId(feature.featureId, UNASSIGNED_OWNER, feature.lv3);
    keyed.set(id, {
      ...feature,
      id,
      owner: UNASSIGNED_OWNER,
      status: "not-started",
      fePhase: -1,
      bffPhase: -1,
      note: "",
      steeringPath: "",
    });
  }

  for (const stateItem of states) {
    const existing = keyed.get(stateItem.id) ?? {
      ...stateItem,
      fePhase: -1,
      bffPhase: -1,
    };
    existing.owner = stateItem.owner;
    existing.status = stateItem.status;
    existing.note = stateItem.note || existing.note;
    existing.steeringPath = stateItem.steeringPath || existing.steeringPath;
    existing.fePhase = Math.max(existing.fePhase, stateItem.fePhase);
    existing.bffPhase = Math.max(existing.bffPhase, stateItem.bffPhase);
    keyed.set(stateItem.id, existing);
  }

  const assignments = loadAssignments();
  for (const [id, patch] of Object.entries(assignments)) {
    const item = keyed.get(id);
    if (item) Object.assign(item, patch, { id });
  }

  const items = [...keyed.values()].sort((a, b) => {
    const idCompare = a.featureId.localeCompare(b.featureId, "ja");
    if (idCompare !== 0) return idCompare;
    return a.owner.localeCompare(b.owner, "ja");
  });
  const owners = [...new Set(items.map((item) => item.owner).filter(Boolean))].sort((a, b) => a.localeCompare(b, "ja"));

  return {
    generatedAt: new Date().toISOString(),
    items,
    owners,
  };
}

function normalizeDashboard(data) {
  const items = Array.isArray(data.items) ? data.items.map(normalizeItem) : [];
  const owners = [...new Set(items.map((item) => item.owner).filter(Boolean))].sort((a, b) => a.localeCompare(b, "ja"));
  return { generatedAt: data.generatedAt || new Date().toISOString(), items, owners };
}

function normalizeItem(item) {
  return {
    id: String(item.id || makeId(item.featureId, item.owner, item.lv3)),
    featureId: String(item.featureId || ""),
    featureName: String(item.featureName || ""),
    lv1: String(item.lv1 || ""),
    lv2: String(item.lv2 || ""),
    lv3: String(item.lv3 || ""),
    featurePath: String(item.featurePath || ""),
    owner: String(item.owner || UNASSIGNED_OWNER),
    status: String(item.status || "not-started"),
    fePhase: Number.isFinite(Number(item.fePhase)) ? Number(item.fePhase) : -1,
    bffPhase: Number.isFinite(Number(item.bffPhase)) ? Number(item.bffPhase) : -1,
    note: String(item.note || ""),
    steeringPath: String(item.steeringPath || ""),
  };
}

function loadAssignments() {
  try {
    return JSON.parse(window.localStorage.getItem(ASSIGNMENT_KEY) || "{}");
  } catch {
    return {};
  }
}

function saveAssignments(items) {
  const assignments = {};
  for (const item of items) {
    assignments[item.id] = {
      owner: item.owner,
      status: item.status,
      note: item.note,
      fePhase: item.fePhase,
      bffPhase: item.bffPhase,
    };
  }
  window.localStorage.setItem(ASSIGNMENT_KEY, JSON.stringify(assignments));
}

function render() {
  renderFilters();
  visibleItems = getVisibleItems();
  renderSummary();
  renderView();
  renderCards();
  renderDetail();
  renderHierarchy();
}

function switchView(view) {
  currentView = view;
  renderView();
  renderHierarchy();
}

function renderView() {
  cardsView.hidden = currentView !== "cards";
  treeView.hidden = currentView !== "tree";
  cardsViewButton.classList.toggle("isActive", currentView === "cards");
  treeViewButton.classList.toggle("isActive", currentView === "tree");
}

function getVisibleItems() {
  const query = searchInput.value.trim().toLowerCase();
  const owner = ownerFilter.value;
  const phase = phaseFilter.value;

  return dashboardData.items.filter((item) => {
    const haystack = [item.featureId, item.featureName, item.lv1, item.lv2, item.lv3, item.owner, item.status, item.featurePath]
      .join(" ")
      .toLowerCase();
    const phaseNumber = Math.max(item.fePhase, item.bffPhase);
    return (!query || haystack.includes(query)) && (!owner || item.owner === owner) && (phase === "" || phaseNumber === Number(phase));
  });
}

function renderFilters() {
  const currentOwner = ownerFilter.value;
  ownerFilter.innerHTML = '<option value="">Owner: all</option>';
  dashboardData.owners.forEach((owner) => {
    const option = document.createElement("option");
    option.value = owner;
    option.textContent = `Owner: ${owner}`;
    ownerFilter.append(option);
  });
  ownerFilter.value = dashboardData.owners.includes(currentOwner) ? currentOwner : "";
}

function renderSummary() {
  const items = dashboardData.items;
  const active = items.filter((item) => item.status === "implement" || item.status === "review").length;
  const assigned = items.filter((item) => item.owner && item.owner !== UNASSIGNED_OWNER).length;
  const phases = items.map((item) => Math.max(item.fePhase, item.bffPhase, 0));
  const avg = phases.length ? (phases.reduce((sum, phase) => sum + phase, 0) / phases.length).toFixed(1) : "0";

  document.querySelector("#totalCount").textContent = items.length;
  document.querySelector("#activeCount").textContent = active;
  document.querySelector("#assignedCount").textContent = assigned;
  document.querySelector("#avgPhase").textContent = avg;
}

function renderCards() {
  cardList.innerHTML = "";

  visibleItems.forEach((item) => {
    const card = document.createElement("button");
    card.type = "button";
    card.className = `featureCard${item.id === selectedId ? " isSelected" : ""}`;
    card.addEventListener("click", () => {
      selectedId = item.id;
      renderCards();
      renderDetail();
    });

    card.innerHTML = `
      <div class="cardTop">
        <div>
          <p class="eyebrow">${escapeHtml(item.featureId)} / ${escapeHtml(item.owner)}</p>
          <h2>${escapeHtml(item.featureName || item.lv3)}</h2>
        </div>
        <span class="statusBadge ${escapeHtml(item.status)}">${escapeHtml(statusLabels[item.status] ?? item.status)}</span>
      </div>
      <div class="metaRow">
        <span>${escapeHtml(item.lv1 || "-")} / ${escapeHtml(item.lv2 || "-")}</span>
        <span>${escapeHtml(item.lv3)}</span>
      </div>
      ${renderLayerTrack("FR", item.fePhase)}
      ${renderLayerTrack("BFF", item.bffPhase)}
      <p class="nextAction">${escapeHtml(getNextAction(item))}</p>
    `;

    cardList.append(card);
  });

  if (!visibleItems.length) {
    cardList.innerHTML = '<p class="emptyDetail">No LV3 items match the current filters. Use Scan to select a .steering folder.</p>';
  }
}

function renderLayerTrack(label, completedPhase) {
  const dots = phaseLabels
    .map((_, index) => `<span class="phaseDot ${index <= completedPhase ? "done" : ""}" title="${label} Phase ${index}"></span>`)
    .join("");
  const value = completedPhase >= 0 ? `Phase ${completedPhase}` : "Not started";
  return `<div class="layerTrack"><span>${label}</span><div class="phaseTrack">${dots}</div><strong>${value}</strong></div>`;
}

function renderCompactTrack(completedPhase) {
  const dots = phaseLabels
    .map((_, index) => `<span class="phaseDot ${index <= completedPhase ? "done" : ""}" title="Phase ${index}"></span>`)
    .join("");
  const value = completedPhase >= 0 ? `Phase ${completedPhase}` : "Not started";
  return `<div class="compactTrack"><div class="phaseTrack">${dots}</div><strong>${value}</strong></div>`;
}

function renderHierarchy() {
  if (!treeTableBody) return;

  const rows = dashboardData.items;
  treeScope.textContent = `All features: ${rows.length}`;

  function getDomainFromCode(code) {
    const match = code.match(/^([A-Z]+)/);
    return match ? match[1] : "";
  }

  treeTableBody.innerHTML = rows
    .map((item) => {
      const domain = getDomainFromCode(item.featureId);
      const maxPhase = Math.max(item.fePhase, item.bffPhase);
      const phaseCells = Array.from({ length: 11 }, (_, index) => {
        const className = index <= maxPhase ? "phase-check done" : "phase-check";
        return `<td><span class="${className}"></span></td>`;
      }).join("");

      return `
        <tr data-domain="${escapeHtml(domain)}">
          <td><strong>${escapeHtml(item.featureId)}</strong></td>
          <td>${escapeHtml(item.lv3)}</td>
          <td class="tableFeatureName">${escapeHtml(item.featureName || item.lv3)}</td>
          <td style="font-size:11px;">${escapeHtml(item.note || "")}</td>
          <td>${escapeHtml(item.owner)}</td>
          ${phaseCells}
          <td style="font-size:11px;">${escapeHtml(statusLabels[item.status] ?? item.status)}</td>
        </tr>
      `;
    })
    .join("");

  if (!rows.length) {
    treeTableBody.innerHTML = '<tr><td colspan="17">No LV3 items to display.</td></tr>';
  }
}

function ensureTreeSelection() {
  const lv1List = [...new Set(dashboardData.items.map((item) => item.lv1).filter(Boolean))].sort((a, b) => a.localeCompare(b, "ja"));
  if (!lv1List.includes(selectedLv1)) selectedLv1 = lv1List[0] || "";
  const lv2List = [
    ...new Set(dashboardData.items.filter((item) => item.lv1 === selectedLv1).map((item) => item.lv2).filter(Boolean)),
  ].sort((a, b) => a.localeCompare(b, "ja"));
  if (!lv2List.includes(selectedLv2)) selectedLv2 = lv2List[0] || "";
}

function groupBy(items, key) {
  const grouped = new Map();
  for (const item of items) {
    const value = item[key] || "";
    if (!value) continue;
    if (!grouped.has(value)) grouped.set(value, []);
    grouped.get(value).push(item);
  }
  return [...grouped.entries()].sort(([a], [b]) => a.localeCompare(b, "ja"));
}

function getLv1Color(lv1) {
  const colors = [
    "#eef7f7",
    "#f7f1e8",
    "#eef4fb",
    "#f3f0fa",
    "#edf6ec",
    "#fbf0f0",
    "#f1f5e8",
    "#eef2f4",
    "#f8eef5",
    "#f0f6f2",
  ];
  let hash = 0;
  for (const char of String(lv1)) hash = (hash * 31 + char.charCodeAt(0)) % 9973;
  return colors[hash % colors.length];
}

function renderDetail() {
  const item = dashboardData.items.find((entry) => entry.id === selectedId);
  emptyDetail.hidden = Boolean(item);
  detailForm.hidden = !item;
  if (!item) return;

  const nextPhase = Math.min(Math.max(Math.max(item.fePhase, item.bffPhase) + 1, 0), 11);
  const steps = guideStepsByPhase[nextPhase] ?? guideStepsByPhase[0];

  detailCode.textContent = `${item.featureId} / ${item.lv3}`;
  detailTitle.textContent = item.featureName || item.lv3;
  detailStatus.textContent = statusLabels[item.status] ?? item.status;
  detailStatus.className = `statusBadge ${item.status}`;
  ownerInput.value = item.owner === UNASSIGNED_OWNER ? "" : item.owner;
  phaseInput.value = String(item.fePhase);
  bffPhaseInput.value = String(item.bffPhase);
  statusInput.value = item.status;
  noteInput.value = item.note ?? "";
  guideText.textContent = getNextAction(item);
  guideSteps.innerHTML = steps.map((step) => `<li>${escapeHtml(step)}</li>`).join("");
  featurePath.textContent = item.featurePath || "No feature path found";

  steeringLink.textContent = item.steeringPath || "state.md not found";
  steeringLink.href = "#";
  steeringLink.setAttribute("aria-disabled", "true");
}

function getNextAction(item) {
  const feNext = item.fePhase + 1;
  const bffNext = item.bffPhase + 1;
  const feText = feNext <= 10 ? `FR Phase ${Math.max(feNext, 0)}` : "FR done";
  const bffText = bffNext <= 10 ? `BFF Phase ${Math.max(bffNext, 0)}` : "BFF done";
  return `Next: ${feText} / ${bffText}`;
}

function readFrontMatter(text, key) {
  const match = text.match(new RegExp(`^${key}:\\s*"?([^"\\n]+)"?\\s*$`, "m"));
  return match?.[1]?.trim() ?? "";
}

function extractFeatureId(value) {
  return String(value || "").match(/[A-Z]{3}\d{3}/)?.[0] ?? "";
}

function makeId(featureId, owner, lv3) {
  return `${featureId || "UNKNOWN"}::${owner || UNASSIGNED_OWNER}::${lv3 || ""}`;
}

function normalize(value) {
  return String(value || "").toLowerCase().replace(/[^a-z0-9]/g, "");
}

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}
