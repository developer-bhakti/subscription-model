import { useState, useEffect, useRef } from "react";
import { supabase } from "../services/supabaseClient";
import { useNavigate } from "react-router-dom";
import { User, Lock } from "lucide-react";
import { isAnyAdmin, getAccountType, ACCOUNT_TYPES } from "../services/auth";
import {
  CornerFlowers,
  LoginScene,
  ParentIcon,
  SchoolIcon,
} from "../components/LoginArt";

// The two ways a subscriber can sign in. The tile only decides what the person is
// signing in as — the account's own account_type in the database is what actually
// grants access.
const loginOptions = [
  { type: ACCOUNT_TYPES.PARENT, label: "Parent", icon: ParentIcon },
  { type: ACCOUNT_TYPES.TEACHER, label: "School", icon: SchoolIcon },
];

const Field = ({ icon, ...inputProps }) => {
  const FieldIcon = icon;

  return (
    <label className="flex h-[54px] items-center gap-3 rounded-2xl border-2 border-[#bfe6c6] bg-white px-4 shadow-[0_4px_0_#9fd8aa] transition-colors focus-within:border-[#3fb95a]">
      <FieldIcon className="h-5 w-5 shrink-0 text-[#3a3a3a]" strokeWidth={1.8} />

      <input
        {...inputProps}
        className="w-full bg-transparent text-[15px] font-medium text-[#2b2b2b] outline-none placeholder:text-[#5c5c5c]"
      />
    </label>
  );
};

