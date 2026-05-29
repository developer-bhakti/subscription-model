import React, { useState } from "react";
import { Download, School, MapPin, Upload } from "lucide-react";

const SchoolAdmissionForm = () => {
  const [schoolName, setSchoolName] = useState("");
  const [schoolAddress, setSchoolAddress] = useState("");
  const [schoolLogo, setSchoolLogo] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!schoolName || !schoolAddress || !schoolLogo) {
      alert("Please fill all fields");
      return;
    }

    setSubmitted(true);
  };

  const handleDownload = () => {
    alert("Download Admission Form PDF");
  };

  return (
    <section className="min-h-screen bg-slate-100 py-10 px-4">
      <div className="max-w-2xl mx-auto bg-white rounded-3xl shadow-xl p-6 md:p-10">

        {/* TITLE */}
        <div className="text-center mb-8">

          <div className="w-20 h-20 rounded-2xl bg-blue-100 flex items-center justify-center mx-auto mb-4">
            <School className="text-blue-600" size={40} />
          </div>

          <h1 className="text-3xl md:text-4xl font-extrabold text-slate-800">
            School Admission Form
          </h1>

          <p className="text-slate-500 mt-3">
            Fill in the school details and submit the admission form.
          </p>
        </div>

        {/* DOWNLOAD BUTTON */}
        <div className="mb-8 text-center">
          <button
            onClick={handleDownload}
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 transition-all duration-300 text-white px-6 py-3 rounded-xl font-semibold shadow-md"
          >
            <Download size={18} />
            Download Admission Form PDF
          </button>
        </div>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="space-y-6">

          {/* SCHOOL NAME */}
          <div>
            <label className="block text-slate-700 font-semibold mb-2">
              School Name
            </label>

            <div className="relative">
              <School
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                size={20}
              />

              <input
                type="text"
                placeholder="Enter the school name"
                value={schoolName}
                onChange={(e) => setSchoolName(e.target.value)}
                className="w-full border border-slate-300 rounded-2xl pl-12 pr-4 py-4 outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* ADDRESS */}
          <div>
            <label className="block text-slate-700 font-semibold mb-2">
              School Address
            </label>

            <div className="relative">
              <MapPin
                className="absolute left-4 top-5 text-slate-400"
                size={20}
              />

              <textarea
                rows="4"
                placeholder="Enter the school address"
                value={schoolAddress}
                onChange={(e) => setSchoolAddress(e.target.value)}
                className="w-full border border-slate-300 rounded-2xl pl-12 pr-4 py-4 outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              />
            </div>
          </div>

          {/* LOGO */}
          <div>
            <label className="block text-slate-700 font-semibold mb-2">
              School Logo
            </label>

            <label className="border-2 border-dashed border-slate-300 rounded-2xl p-8 flex flex-col items-center justify-center cursor-pointer hover:border-blue-500 transition">

              <Upload className="text-blue-600 mb-3" size={36} />

              <p className="text-slate-600 font-medium">
                Click to upload school logo
              </p>

              <p className="text-sm text-slate-400 mt-1">
                PNG, JPG, JPEG
              </p>

              <input
                type="file"
                accept="image/*"
                onChange={(e) => setSchoolLogo(e.target.files[0])}
                className="hidden"
              />
            </label>

            {schoolLogo && (
              <p className="mt-3 text-sm text-green-600 font-medium">
                Uploaded: {schoolLogo.name}
              </p>
            )}
          </div>

          {/* SUBMIT BUTTON */}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:scale-[1.01] transition-all duration-300 text-white py-4 rounded-2xl font-bold text-lg shadow-lg"
          >
            Submit Form
          </button>
        </form>

        {/* SUBMITTED INFO */}
        {submitted && (
          <div className="mt-10 bg-blue-50 border border-blue-100 rounded-3xl p-6">

            <h2 className="text-2xl font-bold text-slate-800 mb-5">
              Submitted Information
            </h2>

            <div className="space-y-4">

              <div>
                <p className="text-sm font-semibold text-slate-500">
                  School Name
                </p>

                <p className="text-lg font-bold text-slate-800">
                  {schoolName}
                </p>
              </div>

              <div>
                <p className="text-sm font-semibold text-slate-500">
                  Address
                </p>

                <p className="text-slate-700">
                  {schoolAddress}
                </p>
              </div>

              {schoolLogo && (
                <div>
                  <p className="text-sm font-semibold text-slate-500 mb-2">
                    Uploaded Logo
                  </p>

                  <img
                    src={URL.createObjectURL(schoolLogo)}
                    alt="School Logo"
                    className="w-28 h-28 object-cover rounded-2xl border"
                  />
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default SchoolAdmissionForm;