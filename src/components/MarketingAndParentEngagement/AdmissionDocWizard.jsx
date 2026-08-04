import React, { useEffect, useRef, useState } from "react";
import { jsPDF } from "jspdf";
import { PDFDocument } from "pdf-lib";
import { Upload, FileDown, ExternalLink, Check, Eye, Newspaper } from "lucide-react";
import { admissionAssessments } from "../../data/admissionAssessments";
import { monthlyWorksheets } from "../../data/monthlyWorksheets";

const months = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

const classes = ["PG", "Nursery", "LKG", "UKG"];

const stepDefs = [
  { id: 1, label: "Details" },
  { id: 2, label: "Assessment" },
  { id: 3, label: "Worksheets" },
  { id: 4, label: "Newsletter" },
  { id: 5, label: "Preview" },
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
                className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-colors ${
                  isActive
                    ? "bg-[#5d5be3] text-white"
                    : isCompleted
                    ? "bg-green-500 text-white"
                    : "bg-gray-200 text-gray-500"
                }`}
              >
                {isCompleted ? <Check size={18} /> : s.id}
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
                className={`flex-1 h-0.5 mx-2 mt-5 ${
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

const AdmissionDocWizard = () => {
  const [step, setStep] = useState(1);
  const [maxStepReached, setMaxStepReached] = useState(1);

  // Step 1 — details
  const [schoolName, setSchoolName] = useState("");
  const [month, setMonth] = useState(months[0]);
  const [classLevel, setClassLevel] = useState(classes[0]);
  const [logo, setLogo] = useState(null);

  // Step 4 — newsletter (built separately in the School Newsletter App; this
  // step just links out to it and records whether one was made for the PDF)
  const [newsletterIncluded, setNewsletterIncluded] = useState(false);
  const [newsletterNote, setNewsletterNote] = useState("");
  // Snapshot of the actual rendered newsletter, handed off from the
  // Newsletter App as a data URL — embedded as a real page in the PDF.
  const [newsletterImage, setNewsletterImage] = useState(null);

  // Step 5 — preview & download
  const [previewUrl, setPreviewUrl] = useState(null);
  const [isBuildingPdf, setIsBuildingPdf] = useState(false);

  // Step 2 — which assessment subjects the user wants included (everything is
  // included by default; tracking exclusions means switching class doesn't
  // require resetting anything since new subjects are selected automatically).
  const [deselectedAssessments, setDeselectedAssessments] = useState(new Set());
  // Step 3 — same idea for worksheets, keyed by title.
  const [deselectedWorksheets, setDeselectedWorksheets] = useState(new Set());

  // Step 2 data is keyed by class; Step 3 data is keyed by month, then by class.
  const assessments = admissionAssessments[classLevel.toLowerCase()] || [];
  const monthWorksheets = monthlyWorksheets[month]?.[classLevel.toLowerCase()] || [];

  const isAssessmentSelected = (name) => !deselectedAssessments.has(name);
  const toggleAssessment = (name) => {
    setDeselectedAssessments((prev) => {
      const next = new Set(prev);
      if (next.has(name)) next.delete(name);
      else next.add(name);
      return next;
    });
  };
  const setAllAssessmentsSelected = (selected) => {
    setDeselectedAssessments((prev) => {
      const next = new Set(prev);
      assessments.forEach((a) =>
        selected ? next.delete(a.subjectname) : next.add(a.subjectname),
      );
      return next;
    });
  };

  const isWorksheetSelected = (title) => !deselectedWorksheets.has(title);
  const toggleWorksheet = (title) => {
    setDeselectedWorksheets((prev) => {
      const next = new Set(prev);
      if (next.has(title)) next.delete(title);
      else next.add(title);
      return next;
    });
  };
  const setAllWorksheetsSelected = (selected) => {
    setDeselectedWorksheets((prev) => {
      const next = new Set(prev);
      monthWorksheets.forEach((w) =>
        selected ? next.delete(w.title) : next.add(w.title),
      );
      return next;
    });
  };

  const selectedAssessments = assessments.filter((a) =>
    isAssessmentSelected(a.subjectname),
  );
  const selectedWorksheets = monthWorksheets.filter((w) =>
    isWorksheetSelected(w.title),
  );
  const totalEvents = selectedWorksheets.length;

  // `overrides` lets a caller pass fields that were just changed in the same
  // click handler (e.g. Skip) — React state updates don't land until the next
  // render, so without this the build would read the stale pre-click values.
  const refreshPreview = async (overrides) => {
    setIsBuildingPdf(true);
    try {
      const bytes = await buildAdmissionPdfBytes(overrides);
      const url = URL.createObjectURL(new Blob([bytes], { type: "application/pdf" }));
      setPreviewUrl((prev) => {
        if (prev) URL.revokeObjectURL(prev);
        return url;
      });
    } catch (err) {
      console.error("Failed to build admission PDF preview:", err);
    } finally {
      setIsBuildingPdf(false);
    }
  };

  const goToStep = (n, overrides) => {
    if (n > maxStepReached) return;
    setStep(n);
    if (n === 5) refreshPreview(overrides);
  };

  const advanceTo = (n, overrides) => {
    setStep(n);
    setMaxStepReached((prev) => Math.max(prev, n));
    if (n === 5) refreshPreview(overrides);
  };

  // The School Newsletter App opens in its own tab (so this wizard's
  // in-progress state isn't lost) and signals back over localStorage when
  // the user finishes there. Kept in a ref and reassigned every render so
  // the listener — registered once — always calls through to fresh state
  // instead of whatever was captured on mount.
  const handleNewsletterHandoffRef = useRef();
  handleNewsletterHandoffRef.current = () => {
    let payload;
    try {
      const raw = localStorage.getItem("admissionNewsletterHandoff");
      if (!raw) return;
      payload = JSON.parse(raw);
    } catch (err) {
      console.warn("Could not read newsletter handoff signal:", err);
      return;
    } finally {
      localStorage.removeItem("admissionNewsletterHandoff");
    }
    const note = [payload.schoolName, payload.month, payload.year]
      .filter(Boolean)
      .join(" — ");
    setNewsletterIncluded(true);
    setNewsletterNote(note);
    setNewsletterImage(payload.image || null);
    advanceTo(5, {
      newsletterIncluded: true,
      newsletterNote: note,
      newsletterImage: payload.image || null,
    });
  };

  useEffect(() => {
    // Clear out any stale signal left over from a previous session before
    // this tab starts listening — we only want to react to a live handoff.
    localStorage.removeItem("admissionNewsletterHandoff");
    const onStorage = (e) => {
      if (e.key === "admissionNewsletterHandoff" && e.newValue) {
        handleNewsletterHandoffRef.current();
      }
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

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

  // Builds the jsPDF cover/summary page. `resourceCellFor*` decide what each
  // "Status" column says for a given item — depends on whether that item's
  // PDF was actually fetched and will be appended below.
  const buildCoverDoc = (
    resourceCellForAssessment,
    resourceCellForWorksheet,
    newsletterIncludedVal,
    newsletterNoteVal,
    hasNewsletterImage,
  ) => {
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
      "Initial Assessment",
      ["Subject", "Status"],
      selectedAssessments.map((a) => [a.subjectname, resourceCellForAssessment(a)]),
      [125, 55]
    );

    drawTable(
      "Worksheets",
      ["Worksheet", "Status"],
      selectedWorksheets.map((w) => [w.title, resourceCellForWorksheet(w)]),
      [125, 55]
    );

    drawTable(
      "School Newsletter",
      ["Field", "Value"],
      [
        [
          "Newsletter",
          newsletterIncludedVal
            ? hasNewsletterImage
              ? "Attached below"
              : "Included"
            : "Not included",
        ],
        ["Notes", newsletterNoteVal.trim() || "-"],
        ["Total Worksheets / Events", String(totalEvents)],
      ],
      [90, 90]
    );

    return doc;
  };

  // Fetches every selected assessment's + worksheet's PDF, then merges their
  // pages directly into the admission document (right after the cover/summary
  // page) so the final file contains the actual content — not just a link.
  // `overrides` covers fields changed in the same click that triggered this
  // build (see refreshPreview) so we don't read stale pre-update state.
  const buildAdmissionPdfBytes = async (overrides = {}) => {
    const effectiveNewsletterIncluded =
      overrides.newsletterIncluded ?? newsletterIncluded;
    const effectiveNewsletterNote = overrides.newsletterNote ?? newsletterNote;
    const effectiveNewsletterImage =
      overrides.newsletterImage ?? newsletterImage;

    const fetchPdf = async (url) => {
      if (!url) return null;
      try {
        const res = await fetch(url);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return await res.arrayBuffer();
      } catch (err) {
        console.warn(`Could not fetch PDF at ${url}:`, err);
        return null;
      }
    };

    const [assessmentBytes, worksheetBytes] = await Promise.all([
      Promise.all(selectedAssessments.map((a) => fetchPdf(a.pdfLink))),
      Promise.all(selectedWorksheets.map((w) => fetchPdf(w.pdf))),
    ]);

    const coverDoc = buildCoverDoc(
      (a) => {
        if (!a.pdfLink) return "Coming soon";
        const idx = selectedAssessments.indexOf(a);
        return assessmentBytes[idx]
          ? "Attached below"
          : { text: "View PDF", link: a.pdfLink };
      },
      (w) => {
        if (!w.pdf) return "Coming soon";
        const idx = selectedWorksheets.indexOf(w);
        return worksheetBytes[idx]
          ? "Attached below"
          : { text: "View PDF", link: w.pdf };
      },
      effectiveNewsletterIncluded,
      effectiveNewsletterNote,
      !!effectiveNewsletterImage,
    );

    const finalDoc = await PDFDocument.load(coverDoc.output("arraybuffer"));

    const appendAll = async (byteList) => {
      for (const bytes of byteList) {
        if (!bytes) continue;
        try {
          const srcDoc = await PDFDocument.load(bytes);
          const copiedPages = await finalDoc.copyPages(srcDoc, srcDoc.getPageIndices());
          copiedPages.forEach((page) => finalDoc.addPage(page));
        } catch (err) {
          console.warn("Could not merge a PDF into the admission document:", err);
        }
      }
    };

    await appendAll(assessmentBytes);
    await appendAll(worksheetBytes);

    if (effectiveNewsletterImage) {
      try {
        const match = /^data:image\/(\w+);base64,(.*)$/.exec(effectiveNewsletterImage);
        if (match) {
          const [, imgType, base64] = match;
          const binary = atob(base64);
          const imgBytes = new Uint8Array(binary.length);
          for (let i = 0; i < binary.length; i++) imgBytes[i] = binary.charCodeAt(i);

          const embeddedImage =
            imgType === "png"
              ? await finalDoc.embedPng(imgBytes)
              : await finalDoc.embedJpg(imgBytes);

          const pageWidth = 595.28; // matches the cover page's A4 width
          const pageHeight = (embeddedImage.height / embeddedImage.width) * pageWidth;
          const newsletterPage = finalDoc.addPage([pageWidth, pageHeight]);
          newsletterPage.drawImage(embeddedImage, {
            x: 0,
            y: 0,
            width: pageWidth,
            height: pageHeight,
          });
        }
      } catch (err) {
        console.warn("Could not attach the newsletter snapshot to the PDF:", err);
      }
    }

    return finalDoc.save();
  };

  const handlePreviewPdf = () => {
    refreshPreview();
  };

  const handleDownloadPdf = async () => {
    setIsBuildingPdf(true);
    try {
      const bytes = await buildAdmissionPdfBytes();
      const url = URL.createObjectURL(new Blob([bytes], { type: "application/pdf" }));
      const link = document.createElement("a");
      link.href = url;
      link.download = `${schoolName || "admission"}-${classLevel}-${month}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error("Failed to build admission PDF for download:", err);
    } finally {
      setIsBuildingPdf(false);
    }
  };

  return (
    <section className="bg-gradient-to-b from-[#f7f8ff] to-[#eef1ff] py-16 px-5 font-sans min-h-screen">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-center text-4xl font-extrabold text-gray-900 mb-2">
          Build Your Admission
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
                  Month of Admission
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

        {/* STEP 2 — Initial Assessment (by class) */}
        {step === 2 && (
          <div className={cardClass}>
            <div className="flex items-start justify-between gap-4 mb-1">
              <h3 className="text-2xl font-bold text-gray-800">Initial Assessment</h3>
              {assessments.length > 0 && (
                <div className="flex shrink-0 gap-3 pt-1 text-xs font-semibold">
                  <button
                    type="button"
                    onClick={() => setAllAssessmentsSelected(true)}
                    className="text-[#5d5be3] hover:text-[#4745c7]"
                  >
                    Select all
                  </button>
                  <button
                    type="button"
                    onClick={() => setAllAssessmentsSelected(false)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    Clear all
                  </button>
                </div>
              )}
            </div>
            <p className="text-sm text-gray-500 mb-6">
              Choose which {classLevel} assessment subjects to include (e.g. Cognitive Skills, Language & Communication).
            </p>

            {assessments.length === 0 ? (
              <p className="text-sm text-gray-400">
                No assessments defined for {classLevel} yet.
              </p>
            ) : (
              <div className="grid gap-4 sm:grid-cols-2">
                {assessments.map((a) => {
                  const selected = isAssessmentSelected(a.subjectname);
                  return (
                    <div
                      key={a.subjectname}
                      onClick={() => toggleAssessment(a.subjectname)}
                      role="checkbox"
                      aria-checked={selected}
                      tabIndex={0}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          toggleAssessment(a.subjectname);
                        }
                      }}
                      className={`flex cursor-pointer items-center justify-between rounded-xl border px-4 py-3 transition ${
                        selected
                          ? "border-[#5d5be3] bg-[#5d5be3]/5"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <span className="flex items-center gap-3">
                        <span
                          className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-md border ${
                            selected
                              ? "border-[#5d5be3] bg-[#5d5be3] text-white"
                              : "border-gray-300"
                          }`}
                        >
                          {selected && <Check size={14} />}
                        </span>
                        <span className="text-sm font-medium text-gray-700">
                          {a.subjectname}
                        </span>
                      </span>
                      {a.pdfLink ? (
                        <a
                          href={a.pdfLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="inline-flex items-center gap-1 text-sm font-semibold text-[#5d5be3] hover:text-[#4745c7]"
                        >
                          View <ExternalLink size={14} />
                        </a>
                      ) : (
                        <span className="text-xs text-gray-400">Coming soon</span>
                      )}
                    </div>
                  );
                })}
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

        {/* STEP 3 — Worksheets (by month + class) */}
        {step === 3 && (
          <div className={cardClass}>
            <div className="flex items-start justify-between gap-4 mb-1">
              <h3 className="text-2xl font-bold text-gray-800">Worksheets</h3>
              {monthWorksheets.length > 0 && (
                <div className="flex shrink-0 gap-3 pt-1 text-xs font-semibold">
                  <button
                    type="button"
                    onClick={() => setAllWorksheetsSelected(true)}
                    className="text-[#5d5be3] hover:text-[#4745c7]"
                  >
                    Select all
                  </button>
                  <button
                    type="button"
                    onClick={() => setAllWorksheetsSelected(false)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    Clear all
                  </button>
                </div>
              )}
            </div>
            <p className="text-sm text-gray-500 mb-6">
              Choose which {classLevel} | {month} worksheets to include.
            </p>

            {monthWorksheets.length === 0 ? (
              <p className="text-sm text-gray-400 mb-6">
                No worksheets defined for {classLevel} in {month} yet.
              </p>
            ) : (
              <div className="grid gap-4 sm:grid-cols-2">
                {monthWorksheets.map((w) => {
                  const selected = isWorksheetSelected(w.title);
                  return (
                    <div
                      key={w.title}
                      onClick={() => toggleWorksheet(w.title)}
                      role="checkbox"
                      aria-checked={selected}
                      tabIndex={0}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          toggleWorksheet(w.title);
                        }
                      }}
                      className={`flex cursor-pointer items-center justify-between rounded-xl border px-4 py-3 transition ${
                        selected
                          ? "border-[#5d5be3] bg-[#5d5be3]/5"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <span className="flex items-center gap-3">
                        <span
                          className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-md border ${
                            selected
                              ? "border-[#5d5be3] bg-[#5d5be3] text-white"
                              : "border-gray-300"
                          }`}
                        >
                          {selected && <Check size={14} />}
                        </span>
                        <span className="text-sm font-medium text-gray-700">{w.title}</span>
                      </span>
                      {w.pdf ? (
                        <a
                          href={w.pdf}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="inline-flex items-center gap-1 text-sm font-semibold text-[#5d5be3] hover:text-[#4745c7]"
                        >
                          View <ExternalLink size={14} />
                        </a>
                      ) : (
                        <span className="text-xs text-gray-400">Coming soon</span>
                      )}
                    </div>
                  );
                })}
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

        {/* STEP 4 — Newsletter */}
        {step === 4 && (
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
                <p className="text-xs text-gray-500 mb-1">Worksheets</p>
                {selectedWorksheets.length > 0 ? (
                  <p className="text-sm text-gray-700">
                    {selectedWorksheets.map((w) => w.title).join(", ")}
                  </p>
                ) : (
                  <p className="text-sm text-gray-400">None selected</p>
                )}
              </div>
              <div className="border border-gray-200 rounded-xl px-4 py-3">
                <p className="text-xs text-gray-500 mb-1">Event Number</p>
                <p className="text-sm font-semibold text-gray-800">{totalEvents}</p>
              </div>
            </div>

            <div className="flex flex-col items-start gap-3 rounded-xl border border-dashed border-gray-300 p-5 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#5d5be3]/10 text-[#5d5be3]">
                  <Newspaper size={20} />
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-800">
                    Build the newsletter in the School Newsletter App
                  </p>
                  <p className="text-xs text-gray-500 mt-0.5">
                    Opens in a new tab, so your admission document progress here is kept.
                  </p>
                </div>
              </div>
              <a
                href="/user/school-newsletter-app?from=admission-doc"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex shrink-0 items-center gap-2 bg-[#5d5be3] hover:bg-[#4745c7] text-white px-5 py-2.5 rounded-xl text-sm font-semibold transition duration-300"
              >
                <Newspaper size={16} />
                Open Newsletter App
              </a>
            </div>

            <label className="mt-6 flex cursor-pointer items-start gap-3">
              <input
                type="checkbox"
                checked={newsletterIncluded}
                onChange={(e) => {
                  const checked = e.target.checked;
                  setNewsletterIncluded(checked);
                  if (!checked) setNewsletterImage(null);
                }}
                className="mt-0.5 h-4 w-4 rounded border-gray-300 text-[#5d5be3] focus:ring-[#5d5be3]"
              />
              <span className="text-sm text-gray-700">
                I've made a newsletter for this admission — note it in the final document.
              </span>
            </label>

            {newsletterIncluded && newsletterImage && (
              <p className="mt-2 text-xs font-medium text-emerald-600">
                ✅ Newsletter snapshot attached — it will appear as a page in the final document.
              </p>
            )}

            {newsletterIncluded && (
              <div className="mt-3">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Newsletter title / notes (optional)
                </label>
                <input
                  type="text"
                  value={newsletterNote}
                  onChange={(e) => setNewsletterNote(e.target.value)}
                  placeholder="e.g. January Highlights Newsletter"
                  className={inputClass}
                />
              </div>
            )}

            <div className="mt-8 flex justify-between">
              <button onClick={() => goToStep(3)} className={secondaryBtn}>
                Back
              </button>
              <div className="flex gap-3">
                <button
                  onClick={() => {
                    setNewsletterIncluded(false);
                    setNewsletterNote("");
                    setNewsletterImage(null);
                    advanceTo(5, {
                      newsletterIncluded: false,
                      newsletterNote: "",
                      newsletterImage: null,
                    });
                  }}
                  className={secondaryBtn}
                >
                  Skip
                </button>
                <button onClick={() => advanceTo(5)} className={primaryBtn}>
                  Continue
                </button>
              </div>
            </div>
          </div>
        )}

        {/* STEP 5 — Preview & Download */}
        {step === 5 && (
          <div className={cardClass}>
            <h3 className="text-2xl font-bold text-gray-800 mb-1">Preview & Download</h3>
            <p className="text-sm text-gray-500 mb-6">
              {schoolName} | {classLevel} | {month}
            </p>

            <div className="flex flex-wrap gap-4 mb-6">
              <button onClick={handlePreviewPdf} disabled={isBuildingPdf} className={primaryBtn}>
                <Eye size={18} />
                {isBuildingPdf ? "Building..." : "Preview PDF"}
              </button>
              <button
                onClick={handleDownloadPdf}
                disabled={isBuildingPdf}
                className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed text-white px-8 py-3 rounded-xl font-semibold transition duration-300 hover:scale-105"
              >
                <FileDown size={18} />
                {isBuildingPdf ? "Building..." : "Download PDF"}
              </button>
            </div>

            {isBuildingPdf && !previewUrl && (
              <div className="border border-dashed border-gray-300 rounded-xl p-10 text-center text-sm text-gray-400">
                Building your admission document and attaching PDFs...
              </div>
            )}

            {previewUrl && (
              <div className="relative border border-gray-200 rounded-xl overflow-hidden">
                {isBuildingPdf && (
                  <div className="absolute inset-0 z-10 flex items-center justify-center bg-white/70 text-sm font-medium text-gray-500">
                    Refreshing preview...
                  </div>
                )}
                <iframe
                  title="PDF Preview"
                  src={previewUrl}
                  className="w-full h-[75vh]"
                />
              </div>
            )}

            <div className="mt-8 flex justify-start">
              <button onClick={() => goToStep(4)} className={secondaryBtn}>
                Back
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default AdmissionDocWizard;
