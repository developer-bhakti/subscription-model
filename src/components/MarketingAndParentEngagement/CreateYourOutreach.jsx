import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Upload } from "lucide-react";

const months = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

const classes = ["PG", "Nursery", "LKG", "UKG"];

const CreateYourOutreach = () => {
  const navigate = useNavigate();
  const [schoolName, setSchoolName] = useState("");
  const [month, setMonth] = useState(months[0]);
  const [classLevel, setClassLevel] = useState(classes[0]);
  const [logo, setLogo] = useState(null);
  const [event, setEvent] = useState("");
  const fileInputRef = useRef(null);

  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setLogo(reader.result);
    reader.readAsDataURL(file);
  };

  const handleCreate = () => {
    if (!schoolName.trim()) return;
    navigate("/user/marketing/outreach/generate", {
      state: { schoolName, month, classLevel, logo, event },
    });
  };


  return (
    <section className="bg-gradient-to-b from-[#f7f8ff] to-[#eef1ff] py-16 px-5 font-sans min-h-screen">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-center text-4xl font-extrabold text-gray-900 mb-12">
          Create Your Outreach
        </h2>

        {/* Form Card */}
        <div className="bg-white rounded-3xl shadow-lg p-8">
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
                className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#5d5be3]"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Month
              </label>
              <select
                value={month}
                onChange={(e) => setMonth(e.target.value)}
                className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#5d5be3]"
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
                className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#5d5be3]"
              >
                {classes.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Events
              </label>
              <input
                type="text"
                value={event}
                onChange={(e) => setEvent(e.target.value)}
                placeholder="Enter event name"
                className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#5d5be3]"
              />
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
                  ref={fileInputRef}
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

          <div className="mt-8 flex justify-center">
            <button
              onClick={handleCreate}
              disabled={!schoolName.trim()}
              className="bg-[#5d5be3] hover:bg-[#4745c7] disabled:opacity-50 disabled:cursor-not-allowed text-white px-10 py-3 rounded-xl font-semibold transition duration-300 hover:scale-105"
            >
              Create
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CreateYourOutreach;
