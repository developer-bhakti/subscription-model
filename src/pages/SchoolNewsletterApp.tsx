import { useState, useRef, useCallback } from "react";

const MONTHS = ["January","February","March","April","May","June","July","August","September","October","November","December"];
const DAYS = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
const COLORS = {
 holiday: { bg: "bg-rose-100", text: "text-rose-700", border: "border-rose-300", badge: "bg-rose-500", dot: "#f43f5e" },
 event: { bg: "bg-violet-100", text: "text-violet-700", border: "border-violet-300", badge: "bg-violet-500", dot: "#8b5cf6" },
 birthday: { bg: "bg-amber-100", text: "text-amber-700", border: "border-amber-300", badge: "bg-amber-500", dot: "#f59e0b" },
 activity: { bg: "bg-emerald-100", text: "text-emerald-700", border: "border-emerald-300", badge: "bg-emerald-500", dot: "#10b981" },
 fieldVisit: { bg: "bg-sky-100", text: "text-sky-700", border: "border-sky-300", badge: "bg-sky-500", dot: "#0ea5e9" },
 fruitless: { bg: "bg-lime-100", text: "text-lime-700", border: "border-lime-300", badge: "bg-lime-500", dot: "#84cc16" },
};

const uid = () => Math.random().toString(36).slice(2, 9);

const emptyHoliday = () => ({ id: uid(), title: "", startDate: "", endDate: "", description: "" });
const emptyEvent = () => ({ id: uid(), name: "", startDate: "", endDate: "", description: "" });
const emptyBirthday = () => ({ id: uid(), name: "", date: "", classDept: "" });
const emptyActivity = () => ({ id: uid(), name: "", date: "", description: "" });
const emptyFieldVisit = () => ({ id: uid(), title: "", date: "", location: "", description: "" });
const emptyFruitless = () => ({ id: uid(), title: "", date: "", theme: "", description: "" });

function AnimatedSection({ children, className = "" }) {
 return (
  <div className={`transition-all duration-300 ease-out ${className}`}>
   {children}
  </div>
 );
}

function SectionCard({ title, icon, color, children, onAdd, addLabel }) {
 return (
  <div className={`bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden`}>
   <div className={`flex items-center justify-between px-4 py-3 ${color}`}>
    <div className="flex items-center gap-3">
     <span className="text-2xl">{icon}</span>
     <h3 className="font-bold text-lg text-white tracking-wide">{title}</h3>
    </div>
    {onAdd && (
     <button onClick={onAdd}
      className="flex items-center gap-1.5 bg-white/20 hover:bg-white/30 text-white text-sm font-semibold px-3 py-1.5 rounded-lg transition-all">
      <span className="text-lg leading-none">+</span> {addLabel || "Add"}
     </button>
    )}
   </div>
   <div className="p-4 space-y-4">{children}</div>
  </div>
 );
}

function EntryCard({ children, onRemove, animate = true }) {
 return (
  <div className={`bg-gray-50 rounded-xl border border-gray-200 p-4 relative group ${animate ? "animate-fadeIn" : ""}`}>
   <button onClick={onRemove}
    className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 text-gray-400 hover:text-red-500 transition-all w-7 h-7 flex items-center justify-center rounded-full hover:bg-red-50">
    ✕
   </button>
   <div className="grid grid-cols-1 md:grid-cols-2 gap-3">{children}</div>
  </div>
 );
}

function Field({ label, type = "text", value, onChange, placeholder, full, required }) {
 return (
  <div className={full ? "md:col-span-2" : ""}>
   <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
    {label}{required && <span className="text-red-400 ml-1">*</span>}
   </label>
   {type === "textarea" ? (
    <textarea value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder}
     rows={2}
     className="w-full px-3 py-2 rounded-lg border border-gray-200 bg-white text-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300 resize-none transition" />
   ) : (
    <input type={type} value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder}
     className="w-full px-3 py-2 rounded-lg border border-gray-200 bg-white text-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300 transition" />
   )}
  </div>
 );
}

function Badge({ type, label }) {
 const c = COLORS[type] || COLORS.event;
 return (
  <span className={`inline-flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full ${c.bg} ${c.text}`}>
   {label}
  </span>
 );
}

