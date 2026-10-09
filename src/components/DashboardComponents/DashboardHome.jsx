import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

import { sections } from "../../data";
import { getAccountType, ACCOUNT_TYPES } from "../../services/auth";
import { BannerScene, Star } from "../KidsArt";

// Soft greens for the cards, with a touch of butter so the colours do not line up in columns.
const cardTones = ["bg-[#d9f3df]", "bg-[#e9f6c4]", "bg-[#d2eff0]", "bg-[#fff1b8]"];

const WEEK_LETTERS = ["S", "M", "T", "W", "T", "F", "S"];

const DashboardHome = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    setUser(storedUser);
  }, []);
  if (!user) {
    return (
      <div className="h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  const today = new Date();
  const endDate = new Date(user.end_date);
  const isActive = today <= endDate;

  // Same filtering as the sidebar, so the cards and the menu never disagree.
  const accountType = getAccountType(user);
  const isParent = accountType === ACCOUNT_TYPES.PARENT;

  // Home links to itself, so it is left out of the cards. Every module goes into one grid,
  // with no separate groups, whoever is signed in. Parents and schools see the same cards.
  const modules = sections.filter((item) => item.id !== "home");

  // The real current week, Sunday to Saturday, with today picked out.
  const weekStart = new Date(today);
  weekStart.setDate(today.getDate() - today.getDay());
  const week = WEEK_LETTERS.map((letter, i) => {
    const day = new Date(weekStart);
    day.setDate(weekStart.getDate() + i);

    return {
      letter,
      key: day.toDateString(),
      number: day.getDate(),
      isToday: day.toDateString() === today.toDateString(),
    };
  });

  const dateLabel = today.toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });
  const monthLabel = today.toLocaleDateString("en-IN", {
    month: "long",
    year: "numeric",
  });

  const heroTitle = isParent
    ? "Your Child's Learning Journey, Step by Step"
    : "Your School, Step by Step";
  const heroText = isParent
    ? "Small moments of play and practice add up. Pick a module below and begin."
    : "Plan lessons, track progress and run your school, all in one place.";

  const renderCard = (item, tone) => (
    <motion.div
      key={item.id}
      whileHover={{ y: -4 }}
      onClick={() => {
        navigate(item.path);
      }}
      className={`group relative flex min-h-[150px] cursor-pointer flex-col justify-between rounded-[24px] p-5 transition-shadow hover:shadow-lg ${tone}`}
    >
      <Star className="absolute right-4 top-4 h-7 w-7" />

      <span className="grid h-14 w-14 place-items-center rounded-full bg-white text-3xl shadow-sm">
        {item.icon}
      </span>

      <div className="mt-5 flex items-end justify-between gap-3">
        <h3 className="text-lg font-medium leading-snug text-[#14301f]">
          {item.title.trim()}
        </h3>

        <span
          aria-hidden="true"
          className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-white text-lg font-medium text-[#15803d] transition-transform group-hover:translate-x-1"
        >
          →
        </span>
      </div>
    </motion.div>
  );

  return (
    <div className="font-playful">
      {/* GREETING, with this week beside it */}
      <div className="mb-7 flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-center gap-4">
          <span className="grid h-16 w-16 shrink-0 place-items-center rounded-full bg-[#fff1a8] text-3xl">
            {isParent ? "👨‍👩‍👧" : "🏫"}
          </span>

          <div>
            <p className="text-sm font-medium text-gray-500">{dateLabel}</p>
            <h2 className="text-3xl font-semibold leading-tight text-[#14301f] sm:text-4xl">
              Hi {user.username}!
            </h2>
          </div>
        </div>

        <div className="w-fit rounded-[22px] bg-[#f1faee] px-4 py-3 ring-1 ring-[#dcefd8]">
          <p className="mb-2 text-center text-xs font-medium text-[#4b6b55]">
            {monthLabel}
          </p>

          <div className="grid grid-cols-7 gap-1.5 text-center">
            {week.map((day) => (
              <span
                key={`${day.key}-letter`}
                className="text-[11px] font-medium text-gray-400"
              >
                {day.letter}
              </span>
            ))}

            {week.map((day) => (
              <span
                key={day.key}
                className={`grid h-8 w-8 place-items-center rounded-full text-sm font-medium ${
                  day.isToday
                    ? "bg-[#16a34a] text-white shadow"
                    : "bg-white text-[#14301f]"
                }`}
              >
                {day.number}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Only shown once the plan has run out; otherwise the sidebar card says it all */}
      {!isActive && (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-7 rounded-[22px] bg-[#ffe3ea] px-5 py-4 text-sm font-medium text-[#c0395a]"
        >
          ⚠️ Your subscription has expired.
        </motion.div>
      )}

      {/* BANNER */}
      <div className="relative mb-12 min-h-[210px] overflow-hidden rounded-[28px] bg-gradient-to-r from-[#d9f3df] via-[#e4f5e6] to-[#eef9d2] px-6 py-9 sm:px-10">
        <div className="relative z-10 max-w-xl">
          <h3 className="text-3xl font-semibold leading-tight text-[#14301f] sm:text-4xl">
            {heroTitle}
          </h3>

          <p className="mt-3 text-base font-medium text-[#4b6b55]">{heroText}</p>
        </div>

        <BannerScene className="pointer-events-none absolute bottom-0 right-4 hidden h-[92%] w-auto sm:block" />
      </div>

      {/* MODULES */}
      <h3 className="mb-5 flex items-center gap-2 text-2xl font-semibold text-[#14301f]">
        <Star className="h-8 w-8" />
        Your modules
      </h3>

      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {modules.map((item, index) => renderCard(item, cardTones[index % cardTones.length]))}
      </div>
    </div>
  );
};

export default DashboardHome;
