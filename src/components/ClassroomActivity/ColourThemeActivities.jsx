import React, { useEffect, useState } from "react";
import { jsPDF } from "jspdf";

const fruitWorksheets = [
  {
    title: "Grapes Colouring",
    pdf: "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/fruit-graphs.jpg?v=1786521677",
  },
  {
    title: "Strawberry Colouring",
    pdf: "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/fruit-stobery.jpg?v=1786521677",
  },
  {
    title: "Papaya Colouring",
    pdf: "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/fruit-papaya.jpg?v=1786521677",
  },
  {
    title: "Blueberry Colouring",
    pdf: "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/fruit-blueberry.jpg?v=1786521677",
  },
  {
    title: "Pomegranate Colouring",
    pdf: "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/fruit-dalimb.jpg?v=1786521677",
  },
  {
    title: "Watermelon Colouring",
    pdf: "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/fruit-watermwllon.jpg?v=1786521677",
  },
  {
    title: "Litchi Colouring",
    pdf: "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/fruit-litchi.jpg?v=1786521676",
  },
  {
    title: "Cherry Colouring",
    pdf: "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/cherry.jpg?v=1786521676",
  },
  {
    title: "Guava Colouring",
    pdf: "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/fruit-guava.jpg?v=1786521676",
  },
  {
    title: "Banana Colouring",
    pdf: "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/fruit-banana.jpg?v=1786521676",
  },
  {
    title: "Orange Colouring",
    pdf: "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/fruit-orange.jpg?v=1786521675",
  },
  {
    title: " Mango Colouring",
    pdf: "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/fruit-mango.jpg?v=1786521675",
  },
  {
    title: " Apple Colouring",
    pdf: "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/fruit-apple.jpg?v=1786521675",
  },
  {
    title: " Dragon Fruit Colouring",
    pdf: "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/fruit-dragon.jpg?v=1786521652",
  },
  {
    title: " Muskmelon Colouring",
    pdf: "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/fruit-muskmelon.jpg?v=1786521652",
  },
  {
    title: " Coconut Colouring",
    pdf: "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/fruit-cocount.jpg?v=1786521652",
  },
  {
    title: " Kiwi Colouring",
    pdf: "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/fruit-kiwi.jpg?v=1786521652",
  },
  {
    title: "Ash Gourd Colouring",
    pdf: "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/fruit-ashGaurd_9c5a8b59-88ce-4404-8dce-bf7509270660.jpg?v=1786521653",
  },
  {
    title: "Apricot Colouring",
    pdf: "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/fruit-apricot.jpg?v=1786521652",
  },
  {
    title: "Adzuki Bean Colouring",
    pdf: "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/fruit-adzuki_166de297-6c1a-4b93-b92a-910334ecc36f.jpg?v=1786521652",
  },
  {
    title: "Blueberry Colouring",
    pdf: "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/fruit-blackberry.jpg?v=1786521652",
  },
  {
    title: "Plum Colouring",
    pdf: "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/fruit-plum.jpg?v=1786521652",
  },
  {
    title: "Amla Colouring",
    pdf: "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/fruit-amla.jpg?v=1786521652",
  },
  {
    title: "Raspberry Colouring",
    pdf: "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/fruit-rasberry.jpg?v=1786521652",
  },
  {
    title: "Adzuki Bean Colouring",
    pdf: "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/fruit-adzuki.jpg?v=1786520215",
  },
];

