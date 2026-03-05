import { BookOpen, ChevronRight, Edit3, FileText, Hash, Sparkles, User } from "lucide-react";
import React from "react";

const BookPublicationForm = ({bookInfo,setBookInfo,startEditing}) => {
    
  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-600 via-purple-600 to-indigo-700 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute w-96 h-96 bg-pink-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob top-0 -left-4"></div>
        <div className="absolute w-96 h-96 bg-yellow-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000 top-0 -right-4"></div>
        <div className="absolute w-96 h-96 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000 -bottom-8 left-20"></div>
      </div>

      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12 animate-fade-in">
            <div className="inline-flex items-center justify-center w-24 h-24 bg-white/20 backdrop-blur-lg rounded-3xl mb-6 shadow-2xl">
              <BookOpen className="w-12 h-12 text-white" />
            </div>
            <h1 className="text-7xl font-black text-white mb-4 drop-shadow-2xl">
              Book Publication
              <span className="block text-5xl bg-gradient-to-r from-yellow-200 via-pink-200 to-blue-200 bg-clip-text text-transparent mt-2">
                Studio Pro
              </span>
            </h1>
            <p className="text-xl text-white/90 font-medium">
              Transform your ideas into a professional book
            </p>
          </div>

          {/* Main Form Card */}
          <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl p-10 border border-white/20">
            <div className="flex items-center gap-3 mb-8 pb-6 border-b-2 border-purple-100">
              <Sparkles className="w-8 h-8 text-purple-600" />
              <h2 className="text-3xl font-bold text-gray-800">Book Details</h2>
            </div>

            <div className="space-y-6">
              <div className="group">
                <label className="flex items-center gap-2 text-sm font-bold text-gray-700 mb-3">
                  <BookOpen className="w-5 h-5 text-purple-600" />
                  Book Title *
                </label>
                <input
                  type="text"
                  value={bookInfo.title}
                  onChange={(e) =>
                    setBookInfo({ ...bookInfo, title: e.target.value })
                  }
                  className="w-full px-6 py-4 bg-gradient-to-br from-purple-50 to-indigo-50 border-2 border-purple-200 rounded-2xl focus:ring-4 focus:ring-purple-300 focus:border-purple-500 transition-all duration-300 text-lg font-medium group-hover:shadow-lg"
                  placeholder="The Art of Writing"
                />
              </div>

              <div className="group">
                <label className="flex items-center gap-2 text-sm font-bold text-gray-700 mb-3">
                  <User className="w-5 h-5 text-blue-600" />
                  Author Name *
                </label>
                <input
                  type="text"
                  value={bookInfo.author}
                  onChange={(e) =>
                    setBookInfo({ ...bookInfo, author: e.target.value })
                  }
                  className="w-full px-6 py-4 bg-gradient-to-br from-blue-50 to-cyan-50 border-2 border-blue-200 rounded-2xl focus:ring-4 focus:ring-blue-300 focus:border-blue-500 transition-all duration-300 text-lg font-medium group-hover:shadow-lg"
                  placeholder="John Doe"
                />
              </div>

              <div className="group">
                <label className="flex items-center gap-2 text-sm font-bold text-gray-700 mb-3">
                  <Edit3 className="w-5 h-5 text-indigo-600" />
                  Subtitle
                </label>
                <input
                  type="text"
                  value={bookInfo.subtitle}
                  onChange={(e) =>
                    setBookInfo({ ...bookInfo, subtitle: e.target.value })
                  }
                  className="w-full px-6 py-4 bg-gradient-to-br from-indigo-50 to-purple-50 border-2 border-indigo-200 rounded-2xl focus:ring-4 focus:ring-indigo-300 focus:border-indigo-500 transition-all duration-300 text-lg font-medium group-hover:shadow-lg"
                  placeholder="A comprehensive guide"
                />
              </div>

              <div className="group">
                <label className="flex items-center gap-2 text-sm font-bold text-gray-700 mb-3">
                  <FileText className="w-5 h-5 text-emerald-600" />
                  Number of Pages *
                </label>
                <input
                  type="number"
                  min="1"
                  value={bookInfo.numPages}
                  onChange={(e) =>
                    setBookInfo({
                      ...bookInfo,
                      numPages: parseInt(e.target.value) || 1,
                    })
                  }
                  className="w-full px-6 py-4 bg-gradient-to-br from-emerald-50 to-teal-50 border-2 border-emerald-200 rounded-2xl focus:ring-4 focus:ring-emerald-300 focus:border-emerald-500 transition-all duration-300 text-lg font-medium group-hover:shadow-lg"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="group">
                  <label className="flex items-center gap-2 text-sm font-bold text-gray-700 mb-3">
                    <Hash className="w-5 h-5 text-pink-600" />
                    ISBN
                  </label>
                  <input
                    type="text"
                    value={bookInfo.isbn}
                    onChange={(e) =>
                      setBookInfo({ ...bookInfo, isbn: e.target.value })
                    }
                    className="w-full px-6 py-4 bg-gradient-to-br from-pink-50 to-rose-50 border-2 border-pink-200 rounded-2xl focus:ring-4 focus:ring-pink-300 focus:border-pink-500 transition-all duration-300 text-lg font-medium group-hover:shadow-lg"
                    placeholder="978-3-16-148410-0"
                  />
                </div>

                <div className="group">
                  <label className="flex items-center gap-2 text-sm font-bold text-gray-700 mb-3">
                    <BookOpen className="w-5 h-5 text-orange-600" />
                    Publisher
                  </label>
                  <input
                    type="text"
                    value={bookInfo.publisher}
                    onChange={(e) =>
                      setBookInfo({ ...bookInfo, publisher: e.target.value })
                    }
                    className="w-full px-6 py-4 bg-gradient-to-br from-orange-50 to-amber-50 border-2 border-orange-200 rounded-2xl focus:ring-4 focus:ring-orange-300 focus:border-orange-500 transition-all duration-300 text-lg font-medium group-hover:shadow-lg"
                    placeholder="Publishing House"
                  />
                </div>
              </div>

              <button
                onClick={startEditing}
                className="w-full bg-gradient-to-r from-purple-600 via-violet-600 to-indigo-600 text-white py-5 rounded-2xl font-bold text-xl hover:from-purple-700 hover:via-violet-700 hover:to-indigo-700 transform hover:scale-105 transition-all duration-300 shadow-2xl hover:shadow-purple-500/50 mt-8 flex items-center justify-center gap-3"
              >
                <Sparkles className="w-6 h-6" />
                Start Creating Your Book
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
};

export default BookPublicationForm;
