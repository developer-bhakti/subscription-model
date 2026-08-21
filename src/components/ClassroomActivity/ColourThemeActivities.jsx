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

const domesticAnimalWorksheets = [
  {
    title: "Guinea Pig Colouring",
    pdf: "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/guine_pig.jpg?v=1787289743",
  },
  {
    title: "Mule Colouring",
    pdf: "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/mule.jpg?v=1787289743",
  },
  {
    title: "Rabbit Colouring",
    pdf: "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/rabbit.jpg?v=1787289743",
  },
  {
    title: "Cat Colouring",
    pdf: "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/cat.jpg?v=1787289743",
  },
  {
    title: "Cow Colouring",
    pdf: "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/cow.jpg?v=1787289743",
  },
  {
    title: "Pig Colouring",
    pdf: "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/pig.jpg?v=1787289743",
  },
  {
    title: "Yak Colouring",
    pdf: "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/yak.jpg?v=1787289743",
  },
  {
    title: "Turkey Colouring",
    pdf: "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/turkey.jpg?v=1787289743",
  },
  {
    title: "Goose Colouring",
    pdf: "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/goose.jpg?v=1787289743",
  },
  {
    title: "Ox Colouring",
    pdf: "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/ox.jpg?v=1787289743",
  },
  {
    title: "Horse Colouring",
    pdf: "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/horse.jpg?v=1787289743",
  },
  {
    title: "Sheep Colouring",
    pdf: "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/sheep.jpg?v=1787289743",
  },
  {
    title: "Hen Colouring",
    pdf: "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/hen.jpg?v=1787289743",
  },
  {
    title: "Duck Colouring",
    pdf: "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/duck.jpg?v=1787289744",
  },
  {
    title: "Dog Colouring",
    pdf: "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/dog.jpg?v=1787289743",
  },
  {
    title: "Donkey Colouring",
    pdf: "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/donkey.jpg?v=1787289743",
  },
  {
    title: "Buffalo Colouring",
    pdf: "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/buffalo.jpg?v=1787289743",
  },
  {
    title: "Humstar Colouring",
    pdf: "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/hamstar.jpg?v=1787289743",
  },
  {
    title: "Goat Colouring",
    pdf: "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/goat.jpg?v=1787289743",
  },

  {
    title: "Bull Colouring",
    pdf: "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/bull.jpg?v=1787289743",
  },
  {
    title: "Rooster Colouring",
    pdf: "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/rooster.jpg?v=1787289743",
  },
  {
    title: "Camel Colouring",
    pdf: "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/camel.jpg?v=1787289743",
  },
];