export default function Login() {
  const [loginType, setLoginType] = useState(ACCOUNT_TYPES.PARENT);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const razorpayRef = useRef(null);

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
    const container = razorpayRef.current;

    if (container) {
      container.innerHTML = "";
      container.appendChild(script);
    }

    return () => {
      if (container) {
        container.innerHTML = "";
      }
    };
  }, []);

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

    // Staff accounts have their own area and are not parent/school subscribers, so
    // they are routed before the account type is considered.
    if (isAnyAdmin(data)) {
      localStorage.setItem("user", JSON.stringify(data));
      navigate("/admin");
      setLoading(false);
      return;
    }

    // The account's stored type wins over whichever tile was selected, so each account
    // signs in as what it really is.
    const accountType = getAccountType(data);

    if (accountType !== loginType) {
      alert(
        accountType === ACCOUNT_TYPES.PARENT
          ? "This is a Parent account. Please select Parent and sign in again."
          : "This is a School account. Please select School and sign in again."
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

  // A real form, so pressing Enter in either field signs in.
  const handleSubmit = (event) => {
    event.preventDefault();
    handleLogin();
  };

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center gap-8 overflow-hidden bg-[#e6f5e1] px-4 py-8 font-playful sm:py-12">

      <CornerFlowers />

      <div className="relative z-10 w-full max-w-[980px]">

        {/* The big card with the green scene — large screens only */}
        <div className="relative hidden aspect-[1000/700] overflow-hidden rounded-[28px] bg-white shadow-[0_30px_70px_rgba(120,90,40,0.18)] lg:block">
          <LoginScene />
        </div>

        {/* The form card — sits over the left of the big card on large screens, and
            stands alone on small ones */}
        <form
          onSubmit={handleSubmit}
          className="relative mx-auto flex w-full max-w-[420px] flex-col justify-between gap-5 rounded-[22px] border-[2.5px] border-[#4fc10e] bg-white px-7 py-8 shadow-[0_24px_50px_rgba(0,0,0,0.14)] sm:px-8 lg:absolute lg:left-[8.9%] lg:top-[9.1%] lg:h-[85.7%] lg:w-[40.4%] lg:max-w-none"
        >

          {/* The small green tab on the card's edge */}
          <span
            aria-hidden="true"
            className="absolute -left-[3px] top-5 h-4 w-2.5 rounded-r-md bg-[#4fc10e]"
          />

          <div>
          <h1 className="text-[1.7rem] font-bold leading-tight text-[#1c1c1c]">
            Welcome Back
          </h1>

          <p className="mt-1 text-[13px] font-medium text-gray-500">
            Sign in to continue to your account
          </p>

          <p className="mb-2 mt-5 text-xs font-semibold uppercase tracking-wide text-gray-500">
            I am signing in as
          </p>

          {/* Parent / School */}
          <div
            role="radiogroup"
            aria-label="Sign in as"
            className="grid grid-cols-2 gap-3"
          >
            {loginOptions.map(({ type, label, icon }) => {
              const selected = loginType === type;
              const Icon = icon;

              return (
                <button
                  key={type}
                  type="button"
                  role="radio"
                  aria-checked={selected}
                  onClick={() => setLoginType(type)}
                  className={`flex h-[94px] flex-col items-center justify-center gap-1.5 rounded-2xl transition-all active:translate-y-[2px] ${
                    selected
                      ? "bg-[#ffd93d] text-[#14532d] shadow-[0_5px_0_#d9a900]"
                      : "bg-[#efefef] text-[#5a5a5a] shadow-[0_5px_0_#d3d3d3] hover:bg-[#e8e8e8]"
                  }`}
                >
                  <Icon
                    className={`h-11 w-auto ${selected ? "" : "opacity-60 grayscale"}`}
                  />

                  <span className="text-sm font-semibold">{label}</span>
                </button>
              );
            })}
          </div>
          </div>

          {/* Credentials */}
          <div className="space-y-4">
            <Field
              icon={User}
              type="text"
              placeholder="Enter your username"
              autoComplete="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />

            <Field
              icon={Lock}
              type="password"
              placeholder="Password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div>
          <p className="flex items-center gap-2 text-[11px] font-medium text-[#555]">
            <span
              aria-hidden="true"
              className="h-3.5 w-3.5 shrink-0 rounded-[3px] bg-[#4cc760]"
            />
            By signing in, you agree to our Terms of Use.
          </p>

          <button
            type="submit"
            disabled={loading}
            className="relative mt-5 h-14 w-full overflow-hidden rounded-2xl bg-[#5fd30f] text-xl font-bold text-white shadow-[0_5px_0_#3a9e06] transition-all hover:brightness-105 active:translate-y-[3px] active:shadow-[0_2px_0_#3a9e06] disabled:cursor-not-allowed disabled:opacity-60"
          >
            <span
              aria-hidden="true"
              className="absolute right-3 top-1.5 h-2 w-5 rounded-tr-xl border-r-2 border-t-2 border-white/80"
            />
            {loading ? "Signing In..." : "Sign In"}
          </button>
          </div>
        </form>
      </div>

      {/* Subscription info and payment — unchanged content, restyled to sit under the card */}
      <div className="relative z-10 w-full max-w-[980px] rounded-3xl border-2 border-[#4fc10e]/40 bg-white/90 p-5 text-center shadow-lg sm:p-6 lg:grid lg:grid-cols-[1.5fr_1fr] lg:items-center lg:gap-8 lg:text-left">

        <div>
          <h3 className="mb-2 text-base font-semibold text-[#1c1c1c] sm:text-lg">
            Premium Learning Access
          </h3>

          <p className="text-xs leading-relaxed text-gray-700 sm:text-sm">
            The platform includes{" "}
            <strong className="font-semibold text-[#1c1c1c]">
              8 main areas with 30+ essential tools and resources
            </strong>
            , designed to support your preschool’s academic, classroom,
            assessment, teacher, management, and parent-engagement needs.
          </p>

          <p className="mt-2 text-xs leading-relaxed text-gray-700 sm:text-sm">
            Get access to premium worksheets and learning resources.
            Contact our team for subscription support.
          </p>

          <p className="mt-2 text-xs leading-relaxed text-gray-700 sm:text-sm">
            After subscription activation, you will receive your
            Login ID and Password. Our team will contact you shortly.
          </p>
        </div>

        <div className="mt-5 lg:mt-0">

          {/* Contact Numbers */}
          <div className="flex flex-col items-center justify-center gap-3 sm:flex-row lg:flex-col lg:items-stretch">

            <div className="w-full rounded-xl bg-[#e8f7df] px-4 py-2 text-center text-xs font-medium text-[#3d3d3d] shadow-sm sm:w-auto sm:text-sm lg:w-full">
              📞 +91 80879 24064
            </div>

            <div className="w-full rounded-xl bg-[#e8f7df] px-4 py-2 text-center text-xs font-medium text-[#3d3d3d] shadow-sm sm:w-auto sm:text-sm lg:w-full">
              📞 +91 91751 84064
            </div>

          </div>

          {/* Razorpay Button */}
          <div className="mt-4 flex justify-center">
            <form ref={razorpayRef}></form>
          </div>

          {/* Email */}
          <div className="mt-3 break-all text-center text-xs font-medium text-[#3d3d3d] sm:text-sm">
            ✉ info@adiuvaret.in
          </div>

        </div>
      </div>
    </div>
  );
}
