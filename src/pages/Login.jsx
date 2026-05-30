import { useState } from "react";
import { supabase } from "../services/supabaseClient";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async () => {
    setLoading(true);

    const { data, error } = await supabase
      .from("users")
      .select("*")
      .eq("username", username)
      .eq("password", password)
      .single();

    if (error || !data) {
      alert("Invalid credentials");
      setLoading(false);
      return;
    }

    // Store user data
    localStorage.setItem("user", JSON.stringify(data));

    if (data.role === "admin") {
      navigate("/admin");
    } else {
      const today = new Date();
      const endDate = new Date(data.end_date);

      if (today <= endDate) {
        navigate("/user");
      } else {
        alert("Subscription expired");
        localStorage.removeItem("user");
      }
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-100 flex items-center justify-center px-4 py-6 sm:py-10">

      <div className="w-full max-w-md">

        {/* Top Info Box */}
        <div className="mb-5 bg-blue-100 border border-blue-200 rounded-2xl p-4 sm:p-5 text-center shadow-sm">

          <h3 className="text-base sm:text-lg font-bold text-blue-900 mb-2">
            Premium Learning Access
          </h3>

          <p className="text-xs sm:text-sm text-gray-700 leading-relaxed">
            Get access to premium worksheets and learning resources.
            Contact our team for subscription support.
          </p>

          <p className="text-xs sm:text-sm text-gray-700 mt-2 leading-relaxed">
            After subscription activation, you will receive your
            Login ID and Password. Our team will contact you shortly.
          </p>

          {/* Contact Numbers */}
          <div className="mt-4 flex flex-col sm:flex-row items-center justify-center gap-3">

            <div className="w-full sm:w-auto bg-white px-4 py-2 rounded-xl shadow text-xs sm:text-sm font-semibold text-blue-700">
              📞 +91 80879 24064
            </div>

            <div className="w-full sm:w-auto bg-white px-4 py-2 rounded-xl shadow text-xs sm:text-sm font-semibold text-blue-700">
              📞 +91 91751 84064
            </div>

          </div>

          {/* Email */}
          <div className="mt-3 text-xs sm:text-sm font-medium text-blue-700 break-all">
            ✉ info@adiuvaret.in
          </div>

        </div>

        {/* Login Card */}
        <div className="bg-white rounded-2xl shadow-xl p-5 sm:p-8 border border-gray-100">

          {/* Header */}
          <div className="text-center mb-6 sm:mb-8">

            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
              Welcome Back
            </h2>

            <p className="text-sm sm:text-base text-gray-600">
              Sign in to continue to your account
            </p>

          </div>

          {/* Form */}
          <div className="space-y-5">

            {/* Username */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Username
              </label>

              <input
                type="text"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-3 text-sm sm:text-base border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>

              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 text-sm sm:text-base border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
              />
            </div>

            {/* Login Button */}
            <button
              onClick={handleLogin}
              disabled={loading}
              className="w-full bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700 transition-all font-semibold text-sm sm:text-base disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Signing In..." : "Sign In"}
            </button>

          </div>
        </div>
      </div>
    </div>
  );
}