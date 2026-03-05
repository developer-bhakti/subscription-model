import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // ✅ import navigation

const HomePage = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [pages, setPages] = useState(50);
  const [logo, setLogo] = useState(null);
  const [logoPreview, setLogoPreview] = useState(null);

  const navigate = useNavigate(); // ✅ initialize navigation

  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    setLogo(file);
    if (file) {
      setLogoPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!logo) {
      alert("Please upload a logo before submitting.");
      return;
    }

    alert(
      `✅ Publication Created!\n\nTitle: ${title}\nDescription: ${description}\nPages: ${pages}\nLogo: ${logo.name}`
    );

    // ✅ Redirect to the publication page
    navigate("/pages");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-600 via-indigo-500 to-purple-600 px-4">
      <div className="bg-white/10 backdrop-blur-md text-white p-8 rounded-3xl shadow-2xl w-full max-w-md text-center">
        {/* Page Title */}
        <h1 className="text-4xl font-bold mb-3">📚 My Publication Service</h1>
        <p className="text-lg text-gray-200 mb-6">
          Fill in your publication details below to get started.
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4 text-left">
          {/* Title Input */}
          <div>
            <label className="block mb-1 text-sm font-medium">Title</label>
            <input
              type="text"
              placeholder="Enter publication title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-3 rounded-lg bg-white/70 text-gray-800 placeholder-gray-600 focus:outline-none"
              required
            />
          </div>

          {/* Description Input */}
          <div>
            <label className="block mb-1 text-sm font-medium">Description</label>
            <textarea
              placeholder="Enter short description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows="3"
              className="w-full p-3 rounded-lg bg-white/70 text-gray-800 placeholder-gray-600 focus:outline-none resize-none"
              required
            ></textarea>
          </div>

          {/* Number of Pages */}
          <div>
            <label className="block mb-1 text-sm font-medium">Number of Pages</label>
            <input
              type="number"
              value={pages}
              min="1"
              max="50"
              onChange={(e) => setPages(e.target.value)}
              className="w-full p-3 rounded-lg bg-white/70 text-gray-800 focus:outline-none"
            />
          </div>

          {/* Logo Upload */}
          <div>
            <label className="block mb-1 text-sm font-medium">Upload Logo</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleLogoChange}
              className="w-full p-2 rounded-lg bg-white/70 text-gray-800 focus:outline-none"
              required
            />
            {logoPreview && (
              <div className="mt-3 flex justify-center">
                <img
                  src={logoPreview}
                  alt="Logo Preview"
                  className="w-20 h-20 object-contain rounded-full border border-white/40"
                />
              </div>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 bg-indigo-700 hover:bg-indigo-800 rounded-lg font-semibold transition-all mt-4"
          >
            Submit Publication
          </button>
        </form>
      </div>
    </div>
  );
};

export default HomePage;
