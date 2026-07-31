import React, { useState } from "react";
import { jsPDF } from "jspdf";
import { Upload, FileDown, ExternalLink, Check, Eye, Plus, X, Newspaper } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { classAssessments } from "../../data/classAssessments";
import { outreachWorksheets } from "../../data/outreachWorksheets";

const months = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

const classes = ["PG", "Nursery", "LKG", "UKG"];

const stepDefs = [
  { id: 1, label: "Details" },
  { id: 2, label: "Events" },
  { id: 3, label: "Assessment" },
  { id: 4, label: "Worksheets" },
  { id: 5, label: "Newsletter" },
  { id: 6, label: "Preview" },
];

const inputClass =
  "w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#5d5be3]";
const cardClass = "bg-white rounded-3xl shadow-lg p-8";
const primaryBtn =
  "inline-flex items-center gap-2 bg-[#5d5be3] hover:bg-[#4745c7] disabled:opacity-50 disabled:cursor-not-allowed text-white px-8 py-3 rounded-xl font-semibold transition duration-300";
const secondaryBtn =
  "inline-flex items-center gap-2 bg-gray-200 hover:bg-gray-300 text-gray-700 px-8 py-3 rounded-xl font-semibold transition duration-300";

function Stepper({ step, maxStepReached, onStepClick }) {
  return (
    <div className="flex items-start w-full max-w-3xl mx-auto mb-14">
      {stepDefs.map((s, idx) => {
        const isCompleted = s.id < step;
        const isActive = s.id === step;
        const isClickable = s.id <= maxStepReached;
        return (
          <React.Fragment key={s.id}>
            <button
              type="button"
              disabled={!isClickable}
              onClick={() => onStepClick(s.id)}
              className="flex flex-col items-center gap-2 shrink-0 disabled:cursor-not-allowed"
            >
              <span
                className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm transition-colors ${
                  isActive
                    ? "bg-[#5d5be3] text-white"
                    : isCompleted
                    ? "bg-green-500 text-white"
                    : "bg-gray-200 text-gray-500"
                }`}
              >
                {isCompleted ? <Check size={16} /> : s.id}
              </span>
              <span
                className={`text-xs font-semibold whitespace-nowrap ${
                  isActive ? "text-[#5d5be3]" : "text-gray-500"
                }`}
              >
                {s.label}
              </span>
            </button>
            {idx < stepDefs.length - 1 && (
              <div
                className={`flex-1 h-0.5 mx-1 mt-[18px] ${
                  s.id < step ? "bg-green-500" : "bg-gray-200"
                }`}
              />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
}

const OutreachDocWizard = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [maxStepReached, setMaxStepReached] = useState(1);

  // Step 1 — details
  const [schoolName, setSchoolName] = useState("");
  const [month, setMonth] = useState(months[0]);
  const [classLevel, setClassLevel] = useState(classes[0]);
  const [logo, setLogo] = useState(null);

  // Step 2 — events (typed array, e.g. Diwali, Christmas)
  const [events, setEvents] = useState([]);
  const [eventDraft, setEventDraft] = useState("");

  // Step 6 — preview & download
  const [previewUrl, setPreviewUrl] = useState(null);

  // Step 3 data is keyed by class; Step 4 data is keyed by month, then by class.
  const assessments = classAssessments[classLevel.toLowerCase()] || [];
  const monthWorksheets = outreachWorksheets[month]?.[classLevel.toLowerCase()] || [];

  const goToStep = (n) => {
    if (n <= maxStepReached) setStep(n);
  };

  const advanceTo = (n) => {
    setStep(n);
    setMaxStepReached((prev) => Math.max(prev, n));
  };

  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setLogo(reader.result);
    reader.readAsDataURL(file);
  };

  const handleContinueStep1 = () => {
    if (!schoolName.trim()) return;
    advanceTo(2);
  };

  const addEvent = () => {
    if (!eventDraft.trim()) return;
    setEvents((prev) => [...prev, eventDraft.trim()]);
    setEventDraft("");
  };

  const removeEvent = (idx) => {
    setEvents((prev) => prev.filter((_, i) => i !== idx));
  };

  const buildPdfDoc = () => {
    const doc = new jsPDF();
    const marginX = 15;
    const pageWidth = 210;

    let logoDrawn = false;
    if (logo) {
      const match = /^data:image\/(\w+);base64,/.exec(logo);
      const mimeType = match ? match[1].toLowerCase() : "";
      const format =
        mimeType === "png" ? "PNG" : mimeType === "jpeg" || mimeType === "jpg" ? "JPEG" : mimeType === "webp" ? "WEBP" : null;
      if (format) {
        try {
          doc.addImage(logo, format, marginX, 12, 25, 25);
          logoDrawn = true;
        } catch (err) {
          console.warn("Could not embed logo in PDF:", err);
        }
      }
    }

    doc.setFontSize(18);
    doc.text(schoolName, logoDrawn ? 45 : marginX, 22);
    doc.setFontSize(11);
    doc.text(`${classLevel} | ${month}`, logoDrawn ? 45 : marginX, 30);

    doc.setLineWidth(0.5);
    doc.line(marginX, 42, pageWidth - marginX, 42);

    let y = 52;

    const ensureSpace = (needed) => {
      if (y + needed > 285) {
        doc.addPage();
        y = 20;
      }
    };

    const drawTable = (title, headers, rows, colWidths) => {
      ensureSpace(18);
      doc.setFontSize(13);
      doc.setFont("helvetica", "bold");
      doc.text(title, marginX, y);
      doc.setFont("helvetica", "normal");
      y += 6;

      const rowHeight = 9;
      const tableWidth = colWidths.reduce((a, b) => a + b, 0);

      const drawRow = (cells, { bold = false, fillHeader = false } = {}) => {
        ensureSpace(rowHeight);
        let x = marginX;
        if (fillHeader) {
          doc.setFillColor(232, 232, 250);
          doc.rect(marginX, y, tableWidth, rowHeight, "F");
        }
        doc.setDrawColor(210, 210, 210);
        doc.setFontSize(10);
        doc.setFont("helvetica", bold ? "bold" : "normal");
        doc.setTextColor(30, 30, 30);
        cells.forEach((cell, i) => {
          doc.rect(x, y, colWidths[i], rowHeight);
          const isLink = cell && typeof cell === "object" && cell.link;
          const text = isLink ? cell.text : String(cell);
          if (isLink) {
            doc.setTextColor(93, 91, 227);
            doc.textWithLink(text, x + 3, y + 6, { url: cell.link });
            doc.setTextColor(30, 30, 30);
          } else {
            doc.text(text, x + 3, y + 6);
          }
          x += colWidths[i];
        });
        y += rowHeight;
      };

      drawRow(headers, { bold: true, fillHeader: true });
      if (rows.length === 0) {
        drawRow(["None added", ...Array(headers.length - 1).fill("")]);
      } else {
        rows.forEach((r) => drawRow(r));
      }
      y += 8;
    };

    drawTable(
      "Events",
      ["Event"],
      events.map((e) => [e]),
      [180]
    );

    drawTable(
      "Initial Assessment",
      ["Subject", "Status"],
      assessments.map((a) => [
        a.title,
        a.pdf ? { text: "View PDF", link: a.pdf } : "Coming soon",
      ]),
      [125, 55]
    );

    drawTable(
      "Worksheets",
      ["Worksheet", "Status"],
      monthWorksheets.map((w) => [
        w.title,
        w.pdf ? { text: "View PDF", link: w.pdf } : "Coming soon",
      ]),
      [125, 55]
    );

    drawTable(
      "School Newsletter",
      ["Field", "Value"],
      [
        ["Events Added", String(events.length)],
        ["Worksheets", String(monthWorksheets.length)],
        ["Full Newsletter", "Build in School Newsletter App"],
      ],
      [90, 90]
    );

    return doc;
  };

  const handlePreviewPdf = () => {
    setPreviewUrl(buildPdfDoc().output("bloburl"));
  };

  const handleDownloadPdf = () => {
    buildPdfDoc().save(`${schoolName || "outreach"}-${classLevel}-${month}.pdf`);
  };

  return (
    <section className="bg-gradient-to-b from-[#f7f8ff] to-[#eef1ff] py-16 px-5 font-sans min-h-screen">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-center text-4xl font-extrabold text-gray-900 mb-2">
          Create Your Outreach
        </h2>
        <p className="text-center text-gray-500 mb-10">
          {schoolName || "School"} {schoolName ? `| ${classLevel} | ${month}` : ""}
        </p>

        <Stepper step={step} maxStepReached={maxStepReached} onStepClick={goToStep} />

        {/* STEP 1 — Details */}
        {step === 1 && (
          <div className={cardClass}>
            <h3 className="text-2xl font-bold text-gray-800 mb-6">School Details</h3>
            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  School Name
                </label>
                <input
                  type="text"
                  value={schoolName}
                  onChange={(e) => setSchoolName(e.target.value)}
                  placeholder="Enter school name"
                  className={inputClass}
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Month
                </label>
                <select
                  value={month}
                  onChange={(e) => setMonth(e.target.value)}
                  className={inputClass}
                >
                  {months.map((m) => (
                    <option key={m} value={m}>{m}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Class
                </label>
                <select
                  value={classLevel}
                  onChange={(e) => setClassLevel(e.target.value)}
                  className={inputClass}
                >
                  {classes.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  School Logo
                </label>
                <label className="flex items-center gap-3 border border-dashed border-gray-300 rounded-xl px-4 py-3 cursor-pointer hover:border-[#5d5be3] transition">
                  <Upload size={18} className="text-gray-500" />
                  <span className="text-sm text-gray-500">
                    {logo ? "Logo selected" : "Upload logo"}
                  </span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleLogoUpload}
                    className="hidden"
                  />
                </label>
                {logo && (
                  <img
                    src={logo}
                    alt="School logo preview"
                    className="mt-3 h-16 w-16 object-contain rounded-lg border border-gray-200 p-1"
                  />
                )}
              </div>
            </div>

            <div className="mt-8 flex justify-end">
              <button
                onClick={handleContinueStep1}
                disabled={!schoolName.trim()}
                className={primaryBtn}
              >
                Continue
              </button>
            </div>
          </div>
        )}

        {/* STEP 2 — Events (typed array) */}
        {step === 2 && (
          <div className={cardClass}>
            <h3 className="text-2xl font-bold text-gray-800 mb-1">Events</h3>
            <p className="text-sm text-gray-500 mb-6">
              Add extra events for {month} (e.g. Diwali, Christmas)
            </p>

            <div className="flex flex-col sm:flex-row gap-4 sm:items-end mb-6">
              <div className="flex-1">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Event Name
                </label>
                <input
                  type="text"
                  value={eventDraft}
                  onChange={(e) => setEventDraft(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      addEvent();
                    }
                  }}
                  placeholder="e.g. Diwali"
                  className={inputClass}
                />
              </div>
              <button
                onClick={addEvent}
                disabled={!eventDraft.trim()}
                className={`${primaryBtn} h-[50px]`}
              >
                <Plus size={18} /> Add
              </button>
            </div>

            {events.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-2">
                {events.map((ev, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center gap-2 border border-gray-200 rounded-full px-4 py-1.5 text-sm font-medium text-gray-700"
                  >
                    {ev}
                    <button
                      onClick={() => removeEvent(idx)}
                      className="text-gray-400 hover:text-red-500"
                    >
                      <X size={14} />
                    </button>
                  </span>
                ))}
              </div>
            )}

            <div className="mt-8 flex justify-between">
              <button onClick={() => goToStep(1)} className={secondaryBtn}>
                Back
              </button>
              <button onClick={() => advanceTo(3)} className={primaryBtn}>
                Continue
              </button>
            </div>
          </div>
        )}

        {/* STEP 3 — Initial Assessment (by class) */}
        {step === 3 && (
          <div className={cardClass}>
            <h3 className="text-2xl font-bold text-gray-800 mb-1">Initial Assessment</h3>
            <p className="text-sm text-gray-500 mb-6">{classLevel} assessments</p>

            {assessments.length === 0 ? (
              <p className="text-sm text-gray-400">
                No assessments defined for {classLevel} yet.
              </p>
            ) : (
              <div className="grid gap-4 sm:grid-cols-2">
                {assessments.map((a) => (
                  <div
                    key={a.title}
                    className="flex items-center justify-between border border-gray-200 rounded-xl px-4 py-3"
                  >
                    <span className="text-sm font-medium text-gray-700">{a.title}</span>
                    {a.pdf ? (
                      <a
                        href={a.pdf}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-sm font-semibold text-[#5d5be3] hover:text-[#4745c7]"
                      >
                        View <ExternalLink size={14} />
                      </a>
                    ) : (
                      <span className="text-xs text-gray-400">Coming soon</span>
                    )}
                  </div>
                ))}
              </div>
            )}

            <div className="mt-8 flex justify-between">
              <button onClick={() => goToStep(2)} className={secondaryBtn}>
                Back
              </button>
              <button onClick={() => advanceTo(4)} className={primaryBtn}>
                Continue
              </button>
            </div>
          </div>
        )}

        {/* STEP 4 — Worksheets (by month + class) */}
        {step === 4 && (
          <div className={cardClass}>
            <h3 className="text-2xl font-bold text-gray-800 mb-1">Worksheets</h3>
            <p className="text-sm text-gray-500 mb-6">{classLevel} | {month} worksheets</p>

            {monthWorksheets.length === 0 ? (
              <p className="text-sm text-gray-400 mb-6">
                No worksheets defined for {classLevel} in {month} yet.
              </p>
            ) : (
              <div className="grid gap-4 sm:grid-cols-2">
                {monthWorksheets.map((w) => (
                  <div
                    key={w.title}
                    className="flex items-center justify-between border border-gray-200 rounded-xl px-4 py-3"
                  >
                    <span className="text-sm font-medium text-gray-700">{w.title}</span>
                    {w.pdf ? (
                      <a
                        href={w.pdf}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-sm font-semibold text-[#5d5be3] hover:text-[#4745c7]"
                      >
                        View <ExternalLink size={14} />
                      </a>
                    ) : (
                      <span className="text-xs text-gray-400">Coming soon</span>
                    )}
                  </div>
                ))}
              </div>
            )}

            <div className="mt-8 flex justify-between">
              <button onClick={() => goToStep(3)} className={secondaryBtn}>
                Back
              </button>
              <button onClick={() => advanceTo(5)} className={primaryBtn}>
                Continue
              </button>
            </div>
          </div>
        )}

        {/* STEP 5 — Newsletter */}
        {step === 5 && (
          <div className={cardClass}>
            <h3 className="text-2xl font-bold text-gray-800 mb-1">School Newsletter</h3>
            <p className="text-sm text-gray-500 mb-6">{month} summary</p>

            <div className="grid gap-4 sm:grid-cols-2 mb-6">
              <div className="border border-gray-200 rounded-xl px-4 py-3">
                <p className="text-xs text-gray-500 mb-1">Month</p>
                <p className="text-sm font-semibold text-gray-800">{month}</p>
              </div>
              <div className="border border-gray-200 rounded-xl px-4 py-3">
                <p className="text-xs text-gray-500 mb-1">Class</p>
                <p className="text-sm font-semibold text-gray-800">{classLevel}</p>
              </div>
              <div className="border border-gray-200 rounded-xl px-4 py-3 sm:col-span-2">
                <p className="text-xs text-gray-500 mb-1">Events</p>
                {events.length > 0 ? (
                  <p className="text-sm text-gray-700">{events.join(", ")}</p>
                ) : (
                  <p className="text-sm text-gray-400">None added</p>
                )}
              </div>
              <div className="border border-gray-200 rounded-xl px-4 py-3 sm:col-span-2">
                <p className="text-xs text-gray-500 mb-1">Worksheets</p>
                {monthWorksheets.length > 0 ? (
                  <p className="text-sm text-gray-700">
                    {monthWorksheets.map((w) => w.title).join(", ")}
                  </p>
                ) : (
                  <p className="text-sm text-gray-400">None added</p>
                )}
              </div>
            </div>

            <p className="text-sm text-gray-500 mb-4">
              Build the full {month} newsletter for {schoolName} in the School Newsletter App.
            </p>
            <button
              onClick={() => navigate("/user/school-newsletter-app")}
              className="inline-flex items-center gap-2 bg-[#5d5be3] hover:bg-[#4745c7] text-white px-6 py-3 rounded-xl font-semibold transition duration-300 hover:scale-105"
            >
              <Newspaper size={18} />
              Open School Newsletter App
            </button>

            <div className="mt-8 flex justify-between">
              <button onClick={() => goToStep(4)} className={secondaryBtn}>
                Back
              </button>
              <button onClick={() => advanceTo(6)} className={primaryBtn}>
                Continue
              </button>
            </div>
          </div>
        )}

        {/* STEP 6 — Preview & Download */}
        {step === 6 && (
          <div className={cardClass}>
            <h3 className="text-2xl font-bold text-gray-800 mb-1">Preview & Download</h3>
            <p className="text-sm text-gray-500 mb-6">
              {schoolName} | {classLevel} | {month}
            </p>

            <div className="flex flex-wrap gap-4 mb-6">
              <button onClick={handlePreviewPdf} className={primaryBtn}>
                <Eye size={18} />
                Preview PDF
              </button>
              <button
                onClick={handleDownloadPdf}
                className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-xl font-semibold transition duration-300 hover:scale-105"
              >
                <FileDown size={18} />
                Download PDF
              </button>
            </div>

            {previewUrl && (
              <div className="border border-gray-200 rounded-xl overflow-hidden">
                <iframe
                  title="PDF Preview"
                  src={previewUrl}
                  className="w-full h-[75vh]"
                />
              </div>
            )}

            <div className="mt-8 flex justify-start">
              <button onClick={() => goToStep(5)} className={secondaryBtn}>
                Back
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default OutreachDocWizard;
