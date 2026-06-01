import React, { useEffect, useState } from "react";

export default function LanguageDevelopmentFreeCoupon() {

  /* =========================
     DIRECT COUPON CODE
  ========================= */

  const couponCode = "OP_LNG_JUN_2026";

  /* =========================
     UPDATED DATE
     Month starts from 0
     (5 = June)
  ========================= */

  const updatedDate = new Date(2026, 5, 1, 10, 0);

  /* =========================
     EXPIRY DATE = 30 DAYS
  ========================= */

  const expiryDate = new Date(updatedDate);
  expiryDate.setDate(expiryDate.getDate() + 30);

  /* =========================
     POPUP STATE
  ========================= */

  const [showPopup, setShowPopup] = useState(false);

  /* =========================
     COUNTDOWN STATE
  ========================= */

  const [timeLeft, setTimeLeft] = useState("");

  useEffect(() => {

    const updateCountdown = () => {

      const now = new Date().getTime();

      const distance =
        expiryDate.getTime() - now;

      if (distance <= 0) {

        setTimeLeft("❌ Coupon Expired");
        return;
      }

      const days = Math.floor(
        distance / (1000 * 60 * 60 * 24)
      );

      const hours = Math.floor(
        (distance %
          (1000 * 60 * 60 * 24)) /
          (1000 * 60 * 60)
      );

      const minutes = Math.floor(
        (distance %
          (1000 * 60 * 60)) /
          (1000 * 60)
      );

      setTimeLeft(
        `${days} Days ${hours} Hours ${minutes} Min Left`
      );
    };

    updateCountdown();

    const interval =
      setInterval(updateCountdown, 1000);

    return () => clearInterval(interval);

  }, []);

  /* =========================
     COPY COUPON
  ========================= */

  const copyCoupon = () => {

    navigator.clipboard.writeText(couponCode);

    alert("Coupon Copied!");
  };

  return (

    <div className="min-h-screen bg-[#f4f6fb] py-14 px-4 font-[Outfit]">

      <div className="max-w-2xl mx-auto">

        <div className="bg-white rounded-[30px] shadow-xl p-8 md:p-10">

          {/* TITLE */}

          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">

            🗣️ Language Development Support

          </h2>

          {/* DESCRIPTION */}

          <p className="text-gray-500 leading-8 text-[15px] mb-8">

            Use this exclusive coupon to access premium language development
            resources and training materials. This coupon works for only{" "}

            <span className="font-bold text-black">
              30 days
            </span>

            {" "}from the updated date.

          </p>

          {/* COUPON SECTION */}

          <div className="bg-[#f8fbff] border-2 border-dashed border-indigo-500 rounded-[24px] p-6 text-center mb-8">

            <div className="text-sm text-gray-500 mb-4">

              Premium Coupon Access

            </div>

            <div className="bg-gradient-to-r from-indigo-500 to-cyan-500 rounded-[22px] p-6">

              <div className="text-white font-bold text-lg mb-3">

                🎁 Your Coupon Code

              </div>

              <div className="text-white text-4xl md:text-5xl font-extrabold tracking-[6px] mb-5">

                {couponCode}

              </div>

              <button
                onClick={copyCoupon}
                className="bg-white text-indigo-600 font-bold px-6 py-3 rounded-xl hover:scale-105 transition-all duration-300"
              >
                Copy Coupon
              </button>

            </div>

          </div>

          {/* COUNTDOWN */}

          <div className="bg-orange-50 border-l-[6px] border-orange-500 rounded-[22px] p-6">

            <div className="text-2xl font-bold text-orange-900 mb-4">

              ⏳ Coupon Expiry Countdown

            </div>

            <p className="text-orange-800 leading-7 text-sm mb-5">

              Countdown automatically starts from the coupon updated date
              and remains active for 30 days.

            </p>

            {/* DATES */}

            <div className="bg-white rounded-2xl p-5 mb-5 text-sm text-orange-900 leading-8">

              <div>

                📅 Updated Date:{" "}

                <span className="font-bold">

                  {updatedDate.toDateString()}

                </span>

              </div>

              <div>

                📅 Expiry Date:{" "}

                <span className="font-bold">

                  {expiryDate.toDateString()}

                </span>

              </div>

            </div>

            {/* TIMER */}

            <div className="text-3xl md:text-4xl font-extrabold text-red-600">

              {timeLeft}

            </div>

          </div>

          {/* SUBSCRIPTION BUTTON */}

          <button
            onClick={() => setShowPopup(true)}
            className="w-full mt-8 bg-gradient-to-r from-indigo-500 to-cyan-500 text-white py-4 rounded-2xl font-bold text-lg hover:scale-[1.02] transition-all duration-300"
          >
            Premium Subscription Details
          </button>

        </div>

      </div>

      {/* POPUP */}

      {showPopup && (

        <div className="fixed inset-0 bg-black/60 z-50 flex justify-center items-center p-5">

          <div className="bg-white w-full max-w-md rounded-[30px] p-7 relative animate-[popup_0.3s_ease]">

            {/* CLOSE */}

            <button
              onClick={() => setShowPopup(false)}
              className="absolute top-4 right-5 text-2xl text-gray-500"
            >
              ✕
            </button>

            {/* TITLE */}

            <h3 className="text-3xl font-extrabold text-center text-gray-900 mb-5">

              Unlock Premium Access

            </h3>

            {/* DESCRIPTION */}

            <p className="text-gray-600 leading-8 text-sm">

              First buy our subscription model and get complete access to:

            </p>

            {/* LIST */}

            <div className="mt-5 space-y-3 text-gray-700 text-sm">

              <div>✔ Language Development Resources</div>

              <div>✔ Premium Learning Materials</div>

              <div>✔ Assessment Resources</div>

              <div>✔ Preschool Management Tools</div>

            </div>

            {/* CONTACT */}

            <div className="mt-6">

              <div className="text-lg font-bold text-gray-900 mb-3">

                How to Get Subscription

              </div>

              <div className="bg-slate-100 rounded-2xl p-4 text-sm leading-8 text-slate-700">

                📞 Phone: +91 9175184064

                <br />

                📧 Email: info@adiuvaret.in

              </div>

            </div>

            {/* NOTE */}

            <p className="mt-5 text-sm text-gray-500 leading-7">

              After successful purchase, you will receive your Login ID & Password.

            </p>

            {/* BUTTON */}

            <a
              href="https://worksheets.adiuvaretfoundation.com/"
              target="_blank"
              rel="noreferrer"
              className="block w-full text-center mt-7 bg-gradient-to-r from-indigo-500 to-cyan-500 text-white py-4 rounded-2xl font-bold hover:scale-[1.02] transition-all duration-300"
            >
              Buy Subscription Now
            </a>

          </div>

        </div>

      )}

    </div>
  );
}