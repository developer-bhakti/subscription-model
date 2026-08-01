import React, { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useSessionPlan } from "./context/sessionPlanContext";
import {
  School,
  MapPin,
  ImagePlus,
  ArrowRight,
  X,
  ArrowLeft,
  RotateCcw,
} from "lucide-react";

const SessionPlanSchoolInfo = () => {
  const {
    schoolInfo,
    setSchoolInfo,
    selectedClass,
    setSelectedClass,
    resetSessionPlan,
  } = useSessionPlan();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [logoPreview, setLogoPreview] = useState(schoolInfo.logo);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    setSelectedClass(searchParams.get("class") || "");
  }, [searchParams, setSelectedClass]);

  const validateFields = () => {
    let newErrors = {};
    if (!schoolInfo.name || schoolInfo.name.length < 3) {
      newErrors.name = "School name must be at least 3 characters long.";
    }
    if (!schoolInfo.address || schoolInfo.address.length < 5) {
      newErrors.address = "Please enter a valid address.";
    }
    if (!schoolInfo.logo) {
      newErrors.logo = "Please upload a valid logo.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setSchoolInfo({ ...schoolInfo, [e.target.name]: e.target.value });
  };

  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        setErrors({
          ...errors,
          logo: "Only image files (PNG, JPG, JPEG, GIF) are allowed.",
        });
        return;
      }
      const reader = new FileReader();
      reader.onload = () => {
        setSchoolInfo({ ...schoolInfo, logo: reader.result });
        setLogoPreview(reader.result);
        setErrors({ ...errors, logo: "" });
      };
      reader.readAsDataURL(file);
    }
  };

  const removeLogo = () => {
    setSchoolInfo({ ...schoolInfo, logo: "" });
    setLogoPreview("");
  };

  const handleStartFresh = () => {
    const confirmed = window.confirm(
      "Start a new session plan? This clears the school info and every term you've added so far.",
    );
    if (!confirmed) return;
    resetSessionPlan();
    setLogoPreview("");
    setErrors({});
  };

  const handleSubmit = () => {
    if (validateFields()) {
      navigate("manage-terms");
    }
  };

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden px-4 py-12">
      {/* Ambient background blobs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden no-print">
        <div className="absolute -top-24 -left-24 h-96 w-96 rounded-full bg-indigo-600/30 blur-3xl animate-blob" />
        <div className="absolute top-1/3 -right-24 h-96 w-96 rounded-full bg-fuchsia-600/25 blur-3xl animate-blob animation-delay-2000" />
        <div className="absolute -bottom-24 left-1/3 h-96 w-96 rounded-full bg-cyan-500/25 blur-3xl animate-blob animation-delay-4000" />
      </div>

      <div className="relative w-full max-w-lg animate-fade-in-up">
        <div className="mb-4 flex items-center justify-between">
          <Link
            to="/user/curriculum/lem-core-curriculum"
            className="inline-flex items-center gap-1.5 text-sm text-white/60 transition hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Curriculum
          </Link>

          <button
            type="button"
            onClick={handleStartFresh}
            title="Clear school info and terms to start a new plan"
            className="inline-flex items-center gap-1.5 rounded-lg border border-white/15 px-2.5 py-1.5 text-xs font-medium text-white/70 transition hover:bg-white/10 hover:text-white"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            Start Fresh
          </button>
        </div>

        <div className="glass rounded-3xl px-6 py-10 sm:px-10 sm:py-12">
          <div className="mb-8 text-center">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-linear-to-br from-indigo-500 to-fuchsia-500 shadow-lg shadow-indigo-900/40">
              <School className="h-7 w-7 text-white" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              School Information
            </h1>
            <p className="mt-1 text-sm text-white/60">
              {selectedClass
                ? `Let's set up the session plan for ${selectedClass}`
                : "Let's set up your session planning workspace"}
            </p>
          </div>

          <div className="space-y-5">
            <div>
              <div className="relative">
                <School className="pointer-events-none absolute left-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-white/40" />
                <input
                  type="text"
                  name="name"
                  placeholder="School Name"
                  value={schoolInfo.name}
                  onChange={handleChange}
                  className="glass-input w-full rounded-xl py-3 pl-11 pr-4 text-sm text-white placeholder-white/40 outline-none transition-all duration-200 focus:ring-2 focus:ring-indigo-400/50"
                />
              </div>
              {errors.name && (
                <p className="mt-1.5 text-xs text-rose-400">{errors.name}</p>
              )}
            </div>

            <div>
              <div className="relative">
                <MapPin className="pointer-events-none absolute left-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-white/40" />
                <input
                  type="text"
                  name="address"
                  placeholder="School Address"
                  value={schoolInfo.address}
                  onChange={handleChange}
                  className="glass-input w-full rounded-xl py-3 pl-11 pr-4 text-sm text-white placeholder-white/40 outline-none transition-all duration-200 focus:ring-2 focus:ring-indigo-400/50"
                />
              </div>
              {errors.address && (
                <p className="mt-1.5 text-xs text-rose-400">{errors.address}</p>
              )}
            </div>

            <div>
              {logoPreview ? (
                <div className="glass-input relative flex items-center gap-4 rounded-xl p-4">
                  <img
                    src={logoPreview}
                    alt="School Logo"
                    className="h-16 w-16 rounded-xl object-cover ring-2 ring-white/20"
                  />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-white">Logo uploaded</p>
                    <p className="text-xs text-white/50">Looks great!</p>
                  </div>
                  <button
                    type="button"
                    onClick={removeLogo}
                    className="rounded-full bg-white/10 p-1.5 text-white/70 transition hover:bg-rose-500/30 hover:text-rose-300"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ) : (
                <label
                  htmlFor="dropzone-file"
                  className="glass-input flex h-40 w-full cursor-pointer flex-col items-center justify-center rounded-xl border border-dashed border-white/25 transition-all duration-200 hover:border-indigo-400/60 hover:bg-white/10"
                >
                  <ImagePlus className="mb-2 h-8 w-8 text-white/50" />
                  <p className="text-sm text-white/70">
                    <span className="font-semibold text-white">Click to upload</span>{" "}
                    or drag and drop
                  </p>
                  <p className="mt-1 text-xs text-white/40">
                    SVG, PNG, JPG or GIF (MAX. 800x400px)
                  </p>
                  <input
                    onChange={handleLogoUpload}
                    id="dropzone-file"
                    type="file"
                    accept="image/*"
                    className="hidden"
                  />
                </label>
              )}
              {errors.logo && (
                <p className="mt-1.5 text-xs text-rose-400">{errors.logo}</p>
              )}
            </div>

            <button
              onClick={handleSubmit}
              type="button"
              className="group mt-2 flex w-full items-center justify-center gap-2 rounded-xl bg-linear-to-r from-indigo-500 to-fuchsia-500 py-3.5 text-sm font-semibold text-white shadow-lg shadow-indigo-900/40 transition-all duration-200 hover:shadow-xl hover:shadow-indigo-900/50 hover:brightness-110 active:scale-[0.98]"
            >
              Continue
              <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SessionPlanSchoolInfo;
