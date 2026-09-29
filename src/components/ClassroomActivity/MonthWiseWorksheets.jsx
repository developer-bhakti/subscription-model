import React, { useState } from "react";

const months = [
  {
    id: "january",
    title: "January Activities",
    emoji: "🪁",
    tint: "bg-sky-50",
    description: "Republic Day, Lohri, Pongal worksheets.",
  },
  {
    id: "february",
    title: "February Activities",
    emoji: "🔬",
    tint: "bg-violet-50",
    description:
      "Fun preschool activities and printable worksheets.",
  },
  {
    id: "march",
    title: "March Activities",
    emoji: "🎨",
    tint: "bg-rose-50",
    description: "Holi and colour themed learning activities.",
  },
  {
    id: "april",
    title: "April Activities",
    emoji: "🌈",
    tint: "bg-amber-50",
    description:
      "Summer worksheets and preschool fun learning sheets.",
  },
  {
    id: "may",
    title: "May Activities",
    emoji: "☀️",
    tint: "bg-orange-50",
    description:
      "Summer worksheets and preschool fun learning sheets.",
  },
  {
    id: "june",
    title: "June Activities",
    emoji: "🌿",
    tint: "bg-emerald-50",
    description:
      "Father's Day, World Environment Day, Yoga Day worksheets.",
  },
  {
    id: "july",
    title: "July Activities",
    emoji: "☔",
    tint: "bg-cyan-50",
    description:
      "Rainy Season, Doctor's Day, Guru Purnima worksheets.",
  },
  {
    id: "august",
    title: "August Activities",
    emoji: "🎊",
    tint: "bg-indigo-50",
    description:
      "Rainy Season, Doctor's Day, Guru Purnima worksheets.",
  },
  {
    id: "september",
    title: "September Activities",
    emoji: "📚",
    tint: "bg-pink-50",
    description:
      "Teachers' Day, Ganesh Chaturthi and fun learning worksheets.",
  },
];

