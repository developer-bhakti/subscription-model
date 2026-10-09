import React, { useState } from "react";
import { Download, School, MapPin, Upload } from "lucide-react";
import { PageHero } from "../KidsUI";

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
    <section>
      <div className="max-w-2xl mx-auto">

        {/* TITLE */}
        <PageHero
          emoji={<School size={28} />}
          title="School Admission Form"
          subtitle="Fill in the school details and submit the admission form."
        />

      <div className="kid-card tone-white p-6 md:p-10">

        {/* DOWNLOAD BUTTON */}
        <div className="mb-8 text-center">
          <button
            onClick={handleDownload}
            className="kid-btn kid-btn-teal"
          >
            <Download size={18} />
            Download Admission Form PDF
          </button>
        </div>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="space-y-6">

          {/* SCHOOL NAME */}
          <div>
            <label className="block text-kid-ink font-semibold mb-2">
              School Name
            </label>

            <div className="relative">
              <School
                className="absolute left-4 top-1/2 -translate-y-1/2 text-kid-soft"
                size={20}
              />

              <input
                type="text"
                placeholder="Enter the school name"
                value={schoolName}
                onChange={(e) => setSchoolName(e.target.value)}
                className="kid-input py-3.5 pl-12"
              />
            </div>
          </div>

          {/* ADDRESS */}
          <div>
            <label className="block text-kid-ink font-semibold mb-2">
              School Address
            </label>

            <div className="relative">
              <MapPin
                className="absolute left-4 top-5 text-kid-soft"
                size={20}
              />

              <textarea
                rows="4"
                placeholder="Enter the school address"
                value={schoolAddress}
                onChange={(e) => setSchoolAddress(e.target.value)}
                className="kid-input py-3.5 pl-12 resize-none"
              />
            </div>
          </div>

          {/* LOGO */}
          <div>
            <label className="block text-kid-ink font-semibold mb-2">
              School Logo
            </label>

            <label className="flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-edge-mint bg-tone-mint/40 p-8 transition hover:border-kid-green hover:bg-tone-mint">

              <Upload className="text-kid-deep mb-3" size={36} />

              <p className="text-kid-ink font-medium">
                Click to upload school logo
              </p>

              <p className="text-sm text-kid-soft mt-1">
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
            className="kid-btn w-full py-4 text-lg"
          >
            Submit Form
          </button>
        </form>

        {/* SUBMITTED INFO */}
        {submitted && (
          <div className="kid-card tone-mint mt-10 p-6">

            <h2 className="text-2xl font-semibold text-kid-ink mb-5">
              Submitted Information
            </h2>

            <div className="space-y-4">

              <div>
                <p className="text-sm font-semibold text-kid-soft">
                  School Name
                </p>

                <p className="text-lg font-bold text-kid-ink">
                  {schoolName}
                </p>
              </div>

              <div>
                <p className="text-sm font-semibold text-kid-soft">
                  Address
                </p>

                <p className="text-kid-ink">
                  {schoolAddress}
                </p>
              </div>

              {schoolLogo && (
                <div>
                  <p className="text-sm font-semibold text-kid-soft mb-2">
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
      </div>
    </section>
  );
};

export default SchoolAdmissionForm;