const vegetableWorksheets = [
  {
    title: "turnip Colouring",
    pdf: "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/veg-turnip.jpg?v=1786520182",
  },
  {
    title: "spring onion Colouring",
    pdf: "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/veg-spring-onion.jpg?v=1786520182",
  },
  {
    title: "yam Colouring",
    pdf: "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/veg-yam.jpg?v=1786520183",
  },
  {
    title: "Potato Colouring",
    pdf: "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/veg-potato.jpg?v=1786520183",
  },
  {
    title: "Peas Colouring",
    pdf: "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/veg-pease.jpg?v=1786520183",
  },
  {
    title: "Lettuce Colouring",
    pdf: "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/veg-lettus.jpg?v=1786520183",
  },
  {
    title: "Pumpkin Colouring",
    pdf: "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/veg-pumpkin.jpg?v=1786520183",
  },
  {
    title: "Spinach Colouring",
    pdf: "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/veg-spinach.jpg?v=1786520182",
  },
  {
    title: "Radish Colouring",
    pdf: "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/veg-radish.jpg?v=1786520183",
  },
  {
    title: " Taro Root (Arbi) Colouring",
    pdf: "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/veg-taro-root.jpg?v=1786520183",
  },
  {
    title: " Ginger Colouring",
    pdf: "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/fruit-ginger.jpg?v=1786520183",
  },
  {
    title: "Tomato Colouring",
    pdf: "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/veg-tomato.jpg?v=1786520183",
  },
  {
    title: " Sweet Potato Colouring",
    pdf: "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/veg-sweet-potato.jpg?v=1786520183",
  },
  {
    title: "Mustard Greens Colouring",
    pdf: "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/veg-musstern-green.jpg?v=1786520183",
  },
  {
    title: " Kale Colouring",
    pdf: "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/kale.jpg?v=1786520183",
  },
  {
    title: "Ridge Gourd Colouring",
    pdf: "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/veg-ridege-gourd.jpg?v=1786520183",
  },
  {
    title: " Lady Finger Colouring",
    pdf: "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/veg-leadies-finger.jpg?v=1786520183",
  },
  {
    title: "Cabbage Colouring",
    pdf: "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/veg-red-cabbage.jpg?v=1786520183",
  },
  {
    title: " Pointed Gourd Colouring",
    pdf: "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/veg-pointed-gourd.jpg?v=1786520183",
  },
  {
    title: " Snake Gourd Colouring",
    pdf: "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/veg-snak-gourd.jpg?v=1786520183",
  },
  {
    title: " Carrot Colouring",
    pdf: "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/fruit-carrot.jpg?v=1786520203",
  },
  {
    title: "Capsicum Colouring",
    pdf: "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/fruit-capsicum.jpg?v=1786520203",
  },
  {
    title: "Broccoli Colouring",
    pdf: "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/fruit-broccoli.jpg?v=1786520203",
  },
  {
    title: "Bittetr gourd Colouring",
    pdf: "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/fruit-bitter-gaurd.jpg?v=1786520203",
  },
  {
    title: "Bottle Gourd Colouring",
    pdf: "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/fruit-bottle-gourd.jpg?v=1786520203",
  },
  {
    title: " Brinjal Colouring",
    pdf: "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/fruit-brinjal.jpg?v=1786520203",
  },
  {
    title: "Corn Colouring",
    pdf: "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/fruit-corn.jpg?v=1786520204",
  },
  {
    title: " Cucumber Colouring",
    pdf: "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/fruit-cucumber.jpg?v=1786520204",
  },
  {
    title: " French Beans Colouring",
    pdf: "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/fruit-frenchbeans.jpg?v=1786520204",
  },
];

const worksheetData = [
  {
    title: "Fruit Worksheets",
    description:
      "Colour fruits, match the names, and enjoy fun fruit-based learning activities.",
    icon: "🍎",
    items: fruitWorksheets,
  },
  {
    title: "Vegetable Worksheets",
    description:
      "Explore vegetable colouring sheets and practice identifying healthy vegetables.",
    icon: "🥕",
    items: vegetableWorksheets,
  },
];

const getExtension = (url) => {
  const ext = url.split("?")[0].split(".").pop().toLowerCase();
  return /^(jpg|jpeg|png|webp|gif|pdf)$/.test(ext) ? ext : "pdf";
};

const isPdf = (url) => getExtension(url) === "pdf";

const slugify = (title) => title.trim().replace(/\s+/g, "-").toLowerCase();

const readAsDataUrl = (blob) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = () => reject(new Error("Could not read file"));
    reader.readAsDataURL(blob);
  });

const loadImage = (dataUrl) =>
  new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = () => reject(new Error("Could not decode image"));
    image.src = dataUrl;
  });

