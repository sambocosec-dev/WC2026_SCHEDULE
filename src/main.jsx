import { useState, useMemo } from "react";

// ─── DATA ────────────────────────────────────────────────────────────────────
const MATCHES = [
  { date:"2026-06-11",etTime:"15:00",group:"A",team1:"Mexico",team2:"South Africa",venue:"Estadio Azteca, Mexico City",stage:"Group"},
  { date:"2026-06-11",etTime:"22:00",group:"A",team1:"South Korea",team2:"Czechia",venue:"Estadio Akron, Zapopan",stage:"Group"},
  { date:"2026-06-12",etTime:"15:00",group:"B",team1:"Canada",team2:"Bosnia & Herz.",venue:"BMO Field, Toronto",stage:"Group"},
  { date:"2026-06-12",etTime:"21:00",group:"D",team1:"USA",team2:"Paraguay",venue:"SoFi Stadium, Inglewood",stage:"Group"},
  { date:"2026-06-13",etTime:"15:00",group:"B",team1:"Qatar",team2:"Switzerland",venue:"Levi's Stadium, Santa Clara",stage:"Group"},
  { date:"2026-06-13",etTime:"18:00",group:"C",team1:"Brazil",team2:"Morocco",venue:"MetLife Stadium, NJ",stage:"Group"},
  { date:"2026-06-13",etTime:"21:00",group:"C",team1:"Haiti",team2:"Scotland",venue:"Gillette Stadium, Foxborough",stage:"Group"},
  { date:"2026-06-14",etTime:"00:00",group:"D",team1:"Australia",team2:"Türkiye",venue:"BC Place, Vancouver",stage:"Group"},
  { date:"2026-06-14",etTime:"13:00",group:"E",team1:"Germany",team2:"Curaçao",venue:"NRG Stadium, Houston",stage:"Group"},
  { date:"2026-06-14",etTime:"16:00",group:"F",team1:"Netherlands",team2:"Japan",venue:"AT&T Stadium, Arlington",stage:"Group"},
  { date:"2026-06-14",etTime:"19:00",group:"E",team1:"Ivory Coast",team2:"Ecuador",venue:"Lincoln Financial, Philadelphia",stage:"Group"},
  { date:"2026-06-14",etTime:"22:00",group:"F",team1:"Sweden",team2:"Tunisia",venue:"Estadio BBVA, Monterrey",stage:"Group"},
  { date:"2026-06-15",etTime:"12:00",group:"H",team1:"Spain",team2:"Cape Verde",venue:"Mercedes-Benz Stadium, Atlanta",stage:"Group"},
  { date:"2026-06-15",etTime:"15:00",group:"G",team1:"Belgium",team2:"Egypt",venue:"Lumen Field, Seattle",stage:"Group"},
  { date:"2026-06-15",etTime:"18:00",group:"H",team1:"Saudi Arabia",team2:"Uruguay",venue:"Hard Rock Stadium, Miami",stage:"Group"},
  { date:"2026-06-15",etTime:"21:00",group:"G",team1:"Iran",team2:"New Zealand",venue:"SoFi Stadium, Inglewood",stage:"Group"},
  { date:"2026-06-16",etTime:"15:00",group:"I",team1:"France",team2:"Senegal",venue:"MetLife Stadium, NJ",stage:"Group"},
  { date:"2026-06-16",etTime:"18:00",group:"I",team1:"Iraq",team2:"Norway",venue:"Gillette Stadium, Foxborough",stage:"Group"},
  { date:"2026-06-16",etTime:"21:00",group:"J",team1:"Argentina",team2:"Algeria",venue:"Arrowhead Stadium, Kansas City",stage:"Group"},
  { date:"2026-06-17",etTime:"00:00",group:"J",team1:"Austria",team2:"Jordan",venue:"Levi's Stadium, Santa Clara",stage:"Group"},
  { date:"2026-06-17",etTime:"13:00",group:"K",team1:"Portugal",team2:"DR Congo",venue:"NRG Stadium, Houston",stage:"Group"},
  { date:"2026-06-17",etTime:"16:00",group:"L",team1:"England",team2:"Croatia",venue:"AT&T Stadium, Arlington",stage:"Group"},
  { date:"2026-06-17",etTime:"19:00",group:"L",team1:"Ghana",team2:"Panama",venue:"BMO Field, Toronto",stage:"Group"},
  { date:"2026-06-17",etTime:"22:00",group:"K",team1:"Uzbekistan",team2:"Colombia",venue:"Estadio Azteca, Mexico City",stage:"Group"},
  { date:"2026-06-18",etTime:"12:00",group:"A",team1:"Czechia",team2:"South Africa",venue:"Mercedes-Benz Stadium, Atlanta",stage:"Group"},
  { date:"2026-06-18",etTime:"15:00",group:"B",team1:"Switzerland",team2:"Bosnia & Herz.",venue:"SoFi Stadium, Inglewood",stage:"Group"},
  { date:"2026-06-18",etTime:"18:00",group:"B",team1:"Canada",team2:"Qatar",venue:"BC Place, Vancouver",stage:"Group"},
  { date:"2026-06-18",etTime:"21:00",group:"A",team1:"Mexico",team2:"South Korea",venue:"Estadio Akron, Zapopan",stage:"Group"},
  { date:"2026-06-19",etTime:"15:00",group:"D",team1:"USA",team2:"Australia",venue:"Lumen Field, Seattle",stage:"Group"},
  { date:"2026-06-19",etTime:"18:00",group:"C",team1:"Scotland",team2:"Morocco",venue:"Gillette Stadium, Foxborough",stage:"Group"},
  { date:"2026-06-19",etTime:"20:30",group:"C",team1:"Brazil",team2:"Haiti",venue:"Lincoln Financial, Philadelphia",stage:"Group"},
  { date:"2026-06-19",etTime:"23:00",group:"D",team1:"Türkiye",team2:"Paraguay",venue:"Levi's Stadium, Santa Clara",stage:"Group"},
  { date:"2026-06-20",etTime:"13:00",group:"F",team1:"Netherlands",team2:"Sweden",venue:"NRG Stadium, Houston",stage:"Group"},
  { date:"2026-06-20",etTime:"16:00",group:"E",team1:"Germany",team2:"Ivory Coast",venue:"BMO Field, Toronto",stage:"Group"},
  { date:"2026-06-20",etTime:"20:00",group:"E",team1:"Ecuador",team2:"Curaçao",venue:"Arrowhead Stadium, Kansas City",stage:"Group"},
  { date:"2026-06-21",etTime:"00:00",group:"F",team1:"Tunisia",team2:"Japan",venue:"Estadio BBVA, Monterrey",stage:"Group"},
  { date:"2026-06-21",etTime:"12:00",group:"H",team1:"Spain",team2:"Saudi Arabia",venue:"Mercedes-Benz Stadium, Atlanta",stage:"Group"},
  { date:"2026-06-21",etTime:"15:00",group:"G",team1:"Belgium",team2:"Iran",venue:"SoFi Stadium, Inglewood",stage:"Group"},
  { date:"2026-06-21",etTime:"18:00",group:"H",team1:"Uruguay",team2:"Cape Verde",venue:"Hard Rock Stadium, Miami",stage:"Group"},
  { date:"2026-06-21",etTime:"21:00",group:"G",team1:"New Zealand",team2:"Egypt",venue:"BC Place, Vancouver",stage:"Group"},
  { date:"2026-06-22",etTime:"13:00",group:"J",team1:"Argentina",team2:"Austria",venue:"AT&T Stadium, Arlington",stage:"Group"},
  { date:"2026-06-22",etTime:"17:00",group:"I",team1:"France",team2:"Iraq",venue:"Lincoln Financial, Philadelphia",stage:"Group"},
  { date:"2026-06-22",etTime:"20:00",group:"I",team1:"Norway",team2:"Senegal",venue:"MetLife Stadium, NJ",stage:"Group"},
  { date:"2026-06-22",etTime:"23:00",group:"J",team1:"Jordan",team2:"Algeria",venue:"Levi's Stadium, Santa Clara",stage:"Group"},
  { date:"2026-06-23",etTime:"13:00",group:"K",team1:"Portugal",team2:"Uzbekistan",venue:"NRG Stadium, Houston",stage:"Group"},
  { date:"2026-06-23",etTime:"16:00",group:"L",team1:"England",team2:"Ghana",venue:"Gillette Stadium, Foxborough",stage:"Group"},
  { date:"2026-06-23",etTime:"19:00",group:"L",team1:"Panama",team2:"Croatia",venue:"BMO Field, Toronto",stage:"Group"},
  { date:"2026-06-23",etTime:"22:00",group:"K",team1:"Colombia",team2:"DR Congo",venue:"Estadio Akron, Zapopan",stage:"Group"},
  { date:"2026-06-24",etTime:"15:00",group:"B",team1:"Switzerland",team2:"Canada",venue:"BC Place, Vancouver",stage:"Group"},
  { date:"2026-06-24",etTime:"15:00",group:"B",team1:"Bosnia & Herz.",team2:"Qatar",venue:"Lumen Field, Seattle",stage:"Group"},
  { date:"2026-06-24",etTime:"18:00",group:"C",team1:"Scotland",team2:"Brazil",venue:"Hard Rock Stadium, Miami",stage:"Group"},
  { date:"2026-06-24",etTime:"18:00",group:"C",team1:"Morocco",team2:"Haiti",venue:"Mercedes-Benz Stadium, Atlanta",stage:"Group"},
  { date:"2026-06-24",etTime:"21:00",group:"A",team1:"Czechia",team2:"Mexico",venue:"Estadio Azteca, Mexico City",stage:"Group"},
  { date:"2026-06-24",etTime:"21:00",group:"A",team1:"South Africa",team2:"South Korea",venue:"Estadio BBVA, Monterrey",stage:"Group"},
  { date:"2026-06-25",etTime:"16:00",group:"E",team1:"Curaçao",team2:"Ivory Coast",venue:"Lincoln Financial, Philadelphia",stage:"Group"},
  { date:"2026-06-25",etTime:"16:00",group:"E",team1:"Ecuador",team2:"Germany",venue:"MetLife Stadium, NJ",stage:"Group"},
  { date:"2026-06-25",etTime:"19:00",group:"F",team1:"Japan",team2:"Sweden",venue:"AT&T Stadium, Arlington",stage:"Group"},
  { date:"2026-06-25",etTime:"19:00",group:"F",team1:"Tunisia",team2:"Netherlands",venue:"Arrowhead Stadium, Kansas City",stage:"Group"},
  { date:"2026-06-25",etTime:"22:00",group:"D",team1:"Türkiye",team2:"USA",venue:"SoFi Stadium, Inglewood",stage:"Group"},
  { date:"2026-06-25",etTime:"22:00",group:"D",team1:"Paraguay",team2:"Australia",venue:"Levi's Stadium, Santa Clara",stage:"Group"},
  { date:"2026-06-26",etTime:"15:00",group:"I",team1:"Norway",team2:"France",venue:"Gillette Stadium, Foxborough",stage:"Group"},
  { date:"2026-06-26",etTime:"15:00",group:"I",team1:"Senegal",team2:"Iraq",venue:"BMO Field, Toronto",stage:"Group"},
  { date:"2026-06-26",etTime:"20:00",group:"H",team1:"Cape Verde",team2:"Saudi Arabia",venue:"NRG Stadium, Houston",stage:"Group"},
  { date:"2026-06-26",etTime:"20:00",group:"H",team1:"Uruguay",team2:"Spain",venue:"Estadio Akron, Zapopan",stage:"Group"},
  { date:"2026-06-26",etTime:"23:00",group:"G",team1:"Egypt",team2:"Iran",venue:"Lumen Field, Seattle",stage:"Group"},
  { date:"2026-06-26",etTime:"23:00",group:"G",team1:"New Zealand",team2:"Belgium",venue:"BC Place, Vancouver",stage:"Group"},
  { date:"2026-06-27",etTime:"17:00",group:"L",team1:"Panama",team2:"England",venue:"MetLife Stadium, NJ",stage:"Group"},
  { date:"2026-06-27",etTime:"17:00",group:"L",team1:"Croatia",team2:"Ghana",venue:"Lincoln Financial, Philadelphia",stage:"Group"},
  { date:"2026-06-27",etTime:"19:30",group:"K",team1:"Colombia",team2:"Portugal",venue:"Hard Rock Stadium, Miami",stage:"Group"},
  { date:"2026-06-27",etTime:"19:30",group:"K",team1:"DR Congo",team2:"Uzbekistan",venue:"Mercedes-Benz Stadium, Atlanta",stage:"Group"},
  { date:"2026-06-27",etTime:"22:00",group:"J",team1:"Algeria",team2:"Austria",venue:"Arrowhead Stadium, Kansas City",stage:"Group"},
  { date:"2026-06-27",etTime:"22:00",group:"J",team1:"Jordan",team2:"Argentina",venue:"AT&T Stadium, Arlington",stage:"Group"},
  // R32
  { date:"2026-06-28",etTime:"15:00",group:"",team1:"Runner-up A",team2:"Runner-up B",venue:"SoFi Stadium, Inglewood",stage:"R32"},
  { date:"2026-06-29",etTime:"13:00",group:"",team1:"Winner C",team2:"Runner-up F",venue:"NRG Stadium, Houston",stage:"R32"},
  { date:"2026-06-29",etTime:"16:30",group:"",team1:"Winner E",team2:"Best 3rd",venue:"Gillette Stadium, Foxborough",stage:"R32"},
  { date:"2026-06-29",etTime:"21:00",group:"",team1:"Winner F",team2:"Runner-up C",venue:"Estadio BBVA, Monterrey",stage:"R32"},
  { date:"2026-06-30",etTime:"13:00",group:"",team1:"Runner-up E",team2:"Runner-up I",venue:"AT&T Stadium, Arlington",stage:"R32"},
  { date:"2026-06-30",etTime:"17:00",group:"",team1:"Winner I",team2:"Best 3rd",venue:"MetLife Stadium, NJ",stage:"R32"},
  { date:"2026-06-30",etTime:"21:00",group:"",team1:"Winner A",team2:"Best 3rd",venue:"Estadio Azteca, Mexico City",stage:"R32"},
  { date:"2026-07-01",etTime:"12:00",group:"",team1:"Winner L",team2:"Best 3rd",venue:"Mercedes-Benz Stadium, Atlanta",stage:"R32"},
  { date:"2026-07-01",etTime:"16:00",group:"",team1:"Winner G",team2:"Best 3rd",venue:"Lumen Field, Seattle",stage:"R32"},
  { date:"2026-07-01",etTime:"20:00",group:"",team1:"Winner D",team2:"Best 3rd",venue:"Levi's Stadium, Santa Clara",stage:"R32"},
  { date:"2026-07-02",etTime:"15:00",group:"",team1:"Winner H",team2:"Runner-up J",venue:"SoFi Stadium, Inglewood",stage:"R32"},
  { date:"2026-07-02",etTime:"19:00",group:"",team1:"Runner-up K",team2:"Runner-up L",venue:"BMO Field, Toronto",stage:"R32"},
  { date:"2026-07-02",etTime:"23:00",group:"",team1:"Winner B",team2:"Best 3rd",venue:"BC Place, Vancouver",stage:"R32"},
  { date:"2026-07-03",etTime:"14:00",group:"",team1:"Runner-up D",team2:"Runner-up G",venue:"AT&T Stadium, Arlington",stage:"R32"},
  { date:"2026-07-03",etTime:"18:00",group:"",team1:"Winner J",team2:"Runner-up H",venue:"Hard Rock Stadium, Miami",stage:"R32"},
  { date:"2026-07-03",etTime:"21:30",group:"",team1:"Winner K",team2:"Best 3rd",venue:"Arrowhead Stadium, Kansas City",stage:"R32"},
  // R16
  { date:"2026-07-04",etTime:"13:00",group:"",team1:"W73 Winner",team2:"W75 Winner",venue:"NRG Stadium, Houston",stage:"R16"},
  { date:"2026-07-04",etTime:"17:00",group:"",team1:"W74 Winner",team2:"W77 Winner",venue:"Lincoln Financial, Philadelphia",stage:"R16"},
  { date:"2026-07-05",etTime:"16:00",group:"",team1:"W76 Winner",team2:"W78 Winner",venue:"MetLife Stadium, NJ",stage:"R16"},
  { date:"2026-07-05",etTime:"20:00",group:"",team1:"W79 Winner",team2:"W80 Winner",venue:"Estadio Azteca, Mexico City",stage:"R16"},
  { date:"2026-07-06",etTime:"15:00",group:"",team1:"W83 Winner",team2:"W84 Winner",venue:"AT&T Stadium, Arlington",stage:"R16"},
  { date:"2026-07-06",etTime:"20:00",group:"",team1:"W81 Winner",team2:"W82 Winner",venue:"Lumen Field, Seattle",stage:"R16"},
  { date:"2026-07-07",etTime:"12:00",group:"",team1:"W86 Winner",team2:"W88 Winner",venue:"Mercedes-Benz Stadium, Atlanta",stage:"R16"},
  { date:"2026-07-07",etTime:"16:00",group:"",team1:"W85 Winner",team2:"W87 Winner",venue:"BC Place, Vancouver",stage:"R16"},
  // QF
  { date:"2026-07-09",etTime:"16:00",group:"",team1:"QF1 Team A",team2:"QF1 Team B",venue:"Gillette Stadium, Foxborough",stage:"QF"},
  { date:"2026-07-10",etTime:"15:00",group:"",team1:"QF2 Team A",team2:"QF2 Team B",venue:"SoFi Stadium, Inglewood",stage:"QF"},
  { date:"2026-07-11",etTime:"17:00",group:"",team1:"QF3 Team A",team2:"QF3 Team B",venue:"Hard Rock Stadium, Miami",stage:"QF"},
  { date:"2026-07-11",etTime:"21:00",group:"",team1:"QF4 Team A",team2:"QF4 Team B",venue:"Arrowhead Stadium, Kansas City",stage:"QF"},
  // SF
  { date:"2026-07-14",etTime:"15:00",group:"",team1:"SF1 Team A",team2:"SF1 Team B",venue:"AT&T Stadium, Arlington",stage:"SF"},
  { date:"2026-07-15",etTime:"15:00",group:"",team1:"SF2 Team A",team2:"SF2 Team B",venue:"Mercedes-Benz Stadium, Atlanta",stage:"SF"},
  // 3P + Final
  { date:"2026-07-18",etTime:"17:00",group:"",team1:"3rd Place A",team2:"3rd Place B",venue:"Hard Rock Stadium, Miami",stage:"3P"},
  { date:"2026-07-19",etTime:"15:00",group:"",team1:"Finalist 1",team2:"Finalist 2",venue:"MetLife Stadium, NJ",stage:"FINAL"},
];

