import { Eye } from "lucide-react";
import React from "react";

const BookLivePrevie = ({ bookInfo, currentPageData, currentPage }) => {
  return (
    <div className="w-full lg:w-1/2 bg-gradient-to-br from-slate-800 via-slate-700 to-slate-800 p-8 overflow-y-auto">
      <div className="max-w-2xl mx-auto">
        
        {/* Preview Header */}
        <div className="flex items-center gap-3 mb-8 bg-gradient-to-r from-purple-500/10 to-blue-500/10 backdrop-blur-xl rounded-2xl p-6 border border-purple-500/20">
          <Eye className="w-8 h-8 text-purple-400" />
          <h3 className="text-2xl font-bold text-white">Live Preview</h3>
        </div>

        {/* Book Page */}
        <div className="bg-white shadow-2xl rounded-2xl p-14 min-h-screen border-4 border-purple-500/20 transform hover:scale-105 transition-transform duration-500">
          
          {/* Book info header */}
          <div className="text-center mb-12 pb-8">
            <p className="text-2xl font-black text-slate-800 tracking-wide mb-2">
              {bookInfo.title || "Your Book Title"}
            </p>

            <p className="text-base text-slate-500 italic">
              by {bookInfo.author || "Author Name"}
            </p>
          </div>

          {/* Page content */}
          {currentPageData.title && (
            <div className="text-sm font-bold text-purple-600 mb-5 uppercase tracking-widest">
              {currentPageData.title}
            </div>
          )}

          {currentPageData.heading && (
            <h1 className="text-6xl font-black text-slate-900 mb-5 leading-tight">
              {currentPageData.heading}
            </h1>
          )}

          {currentPageData.subheading && (
            <h2 className="text-3xl font-bold text-slate-700 mb-10 leading-snug">
              {currentPageData.subheading}
            </h2>
          )}

          {currentPageData.content && (
            <div className="text-slate-800 text-lg leading-loose whitespace-pre-wrap text-justify font-serif">
              {currentPageData.content}
            </div>
          )}

          {/* Page number footer */}
            <div className="absolute bottom-8 right-10">
            <p className="text-sm text-slate-500 font-bold tracking-wider">
              PAGE {currentPage + 1}
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default BookLivePrevie;