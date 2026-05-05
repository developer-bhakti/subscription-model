import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

import { sections } from "../../data";

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
  const daysLeft = Math.ceil((endDate - today) / (1000 * 60 * 60 * 24));

  return (
    <div>
      {" "}
      {/* TOP BAR */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">
          Welcome, {user.username}
        </h2>
      </div>
      {/* SUBSCRIPTION CARD */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white p-6 rounded-xl shadow mb-8 flex justify-between"
      >
        <div>
          <h3 className="font-semibold text-gray-800">Subscription</h3>
          <p className="text-sm text-gray-500">
            {isActive ? `${daysLeft} days remaining` : "Expired"}
          </p>
        </div>

        <span
          className={`px-3 py-1 rounded-full text-sm ${
            isActive ? "bg-green-100 text-green-700" : "bg-red-100 text-red-600"
          }`}
        >
          {isActive ? "Active" : "Expired"}
        </span>
      </motion.div>
      {/* FEATURE CARDS */}
      <div className="grid md:grid-cols-3 gap-6">
        {sections.map((item, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.03 }}
            onClick={() => {
              if (item.premium && !isActive) return;
              navigate(item.path);
            }}
            className="bg-white p-6 rounded-xl shadow cursor-pointer hover:shadow-lg transition relative"
          >
            <div className="text-3xl mb-3">{item.icon}</div>

            <h3 className="font-semibold text-gray-800">{item.title}</h3>

            <p className="text-sm text-gray-500 mt-1">Open section →</p>

            {/* Premium lock */}
            {item.premium && !isActive && (
              <div className="absolute inset-0 bg-white/70 flex items-center justify-center rounded-xl">
                🔒 Locked
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default DashboardHome;