const STAGE_LABELS = { Group:"Group Stage", R32:"Round of 32", R16:"Round of 16", QF:"Quarterfinals", SF:"Semifinals", "3P":"3rd Place", FINAL:"Final" };
const STAGES = ["All","Group","R32","R16","QF","SF","3P","FINAL"];
const GROUPS = ["All","A","B","C","D","E","F","G","H","I","J","K","L"];

// All 48 qualified teams
const ALL_TEAMS = [
  "Algeria","Argentina","Australia","Austria","Belgium","Bosnia & Herz.",
  "Brazil","Canada","Cape Verde","Colombia","Croatia","Czechia","Curaçao",
  "DR Congo","Ecuador","Egypt","England","France","Germany","Ghana",
  "Haiti","Iran","Iraq","Ivory Coast","Japan","Jordan","Mexico",
  "Morocco","Netherlands","New Zealand","New Zealand","Norway","Panama",
  "Paraguay","Portugal","Qatar","Saudi Arabia","Scotland","Senegal",
  "South Africa","South Korea","Spain","Sweden","Switzerland","Tunisia",
  "Türkiye","Uruguay","USA","Uzbekistan"
].filter((v,i,a)=>a.indexOf(v)===i).sort();

function convertTime(etTime, date) {
  const [h, m] = etTime.split(":").map(Number);
  const etDate = new Date(`${date}T${etTime}:00-04:00`);
  const origDay = etDate.getUTCDate();

  const qatarDate = new Date(etDate.getTime() + 7 * 3600000);
  const indiaDate = new Date(etDate.getTime() + 9.5 * 3600000);

  const fmt = (d) => {
    const hh = d.getUTCHours(), mm = d.getUTCMinutes();
    const ampm = hh >= 12 ? "PM" : "AM";
    const h12 = hh % 12 || 12;
    return `${h12}:${mm.toString().padStart(2,"0")} ${ampm}`;
  };
  const ampm = h >= 12 ? "PM" : "AM";
  const h12 = h % 12 || 12;

  return {
    qatar: fmt(qatarDate),
    qatarNext: qatarDate.getUTCDate() !== origDay,
    india: fmt(indiaDate),
    indiaNext: indiaDate.getUTCDate() !== origDay,
    et: `${h12}:${m.toString().padStart(2,"0")} ${ampm}`,
  };
}

