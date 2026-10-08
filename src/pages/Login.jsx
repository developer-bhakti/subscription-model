import { useState, useEffect, useRef } from "react";
import { supabase } from "../services/supabaseClient";
import { useNavigate } from "react-router-dom";
import { isAnyAdmin, getAccountType, ACCOUNT_TYPES } from "../services/auth";

// The two ways a subscriber can sign in. The choice here only decides which form to
// show — the account's own account_type in the database is what actually grants access.
const loginOptions = [
  {
    type: ACCOUNT_TYPES.PARENT,
    emoji: "👨‍👩‍👧",
    title: "Parent Login",
    description: "Curriculum, worksheets, learning tools and progress tracking.",
    accent: "hover:border-emerald-400 focus:border-emerald-400",
    button: "bg-emerald-600 hover:bg-emerald-700",
  },
  {
    type: ACCOUNT_TYPES.TEACHER,
    emoji: "👩‍🏫",
    title: "Teacher Login",
    description: "Everything above, plus school operations, audit and marketing tools.",
    accent: "hover:border-blue-400 focus:border-blue-400",
    button: "bg-blue-600 hover:bg-blue-700",
  },
];

export default function Login() {
  const [loginType, setLoginType] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const razorpayRef = useRef(null);

  const selectedOption = loginOptions.find((option) => option.type === loginType);

  useEffect(() => {
    // Create script
    const script = document.createElement("script");

    script.src = "https://checkout.razorpay.com/v1/payment-button.js";
    script.async = true;
    script.setAttribute(
      "data-payment_button_id",
      "pl_SwJTAx7YVYQZTu"
    );

    // Append script inside form
    if (razorpayRef.current) {
      razorpayRef.current.innerHTML = "";
      razorpayRef.current.appendChild(script);
    }

    return () => {
      if (razorpayRef.current) {
        razorpayRef.current.innerHTML = "";
      }
    };
  }, []);

  const chooseLoginType = (type) => {
    setLoginType(type);
    setUsername("");
    setPassword("");
  };

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

    // Staff accounts have their own area and are not parent/teacher subscribers, so
    // they are routed before the account type is considered.
    if (isAnyAdmin(data)) {
      localStorage.setItem("user", JSON.stringify(data));
      navigate("/admin");
      setLoading(false);
      return;
    }

    // The account's stored type wins over whichever card was clicked, so a parent
    // cannot reach the teacher dashboard just by picking Teacher Login.
    const accountType = getAccountType(data);

    if (accountType !== loginType) {
      alert(
        accountType === ACCOUNT_TYPES.PARENT
          ? "This is a Parent account. Please sign in using Parent Login."
          : "This is a Teacher account. Please sign in using Teacher Login."
      );
      setLoading(false);
      return;
    }

    const today = new Date();
    const endDate = new Date(data.end_date);

    if (today <= endDate) {
      localStorage.setItem("user", JSON.stringify(data));
      navigate("/user");
    } else {
      alert("Subscription expired");
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
            The platform includes{" "}
            <strong className="font-semibold text-blue-900">
              8 main areas with 30+ essential tools and resources
            </strong>
            , designed to support your preschool’s academic, classroom,
            assessment, teacher, management, and parent-engagement needs.
          </p>

          <p className="text-xs sm:text-sm text-gray-700 mt-2 leading-relaxed">
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

          {/* Razorpay Button */}
          <div className="mt-5 flex justify-center">
            <form ref={razorpayRef}></form>
          </div>

          {/* Email */}
          <div className="mt-3 text-xs sm:text-sm font-medium text-blue-700 break-all">
            ✉ info@adiuvaret.in
          </div>

        </div>

        {/* Step 1 — choose how to sign in */}
        {!selectedOption ? (
          <div className="bg-white rounded-2xl shadow-xl p-5 sm:p-8 border border-gray-100">

            {/* Header */}
            <div className="text-center mb-6 sm:mb-8">

              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
                Welcome Back
              </h2>

              <p className="text-sm sm:text-base text-gray-600">
                Choose how you would like to sign in
              </p>

            </div>

            {/* Role Cards */}
            <div className="space-y-4">
              {loginOptions.map((option) => (
                <button
                  key={option.type}
                  onClick={() => chooseLoginType(option.type)}
                  className={`w-full text-left border-2 border-gray-200 rounded-xl p-4 sm:p-5 transition-all outline-none ${option.accent} hover:shadow-md`}
                >
                  <div className="flex items-center gap-4">

                    <div className="text-3xl sm:text-4xl shrink-0">
                      {option.emoji}
                    </div>

                    <div className="min-w-0">
                      <h3 className="text-base sm:text-lg font-bold text-gray-900">
                        {option.title}
                      </h3>

                      <p className="text-xs sm:text-sm text-gray-600 mt-1 leading-relaxed">
                        {option.description}
                      </p>
                    </div>

                    <div className="ml-auto text-gray-400 text-xl shrink-0">
                      ›
                    </div>

                  </div>
                </button>
              ))}
            </div>

          </div>
        ) : (

          /* Step 2 — the credentials form for the chosen role */
          <div className="bg-white rounded-2xl shadow-xl p-5 sm:p-8 border border-gray-100">

            {/* Header */}
            <div className="text-center mb-6 sm:mb-8">

              <div className="text-3xl sm:text-4xl mb-2">
                {selectedOption.emoji}
              </div>

              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
                {selectedOption.title}
              </h2>

              <p className="text-sm sm:text-base text-gray-600">
                Sign in to continue to your account
              </p>

              <button
                onClick={() => chooseLoginType(null)}
                className="mt-3 text-xs sm:text-sm font-semibold text-blue-600 hover:text-blue-800"
              >
                ⬅ Not you? Change login type
              </button>

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
                className={`w-full text-white py-3 rounded-xl transition-all font-semibold text-sm sm:text-base disabled:opacity-50 disabled:cursor-not-allowed ${selectedOption.button}`}
              >
                {loading ? "Signing In..." : "Sign In"}
              </button>

            </div>
          </div>
        )}
      </div>
    </div>
  );
}
