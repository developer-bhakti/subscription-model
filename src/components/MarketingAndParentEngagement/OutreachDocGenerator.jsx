import React, { useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { jsPDF } from "jspdf";
import { FileDown, FileText, ExternalLink, Newspaper } from "lucide-react";
import { monthlyWorksheets } from "../../data/monthlyWorksheets";
import { classAssessments } from "../../data/classAssessments";

const OutreachDocGenerator = () => {
  const navigate = useNavigate();
  const { state } = useLocation();

  const pdfDocRef = useRef(null);

  if (!state) {
    return (
      <section className="bg-gradient-to-b from-[#f7f8ff] to-[#eef1ff] py-16 px-5 font-sans min-h-screen">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-gray-600 mb-6">
            Please fill out the outreach details first.
          </p>
          <button
            onClick={() => navigate("/user/marketing/outreach")}
            className="bg-[#5d5be3] hover:bg-[#4745c7] text-white px-8 py-3 rounded-xl font-semibold transition duration-300 hover:scale-105"
          >
            Go to Create Your Outreach
          </button>
        </div>
      </section>
    );
  }

  const { schoolName, month, classLevel, logo, event } = state;
  const worksheets = monthlyWorksheets[month]?.[classLevel.toLowerCase()] || [];
  const initialAssessments = classAssessments[classLevel.toLowerCase()] || [];

  const buildPdfDoc = () => {
    const doc = new jsPDF();

    let logoDrawn = false;
    if (logo) {
      const match = /^data:image\/(\w+);base64,/.exec(logo);
      const mimeType = match ? match[1].toLowerCase() : "";
      const format =
        mimeType === "png" ? "PNG" : mimeType === "jpeg" || mimeType === "jpg" ? "JPEG" : mimeType === "webp" ? "WEBP" : null;
      if (format) {
        try {
          doc.addImage(logo, format, 15, 12, 25, 25);
          logoDrawn = true;
        } catch (err) {
          console.warn("Could not embed logo in PDF:", err);
        }
      }
    }

    doc.setFontSize(18);
    doc.text(schoolName, logoDrawn ? 45 : 15, 22);
    doc.setFontSize(11);
    doc.text(`${classLevel} | ${month}`, logoDrawn ? 45 : 15, 30);

    doc.setLineWidth(0.5);
    doc.line(15, 42, 195, 42);

    let y = 55;
    const addSection = (title, values) => {
      doc.setFontSize(14);
      doc.text(title, 15, y);
      y += 8;
      doc.setFontSize(11);
      values.forEach((value) => {
        doc.text(`- ${value}`, 15, y);
        y += 7;
      });
      y += 8;
    };

    if (event) {
      addSection("Event", [event]);
    }
    addSection(
      "Initial Assessment",
      initialAssessments.map((a) => a.title)
    );
    addSection(
      "Worksheets",
      worksheets.map((w) => w.title)
    );

    return doc;
  };

  const handleGeneratePdf = () => {
    const doc = buildPdfDoc();
    pdfDocRef.current = doc;
    const blobUrl = doc.output("bloburl");
    navigate("/user/marketing/outreach/preview", {
      state: {
        pdfUrl: blobUrl,
        fileName: `${schoolName || "outreach"}-${classLevel}-${month}.pdf`,
      },
    });
  };

  const handleDownloadPdf = () => {
    const doc = pdfDocRef.current || buildPdfDoc();
    doc.save(`${schoolName || "outreach"}-${classLevel}-${month}.pdf`);
  };

  return (
    <section className="bg-gradient-to-b from-[#f7f8ff] to-[#eef1ff] py-16 px-5 font-sans min-h-screen">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-center text-4xl font-extrabold text-gray-900 mb-2">
          {schoolName}
        </h2>
        <p className="text-center text-gray-500 mb-12">
          {classLevel} | {month}
          {event ? ` | ${event}` : ""}
        </p>

        <div className="space-y-6">
          {event && (
            <div className="bg-white rounded-3xl shadow-lg p-8">
              <h3 className="text-2xl font-bold text-gray-800 mb-1">
                Event
              </h3>
              <p className="text-sm text-gray-500">{event}</p>
            </div>
          )}

          <div className="bg-white rounded-3xl shadow-lg p-8">
            <h3 className="text-2xl font-bold text-gray-800 mb-1">
              Initial Assessment
            </h3>
            <p className="text-sm text-gray-500 mb-4">{classLevel} assessments</p>

            <div className="grid gap-4 sm:grid-cols-2">
              {initialAssessments.map((a) => (
                <div
                  key={a.title}
                  className="flex items-center justify-between border border-gray-200 rounded-xl px-4 py-3"
                >
                  <span className="text-sm font-medium text-gray-700">
                    {a.title}
                  </span>
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
          </div>

          <div className="bg-white rounded-3xl shadow-lg p-8">
            <h3 className="text-2xl font-bold text-gray-800 mb-1">
              Worksheets
            </h3>
            <p className="text-sm text-gray-500 mb-4">{classLevel} | {month} worksheets</p>

            <div className="grid gap-4 sm:grid-cols-2">
              {worksheets.map((w) => (
                <div
                  key={w.title}
                  className="flex items-center justify-between border border-gray-200 rounded-xl px-4 py-3"
                >
                  <span className="text-sm font-medium text-gray-700">
                    {w.title}
                  </span>
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
          </div>

          <div className="bg-white rounded-3xl shadow-lg p-8">
            <h3 className="text-2xl font-bold text-gray-800 mb-1">
              School Newsletter
            </h3>
            <p className="text-sm text-gray-500 mb-4">
              Build the {month} newsletter for {schoolName} in the School Newsletter App.
            </p>
            <button
              onClick={() => navigate("/user/school-newsletter-app")}
              className="inline-flex items-center gap-2 bg-[#5d5be3] hover:bg-[#4745c7] text-white px-6 py-3 rounded-xl font-semibold transition duration-300 hover:scale-105"
            >
              <Newspaper size={18} />
              Open School Newsletter App
            </button>
          </div>

          <div className="flex justify-center gap-4 pt-4">
            <button
              onClick={handleGeneratePdf}
              className="inline-flex items-center gap-2 bg-[#5d5be3] hover:bg-[#4745c7] text-white px-8 py-3 rounded-xl font-semibold transition duration-300 hover:scale-105"
            >
              <FileText size={18} />
              Generate PDF
            </button>
            <button
              onClick={handleDownloadPdf}
              className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-xl font-semibold transition duration-300 hover:scale-105"
            >
              <FileDown size={18} />
              Download PDF
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OutreachDocGenerator;