function formatDate(ds) {
  return new Date(ds + "T12:00:00Z").toLocaleDateString("en-US", {weekday:"short", month:"short", day:"numeric", timeZone:"UTC"});
}

// ─── THEME ───────────────────────────────────────────────────────────────────
const themes = {
  dark: {
    bg: "#0a0a0f",
    surface: "#111118",
    card: "#111118",
    cardBorder: "#1e1e2e",
    header: "linear-gradient(135deg,#0d0d1a 0%,#131320 100%)",
    headerBorder: "#1e1e2e",
    stickyBg: "#111118",
    text: "#e8e8f0",
    textSub: "#888",
    textMuted: "#555",
    accent: "#3d7eff",
    accentText: "#fff",
    datePill: "#3d7eff",
    vsBox: "#0d0d1a",
    timeBox: "#0d0d1a",
    timeBoxBorder: "#1e1e2e",
    pillActive: "#3d7eff",
    pillActiveText: "#fff",
    pillInactive: "#1e1e2e",
    pillInactiveText: "#aaa",
    inputBg: "#1e1e2e",
    inputBorder: "#2a2a3a",
    tagBg: "#1e1e2e",
    tagBorder: "#2a2a3a",
    tagText: "#888",
    tagActiveBg: "#131c35",
    tagActiveBorder: "#3d7eff",
    tagActiveText: "#6fa3ff",
    highlight: "linear-gradient(135deg,#131c35,#0d1628)",
    highlightBorder: "#3d7eff",
    stageBadge: "#3d7eff",
    divider: "#1e1e2e",
  },
  light: {
    bg: "#f4f5f7",
    surface: "#ffffff",
    card: "#ffffff",
    cardBorder: "#e2e5ec",
    header: "linear-gradient(135deg,#1a2340 0%,#2d3a5e 100%)",
    headerBorder: "#c8cfe0",
    stickyBg: "#ffffff",
    text: "#1a1f2e",
    textSub: "#5a6178",
    textMuted: "#9ba3b8",
    accent: "#2563eb",
    accentText: "#fff",
    datePill: "#2563eb",
    vsBox: "#f0f2f8",
    timeBox: "#f0f2f8",
    timeBoxBorder: "#dde2ef",
    pillActive: "#2563eb",
    pillActiveText: "#fff",
    pillInactive: "#e8eaf2",
    pillInactiveText: "#6b7280",
    inputBg: "#f0f2f8",
    inputBorder: "#dde2ef",
    tagBg: "#f0f2f8",
    tagBorder: "#dde2ef",
    tagText: "#6b7280",
    tagActiveBg: "#eff4ff",
    tagActiveBorder: "#2563eb",
    tagActiveText: "#2563eb",
    highlight: "linear-gradient(135deg,#eff4ff,#e8f0ff)",
    highlightBorder: "#2563eb",
    stageBadge: "#2563eb",
    divider: "#e2e5ec",
  }
};

