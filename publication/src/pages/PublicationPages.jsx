import React, { useState, useEffect } from "react";
import {
  BookOpen,
  Edit3,
  Download,
  ChevronLeft,
  ChevronRight,
  Eye,
  Sparkles,
  FileText,
  User,
  Hash,
  Book,
} from "lucide-react";
import BookPublicationForm from "../components/BookPublicationForm";
import BookPages from "../components/BookPages";
import BookLivePrevie from "../components/BookLivePrevie";

export default function PublicationPages() {
  const [stage, setStage] = useState(1);
  const [bookInfo, setBookInfo] = useState({
    title: "",
    author: "",
    subtitle: "",
    numPages: 10,
    isbn: "",
    publisher: "",
  });
  const [pages, setPages] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [currentPageData, setCurrentPageData] = useState({
    title: "",
    heading: "",
    subheading: "",
    content: "",
  });

  // Load html2pdf library
  useEffect(() => {
    const script = document.createElement("script");
    script.src =
      "https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js";
    script.async = true;
    document.body.appendChild(script);
    return () => document.body.removeChild(script);
  }, []);

  // Auto-save current page data to pages array as user types
  useEffect(() => {
    if (pages.length > 0) {
      const updatedPages = [...pages];
      updatedPages[currentPage] = currentPageData;
      setPages(updatedPages);
    }
  }, [currentPageData]);

  // Load current page data when page changes
  useEffect(() => {
    if (pages.length > 0) {
      setCurrentPageData(pages[currentPage]);
    }
  }, [currentPage]);

  const startEditing = () => {
    if (!bookInfo.title || !bookInfo.author || bookInfo.numPages < 1) {
      alert(
        "Please fill in all required fields (Book Title, Author Name, and Number of Pages)",
      );
      return;
    }

    const initialPages = Array(bookInfo.numPages)
      .fill(null)
      .map(() => ({
        title: "",
        heading: "",
        subheading: "",
        content: "",
      }));
    setPages(initialPages);
    setCurrentPageData(initialPages[0]);
    setStage(2);
  };
  const nextPage = () => {
    if (currentPage < bookInfo.numPages - 1) {
      setCurrentPage(currentPage + 1);
    } else {
      alert("This is the last page!");
    }
  };

  const previousPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    } else {
      alert("This is the first page!");
    }
  };

  const escapeHtml = (text) => {
    const div = document.createElement("div");
    div.textContent = text;
    return div.innerHTML;
  };

  const generatePageHTML = (page, pageNum) => {
    return `
      <div style="padding: 50px; min-height: 1000px; page-break-after: always; background: white;">
        <div style="text-align: center; padding-bottom: 25px; border-bottom: 3px solid #8b5cf6; margin-bottom: 50px;">
          <p style="font-size: 18px; font-weight: bold; color: #1e293b; letter-spacing: 1px;">${escapeHtml(bookInfo.title)}</p>
          <p style="font-size: 13px; color: #64748b; margin-top: 8px;">by ${escapeHtml(bookInfo.author)}</p>
        </div>
        
        ${page.title ? `<div style="font-size: 14px; color: #7c3aed; font-weight: 600; margin-bottom: 20px; text-transform: uppercase; letter-spacing: 1px;">${escapeHtml(page.title)}</div>` : ""}
        // ${page.heading ? `<h1 style="font-size: 36px; font-weight: bold; margin-bottom: 20px; color: #0f172a; line-height: 1.2;">${escapeHtml(page.heading)}</h1>` : ""}
        // ${page.subheading ? `<h2 style="font-size: 24px; font-weight: 600; color: #334155; margin-bottom: 35px; line-height: 1.4;">${escapeHtml(page.subheading)}</h2>` : ""}
        ${page.content ? `<div style="line-height: 1.9; font-size: 15px; color: #1e293b; white-space: pre-wrap; text-align: justify;">${escapeHtml(page.content)}</div>` : ""}
        
        <div style="position: absolute; bottom: 50px; left: 0; right: 0; text-align: center; padding-top: 25px; border-top: 3px solid #8b5cf6;">
          <p style="font-size: 12px; color: #64748b; font-weight: 600;">Page ${pageNum}</p>
        </div>
      </div>
    `;
  };

  const downloadCurrentPagePDF = async () => {
    const page = pages[currentPage];
    const pageHTML = generatePageHTML(page, currentPage + 1);

    const container = document.createElement("div");
    container.style.position = "absolute";
    container.style.left = "-9999px";
    container.innerHTML = pageHTML;
    document.body.appendChild(container);

    const opt = {
      margin: 0,
      filename: `${bookInfo.title}_Page_${currentPage + 1}.pdf`,
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
    };

    try {
      await window.html2pdf().set(opt).from(container).save();
      alert("Page PDF downloaded successfully!");
    } catch (error) {
      console.error("PDF generation error:", error);
      alert("Error generating PDF. Please try again.");
    }

    document.body.removeChild(container);
  };

  const downloadCompletePDF = async () => {
    if (
      window.confirm(
        `This will download all ${bookInfo.numPages} pages as a single PDF. Continue?`,
      )
    ) {
      let allPagesHTML = "";
      pages.forEach((page, index) => {
        allPagesHTML += generatePageHTML(page, index + 1);
      });

      const container = document.createElement("div");
      container.style.position = "absolute";
      container.style.left = "-9999px";
      container.innerHTML = allPagesHTML;
      document.body.appendChild(container);

      const opt = {
        margin: 0,
        filename: `${bookInfo.title}_Complete_Book.pdf`,
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
      };

      try {
        alert("Generating PDF... This may take a moment.");
        await window.html2pdf().set(opt).from(container).save();
        alert("Complete book PDF downloaded successfully!");
      } catch (error) {
        console.error("PDF generation error:", error);
        alert("Error generating PDF. Please try again.");
      }

      document.body.removeChild(container);
    }
  };

  const backToBookInfo = () => {
    if (
      window.confirm(
        "Are you sure you want to go back? Your current progress will be saved.",
      )
    ) {
      setStage(1);
    }
  };

  if (stage === 1) {
    return (
      <BookPublicationForm
        bookInfo={bookInfo}
        setBookInfo={setBookInfo}
        startEditing={startEditing}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="flex flex-col lg:flex-row h-screen">
        {/* Left Side: Form */}
        <BookPages
          currentPage={currentPage}
          backToBookInfo={backToBookInfo}
          setCurrentPageData={setCurrentPageData}
          downloadCurrentPagePDF={downloadCurrentPagePDF}
          downloadCompletePDF={downloadCompletePDF}
          bookInfo={bookInfo}
          currentPageData={currentPageData}
          previousPage={previousPage}
          nextPage={nextPage}
        />

        {/* Right Side: Preview */}
        <BookLivePrevie
          bookInfo={bookInfo}
          currentPageData={currentPageData}
          currentPage={currentPage}
        />
      </div>
    </div>
  );
}