function getDaysInMonth(year, month) {
 return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfMonth(year, month) {
 return new Date(year, month, 1).getDay();
}

function formatDate(dateStr) {
 if (!dateStr) return "";
 const d = new Date(dateStr + "T00:00:00");
 return d.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
}

function dateInRange(date, startDate, endDate) {
 const d = date.getTime();
 const s = new Date(startDate + "T00:00:00").getTime();
 const e = endDate ? new Date(endDate + "T00:00:00").getTime() : s;
 return d >= s && d <= e;
}

function parseDate(dateStr) {
 if (!dateStr) return Number.POSITIVE_INFINITY;
 return new Date(dateStr + "T00:00:00").getTime();
}

function getEventsForDay(date, { holidays, events, birthdays, activities, fieldVisits, fruitless }) {
 const items = [];
 holidays.forEach(h => { if (h.startDate && dateInRange(date, h.startDate, h.endDate || h.startDate)) items.push({ type: "holiday", label: h.title || "Holiday" }); });
 events.forEach(e => { if (e.startDate && dateInRange(date, e.startDate, e.endDate || e.startDate)) items.push({ type: "event", label: e.name || "Event" }); });
 birthdays.forEach(b => { if (b.date) { const bd = new Date(b.date + "T00:00:00"); if (bd.getDate() === date.getDate() && bd.getMonth() === date.getMonth()) items.push({ type: "birthday", label: b.name || "Birthday" }); } });
 activities.forEach(a => { if (a.date) { const ad = new Date(a.date + "T00:00:00"); if (ad.getDate() === date.getDate() && ad.getMonth() === date.getMonth()) items.push({ type: "activity", label: a.name || "Activity" }); } });
 fieldVisits.forEach(v => { if (v.date) { const vd = new Date(v.date + "T00:00:00"); if (vd.getDate() === date.getDate() && vd.getMonth() === date.getMonth()) items.push({ type: "fieldVisit", label: v.title || "Field Visit" }); } });
 fruitless.forEach(f => { if (f.date) { const fd = new Date(f.date + "T00:00:00"); if (fd.getDate() === date.getDate() && fd.getMonth() === date.getMonth()) items.push({ type: "fruitless", label: f.title || "Healthy Food" }); } });
 return items;
}

export default function App() {
 const [tab, setTab] = useState("form");
 const [search, setSearch] = useState("");
 const [logoUrl, setLogoUrl] = useState("");
 const logoInputRef = useRef();
 const printRef = useRef();

 const [school, setSchool] = useState({
  name: "", address: "", contact: "", email: "", principal: "",
  month: new Date().getMonth(), year: new Date().getFullYear()
 });

 const [holidays, setHolidays] = useState([emptyHoliday()]);
 const [events, setEvents] = useState([emptyEvent()]);
 const [birthdays, setBirthdays] = useState([emptyBirthday()]);
 const [activities, setActivities] = useState([emptyActivity()]);
 const [fieldVisits, setFieldVisits] = useState([emptyFieldVisit()]);
 const [fruitless, setFruitless] = useState([emptyFruitless()]);

 const update = (setter, id, field, val) => setter(prev => prev.map(x => x.id === id ? { ...x, [field]: val } : x));
 const remove = (setter, id) => setter(prev => prev.filter(x => x.id !== id));

 const allData = { holidays, events, birthdays, activities, fieldVisits, fruitless };

 const generateScheduleRows = useCallback(() => {
  const { month, year } = school;
  const days = getDaysInMonth(year, month);
  const rows = [];
  const used = new Set();

  const addRange = (startDate, endDate, label, type) => {
   if (!startDate) return;
   const key = `${type}-${startDate}-${endDate || startDate}`;
   if (used.has(key)) return;
   used.add(key);
   rows.push({ startDate, endDate: endDate || startDate, label, type });
  };

  holidays.forEach(h => h.title && h.startDate && addRange(h.startDate, h.endDate, h.title, "holiday"));
  events.forEach(e => e.name && e.startDate && addRange(e.startDate, e.endDate, e.name, "event"));
  birthdays.forEach(b => b.name && b.date && addRange(b.date, "", `🎂 ${b.name}'s Birthday (${b.classDept || ""})`, "birthday"));
  activities.forEach(a => a.name && a.date && addRange(a.date, "", a.name, "activity"));
  fieldVisits.forEach(v => v.title && v.date && addRange(v.date, "", `${v.title}${v.location ? ` — ${v.location}` : ""}`, "fieldVisit"));
  fruitless.forEach(f => f.title && f.date && addRange(f.date, "", `${f.title}${f.theme ? ` (${f.theme})` : ""}`, "fruitless"));

  const eventDates = new Set(rows.flatMap(r => {
   const dates = [];
   const s = new Date(r.startDate + "T00:00:00");
   const e = r.endDate ? new Date(r.endDate + "T00:00:00") : s;
   for (let d = new Date(s); d <= e; d.setDate(d.getDate() + 1)) {
    dates.push(`${year}-${String(month + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`);
   }
   return dates;
  }));

  for (let d = 1; d <= days; d++) {
   const dateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
   const dow = new Date(dateStr + "T00:00:00").getDay();
   if (!eventDates.has(dateStr) && dow !== 0 && dow !== 6) {
    rows.push({ startDate: dateStr, endDate: dateStr, label: "Regular School Day", type: "regular" });
   }
  }

  return rows.sort((a, b) => new Date(a.startDate) - new Date(b.startDate));
 }, [school, holidays, events, birthdays, activities, fieldVisits, fruitless]);

 const scheduleRows = generateScheduleRows();

 const filteredRows = search
  ? scheduleRows.filter(r => r.label.toLowerCase().includes(search.toLowerCase()) || r.type.toLowerCase().includes(search.toLowerCase()))
  : scheduleRows;

 const sortedHolidays = [...holidays.filter(h => h.title)].sort((a, b) => parseDate(a.startDate) - parseDate(b.startDate));
 const sortedEvents = [...events.filter(e => e.name)].sort((a, b) => parseDate(a.startDate) - parseDate(b.startDate));
 const sortedBirthdays = [...birthdays.filter(b => b.name)].sort((a, b) => parseDate(a.date) - parseDate(b.date));
 const sortedActivities = [...activities.filter(a => a.name)].sort((a, b) => parseDate(a.date) - parseDate(b.date));
 const sortedFieldVisits = [...fieldVisits.filter(v => v.title)].sort((a, b) => parseDate(a.date) - parseDate(b.date));
 const sortedFruitless = [...fruitless.filter(f => f.title)].sort((a, b) => parseDate(a.date) - parseDate(b.date));

 const handleLogoUpload = e => {
  const file = e.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = ev => setLogoUrl(ev.target.result);
  reader.readAsDataURL(file);
 };

 const handlePrint = () => {
  if (tab !== "preview") {
   setTab("preview");
   setTimeout(() => window.print(), 300);
   return;
  }
  window.print();
 };

 const calendarDays = () => {
  const { month, year } = school;
  const total = getDaysInMonth(year, month);
  const firstDay = getFirstDayOfMonth(year, month);
  const cells = [];
  for (let i = 0; i < firstDay; i++) cells.push(null);
  for (let d = 1; d <= total; d++) cells.push(d);
  return cells;
 };

 const tabs = [
  { id: "form", label: "📝 Setup" },
  { id: "preview", label: "📄 Newsletter" },
  { id: "calendar", label: "📅 Calendar" },
  { id: "schedule", label: "📋 Schedule" },
 ];

 return (
  <div className="min-h-screen bg-slate-50 font-sans">
   <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Fraunces:opsz,wght@9..144,400;600;700&display=swap');
    * { font-family: 'Plus Jakarta Sans', sans-serif; box-sizing: border-box; }
    .font-display { font-family: 'Fraunces', serif; }
    @keyframes fadeIn { from { opacity:0; transform:translateY(8px); } to { opacity:1; transform:none; } }
    .animate-fadeIn { animation: fadeIn 0.25s ease-out; }
    @media print {
     body * { visibility: hidden !important; }
     .print-area, .print-area * { visibility: visible !important; }
     .print-area { position: absolute; top: 0; left: 0; width: 100%; background: white !important; color: #111 !important; box-shadow: none !important; }
     .print-area * { color: inherit !important; background: transparent !important; }
     .no-print { display: none !important; }
     body { background: white !important; }
    }
    ::-webkit-scrollbar { width: 6px; } ::-webkit-scrollbar-track { background: transparent; } ::-webkit-scrollbar-thumb { background: #c7d2fe; border-radius: 99px; }
   `}</style>

   {/* Header */}
   <header className="no-print sticky top-0 z-50 bg-white/80 backdrop-blur border-b border-gray-200">
    <div className="max-w-6xl mx-auto px-4 py-2.5 flex items-center justify-between">
     <div className="flex items-center gap-3">
      <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-white font-bold text-lg shadow">📰</div>
      <div>
       <h1 className="font-display font-bold text-gray-900 text-lg leading-tight">School Newsletter</h1>
       <p className="text-xs text-gray-400">Monthly Generator</p>
      </div>
     </div>
     <div className="flex items-center gap-2">      <button onClick={handlePrint}
       className="no-print flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold px-4 py-2 rounded-xl transition shadow-sm">
       🖨️ Print
      </button>
     </div>
    </div>

    {/* Tabs */}
    <div className="max-w-6xl mx-auto px-4 pb-0 flex gap-1 border-t border-gray-100 mt-1 overflow-x-auto">
     {tabs.map(t => (
      <button key={t.id} onClick={() => setTab(t.id)}
       className={`px-4 py-2.5 text-sm font-semibold whitespace-nowrap border-b-2 transition-all ${tab === t.id ? "border-indigo-500 text-indigo-600" : "border-transparent text-gray-500 hover:text-gray-700"}`}>
       {t.label}
      </button>
     ))}
    </div>
   </header>

   <main className="max-w-6xl mx-auto px-4 py-4 space-y-4">

    {/* ── FORM TAB ── */}
    {tab === "form" && (
     <AnimatedSection className="space-y-4">
      {/* School Info */}
      <SectionCard title="School Information" icon="🏫" color="bg-gradient-to-r from-indigo-500 to-violet-600">
       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Logo upload */}
        <div className="md:col-span-2 flex items-center gap-4">
         <div onClick={() => logoInputRef.current.click()}
          className="w-24 h-24 rounded-2xl border-2 border-dashed border-indigo-300 flex items-center justify-center cursor-pointer hover:bg-indigo-50 transition overflow-hidden bg-gray-50">
          {logoUrl ? <img src={logoUrl} alt="Logo" className="w-full h-full object-contain p-1" />
           : <div className="text-center"><div className="text-3xl">🖼️</div><div className="text-xs text-gray-400 mt-1">Upload Logo</div></div>}
         </div>
         <input ref={logoInputRef} type="file" accept="image/*" className="hidden" onChange={handleLogoUpload} />
         <div className="flex-1 space-y-1">
          <p className="text-sm font-semibold text-gray-700">School Logo</p>
          <p className="text-xs text-gray-400">PNG, JPG, SVG supported. Click to upload.</p>
          {logoUrl && <button onClick={() => setLogoUrl("")} className="text-xs text-red-400 hover:text-red-600 transition">Remove logo</button>}
         </div>
        </div>
        <Field label="School Name" value={school.name} onChange={v => setSchool(s => ({ ...s, name: v }))} placeholder="St. Mary's High School" required />
        <Field label="Principal Name" value={school.principal} onChange={v => setSchool(s => ({ ...s, principal: v }))} placeholder="Dr. Sarah Williams" />
        <Field label="School Address" value={school.address} onChange={v => setSchool(s => ({ ...s, address: v }))} placeholder="123 Education Lane, City" full />
        <Field label="Contact Number" value={school.contact} onChange={v => setSchool(s => ({ ...s, contact: v }))} placeholder="+91 98765 43210" />
        <Field label="Email Address" value={school.email} onChange={v => setSchool(s => ({ ...s, email: v }))} placeholder="info@school.edu" type="email" />
        {/* Month & Year */}
        <div>
         <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Newsletter Month</label>
         <select value={school.month} onChange={e => setSchool(s => ({ ...s, month: Number(e.target.value) }))}
          className="w-full px-3 py-2 rounded-lg border border-gray-200 bg-white text-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300">
          {MONTHS.map((m, i) => <option key={m} value={i}>{m}</option>)}
         </select>
        </div>
        <div>
         <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Year</label>
         <select value={school.year} onChange={e => setSchool(s => ({ ...s, year: Number(e.target.value) }))}
          className="w-full px-3 py-2 rounded-lg border border-gray-200 bg-white text-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300">
          {[2024, 2025, 2026, 2027, 2028].map(y => <option key={y} value={y}>{y}</option>)}
         </select>
        </div>
       </div>
      </SectionCard>

      {/* Holidays */}
      <SectionCard title="Holidays" icon="🌴" color="bg-gradient-to-r from-rose-400 to-pink-500"
       onAdd={() => setHolidays(h => [...h, emptyHoliday()])} addLabel="Add Holiday">
       {holidays.map(h => (
        <EntryCard key={h.id} onRemove={() => remove(setHolidays, h.id)}>
         <Field label="Holiday Title" value={h.title} onChange={v => update(setHolidays, h.id, "title", v)} placeholder="Diwali Vacation" required />
         <div /> {/* spacer */}
         <Field label="Start Date" type="date" value={h.startDate} onChange={v => update(setHolidays, h.id, "startDate", v)} />
         <Field label="End Date" type="date" value={h.endDate} onChange={v => update(setHolidays, h.id, "endDate", v)} />
         <Field label="Description" type="textarea" value={h.description} onChange={v => update(setHolidays, h.id, "description", v)} placeholder="Brief description..." full />
        </EntryCard>
       ))}
      </SectionCard>

      {/* Events */}
      <SectionCard title="Events" icon="🎪" color="bg-gradient-to-r from-violet-500 to-purple-600"
       onAdd={() => setEvents(e => [...e, emptyEvent()])} addLabel="Add Event">
       {events.map(ev => (
        <EntryCard key={ev.id} onRemove={() => remove(setEvents, ev.id)}>
         <Field label="Event Name" value={ev.name} onChange={v => update(setEvents, ev.id, "name", v)} placeholder="Annual Day" required />
         <div />
         <Field label="Start Date" type="date" value={ev.startDate} onChange={v => update(setEvents, ev.id, "startDate", v)} />
         <Field label="End Date" type="date" value={ev.endDate} onChange={v => update(setEvents, ev.id, "endDate", v)} />
         <Field label="Description" type="textarea" value={ev.description} onChange={v => update(setEvents, ev.id, "description", v)} placeholder="Details..." full />
        </EntryCard>
       ))}
      </SectionCard>

      {/* Birthdays */}
      <SectionCard title="Birthdays" icon="🎂" color="bg-gradient-to-r from-amber-400 to-orange-500"
       onAdd={() => setBirthdays(b => [...b, emptyBirthday()])} addLabel="Add Birthday">
       {birthdays.map(b => (
        <EntryCard key={b.id} onRemove={() => remove(setBirthdays, b.id)}>
         <Field label="Name" value={b.name} onChange={v => update(setBirthdays, b.id, "name", v)} placeholder="Student / Teacher name" required />
         <Field label="Class / Department" value={b.classDept} onChange={v => update(setBirthdays, b.id, "classDept", v)} placeholder="Grade 5A / Science Dept." />
         <Field label="Birthday Date" type="date" value={b.date} onChange={v => update(setBirthdays, b.id, "date", v)} />
        </EntryCard>
       ))}
      </SectionCard>

      {/* Activities */}
      <SectionCard title="Activities" icon="🎨" color="bg-gradient-to-r from-emerald-400 to-teal-500"
       onAdd={() => setActivities(a => [...a, emptyActivity()])} addLabel="Add Activity">
       {activities.map(a => (
        <EntryCard key={a.id} onRemove={() => remove(setActivities, a.id)}>
         <Field label="Activity Name" value={a.name} onChange={v => update(setActivities, a.id, "name", v)} placeholder="Drawing Competition" required />
         <Field label="Date" type="date" value={a.date} onChange={v => update(setActivities, a.id, "date", v)} />
         <Field label="Description" type="textarea" value={a.description} onChange={v => update(setActivities, a.id, "description", v)} placeholder="Details..." full />
        </EntryCard>
       ))}
      </SectionCard>

      {/* Field Visits */}
      <SectionCard title="Field Visits" icon="🚌" color="bg-gradient-to-r from-sky-400 to-blue-500"
       onAdd={() => setFieldVisits(v => [...v, emptyFieldVisit()])} addLabel="Add Visit">
       {fieldVisits.map(v => (
        <EntryCard key={v.id} onRemove={() => remove(setFieldVisits, v.id)}>
         <Field label="Visit Title" value={v.title} onChange={val => update(setFieldVisits, v.id, "title", val)} placeholder="Zoo Visit" required />
         <Field label="Location" value={v.location} onChange={val => update(setFieldVisits, v.id, "location", val)} placeholder="City Zoo" />
         <Field label="Date" type="date" value={v.date} onChange={val => update(setFieldVisits, v.id, "date", val)} />
         <Field label="Description" type="textarea" value={v.description} onChange={val => update(setFieldVisits, v.id, "description", val)} placeholder="Details..." full />
        </EntryCard>
       ))}
      </SectionCard>

      {/* Fireless Food */}
      <SectionCard title="Fireless Food Activity" icon="🥗" color="bg-gradient-to-r from-lime-400 to-green-500"
       onAdd={() => setFruitless(f => [...f, emptyFruitless()])} addLabel="Add Activity">
       {fruitless.map(f => (
        <EntryCard key={f.id} onRemove={() => remove(setFruitless, f.id)}>
         <Field label="Activity Title" value={f.title} onChange={v => update(setFruitless, f.id, "title", v)} placeholder="Healthy Lunch Day" required />
         <Field label="Healthy Food Theme" value={f.theme} onChange={v => update(setFruitless, f.id, "theme", v)} placeholder="No Junk Food Week" />
         <Field label="Date" type="date" value={f.date} onChange={v => update(setFruitless, f.id, "date", v)} />
         <Field label="Description" type="textarea" value={f.description} onChange={v => update(setFruitless, f.id, "description", v)} placeholder="Details..." full />
        </EntryCard>
       ))}
      </SectionCard>

      <div className="flex justify-center pt-2">
       <button onClick={() => setTab("preview")}
        className="bg-gradient-to-r from-indigo-500 to-violet-600 hover:from-indigo-600 hover:to-violet-700 text-white font-bold px-8 py-3.5 rounded-2xl shadow-lg transition-all hover:shadow-xl hover:scale-105 text-base">
        Generate Newsletter →
       </button>
      </div>
     </AnimatedSection>
    )}

    {/* ── NEWSLETTER PREVIEW TAB ── */}
    {tab === "preview" && (
     <AnimatedSection>
      <div ref={printRef} className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100 print-area">
       {/* Newsletter Header */}
       <div className="bg-gradient-to-r from-indigo-600 via-violet-600 to-purple-700 px-8 py-8 text-white">
        <div className="flex items-center gap-6">
         {logoUrl && <img src={logoUrl} alt="Logo" className="w-20 h-20 object-contain bg-white rounded-2xl p-1.5 shadow-lg flex-shrink-0" />}
         <div className="flex-1">
          <h1 className="font-display text-3xl font-bold leading-tight">{school.name || "School Name"}</h1>
          <p className="text-indigo-200 text-sm mt-1">{school.address || "School Address"}</p>
          <div className="flex flex-wrap gap-x-4 gap-y-1 text-indigo-200 text-xs mt-1.5">
           {school.contact && <span>📞 {school.contact}</span>}
           {school.email && <span>✉️ {school.email}</span>}
           {school.principal && <span>👤 Principal: {school.principal}</span>}
          </div>
         </div>
         <div className="text-right flex-shrink-0">
          <div className="text-4xl font-display font-bold leading-none">{MONTHS[school.month]}</div>
          <div className="text-indigo-200 text-xl">{school.year}</div>
          <div className="mt-2 text-xs bg-white/20 rounded-full px-3 py-1 inline-block">Monthly Newsletter</div>
         </div>
        </div>
       </div>

       {/* Decorative strip */}
       <div className="h-2 bg-gradient-to-r from-rose-400 via-amber-400 via-emerald-400 to-sky-400" />

       <div className="p-8 space-y-8">
        {/* Legend */}
        <div className="flex flex-wrap gap-3">
         {Object.entries(COLORS).map(([k, v]) => (
          <span key={k} className={`text-xs font-semibold px-3 py-1 rounded-full ${v.bg} ${v.text}`}>
           {k === "holiday" ? "🌴 Holiday" : k === "event" ? "🎪 Event" : k === "birthday" ? "🎂 Birthday" : k === "activity" ? "🎨 Activity" : k === "fieldVisit" ? "🚌 Field Visit" : "🥗 Food Activity"}
          </span>
         ))}
        </div>

        {/* Sections preview */}
        {sortedHolidays.length > 0 && (
         <section>
          <h2 className="font-display font-bold text-xl text-rose-600 border-b-2 border-rose-100 pb-2 mb-4">🌴 Holidays</h2>
          <div className="space-y-2">
           {sortedHolidays.map(h => (
            <div key={h.id} className="flex items-start gap-4 p-3 bg-rose-50 rounded-xl">
             <div className="flex-1">
              <p className="font-semibold text-rose-800">{h.title}</p>
              {h.description && <p className="text-sm text-rose-600 mt-0.5">{h.description}</p>}
             </div>
             <div className="text-sm text-rose-500 whitespace-nowrap font-medium">
              {formatDate(h.startDate)}{h.endDate && h.endDate !== h.startDate ? ` – ${formatDate(h.endDate)}` : ""}
             </div>
            </div>
           ))}
          </div>
         </section>
        )}

        {sortedEvents.length > 0 && (
         <section>
          <h2 className="font-display font-bold text-xl text-violet-600 border-b-2 border-violet-100 pb-2 mb-4">🎪 Events</h2>
          <div className="space-y-2">
           {sortedEvents.map(ev => (
            <div key={ev.id} className="flex items-start gap-4 p-3 bg-violet-50 rounded-xl">
             <div className="flex-1">
              <p className="font-semibold text-violet-800">{ev.name}</p>
              {ev.description && <p className="text-sm text-violet-600 mt-0.5">{ev.description}</p>}
             </div>
             <div className="text-sm text-violet-500 whitespace-nowrap font-medium">
              {formatDate(ev.startDate)}{ev.endDate && ev.endDate !== ev.startDate ? ` – ${formatDate(ev.endDate)}` : ""}
             </div>
            </div>
           ))}
          </div>
         </section>
        )}

        {sortedBirthdays.length > 0 && (
         <section>
          <h2 className="font-display font-bold text-xl text-amber-600 border-b-2 border-amber-100 pb-2 mb-4">🎂 Birthdays</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
           {sortedBirthdays.map(b => (
            <div key={b.id} className="p-3 bg-amber-50 rounded-xl text-center">
             <div className="text-3xl mb-1">🎈</div>
             <p className="font-semibold text-amber-800 text-sm">{b.name}</p>
             {b.classDept && <p className="text-xs text-amber-500">{b.classDept}</p>}
             <p className="text-xs text-amber-600 mt-1 font-medium">{formatDate(b.date)}</p>
            </div>
           ))}
          </div>
         </section>
        )}

        {sortedActivities.length > 0 && (
         <section>
          <h2 className="font-display font-bold text-xl text-emerald-600 border-b-2 border-emerald-100 pb-2 mb-4">🎨 Activities</h2>
          <div className="space-y-2">
           {sortedActivities.map(a => (
            <div key={a.id} className="flex items-start gap-4 p-3 bg-emerald-50 rounded-xl">
             <div className="flex-1">
              <p className="font-semibold text-emerald-800">{a.name}</p>
              {a.description && <p className="text-sm text-emerald-600 mt-0.5">{a.description}</p>}
             </div>
             <div className="text-sm text-emerald-500 whitespace-nowrap font-medium">{formatDate(a.date)}</div>
            </div>
           ))}
          </div>
         </section>
        )}

        {sortedFieldVisits.length > 0 && (
         <section>
          <h2 className="font-display font-bold text-xl text-sky-600 border-b-2 border-sky-100 pb-2 mb-4">🚌 Field Visits</h2>
          <div className="space-y-2">
           {sortedFieldVisits.map(v => (
            <div key={v.id} className="flex items-start gap-4 p-3 bg-sky-50 rounded-xl">
             <div className="flex-1">
              <p className="font-semibold text-sky-800">{v.title}</p>
              {v.location && <p className="text-xs text-sky-500">📍 {v.location}</p>}
              {v.description && <p className="text-sm text-sky-600 mt-0.5">{v.description}</p>}
             </div>
             <div className="text-sm text-sky-500 whitespace-nowrap font-medium">{formatDate(v.date)}</div>
            </div>
           ))}
          </div>
         </section>
        )}

        {sortedFruitless.length > 0 && (
         <section>
          <h2 className="font-display font-bold text-xl text-lime-600 border-b-2 border-lime-100 pb-2 mb-4">🥗 Healthy Food Activities</h2>
          <div className="space-y-2">
           {sortedFruitless.map(f => (
            <div key={f.id} className="flex items-start gap-4 p-3 bg-lime-50 rounded-xl">
             <div className="flex-1">
              <p className="font-semibold text-lime-800">{f.title}</p>
              {f.theme && <p className="text-xs text-lime-500 font-medium">Theme: {f.theme}</p>}
              {f.description && <p className="text-sm text-lime-600 mt-0.5">{f.description}</p>}
             </div>
             <div className="text-sm text-lime-500 whitespace-nowrap font-medium">{formatDate(f.date)}</div>
            </div>
           ))}
          </div>
         </section>
        )}

        {/* Footer */}
        <div className="border-t border-gray-200 pt-6 text-center">
         <p className="text-sm text-gray-400">{school.name} • {MONTHS[school.month]} {school.year} Newsletter</p>
         <p className="text-xs text-gray-300 mt-1">Nurturing Minds, Shaping Futures</p>
        </div>
       </div>
      </div>
     </AnimatedSection>
    )}

    {/* ── CALENDAR TAB ── */}
    {tab === "calendar" && (
     <AnimatedSection>
      <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
       {/* Calendar header */}
       <div className="bg-gradient-to-r from-indigo-500 to-violet-600 px-6 py-4 text-white flex items-center justify-between">
        <div>
         <h2 className="font-display text-2xl font-bold">{MONTHS[school.month]} {school.year}</h2>
         <p className="text-indigo-200 text-sm">Monthly Calendar</p>
        </div>
        <div className="text-5xl opacity-30 select-none">📅</div>
       </div>

       {/* Legend */}
       <div className="px-6 py-3 bg-gray-50 border-b border-gray-100 flex flex-wrap gap-3">
        {Object.entries(COLORS).map(([k, v]) => (
         <span key={k} className={`text-xs font-semibold px-2.5 py-1 rounded-full ${v.bg} ${v.text}`}>
          {k === "holiday" ? "🌴 Holiday" : k === "event" ? "🎪 Event" : k === "birthday" ? "🎂 Birthday" : k === "activity" ? "🎨 Activity" : k === "fieldVisit" ? "🚌 Visit" : "🥗 Food"}
         </span>
        ))}
       </div>

       <div className="p-4">
        {/* Day headers */}
        <div className="grid grid-cols-7 gap-1 mb-2">
         {DAYS.map(d => (
          <div key={d} className={`text-center text-xs font-bold py-2 rounded-lg ${d === "Sun" || d === "Sat" ? "text-rose-400 bg-rose-50" : "text-gray-500 bg-gray-50"}`}>
           {d}
          </div>
         ))}
        </div>

        {/* Calendar grid */}
        <div className="grid grid-cols-7 gap-1">
         {calendarDays().map((day, i) => {
          if (!day) return <div key={`empty-${i}`} />;
          const date = new Date(school.year, school.month, day);
          const items = getEventsForDay(date, allData);
          const dow = date.getDay();
          const isWeekend = dow === 0 || dow === 6;
          const today = new Date();
          const isToday = today.getDate() === day && today.getMonth() === school.month && today.getFullYear() === school.year;
          return (
           <div key={day} className={`min-h-[90px] p-1.5 rounded-xl border transition-all hover:shadow-md
            ${isToday ? "border-indigo-400 ring-2 ring-indigo-200 bg-indigo-50" :
             isWeekend ? "border-rose-100 bg-rose-50/50" :
             "border-gray-100 bg-white hover:bg-gray-50"}`}>
            <span className={`text-xs font-bold block mb-1 ${isToday ? "text-indigo-600" : isWeekend ? "text-rose-400" : "text-gray-600"}`}>
             {day}
            </span>
            <div className="space-y-0.5">
             {items.slice(0, 3).map((item, j) => {
              const c = COLORS[item.type];
              return (
               <div key={j} className={`text-[9px] leading-tight font-semibold px-1 py-0.5 rounded ${c.bg} ${c.text} truncate`} title={item.label}>
                {item.label}
               </div>
              );
             })}
             {items.length > 3 && <div className="text-[9px] text-gray-400 font-medium">+{items.length - 3} more</div>}
            </div>
           </div>
          );
         })}
        </div>
       </div>
      </div>
     </AnimatedSection>
    )}

    {/* ── SCHEDULE TAB ── */}
    {tab === "schedule" && (
     <AnimatedSection className="space-y-4">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
       <div className="flex flex-col md:flex-row md:items-center gap-3 justify-between mb-4">
        <div>
         <h2 className="font-display font-bold text-xl text-gray-800">Monthly Schedule</h2>
         <p className="text-sm text-gray-500">{MONTHS[school.month]} {school.year} — {scheduleRows.length} entries</p>
        </div>
        <div className="flex items-center gap-2">
         <input type="search" value={search} onChange={e => setSearch(e.target.value)} placeholder="🔍 Search schedule..."
          className="px-4 py-2 rounded-xl border border-gray-200 bg-gray-50 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-300 w-56 transition" />
        </div>
       </div>

       <div className="overflow-x-auto rounded-xl border border-gray-100">
        <table className="w-full text-sm">
         <thead>
          <tr className="bg-gray-50 text-left">
           <th className="px-4 py-3 text-xs font-bold uppercase tracking-wider text-gray-500 w-28">Date</th>
           <th className="px-4 py-3 text-xs font-bold uppercase tracking-wider text-gray-500 w-28">End Date</th>
           <th className="px-4 py-3 text-xs font-bold uppercase tracking-wider text-gray-500 w-28">Type</th>
           <th className="px-4 py-3 text-xs font-bold uppercase tracking-wider text-gray-500">Description</th>
          </tr>
         </thead>
         <tbody className="divide-y divide-gray-100">
          {filteredRows.length === 0 && (
           <tr><td colSpan={4} className="px-4 py-8 text-center text-gray-400">No entries found.</td></tr>
          )}
          {filteredRows.map((row, i) => {
           const c = row.type !== "regular" ? COLORS[row.type] : null;
           return (
            <tr key={i} className={`transition-colors ${row.type === "regular" ? "hover:bg-gray-50" : `hover:bg-opacity-50`}`}>
             <td className="px-4 py-3 font-semibold text-gray-700 whitespace-nowrap">{formatDate(row.startDate)}</td>
             <td className="px-4 py-3 text-gray-500 whitespace-nowrap">
              {row.endDate && row.endDate !== row.startDate ? formatDate(row.endDate) : "—"}
             </td>
             <td className="px-4 py-3">
              {c ? (
               <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${c.bg} ${c.text}`}>
                {row.type === "holiday" ? "🌴 Holiday" : row.type === "event" ? "🎪 Event" : row.type === "birthday" ? "🎂 Birthday" : row.type === "activity" ? "🎨 Activity" : row.type === "fieldVisit" ? "🚌 Visit" : "🥗 Food"}
               </span>
              ) : (
               <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-gray-100 text-gray-500">📚 School</span>
              )}
             </td>
             <td className={`px-4 py-3 font-medium ${c ? `${c.text}` : "text-gray-600"}`}>{row.label}</td>
            </tr>
           );
          })}
         </tbody>
        </table>
       </div>
      </div>
     </AnimatedSection>
    )}

   </main>

   {/* Print styles */}
   <style>{`
    @media print {
     .no-print { display: none !important; }
     header { display: none !important; }
     main { padding: 0 !important; }
     .bg-gradient-to-br { background: white !important; }
    }
   `}</style>
  </div>
 );
}