// ─── MATCH CARD ──────────────────────────────────────────────────────────────
function MatchCard({ m, t, teamQuery }) {
  const times = convertTime(m.etTime, m.date);
  const q = teamQuery.toLowerCase().trim();
  const isHighlighted = q.length >= 2 &&
    (m.team1.toLowerCase().includes(q) || m.team2.toLowerCase().includes(q));

  return (
    <div style={{
      background: isHighlighted ? t.highlight : t.card,
      border: `1px solid ${isHighlighted ? t.highlightBorder : t.cardBorder}`,
      borderRadius: 8,
      padding: "10px 14px",
      display: "grid",
      gridTemplateColumns: "1fr auto 1fr auto",
      alignItems: "center",
      gap: 8,
    }}>
      {/* Team 1 */}
      <div>
        <div style={{
          fontSize: 14, fontWeight: 700, color: t.text, lineHeight: 1.3,
          ...(q.length >= 2 && m.team1.toLowerCase().includes(q) ? { color: t.accent } : {})
        }}>{m.team1}</div>
        <div style={{ fontSize: 10, color: m.group ? t.textMuted : t.accent, marginTop: 2, fontWeight: m.group ? 400 : 700 }}>
          {m.group ? `${STAGE_LABELS[m.stage]} · Grp ${m.group}` : STAGE_LABELS[m.stage]}
        </div>
      </div>

      {/* VS */}
      <div style={{
        textAlign: "center", padding: "4px 10px",
        background: t.vsBox, borderRadius: 6, minWidth: 30,
      }}>
        <div style={{ fontSize: 10, fontWeight: 800, color: t.textMuted }}>VS</div>
      </div>

      {/* Team 2 */}
      <div style={{ textAlign: "right" }}>
        <div style={{
          fontSize: 14, fontWeight: 700, color: t.text,
          ...(q.length >= 2 && m.team2.toLowerCase().includes(q) ? { color: t.accent } : {})
        }}>{m.team2}</div>
        <div style={{ fontSize: 10, color: t.textMuted, marginTop: 2, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
          📍 {m.venue}
        </div>
      </div>

      {/* Times */}
      <div style={{
        background: t.timeBox, borderRadius: 6, padding: "6px 10px",
        minWidth: 110, borderLeft: `2px solid ${t.timeBoxBorder}`,
      }}>
        {[
          { label: "AST", flag: "🕌", color: "#e2a03f", time: times.qatar, next: times.qatarNext },
          { label: "IST", flag: "🇮🇳", color: "#f97316", time: times.india, next: times.indiaNext },
          { label: "ET",  flag: "🌐", color: t.textMuted,  time: times.et,     next: false },
        ].map(row => (
          <div key={row.label} style={{ display: "flex", justifyContent: "space-between", gap: 6, marginBottom: 2 }}>
            <span style={{ fontSize: 9, color: row.color, fontWeight: 700 }}>{row.flag} {row.label}</span>
            <span style={{ fontSize: row.label === "ET" ? 10 : 11, color: row.label === "ET" ? t.textMuted : t.text, fontWeight: row.label === "ET" ? 400 : 700 }}>
              {row.time}{row.next && <span style={{ color: t.textMuted, fontSize: 9 }}> +1</span>}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── SCHEDULE VIEW ───────────────────────────────────────────────────────────
function ScheduleView({ t }) {
  const [stageFilter, setStageFilter] = useState("Group");
  const [groupFilter, setGroupFilter] = useState("All");
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => MATCHES.filter(m => {
    if (stageFilter !== "All" && m.stage !== stageFilter) return false;
    if (groupFilter !== "All" && m.group !== groupFilter) return false;
    if (search) {
      const q = search.toLowerCase();
      if (!m.team1.toLowerCase().includes(q) && !m.team2.toLowerCase().includes(q) && !m.venue.toLowerCase().includes(q)) return false;
    }
    return true;
  }), [stageFilter, groupFilter, search]);

  const grouped = useMemo(() => {
    const map = {};
    filtered.forEach(m => { if (!map[m.date]) map[m.date] = []; map[m.date].push(m); });
    return Object.entries(map).sort(([a],[b]) => a.localeCompare(b));
  }, [filtered]);

  return (
    <>
      {/* Filters sticky bar */}
      <div style={{ background: t.stickyBg, borderBottom: `1px solid ${t.divider}`, padding: "12px 20px", position: "sticky", top: 52, zIndex: 9 }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 8 }}>
            {STAGES.map(s => (
              <button key={s} onClick={() => { setStageFilter(s); setGroupFilter("All"); }} style={{
                padding: "5px 12px", borderRadius: 20, border: "none", cursor: "pointer",
                fontSize: 12, fontWeight: 600,
                background: stageFilter === s ? t.pillActive : t.pillInactive,
                color: stageFilter === s ? t.pillActiveText : t.pillInactiveText,
              }}>{s === "All" ? "All" : STAGE_LABELS[s] || s}</button>
            ))}
          </div>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center" }}>
            {stageFilter === "Group" && GROUPS.map(g => (
              <button key={g} onClick={() => setGroupFilter(g)} style={{
                padding: "4px 10px", borderRadius: 4, border: `1px solid`,
                borderColor: groupFilter === g ? t.accent : t.tagBorder,
                cursor: "pointer", fontSize: 11, fontWeight: 700,
                background: groupFilter === g ? t.tagActiveBg : "transparent",
                color: groupFilter === g ? t.tagActiveText : t.tagText,
              }}>{g === "All" ? "All" : `Grp ${g}`}</button>
            ))}
            <input value={search} onChange={e => setSearch(e.target.value)}
              placeholder="Search team / venue…"
              style={{
                background: t.inputBg, border: `1px solid ${t.inputBorder}`,
                borderRadius: 6, padding: "5px 10px", color: t.text,
                fontSize: 12, outline: "none", width: 180,
              }} />
          </div>
        </div>
      </div>

      {/* Matches */}
      <div style={{ maxWidth: 900, margin: "0 auto", padding: "16px 20px 40px" }}>
        {grouped.length === 0 && <div style={{ textAlign: "center", color: t.textMuted, padding: 60 }}>No matches found.</div>}
        {grouped.map(([date, matches]) => (
          <div key={date} style={{ marginBottom: 22 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
              <div style={{ background: t.datePill, color: "#fff", padding: "3px 10px", borderRadius: 4, fontSize: 12, fontWeight: 700 }}>
                {formatDate(date)}
              </div>
              <div style={{ height: 1, flex: 1, background: t.divider }} />
              <span style={{ fontSize: 11, color: t.textMuted }}>{matches.length} match{matches.length > 1 ? "es" : ""}</span>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              {matches.map((m, i) => <MatchCard key={i} m={m} t={t} teamQuery="" />)}
            </div>
          </div>
        ))}
        <div style={{ padding: "12px 14px", background: t.card, borderRadius: 8, border: `1px solid ${t.cardBorder}`, fontSize: 11, color: t.textMuted, display: "flex", gap: 16, flexWrap: "wrap", marginTop: 8 }}>
          <span>+1 = next calendar day</span>
          <span>AST = Arabia Standard Time (UTC+3)</span>
          <span>IST = India Standard Time (UTC+5:30)</span>
          <span>ET = US Eastern Time (UTC-4)</span>
        </div>
      </div>
    </>
  );
}

// ─── TEAM VIEW ───────────────────────────────────────────────────────────────
function TeamView({ t }) {
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState("");

  const suggestions = useMemo(() => {
    if (query.length < 2) return [];
    const q = query.toLowerCase();
    return ALL_TEAMS.filter(tm => tm.toLowerCase().includes(q)).slice(0, 8);
  }, [query]);

  const teamMatches = useMemo(() => {
    if (!selected) return [];
    const s = selected.toLowerCase();
    return MATCHES.filter(m => m.team1.toLowerCase().includes(s) || m.team2.toLowerCase().includes(s));
  }, [selected]);

  const grouped = useMemo(() => {
    const map = {};
    teamMatches.forEach(m => { if (!map[m.date]) map[m.date] = []; map[m.date].push(m); });
    return Object.entries(map).sort(([a],[b]) => a.localeCompare(b));
  }, [teamMatches]);

  return (
    <div style={{ maxWidth: 900, margin: "0 auto", padding: "20px 20px 40px" }}>
      {/* Search box */}
      <div style={{ position: "relative", maxWidth: 360, marginBottom: 24 }}>
        <div style={{ fontSize: 12, color: t.textSub, marginBottom: 6, fontWeight: 600 }}>TYPE TEAM NAME</div>
        <input
          value={query}
          onChange={e => { setQuery(e.target.value); if (selected) setSelected(""); }}
          placeholder="e.g. Brazil, Argentina, England…"
          style={{
            width: "100%", boxSizing: "border-box",
            background: t.inputBg, border: `1px solid ${selected ? t.accent : t.inputBorder}`,
            borderRadius: 8, padding: "10px 14px", color: t.text,
            fontSize: 14, outline: "none",
          }}
        />
        {suggestions.length > 0 && !selected && (
          <div style={{
            position: "absolute", top: "100%", left: 0, right: 0, zIndex: 20,
            background: t.surface, border: `1px solid ${t.cardBorder}`,
            borderRadius: 8, marginTop: 4, overflow: "hidden",
            boxShadow: "0 8px 24px rgba(0,0,0,0.15)",
          }}>
            {suggestions.map(tm => (
              <div key={tm} onClick={() => { setSelected(tm); setQuery(tm); }}
                style={{
                  padding: "9px 14px", cursor: "pointer", fontSize: 13,
                  color: t.text, borderBottom: `1px solid ${t.divider}`,
                  transition: "background 0.1s",
                }}
                onMouseEnter={e => e.currentTarget.style.background = t.tagActiveBg}
                onMouseLeave={e => e.currentTarget.style.background = "transparent"}
              >{tm}</div>
            ))}
          </div>
        )}
      </div>

      {/* Results */}
      {selected && teamMatches.length === 0 && (
        <div style={{ color: t.textMuted, fontSize: 14 }}>No matches found for "{selected}".</div>
      )}

      {selected && teamMatches.length > 0 && (
        <>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
            <div style={{ fontSize: 18, fontWeight: 800, color: t.text }}>{selected}</div>
            <div style={{ background: t.tagActiveBg, border: `1px solid ${t.tagActiveBorder}`, color: t.tagActiveText, borderRadius: 20, padding: "2px 10px", fontSize: 11, fontWeight: 700 }}>
              {teamMatches.length} match{teamMatches.length > 1 ? "es" : ""}
            </div>
            <button onClick={() => { setSelected(""); setQuery(""); }} style={{
              marginLeft: "auto", background: "none", border: `1px solid ${t.cardBorder}`,
              borderRadius: 6, padding: "4px 10px", color: t.textSub, cursor: "pointer", fontSize: 12,
            }}>✕ Clear</button>
          </div>

          {grouped.map(([date, matches]) => (
            <div key={date} style={{ marginBottom: 20 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
                <div style={{ background: t.datePill, color: "#fff", padding: "3px 10px", borderRadius: 4, fontSize: 12, fontWeight: 700 }}>
                  {formatDate(date)}
                </div>
                <div style={{ height: 1, flex: 1, background: t.divider }} />
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                {matches.map((m, i) => <MatchCard key={i} m={m} t={t} teamQuery={selected} />)}
              </div>
            </div>
          ))}
        </>
      )}

      {!selected && query.length < 2 && (
        <div style={{ color: t.textMuted, fontSize: 13, lineHeight: 1.7 }}>
          Type at least 2 letters to search. Try: Brazil, Argentina, England, France, Germany, Spain, Portugal, Netherlands…
        </div>
      )}
    </div>
  );
}

// ─── APP ─────────────────────────────────────────────────────────────────────
export default function App() {
  const [dark, setDark] = useState(true);
  const [tab, setTab] = useState("schedule"); // "schedule" | "team"
  const t = dark ? themes.dark : themes.light;

  return (
    <div style={{ minHeight: "100vh", background: t.bg, color: t.text, fontFamily: "'Segoe UI', system-ui, sans-serif" }}>
      {/* Header */}
      <div style={{ background: t.header, borderBottom: `1px solid ${t.headerBorder}`, padding: "16px 20px 0" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <span style={{ fontSize: 26 }}>⚽</span>
              <div>
                <div style={{ fontSize: 10, letterSpacing: 3, textTransform: "uppercase", color: t.accent, fontWeight: 700 }}>FIFA</div>
                <div style={{ fontSize: 20, fontWeight: 800, color: "#fff", lineHeight: 1 }}>World Cup 2026</div>
              </div>
              <div style={{ fontSize: 11, color: "rgba(255,255,255,0.45)", marginLeft: 8 }}>Jun 11 – Jul 19 · 104 Matches</div>
            </div>
            {/* Theme toggle */}
            <button onClick={() => setDark(!dark)} style={{
              background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.2)",
              borderRadius: 20, padding: "6px 14px", cursor: "pointer",
              fontSize: 12, color: "#fff", fontWeight: 600, display: "flex", alignItems: "center", gap: 6,
            }}>
              {dark ? "☀️ Light" : "🌙 Dark"}
            </button>
          </div>

          {/* Tabs */}
          <div style={{ display: "flex", gap: 0 }}>
            {[["schedule","📅  Schedule"],["team","🔍  Team"]].map(([id, label]) => (
              <button key={id} onClick={() => setTab(id)} style={{
                padding: "8px 20px", border: "none", cursor: "pointer",
                background: tab === id ? t.stickyBg : "transparent",
                color: tab === id ? t.text : "rgba(255,255,255,0.6)",
                fontWeight: tab === id ? 700 : 500,
                fontSize: 13,
                borderRadius: "6px 6px 0 0",
                borderBottom: tab === id ? `2px solid ${t.accent}` : "2px solid transparent",
                transition: "all 0.15s",
              }}>{label}</button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      {tab === "schedule" ? <ScheduleView t={t} /> : <TeamView t={t} />}
    </div>
  );
}