// Browsers block a page that fires many downloads in a row, so every worksheet
// goes into one PDF (a page each) and that single file is what gets saved.
const buildWorksheetPdf = async (items, onProgress) => {
  const doc = new jsPDF({ unit: "pt", format: "a4" });
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 32;

  const failed = [];
  let hasPage = false;

  for (let index = 0; index < items.length; index += 1) {
    const worksheet = items[index];
    onProgress(index);

    try {
      if (isPdf(worksheet.pdf)) throw new Error("Not an image");

      const response = await fetch(worksheet.pdf, { mode: "cors" });
      if (!response.ok) throw new Error(`Request failed (${response.status})`);

      const dataUrl = await readAsDataUrl(await response.blob());
      const image = await loadImage(dataUrl);

      const scale = Math.min(
        (pageWidth - margin * 2) / image.naturalWidth,
        (pageHeight - margin * 2) / image.naturalHeight
      );
      const width = image.naturalWidth * scale;
      const height = image.naturalHeight * scale;

      if (hasPage) doc.addPage();
      doc.addImage(
        dataUrl,
        getExtension(worksheet.pdf) === "png" ? "PNG" : "JPEG",
        (pageWidth - width) / 2,
        (pageHeight - height) / 2,
        width,
        height
      );
      hasPage = true;
    } catch (error) {
      console.error(`Skipped "${worksheet.title}" (${worksheet.pdf})`, error);
      failed.push(worksheet.title);
    }
  }

  return { doc: hasPage ? doc : null, failed };
};