const birdWorksheets = [
  {
    title: "Woodpecker Colouring",
    pdf: "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/woodpeaker.jpg?v=1787291938",
  },
  {
    title: "Cuckoon Colouring",
    pdf: "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/cuckoon.jpg?v=1787291938",
  },
  {
    title: "Hawk Colouring",
    pdf: "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/hawk_634a7c83-c802-4f59-b78e-7fcf205a8c58.jpg?v=1787291938",
  },
  {
    title: "Eagle Colouring",
    pdf: "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/eagle.jpg?v=1787291938",
  },
  {
    title: "Duck Colouring",
    pdf: "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/duck_d4c207e8-6d07-435d-9c03-88e4610b43f6.jpg?v=1787291938",
  },
  {
    title: "Emu Colouring",
    pdf: "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/emu.jpg?v=1787291938",
  },
  {
    title: "Hen Colouring",
    pdf: "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/hen_a2f02f2b-c351-43a2-804c-b01278a01cb4.jpg?v=1787291938",
  },
  {
    title: "Heron Colouring",
    pdf: "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/heron_ea22791a-6855-4dc3-95dd-dbc3aa24bb89.jpg?v=1787291938",
  },
  {
    title: "Flamingo Colouring",
    pdf: "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/flamingo_6551647e-54ce-44bf-878d-3ef8d2f3aa6f.jpg?v=1787291938",
  },
  {
    title: "Kingfisher Colouring",
    pdf: "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/kingfisher_a078e8b6-1068-4777-9848-f756b7636189.jpg?v=1787291938",
  },
  {
    title: "Crow Colouring",
    pdf: "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/crow.jpg?v=1787291938",
  },
  {
    title: "Dove Colouring",
    pdf: "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/dove.jpg?v=1787291938",
  },
  {
    title: "Goose Colouring",
    pdf: "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/ghoos_79c1b1a7-629a-4e4b-970d-499c99951a81.jpg?v=1787291938",
  },
  {
    title: "Hummingbird Colouring",
    pdf: "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/hummingbird_03f27680-9425-45bc-b4d3-c1b6747a7c89.jpg?v=1787291937",
  },
  {
    title: "Hawk Colouring",
    pdf: "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/hawk.jpg?v=1787291921",
  },

  {
    title: "Vulture Colouring",
    pdf: "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/vulture.jpg?v=1787291921",
  },

  {
    title: "Flamingo Colouring",
    pdf: "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/flamingo.jpg?v=1787291921",
  },
  {
    title: "Owl Colouring",
    pdf: "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/owl.jpg?v=1787291921",
  },
  {
    title: "Macow Colouring",
    pdf: "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/macow.jpg?v=1787291921",
  },
  {
    title: "Sparrow Colouring",
    pdf: "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/sparrow.jpg?v=1787291921",
  },
  {
    title: "myna Colouring",
    pdf: "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/myna.jpg?v=1787291921",
  },
  {
    title: "Parrot Colouring",
    pdf: "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/parrot.jpg?v=1787291921",
  },
  {
    title: "Tutkey Colouring",
    pdf: "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/tutkey.jpg?v=1787291921",
  },
  {
    title: "Pelican Colouring",
    pdf: "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/pelican.jpg?v=1787291921",
  },
  {
    title: "Rooster Colouring",
    pdf: "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/rooster_7e4c1b1e-c640-45dc-bd27-73bc31023e2d.jpg?v=1787291921",
  },
  {
    title: "Ostrich Colouring",
    pdf: "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/ostrich.jpg?v=1787291920",
  },
  {
    title: "Heron Colouring",
    pdf: "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/heron.jpg?v=1787291920",
  },
  {
    title: "Ostrich Colouring",
    pdf: "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/ghoos.jpg?v=1787291920",
  },
  {
    title: "Stork Colouring",
    pdf: "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/stork.jpg?v=1787291920",
  },
  {
    title: "Pigeon Colouring",
    pdf: "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/pigeon.jpg?v=1787291920",
  },
  {
    title: "Seagull Colouring",
    pdf: "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/seagull.jpg?v=1787291919",
  },
  {
    title: "Peacock Colouring",
    pdf: "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/peacock.jpg?v=1787295417",
  },
];

const wildAnimalWorksheets = [
  {
    title: "Reindeer Colouring",
    pdf: "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/reindeer.jpg?v=1787295520",
  },
  {
    title: "Zebra Colouring",
    pdf: "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/zebra.jpg?v=1787295519",
  },
  {
    title: "Snake Colouring",
    pdf: "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/snake.jpg?v=1787295519",
  },
  {
    title: "Leopard Colouring",
    pdf: "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/lepoard.jpg?v=1787295519",
  },
  {
    title: "Moose Colouring",
    pdf: "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/moose.jpg?v=1787295519",
  },
  {
    title: "Wild Animal Colouring",
    pdf: "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/wild_board.jpg?v=1787295519",
  },
  {
    title: "Tiger Colouring",
    pdf: "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/tiger.jpg?v=1787295519",
  },
  {
    title: "Rhinoceros Colouring",
    pdf: "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/rhinoceros.jpg?v=1787295519",
  },
  {
    title: "Wolf Colouring",
    pdf: "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/wolf.jpg?v=1787295519",
  },
  {
    title: "Lion Colouring",
    pdf: "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/lion.jpg?v=1787295519",
  },
  {
    title: "Panda Colouring",
    pdf: "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/panda.jpg?v=1787295518",
  },
  {
    title: " Crocodile Colouring",
    pdf: "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/crocodile.jpg?v=1787295481",
  },
  {
    title: " Gorilla Colouring",
    pdf: "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/gorila.jpg?v=1787295481",
  },
  {
    title: " Chimpanzee Colouring",
    pdf: "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/chimpanzee.jpg?v=1787295481",
  },
  {
    title: " Alligator Colouring",
    pdf: "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/allgiator.jpg?v=1787295481",
  },
  {
    title: " Bison Colouring",
    pdf: "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/beson.jpg?v=1787295481",
  },
  {
    title: " Hippopotamus Colouring",
    pdf: "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/hippoptoms.jpg?v=1787295481",
  },
  {
    title: " Hyena Colouring",
    pdf: "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/hyena.jpg?v=1787295481",
  },
  {
    title: " Jackal Colouring",
    pdf: "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/jackal.jpg?v=1787295481",
  },
  {
    title: "Fox Colouring",
    pdf: "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/fox.jpg?v=1787295481",
  },
  {
    title: "Gazelle Colouring",
    pdf: "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/gazellea.jpg?v=1787295481",
  },
  {
    title: " Cheetah Colouring",
    pdf: "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/cheetah.jpg?v=1787295481",
  },
  {
    title: " Giraffe Colouring",
    pdf: "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/girafee.jpg?v=1787295481",
  },
  {
    title: " Kangaroo Colouring",
    pdf: "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/kangaroo.jpg?v=1787295481",
  },
  {
    title: " Deer Colouring",
    pdf: "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/deer.jpg?v=1787295481",
  },

  {
    title: " Elephant Colouring",
    pdf: "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/elephant.jpg?v=1787295481",
  },
  {
    title: " Bear Colouring",
    pdf: "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/bear.jpg?v=1787295480",
  },
];

