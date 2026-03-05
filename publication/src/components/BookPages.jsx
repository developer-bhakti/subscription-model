import { BookOpen, ChevronLeft, ChevronRight, Download, Edit3, FileText, Sparkles } from "lucide-react";
import React from "react";

const BookPages = ({
  currentPage,
  backToBookInfo,
  setCurrentPageData,
  downloadCurrentPagePDF,
  downloadCompletePDF,
  bookInfo,
  currentPageData,
  previousPage,
  nextPage,
}) => {
  return (
    <div className="w-full lg:w-1/2 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-8 overflow-y-auto shadow-2xl border-r border-purple-500/20">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8 bg-gradient-to-r from-purple-500/10 to-blue-500/10 backdrop-blur-xl rounded-2xl p-6 border border-purple-500/20">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-500 rounded-xl flex items-center justify-center">
                <Edit3 className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-3xl font-black text-white">
                  Page {currentPage + 1}
                </h2>
                <p className="text-sm text-purple-300 font-medium">
                  of {bookInfo.numPages} pages
                </p>
              </div>
            </div>
          </div>
          <button
            onClick={backToBookInfo}
            className="flex items-center gap-2 text-purple-300 hover:text-white font-bold text-sm hover:bg-white/10 px-4 py-2 rounded-lg transition-all"
          >
            <ChevronLeft className="w-4 h-4" />
            Back
          </button>
        </div>

        <div className="space-y-6">
          <div className="group">
            <label className="flex items-center gap-2 text-sm font-bold text-purple-300 mb-3">
              <FileText className="w-5 h-5" />
              Page Title
            </label>
            <input
              type="text"
              value={currentPageData.title}
              onChange={(e) =>
                setCurrentPageData({
                  ...currentPageData,
                  title: e.target.value,
                })
              }
              className="w-full px-6 py-4 bg-gray-800/50 border-2 border-purple-500/30 text-white rounded-xl focus:ring-4 focus:ring-purple-500/50 focus:border-purple-500 transition-all duration-300 placeholder-gray-500 backdrop-blur-xl"
              placeholder="Chapter 1, Introduction..."
            />
          </div>

          <div className="group">
            <label className="flex items-center gap-2 text-sm font-bold text-emerald-300 mb-3">
              <FileText className="w-5 h-5" />
              Content
            </label>
            <textarea
              rows="12"
              value={currentPageData.content}
              onChange={(e) =>
                setCurrentPageData({
                  ...currentPageData,
                  content: e.target.value,
                })
              }
              className="w-full px-6 py-4 bg-gray-800/50 border-2 border-emerald-500/30 text-white rounded-xl focus:ring-4 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all duration-300 font-serif placeholder-gray-500 backdrop-blur-xl"
              placeholder="Start writing your content..."
            />
          </div>

          <div className="bg-gradient-to-r from-purple-500/20 to-blue-500/20 p-5 rounded-xl border border-purple-500/30 backdrop-blur-xl">
            <p className="text-sm text-purple-200 flex items-center gap-2">
              <Sparkles className="w-4 h-4" />
              <strong>Auto-save enabled:</strong> Changes saved instantly!
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <button
              onClick={downloadCurrentPagePDF}
              className="flex items-center justify-center gap-2 bg-gradient-to-r from-violet-600 to-purple-600 text-white py-4 rounded-xl font-bold hover:from-violet-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-purple-500/50 transform hover:scale-105"
            >
              <Download className="w-5 h-5" />
              This Page
            </button>
            <button
              onClick={downloadCompletePDF}
              className="flex items-center justify-center gap-2 bg-gradient-to-r from-indigo-600 to-blue-600 text-white py-4 rounded-xl font-bold hover:from-indigo-700 hover:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-blue-500/50 transform hover:scale-105"
            >
              <BookOpen className="w-5 h-5" />
              Full Book
            </button>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={previousPage}
              disabled={currentPage === 0}
              className={`flex items-center justify-center gap-2 py-4 rounded-xl font-bold transition-all duration-300 ${
                currentPage === 0
                  ? "bg-gray-800/30 text-gray-600 cursor-not-allowed border border-gray-700"
                  : "bg-gradient-to-r from-gray-700 to-gray-600 text-white hover:from-gray-600 hover:to-gray-500 shadow-lg hover:shadow-gray-500/30 transform hover:scale-105"
              }`}
            >
              <ChevronLeft className="w-5 h-5" />
              Previous
            </button>
            <button
              onClick={nextPage}
              disabled={currentPage === bookInfo.numPages - 1}
              className={`flex items-center justify-center gap-2 py-4 rounded-xl font-bold transition-all duration-300 ${
                currentPage === bookInfo.numPages - 1
                  ? "bg-gray-800/30 text-gray-600 cursor-not-allowed border border-gray-700"
                  : "bg-gradient-to-r from-blue-600 to-cyan-600 text-white hover:from-blue-700 hover:to-cyan-700 shadow-lg hover:shadow-cyan-500/30 transform hover:scale-105"
              }`}
            >
              Next
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookPages;