const activitiesData = {
  january: [
    {
      title: "Army Day",
      image:
        "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/Army_Day.jpg?v=1768462813",
      pdf:
        "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/Army_Day_d6c8467f-3e97-4283-896d-29d3cc9c2414.pdf?v=1784886205",
    },
    {
      title: "Handwriting",
      image:
        "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/National_Handwritting_Day.jpg?v=1768970973",
      pdf:
        "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/JAN-Handwriting.pdf?v=1779098352",
    },
    {
      title: "Lohri",
      image:
        "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/lOHRI.jpg?v=1767602748",
      pdf:
        "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/JAN-Lohri.pdf?v=1779098354",
    },
    {
      title: "Makarsankranti",
      image:
        "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/Makarsankranti.jpg?v=1768287034",
      pdf: "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/JAN-Makarsankranti.pdf?v=1779098353",
    },
    {
      title: "National Penguin Day",
      image:
        "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/Penguin_DAy.jpg?v=1768803461",
      pdf: "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/JAN-National_Penguin_Day.pdf?v=1779098350",
    },
    {
      title: "New Year",
      image:
        "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/New_Year.jpg?v=1766839189",
      pdf: "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/New_Year_Activity.pdf?v=1766839191"
    },
    {
      title: "Pongal",
      image:
        "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/Pongal.jpg?v=1768298044",
      pdf: "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/Pongal.pdf?v=1779187764",
    },
    {
      title: "Republic Day",
      image:
        "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/REPUBLIC_DAY_1__jpg.jpg?v=1769237355",
      pdf:
        "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/JAN-Republic_Day.pdf?v=1779098351",
    },
    {
      title: "Vasant Panchami",
      image:
        "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/Vanchant_Panchmi.jpg?v=1768970972",
      pdf: "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/JAN-Vasant_Panchami_Activity.pdf?v=1779098355",
    },
  ],

  february: [
    {
      title: "Mahashivratri",
      image:
        "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/Mahashivratri_jpg.jpg?v=1771054524",
      pdf:
        "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/FEB-Mahashivratri.pdf?v=1779170434",
    },
    {
      title: "National Science Day",
      image:
        "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/national_science_Day_jpg.jpg?v=1771316778",
      pdf:
        "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/FEB-National_science_Day.pdf?v=1779170502",
    },
    {
      title: "Radio Day",
      image:
        "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/Radio_Day_986acc0a-dcfb-4609-b1b9-da09058b2306.jpg?v=1739446203",
      pdf: "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/FEB-Radio_Day.pdf?v=1779170503",
    },
    {
      title: "World Pulses Day",
      image:
        "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/World_Pulses_Day.jpg?v=1770018449",
      pdf: "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/FEB-World_Pulses_Day.pdf?v=1779170504",
    },
    {
      title: "Dental Health Day",
      image:
        "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/Dental_Health_Day.jpg?v=1738304820",
      pdf: "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/FEB-Dental_Health_Day.pdf?v=1779170505",
    },
  ],

  march: [
    {
      title: "Holi",
      image:
        "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/Holi_jpg.jpg?v=1772194876",
      pdf:
        "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/MARCH-Holi.pdf?v=1779172227",
    },
    {
      title: "National Cereal Day",
      image:
        "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/Cereal_Day_Banner.jpg?v=1772445699",
      pdf: "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/MARCH-National_Cereal_Day.pdf?v=1779172228",
    },
    {
      title: "National Pig Day",
      image:
        "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/pig_day.jpg?v=1772186856",
      pdf: "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/MARCH-National_Pig_Day.pdf?v=1779172229",
    },
    {
      title: "Ram Navmi",
      image:
        "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/ramnavni.jpg?v=1774269059",
      pdf:
        "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/MARCH-Ram_Navami.pdf?v=1779172227",
    },
    {
    title: "World Sparrow Day",
      image:
        "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/sparrrow.jpg?v=1779173210",
      pdf:
        "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/MARCH-World_Sparrow_Day.pdf?v=1779172228",
    },
  ],

  april: [
    {
      title: "Easter",
      image:
        "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/Easter_Day.jpg?v=1775036585",
      pdf:
        "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/April-Easter-for_all_class.pdf?v=1779173260",
    },
    {
      title: "Good Friday",
      image:
        "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/good.jpg?v=1774688364",
      pdf: "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/April-Good_friday.pdf?v=1779173262",
    },
    {
      title: "Earth Day",
      image:
        "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/Earth_Day_c67ba33d-04ad-4370-b33d-5971d9b852ec.jpg?v=1775886786",
      pdf:
        "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/April-Earth_Day.pdf?v=1779173264",
    },
    {
      title: "World Art Day",
      image:
        "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/World_Art_Day_e5f62384-8927-4451-ba9c-efaeccd76293.jpg?v=1775630951",
      pdf:
        "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/April-Art_Day-for_all_class.pdf?v=1779173263",
    },
     {
      title: "Dolphin Day",
      image:
        "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/National_Dolphine_Day_c9289ba6-bb50-47cd-9165-b2c62373db4c.jpg?v=1775630950",
      pdf:
        "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/April-Dolphine_Day.pdf?v=1779173263",
    },
     {
      title: "International Bat Day",
      image:
        "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/International_Bat_Day.jpg?v=1775886785",
      pdf:
        "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/April-International_Bat_Day-for_all_class.pdf?v=1779173262",
    },
    {
      title: "National Rainbow Day",
      image:
        "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/rainbow.jpg?v=1774688364",
      pdf:
        "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/National_Rainbow_Day.pdf?v=1774688367",
    },
     {
      title: "Telephone Day",
      image:
        "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/National_Telephone_Day.jpg?v=1776337243",
      pdf:
        "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/April-National_Telephone_Day.pdf?v=1779173263",
    },
    {
      title: "Pet Day",
      image:
        "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/National_Pet_Day_jpg.jpg?v=1775312672",
      pdf:
        "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/April-Natonal_Pet_Day.pdf?v=1779173260",
    },
      {
      title: "Book Day",
      image:
        "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/World_Book_Day.jpg?v=1776337243",
      pdf:
        "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/April-World_Book_Day.pdf?v=1779173263",
    },
      {
      title: "World Health Day",
      image:
        "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/World_Health_Day_jpg.jpg?v=1775312670",
      pdf:
        "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/World_Health_Day-for_all_class.pdf?v=1775312672",
    },
     {
      title: "Rat Day",
      image:
        "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/World_Rat_Day.jpg?v=1775036641",
      pdf:
        "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/April-World_Rat_Day.pdf?v=1779173264",
    },
  ],

  may: [
    {
      title: "World Turtle Day",
      image:
        "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/turtle-day.jpg?v=1778477345",
      pdf:
        "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/MAY-World_Turtle_Day.pdf?v=1779174683",
    },
    {
      title: "Mother's Day",
      image:
        "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/WhatsApp_Image_2026-05-01_at_12.03.31_PM.jpg?v=1777699916",
      pdf:
        "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/MAY-Mothers_Day.pdf?v=1779174675",
    },
  ],

  june: [
    {
      title: "Father's Day",
      image:
        "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/Fathers_Day_fadb8805-1bd5-4d4a-8210-fcfce934c500.jpg?v=1781000654",
      pdf:
        "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/Fathers_Day-All_Class.pdf?v=1781000650",
    },
     {
      title: "Global Parents Day",
      image:
        "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/Global_Parents_Day.jpg?v=1780047617",
      pdf:
        "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/Global_Parents_Day.pdf?v=1780047616",
    },
     {
      title: "International Pineapple Day",
      image:
        "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/International_Pineapple_Day_fd1318b0-aa6e-482e-b7d6-011e4a8b9190.jpg?v=1781499895",
      pdf:
        "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/International_Pineapple_Day_1.pdf?v=1781499896",
    },
     {
      title: "National Camera Day",
      image:
        "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/National_Camera_Day_96e8d411-77f5-4e2d-80b9-68522c3629ba.jpg?v=1782288919",
      pdf:
        "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/National_Camera_Day.pdf?v=1782288920",
    },
     {
      title: "National Red Rose Day",
      image:
        "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/National_Red_Rose_Day_28b6c9c5-c778-4955-8ff1-d4843f7b7098.jpg?v=1781000649",
      pdf:
        "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/National_Red_Rose_Day.pdf?v=1781000651",
    },
       {
      title: "World Bicycle Day",
      image:
        "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/World_Bicycle_Day_e0f261b7-6472-4078-96db-8e3f2dccb422.jpg?v=1780401335",
      pdf:
        "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/World_Bicycle_Day_1.pdf?v=1780402386",
    },
      {
      title: "World Donut Day",
      image:
        "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/World_Donut_Day.jpg?v=1780571122",
      pdf:
        "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/World_Donut_Day.pdf?v=1780571123",
    },
     {
      title: "World Environment Day",
      image:
        "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/World_Environment_Day.jpg?v=1780571121",
      pdf:
        "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/World_Environment_Day.pdf?v=1780571122",
    },
     {
      title: "World Milk Day",
      image:
        "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/World_Milk_Day.jpg?v=1779539217",
      pdf:
        "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/World_Milk_Day.pdf?v=1779539218",
    },
     {
      title: "World Ocean Day",
      image:
        "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/World_Ocean_Day_543d73d2-b885-4e79-922e-46c5a18bf807.jpg?v=1780899484",
      pdf:
        "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/World_Ocean_Day.pdf?v=1780899485",
    },
    {
      title: "World Food Safety Day",
      image:
        "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/world_food_day.jpg?v=1780765067",
      pdf:
        "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/World_Food_Safety_Day.pdf?v=1780765068",
    },

  ],

  july: [
    {
      title: "Big Butterfly Day",
      image:
        "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/Big_Butterfly_Day_8226bf19-7a98-4fd1-88ea-2a204bb4d961.jpg?v=1784093989",
      pdf:
        "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/Big_Butterfly_Day.pdf?v=1784093990",
    },
     {
      title: "World Snake Day",
      image:
        "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/World_Snake_Day_fce5d928-ae60-4bb4-a016-e8602ba7eb19.jpg?v=1783919209",
      pdf:
        "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/World_Sanke_Day.pdf?v=1783919212",
    },
     {
      title: "World Emoji Day",
      image:
        "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/World_Emoji_Day.jpg?v=1783919208",
      pdf:
        "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/World_Emoji_Day.pdf?v=1783919212",
    },
     {
      title: "Paper Bag Day",
      image:
        "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/Paper_Bag_Day.jpg?v=1783153562",
      pdf:
        "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/Paper_Bag_Day.pdf?v=1783416508",
    },
      {
      title: "National Raspberry Day",
      image:
        "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/National_Raspberry_Day.jpg?v=1783153526",
      pdf:
        "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/National_Raspberry_Day.pdf?v=1783153583",
    },
      {
      title: "National Chocolate Day",
      image:
        "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/choclate_day.jpg?v=1782820241",
      pdf:
        "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/World_chocolate_Day.pdf?v=1782820282",
    },
     {
      title: "Global Forgiveness Day",
      image:
        "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/Global_Forgiveness_Day.jpg?v=1782820243",
      pdf:
        "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/Global_Forgiveness_Day.pdf?v=1782820272",
    },
    {
      title: "Kargil Vijay Diwas",
      image:
        "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/Kargil_Vijay_Diwas.jpg?v=1784182688",
      pdf:
        "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/Kargil_Vijay_Diwas.pdf?v=1784182690",
    },
    {
      title: "International Tiger Day",
      image:
        "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/Tiger_Day.jpg?v=1784182690",
      pdf:
        "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/International_Tiger_Day.pdf?v=1784182690",
    },
     {
      title: "International Mango Day",
      image:
        "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/National_Mango_Day.jpg?v=1784182687",
      pdf:
        "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/National_Mango_Day.pdf?v=1784182856",
    },
  ],
  
  august: [
    {
      title: "National Friendship Day",
      image:
        "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/National_Friendship_Day.jpg?v=1785310814",
      pdf:
        "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/National_Friendship_Day.pdf?v=1788030949",
    },
     {
      title: "Sister's Day",
      image:
        "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/Sisters_Day.jpg?v=1785310818",
      pdf:
        "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/Sister_Day.pdf?v=1788030949",
    },
     {
      title: "National Watermelon Day",
      image:
        "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/National_Watermelon_Day.jpg?v=1785569754",
      pdf:
        "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/National_Watermelon_Day.pdf?v=1788031002",
    },
     {
      title: "World Lizard Day",
      image:
        "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/World_Lizard_Day_1.jpg?v=1785740946",
      pdf:
        "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/World_Lizard_Day.pdf?v=1788031002",
    },
      {
      title: "Independance Day",
     image:
        "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/Independence_Day.jpg?v=1786351736",
      pdf:
        "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/Independence_Day.pdf?v=1788031103",
    },
      {
      title: "Nagpanchami",
      image:
        "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/Nagpanchami_79c42c89-42e0-47d9-9500-256254e72acf.jpg?v=1786351743",
      pdf:
        "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/Nagpanchami.pdf?v=1788031103",
    },
     {
      title: "World Photography Day",
     image:
        "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/World_Photography_Day.jpg?v=1786618880",
      pdf:
        "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/World_Photography_Day.pdf?v=1788031134",
    },
    {
      title: "Eid",
     image:
        "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/Eid.jpg?v=1786961111",
      pdf:
        "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/Eid.pdf?v=1788031196",
    },
     {
      title: "Onam",
      image:
        "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/Onam.jpg?v=1786961113",
      pdf:
        "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/Onam.pdf?v=1788031196",
    },
    {
      title: "Rakshabandhan",
      image:
        "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/Rakshabandhan.jpg?v=1787633028",
      pdf:
        "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/Rakshabandhan.pdf?v=1787633061",
    },
    {
      title: "National Beach Day",
      image:
        "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/Beach_Day.jpg?v=1787633029",
      pdf:
        "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/National_Beach_Day.pdf?v=1787633063",
    },
  ],

  september: [
     {
      title: "Coconut Day",
      image:
        "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/Coconut_Day.jpg?v=1788015814",
      pdf:
        "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/Coconut_Day.pdf?v=1788015823",
    },
     {
      title: "National Wildlife Day",
      image:
        "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/National_Wildlife_Day.jpg?v=1788158619",
      pdf:
        "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/National_Wildlife_Day.pdf?v=1788158620",
    },
     {
      title: "Janmashtami",
      image:
        "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/Janmashtami.jpg?v=1788164675",
      pdf:
        "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/Krushna_janmashtami_20cf8475-d596-4a91-a6ed-78447df9ac52.pdf?v=1788172275",
    },
     {
      title: "Teachers Day",
      image:
        "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/Teachers_Day.jpg?v=1788418591",
      pdf:
        "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/Teachers_Day-LKG.pdf?v=1788418598",
    },
     {
      title: "Gopalkala",
      image:
        "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/Gopalkala.jpg?v=1788418595",
      pdf:
        "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/Gopalkala.pdf?v=1788418598",
    },
     {
      title: "International Literacy Day",
      image:
        "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/Literacy_Day.jpg?v=1788780957",
      pdf:
        "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/International_Literacy_Day.pdf?v=1788780982",
    },
     {
      title: "Teddy Bear Day",
      image:
        "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/Teddy_Bear_Day.jpg?v=1788780954",
      pdf:
        "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/Teddy_Bear_Day.pdf?v=1788780967",
    },
     {
      title: "First Aid Day",
      image:
        "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/First_Aid_Day.jpg?v=1788949309",
      pdf:
        "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/First_Aid_Day.pdf?v=1788949308",
    },
     {
      title: "Hindi Diwas",
      image:
        "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/Hindi_Diwas.jpg?v=1788949307",
      pdf:
        "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/Hindi_Diwas.pdf?v=1788949308",
    },
     {
      title: "Ganesh Chaturthi",
      image:
        "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/Ganesh_Chaturthi.jpg?v=1789194604",
      pdf:
        "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/Ganesh_Chaturthi.pdf?v=1789194605",
    },
     {
      title: "International Day of Peace",
      image:
        "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/peace_day.png?v=1789816865",
      pdf:
        "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/International_Day_of_peace.pdf?v=1789816865 ",
    },
     {
      title: "Gorilla Day",
      image:
        "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/gorila_day.png?v=1789816865",
      pdf:
        "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/World_Gorilla_Day.pdf?v=1789816865",
    },
     {
      title: "International Rabbit Day",
      image:
        "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/International_Rabbit_Day.png?v=1790155726",
      pdf:
        "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/International_Rabbit_Day.pdf?v=1790155728",
    },
     {
      title: "World River Day",
      image:
        "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/World_River_Day.png?v=1790155726",
      pdf:
        "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/World_River_Day-LKG.pdf?v=1790155728",
    },
  ],
};
export default function MonthWiseWorksheets() {
  const [activeMonth, setActiveMonth] = useState("january");

  return (
    <section className="bg-[#f5f7ff] py-16 px-5 font-[Baloo_2]">
      <div className="max-w-7xl mx-auto">

        {/* Heading */}
        <h2 className="text-center text-3xl md:text-5xl font-extrabold text-[#5d5be3] mb-14">
          Month Wise Worksheets & Activities
        </h2>

        {/* Month Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-7">
          {months.map((month) => (
            <div
              key={month.id}
              className="bg-white rounded-3xl overflow-hidden shadow-lg hover:-translate-y-2 transition-all duration-300"
            >
              <div className="p-6">
                <div
                  className={`w-20 h-20 rounded-full ${month.tint} flex items-center justify-center text-4xl mb-5`}
                >
                  {month.emoji}
                </div>

                <h3 className="text-2xl font-bold text-gray-800 mb-3">
                  {month.title}
                </h3>

                <p className="text-gray-500 leading-7 mb-5 font-[Poppins] text-[15px]">
                  {month.description}
                </p>

                <button
                  onClick={() => setActiveMonth(month.id)}
                  className="w-full bg-[#6f6cf8] hover:bg-[#514df0] text-white py-3 rounded-xl font-semibold transition-all duration-300"
                >
                  View Activities
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Activities Section */}
        <div className="mt-20">
          <h2 className="text-center text-3xl md:text-4xl font-bold text-[#5d5be3] mb-12">
            {months.find((m) => m.id === activeMonth)?.title}
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-7">
            {activitiesData[activeMonth]?.map((activity, index) => (
              <div
                key={index}
                className="bg-white rounded-3xl overflow-hidden shadow-lg hover:-translate-y-2 transition-all duration-300"
              >
                <div className="w-full h-[240px] bg-[#f7f8ff] flex items-center justify-center overflow-hidden rounded-t-3xl">
                  <img
                    src={activity.image}
                    alt={activity.title}
                    className="w-full h-full object-contain p-3"
                  />
                </div>

                <div className="p-6 text-center">
                  <h3 className="text-2xl font-bold text-gray-800 mb-5">
                    {activity.title}
                  </h3>

                  <a
                    href={activity.pdf}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block bg-[#6f6cf8] hover:bg-[#514df0] text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300"
                  >
                    Open Worksheet
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}