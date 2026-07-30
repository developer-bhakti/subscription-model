import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ArrowLeft, FileDown } from "lucide-react";

const OutreachDocPreview = () => {
  const navigate = useNavigate();
  const { state } = useLocation();

  if (!state) {
    return (
      <section className="bg-gradient-to-b from-[#f7f8ff] to-[#eef1ff] py-16 px-5 font-sans min-h-screen">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-gray-600 mb-6">No PDF has been generated yet.</p>
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

  const { pdfUrl, fileName } = state;

  return (
    <section className="bg-gradient-to-b from-[#f7f8ff] to-[#eef1ff] py-8 px-5 font-sans min-h-screen">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 font-medium"
          >
            <ArrowLeft size={18} />
            Back
          </button>

          <a
            href={pdfUrl}
            download={fileName}
            className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl font-semibold transition duration-300 hover:scale-105"
          >
            <FileDown size={18} />
            Download PDF
          </a>
        </div>

        <div className="bg-white rounded-3xl shadow-lg p-4">
          <iframe
            title="PDF Preview"
            src={pdfUrl}
            className="w-full h-[85vh] rounded-xl"
          />
        </div>
      </div>
    </section>
  );
};

export default OutreachDocPreview;
