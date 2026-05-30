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

    // Store user data in localStorage
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center px-4 py-10">
      <div className="max-w-md w-full">

        {/* Top Notification */}
        <div className="mb-4 bg-blue-100 border border-blue-200 rounded-xl p-4 text-center">
          
          <p className="text-sm text-gray-700 leading-relaxed">
            Want access to premium worksheets and learning resources?
            Contact our team for subscription assistance.
          </p>

          <p className="text-sm text-gray-700 mt-2 leading-relaxed">
            Once your subscription is activated, you will receive your
            Login ID and Password. Our team will get back to you shortly.
          </p>

          <div className="mt-3 text-sm font-medium text-blue-700">
            📞 +91 98765 43210 | ✉ info@adiuvaret.in
          </div>

        </div>

        {/* Login Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">

          {/* Header */}
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              Welcome Back
            </h2>

            <p className="text-gray-600">
              Sign in to your account
            </p>
          </div>

          {/* Login Form */}
          <div className="space-y-6">

            {/* Username */}
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Username
              </label>

              <input
                id="username"
                type="text"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
              />
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Password
              </label>

              <input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
              />
            </div>

            {/* Login Button */}
            <button
              onClick={handleLogin}
              disabled={loading}
              className="w-full bg-blue-600 text-white py-3 px-4 rounded-xl hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>

          </div>
        </div>
      </div>
    </div>
  );
}