const waterAnimalWorksheets = [
  {
     title: "Octopus Colouring",
    pdf: "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/octopus.jpg?v=1787306951",
   },
    {
     title: "Crocodile Colouring",
    pdf: "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/crocodile_226d9221-1282-457b-98a3-e6431255c8b2.jpg?v=1787306951",
   },
    {
     title: "Shark Colouring",
    pdf: "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/shark.jpg?v=1787306951",
   },
    {
     title: " Squid Colouring",
    pdf: "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/squid.jpg?v=1787306951",
   },
    {
     title: "Blue Whale Colouring",
    pdf: "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/blue_whale.jpg?v=1787306951",
   },
    {
     title: "Duck Colouring",
    pdf: "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/duck_82be9360-2e23-42ae-a9e2-099a64789704.jpg?v=1787306951",
   },
    {
     title: " Seal Colouring",
    pdf: "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/seal.jpg?v=1787306951",
   },
    {
     title: "Jellyfish Colouring",
    pdf: "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/jellyfish.jpg?v=1787306951",
   },
    {
     title: "Swan Colouring",
    pdf: "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/swan.jpg?v=1787306951",
   },
    {
     title: "Lobster Colouring",
    pdf: "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/lobster.jpg?v=1787306951",
   },
    {
     title: "Hippopotamus Colouring",
    pdf: "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/hippopotamus.jpg?v=1787306950",
   },

    {
     title: "Crab Colouring",
    pdf: "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/crab.jpg?v=1787306951",
   },
   
    {
     title: "Sea Colouring",
    pdf: "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/sea.jpg?v=1787306951",
   },
   
    {
     title: " Fish Colouring",
    pdf: "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/fish.jpg?v=1787306950",
   },
   
    {
     title: " Whale Colouring",
    pdf: "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/whale.jpg?v=1787306951",
   },
   
    {
     title: "Frog Colouring",
    pdf: "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/frog.jpg?v=1787306950",
   },
    {
     title: "Shrimp Colouring",
    pdf: "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/shrimp.jpg?v=1787306951",
   },
    {
     title: "Dolphin Colouring",
    pdf: "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/dolphin.jpg?v=1787306950",
   },
    {
     title: "Otter Colouring",
    pdf: "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/otter.jpg?v=1787306950",
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
  {
    title: "Domestic Animal Worksheets",
    description:
      "Colour farm and pet animals while learning the names and sounds they make.",
    icon: "🐄",
    items: domesticAnimalWorksheets,
  },
  {
    title: "Bird Worksheets",
    description:
      "Colour common birds and learn to recognise the ones seen around the school.",
    icon: "🦜",
    items: birdWorksheets,
  },
  {
    title: "Wild Animal Worksheets",
    description:
      "Colour jungle and forest animals while learning where each one lives.",
    icon: "🦁",
    items: wildAnimalWorksheets,
  },
  {
    title: "Water Animal Worksheets",
    description:
      "Colour sea and river animals while learning about the water they live in.",
    icon: "🐬",
    items: waterAnimalWorksheets,
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
        (pageHeight - margin * 2) / image.naturalHeight,
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
        height,
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
          : [...previous, index],
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
      setProgress({ current: index + 1, total: group.items.length }),
    );

    if (doc) {
      doc.save(`${slugify(group.title)}.pdf`);
      setBundleNote(
        failed.length
          ? `Saved ${group.items.length - failed.length} of ${
              group.items.length
            } worksheets. ${failed.length} could not be loaded.`
          : `Saved all ${group.items.length} worksheets into one PDF.`,
      );
    } else {
      setBundleNote(
        "None of the worksheets could be loaded. Please try again.",
      );
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
              disabled={downloadingAll || activeGroup.items.length === 0}
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
              {failedIndexes.length} worksheet(s) could not be turned into a
              PDF. Use “Open in new tab” to save those directly.
            </p>
          )}

          {activeGroup.items.length === 0 && (
            <p className="rounded-2xl bg-white border border-indigo-100 text-gray-500 text-center px-6 py-12 font-semibold">
              Worksheets for this theme are coming soon.
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
