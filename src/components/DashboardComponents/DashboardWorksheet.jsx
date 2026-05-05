import React from "react";

const activities = [
  {
    title: "Diwali Activity",
    image: "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/Happy_Diwali.jpg?v=1760622935",
    file: "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/Diwali.pdf?v=1760622936",
  },
  {
    title: "Handwashing Day & Student Day",
    image: "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/Handwashing_Day_Student_Day.jpg?v=1760185332",
    file: "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/ilovepdf_merged_compressed.pdf?v=1760185279",
  },
  {
    title: "Post Day",
    image: "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/Post_Day.jpg?v=1759936159",
    file: "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/Post_Day_Activity.pdf?v=1759936104",
  },
  {
    title: "Airforce Day",
    image: "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/1000166027.jpg?v=1759751617",
    file: "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/Airforce_Activity.pdf?v=1759751433",
  },
  {
    title: "Animal Day",
    image: "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/Animal_Day.jpg?v=1759557632",
    file: "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/World_Animal_Day.jpg?v=1759645423",
  },
  {
    title: "Ganesh Chaturthi",
    image: "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/WhatsApp_Image_2025-08-21_at_13.31.07_f458b31f.jpg?v=1755781732",
    file: "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/WhatsApp_Image_2025-08-21_at_13.31.07_0df530d2.jpg?v=1755781805",
  },
  {
    title: "Friendship Day",
    image: "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/WhatsApp_Image_2025-07-31_at_11.43.28_aef5b177.jpg?v=1753943523",
    file: "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/WhatsApp_Image_2025-07-31_at_11.45.17_80abf6f4.jpg?v=1753946533",
  },
  {
    title: "Ashadhi Ekadashi",
    image: "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/Ashadhi_Ekadashi_Day.jpg?v=1751538585",
    file: "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/Ashadhi_Ekadashi.jpg?v=1751544394",
  },
  {
    title: "National Unity Day",
    image: "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/National_unity_Day.jpg?v=1761366927",
    file: "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/Unity_Activity.pdf?v=1761559592",
  },
  {
    title: "World Science Day",
    image: "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/World_Science_Day.jpg?v=1762236089",
    file: "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/Science_Day.pdf?v=1762236239",
  },
  {
    title: "National Kindness Day",
    image: "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/National_Kindness_Day.jpg?v=1762934628",
    file: "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/Kindness_Day_Activity.pdf?v=1762934655",
  },
  {
    title: "Children's Day",
    image: "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/Childrens_Day.jpg?v=1763097594",
    file: "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/Children_s_Day.pdf?v=1763097592",
  },
  {
    title: "World Television Day",
    image: "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/World_Televison_Day.jpg?v=1763369877",
    file: "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/Television_Day_Activity.pdf?v=1763369877",
  },
  {
    title: "Thanksgiving Day",
    image: "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/thanks_giving_Day-Banner.jpg?v=1763824563",
    file: "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/Thanks_Giving_Day.pdf?v=1763824563",
  },
  {
    title: "Wildlife Conservation Day",
    image: "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/Wildlife_Conservation_Day.jpg?v=1764828413",
    file: "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/Wildlife_Conservation_Day_Activity.pdf?v=1764828413",
  },
  {
    title: "Indian Navy Day",
    image: "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/Indian_Navy_Day.jpg?v=1764828385",
    file: "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/Indian_Navy_Day.pdf?v=1764828385",
  },
  {
    title: "Christmas Day",
    image: "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/christmas_Day.jpg?v=1766464314",
    file: "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/Christmas_Day_Activity.pdf?v=1766464315",
  },
  {
    title: "New Year",
    image: "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/New_Year.jpg?v=1766839189",
    file: "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/New_Year_Activity.pdf?v=1766839190",
  },
  {
    title: "Lohri",
    image: "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/lOHRI.jpg?v=1767602748",
    file: "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/Lohri_1.pdf?v=1767611826",
  },
  {
    title: "Pongal",
    image: "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/Pongal.jpg?v=1768298044",
    file: "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/Pongal.pdf?v=1768298044",
  },
  {
    title: "Makar Sankranti",
    image: "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/Makarsankranti.jpg?v=1768287034",
    file: "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/Makarsankranti.pdf?v=1768287066",
  },
  {
    title: "Republic Day",
    image: "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/REPUBLIC_DAY_1__jpg.jpg?v=1769237355",
    file: "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/Republic_Day.pdf?v=1769230969",
  },
  {
    title: "Holi Festival",
    image: "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/Holi_jpg.jpg?v=1772194876",
    file: "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/Holi.pdf?v=1772194876",
  },
  {
    title: "Gudhi Padwa",
    image: "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/Gudhi_Padwa.jpg?v=1772775897",
    file: "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/Ugadi_Gudhi_Padwa.pdf?v=1772775897",
  },
  {
    title: "Ram Navami",
    image: "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/ramnavni.jpg?v=1774269059",
    file: "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/Ram_Navami.pdf?v=1774269060",
  },
  {
    title: "Good Friday",
    image: "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/good.jpg?v=1774688364",
    file: "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/Good_friday.pdf?v=1774688365",
  },
  {
    title: "Easter Day",
    image: "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/Easter_Day.jpg?v=1775036585",
    file: "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/Easter-for_all_class.pdf?v=1775036583",
  },
  {
    title: "World Health Day",
    image: "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/World_Health_Day_jpg.jpg?v=1775312670",
    file: "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/World_Health_Day-for_all_class.pdf?v=1775312671",
  },
];

const DashboardWorksheet = () => {
  
  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-7xl mx-auto">

        <h2 className="text-3xl font-semibold text-center text-gray-800 mb-10">
          Activity Worksheets
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {activities.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-44 object-cover"
              />

              <div className="p-4">
                <h3 className="text-sm font-medium text-gray-700 mb-3">
                  {item.title}
                </h3>

                {item.file ? (
                  <a
                    href={item.file}
                    download
                    className="block text-center bg-indigo-600 hover:bg-indigo-700 text-white text-sm py-2 rounded-md"
                  >
                    Download
                  </a>
                ) : (
                  <button className="w-full bg-gray-400 text-white text-sm py-2 rounded-md cursor-not-allowed">
                    Coming Soon
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default DashboardWorksheet;