const ColourThemeActivities = () => {
  const [activeGroup, setActiveGroup] = useState(null);
  const [busyIndex, setBusyIndex] = useState(null);
  const [failedIndexes, setFailedIndexes] = useState([]);
  const [downloadingAll, setDownloadingAll] = useState(false);
  const [progress, setProgress] = useState(null);
  const [bundleNote, setBundleNote] = useState(null);

  // The worksheet list takes over the page, so start it from the top.
  useEffect(() => {
    if (activeGroup) window.scrollTo({ top: 0, behavior: "smooth" });
  }, [activeGroup]);

  const markResult = (index, ok) =>
    setFailedIndexes((previous) =>
      ok
        ? previous.filter((item) => item !== index)
        : previous.includes(index)
        ? previous
        : [...previous, index]
    );

  const handleDownloadOne = async (worksheet, index) => {
    setBusyIndex(index);

    const { doc } = await buildWorksheetPdf([worksheet], () => {});
    if (doc) doc.save(`${slugify(worksheet.title)}.pdf`);

    markResult(index, Boolean(doc));
    setBusyIndex(null);
  };

  const handleDownloadAll = async (group) => {
    setDownloadingAll(true);
    setBundleNote(null);
    setProgress({ current: 0, total: group.items.length });

    const { doc, failed } = await buildWorksheetPdf(group.items, (index) =>
      setProgress({ current: index + 1, total: group.items.length })
    );

    if (doc) {
      doc.save(`${slugify(group.title)}.pdf`);
      setBundleNote(
        failed.length
          ? `Saved ${group.items.length - failed.length} of ${
              group.items.length
            } worksheets. ${failed.length} could not be loaded.`
          : `Saved all ${group.items.length} worksheets into one PDF.`
      );
    } else {
      setBundleNote("None of the worksheets could be loaded. Please try again.");
    }

    setProgress(null);
    setDownloadingAll(false);
  };

  const openGroup = (group) => {
    setFailedIndexes([]);
    setBundleNote(null);
    setProgress(null);
    setActiveGroup(group);
  };

  if (activeGroup) {
    return (
      <section className="min-h-screen bg-[#f5f7ff] py-12 px-4 font-[Baloo_2]">
        <div className="max-w-7xl mx-auto">
          <button
            onClick={() => setActiveGroup(null)}
            className="mb-6 inline-flex items-center gap-2 text-[#5d5be3] hover:text-[#3f3ccc] font-bold transition-all duration-300"
          >
            ← Back to themes
          </button>

          <div className="flex flex-wrap items-end justify-between gap-4 mb-8">
            <div>
              {/* <p className="text-xs uppercase tracking-[0.3em] text-[#5d5be3] font-bold mb-2">
                Classroom Activity
              </p> */}
              <h1 className="text-3xl md:text-4xl font-extrabold text-[#5d5be3]">
                {activeGroup.title}
              </h1>
              <p className="text-gray-500 mt-1">
                {activeGroup.items.length} worksheets ready to print
              </p>
            </div>

            <button
              onClick={() => handleDownloadAll(activeGroup)}
              disabled={downloadingAll}
              className="bg-[#6f6cf8] hover:bg-[#514df0] disabled:opacity-60 text-white px-6 py-3 rounded-xl font-bold transition-all duration-300"
            >
              {progress
                ? `Preparing ${progress.current}/${progress.total}...`
                : "Download All as one PDF"}
            </button>
          </div>

          {bundleNote && (
            <p className="mb-6 rounded-xl bg-indigo-50 border border-indigo-200 text-[#5d5be3] text-sm px-4 py-3 font-semibold">
              {bundleNote}
            </p>
          )}

          {failedIndexes.length > 0 && (
            <p className="mb-6 rounded-xl bg-amber-50 border border-amber-200 text-amber-800 text-sm px-4 py-3">
              {failedIndexes.length} worksheet(s) could not be turned into a PDF.
              Use “Open in new tab” to save those directly.
            </p>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {activeGroup.items.map((worksheet, index) => (
              <div
                key={`${worksheet.title}-${index}`}
                className="bg-white rounded-2xl overflow-hidden shadow-md hover:-translate-y-1 transition-all duration-300 border border-indigo-100 flex flex-col"
              >
                {isPdf(worksheet.pdf) ? (
                  <div className="w-full h-[240px] bg-indigo-50 flex items-center justify-center text-[#5d5be3] font-bold">
                    PDF
                  </div>
                ) : (
                  <img
                    src={worksheet.pdf}
                    alt={worksheet.title}
                    loading="lazy"
                    className="w-full h-[240px] object-contain bg-white p-2"
                  />
                )}

                <div className="p-4 flex flex-col gap-3 flex-1 border-t border-indigo-50">
                  <p className="font-bold text-gray-800 capitalize flex-1">
                    {worksheet.title}
                  </p>

                  {failedIndexes.includes(index) ? (
                    <a
                      href={worksheet.pdf}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full text-center bg-amber-500 hover:bg-amber-600 text-white px-4 py-2.5 rounded-xl font-bold transition-all duration-300"
                    >
                      Open in new tab
                    </a>
                  ) : (
                    <button
                      onClick={() => handleDownloadOne(worksheet, index)}
                      disabled={busyIndex === index}
                      className="w-full bg-[#6f6cf8] hover:bg-[#514df0] disabled:opacity-60 text-white px-4 py-2.5 rounded-xl font-bold transition-all duration-300"
                    >
                      {busyIndex === index ? "Preparing..." : "Download PDF"}
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-[#f5f7ff] py-16 px-4 font-[Baloo_2]">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10">
          <p className="text-xs uppercase tracking-[0.3em] text-[#5d5be3] font-bold mb-3">
            Classroom Activity
          </p>
          <h1 className="text-3xl md:text-4xl font-extrabold text-[#5d5be3] leading-tight">
            Theme based colouring Worksheets for Your School
          </h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {worksheetData.map((item) => (
            <div
              key={item.title}
              className="bg-white rounded-[26px] overflow-hidden shadow-lg hover:-translate-y-1 transition-all duration-300 border border-indigo-100"
            >
              <div className="p-8 text-center flex flex-col items-center">
                <span className="text-6xl mb-4" role="img" aria-hidden="true">
                  {item.icon}
                </span>

                <h2 className="text-2xl font-bold text-gray-800 mb-2">
                  {item.title}
                </h2>

                <p className="text-gray-600 leading-6 text-sm mb-6">
                  {item.description}
                </p>

                <button
                  onClick={() => openGroup(item)}
                  className="bg-[#6f6cf8] hover:bg-[#514df0] text-white px-10 py-3 rounded-full font-bold transition-all duration-300"
                >
                  View
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ColourThemeActivities;
