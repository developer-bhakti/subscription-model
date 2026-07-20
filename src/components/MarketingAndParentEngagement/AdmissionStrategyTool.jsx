import { useState } from "react";
import {
  BookOpen,
  Palette,
  Pencil,
  GraduationCap,
  X,
} from "lucide-react";

const admissionCards = [
  {
    title: "Play Group",
    icon: BookOpen,
  },
  {
    title: "Nursery",
    icon: Palette,
  },
  {
    title: "LKG",
    icon: Pencil,
  },
  {
    title: "UKG",
    icon: GraduationCap,
  },
];

export default function AdmissionStrategy() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <section className="bg-gradient-to-br from-indigo-500 to-purple-600 py-16 px-5">
        <div className="max-w-7xl mx-auto">

          {/* Banner */}
          <div className="mb-8 overflow-hidden rounded-2xl shadow-xl">
            <img
              src="https://cdn.shopify.com/s/files/1/0632/7307/4847/files/Banner_Strategy_for_School_Admission_183ad8c3-3b9d-444e-9f31-062314ab1323.png?v=1774169285"
              alt="Admission Banner"
              className="w-full h-auto object-cover"
            />
          </div>

          {/* Heading */}
          <h2 className="text-4xl font-bold text-center text-white mb-12">
            Improve Your School Admissions
          </h2>

          {/* Cards */}
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {admissionCards.map((item, index) => {
              const Icon = item.icon;

              return (
                <div
                  key={index}
                  className="bg-white rounded-2xl p-8 shadow-xl text-center transition duration-300 hover:-translate-y-2 hover:shadow-2xl"
                >
                  <div className="w-20 h-20 mx-auto mb-5 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                    <Icon className="w-9 h-9 text-white" />
                  </div>

                  <h3 className="text-2xl font-semibold mb-6">
                    {item.title}
                  </h3>

                  <button
                    onClick={() => setShowModal(true)}
                    className="w-full py-3 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold hover:opacity-90 transition"
                  >
                    Download Strategies
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Modal */}
      {showModal && (
        <div
          className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4"
          onClick={() => setShowModal(false)}
        >
          <div
            className="bg-white rounded-2xl overflow-hidden w-full max-w-3xl h-[90vh] shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 bg-gradient-to-r from-indigo-500 to-purple-600 text-white">
              <h3 className="text-xl font-semibold">
                Get Admission Guide
              </h3>

              <button onClick={() => setShowModal(false)}>
                <X className="w-7 h-7" />
              </button>
            </div>

            {/* Google Form */}
            <iframe
              title="Admission Form"
              src="https://docs.google.com/forms/d/e/1FAIpQLSdHO549ibgS2iPBzRyxuofyuWE11tQagifPbcPawnlCC8eJCg/viewform?embedded=true"
              className="w-full h-full"
            />
          </div>
        </div>
      )}
    </>
  );
}