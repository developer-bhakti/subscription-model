import React, { useState } from "react";

const classes = [
  {
    name: "Nursery",
    image:
      "https://images.unsplash.com/photo-1516627145497-ae6968895b74?q=80&w=1200&auto=format&fit=crop",
    desc: "LEMCore curriculum resources and activities for Nursery students.",
  },
  {
    name: "LKG",
    image:
      "https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=1200&auto=format&fit=crop",
    desc: "Interactive learning resources and curriculum for LKG students.",
  },
  {
    name: "UKG",
    image:
      "https://images.unsplash.com/photo-1513258496099-48168024aec0?q=80&w=1200&auto=format&fit=crop",
    desc: "Advanced preschool learning curriculum and educational activities.",
  },
];

const SESSION_PLAN_URL =
  "https://lemcore-session-plan.adiuvaretfoundation.com/";

const pdfLinks = {
  Nursery: {
    1: {
      practices: [
        "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/PB-M1-W1.pdf?v=1784784890",
        "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/PB-M1-W2.pdf?v=1784784890",
        "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/PB-M1-W3.pdf?v=1784784890",
        "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/PB-M1-W4.pdf?v=1784784890",
      ],
      syllabus: [
        "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/Nur-M1-W1.pdf?v=1783402864",
        "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/Nur-M1-W2.pdf?v=1783402864",
        "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/Nur-M1-W3.pdf?v=1783402864",
        "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/Nur-M1-W4.pdf?v=1783402865",
      ],
    },
    2: {
      practices: [
        "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/PB-M2-W1.pdf?v=1784784996",
        "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/PB-M2-W2.pdf?v=1784784996",
        "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/PB-M2-W3.pdf?v=1784784997",
        "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/PB-M2-W4.pdf?v=1784784997",
      ],
      syllabus: [
        "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/Nur-M2-W1.pdf?v=1783403535",
        "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/Nur-M2-W2.pdf?v=1783403534",
        "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/Nur-M2-W3.pdf?v=1783403535",
        "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/Nur-M2-W4.pdf?v=1783403535",
      ],
    },
    3: {
      practices: [
        "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/PB-M3-W1.pdf?v=1784785084",
        "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/PB-M3-W2.pdf?v=1784785083",
        "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/PB-M3-W3.pdf?v=1784785084",
        "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/PB-M3-W4.pdf?v=1784785083",
      ],
      syllabus: [
        "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/Nur-M3-W1.pdf?v=1783403782",
        "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/Nur-M3-W2.pdf?v=1783403784",
        "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/Nur-M3-W3.pdf?v=1783403785",
        "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/Nur-M3-W4.pdf?v=1783403782",
      ],
    },
    4: {
      practices: [
        "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/PB-M4-W1.pdf?v=1784785182",
        "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/PB-M4-W2.pdf?v=1784785182",
        "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/PB-M4-W3.pdf?v=1784785182",
        "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/PB-M4-W4.pdf?v=1784785182",
      ],
      syllabus: [
        "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/Nur-M4-W1.pdf?v=1783404427",
        "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/Nur-M4-W2.pdf?v=1783404426",
        "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/Nur-M4-W3.pdf?v=1783404431",
        "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/Nur-M4-W4.pdf?v=1783404426",
      ],
    },
    5: {
      practices: [
        "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/PB-M5-W1.pdf?v=1784785503",
        "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/PB-M5-W2.pdf?v=1784785502",
        "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/PB-M5-W3.pdf?v=1784785495",
        "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/PB-M5-W4.pdf?v=1784785494",
      ],
      syllabus: [
        "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/Nur-M5-W1.pdf?v=1783405002",
        "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/Nur-M5-W2.pdf?v=1783405001",
        "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/Nur-M5-W3.pdf?v=1783405003",
        "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/Nur-M5-W4.pdf?v=1783405001",
      ],
    },
    6: {
      practices: [
        "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/PB-M6-W1.pdf?v=1784785600",
        "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/PB-M6-W2.pdf?v=1784785599",
        "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/PB-M6-W3.pdf?v=1784785599",
        "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/PB-M6-W4.pdf?v=1784785598",
      ],
      syllabus: [
        "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/Nur-M6-W1.pdf?v=1783405857",
        "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/Nur-M6-W2.pdf?v=1783405858",
        "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/Nur-M6-W3.pdf?v=1783405858",
        "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/Nur-M6-W4.pdf?v=1783405858",
      ],
    },
    7: {
      practices: [
        "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/PB-M7-W1.pdf?v=1784787868",
        "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/PB-M7-W2.pdf?v=1784787868",
        "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/PB-M7-W3.pdf?v=1784787869",
        "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/PB-M7-W4.pdf?v=1784787869",
      ],
      syllabus: [
        "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/Nur-M7-W1.pdf?v=1783406111",
        "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/Nur-M7-W2.pdf?v=1783406112",
        "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/Nur-M7-W3.pdf?v=1783406111",
        "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/Nur-M7-W4.pdf?v=1783406110",
      ],
    },
    8: {
      practices: [
        "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/PB-M8-W1.pdf?v=1784787988",
        "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/PB-M8-W2.pdf?v=1784787987",
        "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/PB-M8-W3.pdf?v=1784787987",
        "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/PB-M8-W4.pdf?v=1784787988",
      ],
      syllabus: [
        "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/Nur-m8-w1.pdf?v=1783406225",
        "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/NUR-M8-W2.pdf?v=1783406226",
        "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/Nur-M8-W3.pdf?v=1783406209",
        "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/Nur-M8-w4.pdf?v=1783406211",
      ],
    },
  },
  LKG: {
    1: {
      practices: [
        "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/LKG-M1-W1_ee99bd29-e776-4a4b-83d8-978be33a23c2.pdf?v=1784192125",
        "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/LKG-M1-W2_3c2cd671-6e66-4c5e-b8a5-cdda48a9bb5d.pdf?v=1784192125",
        "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/LKG-M1-W3_aafd59d0-290f-44f9-ba46-1b441cee5405.pdf?v=1784192125",
        "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/LKG-M1-W4_b513a069-0e51-4720-9103-b4f8f0cb81b2.pdf?v=1784192125",
      ],
      syllabus: [
        "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/LKG-M1-W1_edf75c6f-24d5-46a6-9a78-fa600680fadc.pdf?v=1784788172",
        "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/LKG-M1-W2_80dfba2f-9881-4f93-b692-75d5ee720ae6.pdf?v=1784788171",
        "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/LKG-M1-W3_97d15f35-2688-4460-8bf5-958328618315.pdf?v=1784788171",
        "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/LKG-M1-W4_180102f6-0220-4d0f-94ad-6b9b17a09513.pdf?v=1784788172",
      ],
    },
    2: {
      practices: [
        "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/LKG-M2-W1_3f7b75bb-38b1-478d-914b-07ef02f30749.pdf?v=1784192215",
        "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/LKG-M2-W2_852f21c0-0962-43ea-b5d9-4e2f805d2d18.pdf?v=1784192215",
        "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/LKG-M2-W3_a7ddbbcb-ccdf-4e35-86da-ab2b822f9962.pdf?v=1784192215",
        "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/LKG-M2-W4_1842711e-00cc-47db-a750-3508fe8f45de.pdf?v=1784192215",
      ],
      syllabus: [
        "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/LKG-M2-W1_5c345775-2df7-4b71-ac17-86f92f0406f7.pdf?v=1784788271",
        "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/LKG-M2-W2_a5d088b8-b56b-47c5-8c80-113c0503d32c.pdf?v=1784788266",
        "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/LKG-M2-W3_de9fd4c5-6106-4302-b170-793421959088.pdf?v=1784788266",
        "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/LKG-M2-W4_89c7f7c6-a562-4b9d-8b66-0c116085b2c1.pdf?v=1784788266",
      ],
    },
    3: {
      practices: [
        "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/LKG-M3-W1_e172117a-d623-46d8-b66c-b9f4463b24be.pdf?v=1784192300",
        "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/LKG-M3-W2.pdf?v=1784192300",
        "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/LKG-M3-W3_e2b6d9a5-156c-4467-8fe8-f06a0fc1b396.pdf?v=1784192300",
        "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/LKG-M3-W4_61719918-96ef-4ee2-947b-6c189299dde9.pdf?v=1784192300",
      ],
      syllabus: [
        "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/LKG-M3-W1_e47dab25-1019-43e4-ac54-8ecee93a2f81.pdf?v=1784788356",
        "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/LKG-M3-W2_e16f002a-d994-409c-b617-08846d3fc18a.pdf?v=1784788355",
        "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/LKG-M3-W3_0a716a00-0a9a-4560-a409-03d329d05b81.pdf?v=1784788355",
        "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/LKG-M3-W4_9a8ac955-6bd7-43df-bcea-a207e694f031.pdf?v=1784788356",
      ],
    },
    4: {
      practices: [
        "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/LKG-M4-W1.pdf?v=1784192393",
        "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/LKG-M4-W2.pdf?v=1784192393",
        "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/LKG-M4-W3.pdf?v=1784192393",
        "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/LKG-M4-W4.pdf?v=1784192393",
      ],
      syllabus: [
        "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/LKG-M4-W1_8eefcd01-1443-4948-90cc-bf9235e28867.pdf?v=1784789008",
        "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/LKG-M4-W2_8cd4d4be-7436-4be3-ab86-89c3c7b52162.pdf?v=1784789009",
        "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/LKG-M4-W3_1033379e-75bc-4d4b-8eb7-907a8c148df3.pdf?v=1784789008",
        "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/LKG-M4-W4_997a7e01-e97c-4ea8-9a7f-e5a5ca29a7f0.pdf?v=1784789007",
      ],
    },
    5: {
      practices: [
        "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/LKG-M5-W1.pdf?v=1784192470",
        "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/LKG-M5-W2.pdf?v=1784192469",
        "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/LKG-M5-W3.pdf?v=1784192470",
        "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/LKG-M5-W4.pdf?v=1784192470",
      ],
      syllabus: [
        "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/LKG-M5-W1_1498f228-7ac8-4b3e-b036-57be214b3b68.pdf?v=1784789435",
        "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/LKG-M5-W2_b4b35372-2512-46e5-9e49-eec52bfee40f.pdf?v=1784789435",
        "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/LKG-M5-W3_2d4a8e4f-516f-4b32-a7b3-e667a8a01d60.pdf?v=1784789435",
        "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/LKG-M5-W4_ecd7a58b-f66d-4e5a-b597-415fd8797083.pdf?v=1784789436",
      ],
    },
    6: {
      practices: [
        "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/LKG-M6-W1.pdf?v=1784192546",
        "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/LKG-M6-W2.pdf?v=1784192546",
        "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/LKG-M6-W3.pdf?v=1784192546",
        "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/LKG-M6-W4.pdf?v=1784192546",
      ],
      syllabus: [
        "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/LKG-M6-W1_a4ab34d7-6493-43d9-a6a2-f2d90096dd9d.pdf?v=1784790321",
        "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/LKG-M6-W2_b2f9ab84-030b-4ce4-b096-f28953c73a72.pdf?v=1784790321",
        "LINK_HERE",
        "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/LKG-M6-W4_3c2079bb-ec77-4564-a742-40e8e8ee101b.pdf?v=1784790320",
      ],
    },
    7: {
      practices: [
        "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/LKG-M7-W1.pdf?v=1784192627",
        "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/LKG-M7-W2.pdf?v=1784192627",
        "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/LKG-M7-W3.pdf?v=1784192627",
        "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/LKG-M7-W4.pdf?v=1784192627",
      ],
      syllabus: [
        "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/LKG-M7-W1_d557fd8b-972b-40a0-996f-da0da76cb611.pdf?v=1784790464",
        "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/LKG-M7-W2_acd2a28d-c689-41d4-86cc-e797733ae7d4.pdf?v=1784790476",
        "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/LKG-M7-W3_491e940b-6a27-4cc5-8c91-5ffac2dc28bf.pdf?v=1784790476",
        "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/LKG-M7-W4_b65a1750-73ad-49eb-b8a6-b76c57b73804.pdf?v=1784790476",
      ],
    },
    8: {
      practices: [
        "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/LKG-M8-W1.pdf?v=1784192705",
        "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/LKG-M8-W2.pdf?v=1784192705",
        "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/LKG-M8-W3.pdf?v=1784192705",
        "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/LKG-M8-W4.pdf?v=1784192705",
      ],
      syllabus: [
        "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/LKG-M8-W1_8554b049-aae7-493e-9e1b-6c937c84a35c.pdf?v=1784790576",
        "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/LKG-M8-W2_8f5e2864-9c1f-4359-9ee1-21b94b31c643.pdf?v=1784790576",
        "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/LKG-M8-W3_43c05404-c66d-42f9-a68f-f2dc742eaef7.pdf?v=1784790577",
        "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/LKG-M8-W4_ca1dfb41-3843-4651-8baf-a7cd30bb65ec.pdf?v=1784790577",
      ],
    },
  },
  UKG: {
    1: {
      practices: [
        "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/UKG-M1-W1_bb7b2928-63a2-48b5-9c59-a04f947d4e9a.pdf?v=1784191320",
        "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/UKG-M1-W2_70fb2cad-c8eb-4bfb-82b7-30d54d1d88e3.pdf?v=1784191320",
        "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/UKG-M1-W3_45d4461c-0118-4201-aced-10eb1d851184.pdf?v=1784191320",
        "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/UKG-M1-W4_9b1331bf-e7e8-4e57-b5ea-3a9edda3f1e5.pdf?v=1784191320",
      ],
      syllabus: [
        "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/UKG-M1-W1_2ba1e935-c14a-4ba5-808c-cacb72a8537b.pdf?v=1782713323",
        "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/UKG-M1-W2_e847ed05-899c-4822-b57b-2c890f183672.pdf?v=1782713340",
        "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/UKG-M1-W3_efe8a616-79ed-4e7c-b4f2-fd925cb9cc39.pdf?v=1782713362",
        "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/UKG-M1-W4_8afe7f58-760e-4382-81aa-8f7321628d58.pdf?v=1782713362",
      ],
    },
    2: {
      practices: [
        "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/UKG-M2-W1_05c98b09-66ee-46a6-8ded-502b8b7feac9.pdf?v=1784191440",
        "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/UKG-M2-W2.pdf?v=1784191440",
        "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/UKG-M2-W3_ecef16d2-3667-418b-95ca-589ba9b2c8c2.pdf?v=1784191441",
        "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/UKG-M2-W4_5ffebb34-c41a-4354-9e88-5031c5dffd50.pdf?v=1784191440",
      ],
      syllabus: [
        "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/UKG-M2-W1.pdf?v=1782714738",
        "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/UKG_M2-W2.pdf?v=1782714718",
        "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/UKG-M2-W3.pdf?v=1782714735",
        "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/UKG-M2-W4.pdf?v=1782714736",
      ],
    },
    3: {
      practices: [
        "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/UKG-M3-W1_2423e317-fc36-4d3d-b62c-ea57b3836cf8.pdf?v=1784191527",
        "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/UKG-M3-W2_9f0b7570-f5db-48ce-85ed-bb911f1fdee4.pdf?v=1784191528",
        "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/UKG-M3-W3_84a1499e-fd86-4bd1-807f-3717ce394d75.pdf?v=1784191527",
        "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/UKG-M3-W4_b9dda3df-73b2-4a6f-8b58-9bf54f767bcb.pdf?v=1784191527",
      ],
      syllabus: [
        "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/UKG-M3-W1.pdf?v=1782714852",
        "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/UKG-M3-W2.pdf?v=1782714851",
        "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/UKG-M3-W3.pdf?v=1782714849",
        "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/UKG-M3-W4.pdf?v=1782714852",
      ],
    },
    4: {
      practices: [
        "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/UKG-M4-W1_c71e2199-d08a-4459-af80-6302320f692f.pdf?v=1784191618",
        "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/UKG-M4-W2_f3130fdc-d462-4364-964b-e44f6e5778c2.pdf?v=1784191619",
        "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/UKG-M4-W3_6c62453f-d4a4-4afe-b59e-ba051da6f5cb.pdf?v=1784191619",
        "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/UKG-M4-W4_07c63443-43ee-460e-82eb-5cce94be0e01.pdf?v=1784191619",
      ],
      syllabus: [
        "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/UKG-M4-W1.pdf?v=1782715038",
        "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/UKG-M4-W2.pdf?v=1782715038",
        "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/UKG-M4-W3.pdf?v=1782715028",
        "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/UKG-M4-W4.pdf?v=1782715028",
      ],
    },
    5: {
      practices: [
        "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/UKG-M5-W1_28afccc3-6352-45ff-b31b-992de95b5b4e.pdf?v=1784191733",
        "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/UKG-M5-W2_b6c9e081-d5ed-46c5-b6f8-80aea65f8e88.pdf?v=1784191733",
        "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/UKG-M5-W3_d2bd6fd7-632e-480e-9b4b-6b39301b5f8d.pdf?v=1784191733",
        "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/UKG-M5-W4_990a1a15-65c5-4e18-b4bf-345567a35e19.pdf?v=1784191733",
      ],
      syllabus: [
        "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/UKG-M5-W1.pdf?v=1782715149",
        "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/UKG-M5-W2.pdf?v=1782715151",
        "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/UKG-M5-W3.pdf?v=1782715146",
        "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/UKG-M5-W4.pdf?v=1782715149",
      ],
    },
    6: {
      practices: [
        "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/UKG-M6-W1_83a1b866-c3f0-4b23-b6a3-9fd657057cc6.pdf?v=1784191822",
        "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/UKG-M6-W2_4176dc42-810e-46f7-9301-8886949429c1.pdf?v=1784191822",
        "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/UKG-M6-W3_fe0dd902-a83a-44b4-9ae0-5a16c59d58a7.pdf?v=1784191822",
        "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/UKG-M6-W4_e5c9dedb-1c76-40c6-bcdb-d37102da51d0.pdf?v=1784191822",
      ],
      syllabus: [
        "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/UKG-M6-W1.pdf?v=1782715282",
        "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/UKG-M6-W2.pdf?v=1782715281",
        "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/UKG-M6-W3.pdf?v=1782715279",
        "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/UKG-M6-W4.pdf?v=1782715289",
      ],
    },
    7: {
      practices: [
        "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/UKG-M7-W1_287e8d9c-8ba0-4d0f-bd16-2e7e5a6ba129.pdf?v=1784191923",
        "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/UKG-M7-W2_50211074-c2f4-4774-9869-dd842c59d180.pdf?v=1784191923",
        "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/UKG-M7-W3_4cba1133-a431-423e-be4a-4a5c3ea3c021.pdf?v=1784191923",
        "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/UKG-M7-W4_bfde5e7d-6076-434f-bf7a-b20324001003.pdf?v=1784191923",
      ],
      syllabus: [
        "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/UKG-M7-W1.pdf?v=1782715382",
        "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/UKG-M7-W2.pdf?v=1782715372",
        "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/UKG-M7-W3.pdf?v=1782715379",
        "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/UKG-M7-W4.pdf?v=1782715374",
      ],
    },
    8: {
      practices: [
        "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/UKG-M8-W1_ec3a00db-b981-471c-afab-4c0da03648b1.pdf?v=1784192016",
        "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/UKG-M8-W2_9728ca0f-b122-4e71-9ac5-7dadeaa25f83.pdf?v=1784192016",
        "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/UKG-M8-W3_806dbb2a-9991-4780-9bc2-9ec44c30fd86.pdf?v=1784192016",
        "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/UKG-M8-W4_86dc9594-ea3e-45c0-b112-8ab93a195dd9.pdf?v=1784192017",
      ],
      syllabus: [
        "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/UKG-M8-W1.pdf?v=1782715480",
        "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/UKG-M8-W2.pdf?v=1782715478",
        "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/UKG-M8-W3.pdf?v=1782715476",
        "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/UKG-M8-W4.pdf?v=1782715472",
      ],
    },
  },
};

const LemcoreCurriculum = () => {
  const [selectedClass, setSelectedClass] = useState(null);
  const [openDropdowns, setOpenDropdowns] = useState({});

  const toggleDropdown = (id) => {
    setOpenDropdowns((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <div className="min-h-screen bg-slate-100 py-12 px-5">
      <div className="max-w-7xl mx-auto">
        {/* Heading */}
        <h1 className="text-4xl font-bold text-center text-gray-900 mb-12">
          LEMCore Curriculum
        </h1>

        {/* Classes */}
        {!selectedClass && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {classes.map((item) => (
              <div
                key={item.name}
                className="bg-white rounded-3xl overflow-hidden shadow-lg hover:-translate-y-2 duration-300"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  onClick={() => setSelectedClass(item.name)}
                  className="w-full h-56 object-cover cursor-pointer"
                />

                <div className="p-6">
                  <h2
                    onClick={() => setSelectedClass(item.name)}
                    className="text-3xl font-bold text-gray-900 mb-3 cursor-pointer"
                  >
                    {item.name}
                  </h2>

                  <p className="text-gray-500 leading-7 mb-5">{item.desc}</p>

                  <div className="flex flex-wrap gap-3">
                    <button
                      onClick={() => setSelectedClass(item.name)}
                      className="bg-indigo-600 text-white px-6 py-3 rounded-xl font-semibold"
                    >
                      Explore
                    </button>

                    <a
                      href={`${SESSION_PLAN_URL}?class=${encodeURIComponent(item.name)}`}
                      target="_blank"
                      rel="noreferrer"
                      className="bg-emerald-600 text-white px-6 py-3 rounded-xl font-semibold text-center hover:bg-emerald-700 duration-300"
                    >
                      Session Plan
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Months */}
        {selectedClass && (
          <>
            <button
              onClick={() => {
                setSelectedClass(null);
                setOpenDropdowns({});
              }}
              className="bg-gray-900 text-white px-6 py-3 rounded-xl mb-8"
            >
              ← Back To Classes
            </button>

            <h2 className="text-4xl font-bold text-gray-900 mb-10">
              {selectedClass} - LEMCore Curriculum
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((month) => (
                <div
                  key={month}
                  className="bg-white rounded-3xl overflow-hidden shadow-lg"
                >
                  <img
                    src="https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=1200&auto=format&fit=crop"
                    alt={`Month ${month}`}
                    className="w-full h-56 object-cover"
                  />

                  <div className="p-6">
                    <h3 className="text-3xl font-bold mb-3">Month {month}</h3>

                    <p className="text-gray-500 mb-6">
                      LEMCore monthly curriculum resources, worksheets and
                      activities.
                    </p>

                    <div className="flex flex-col lg:flex-row gap-4">
                      {/* Weekly Practices */}
                      <div className="flex-1">
                        <button
                          onClick={() => toggleDropdown(`practice-${month}`)}
                          className="w-full bg-indigo-600 text-white py-3 rounded-xl font-semibold"
                        >
                          Weekly Practices
                        </button>

                        {openDropdowns[`practice-${month}`] && (
                          <div className="flex flex-col gap-2 mt-3">
                            {pdfLinks[selectedClass][month].practices.map(
                              (link, index) => (
                                <a
                                  key={index}
                                  href={link}
                                  target="_blank"
                                  rel="noreferrer"
                                  className="bg-gray-100 p-3 rounded-xl text-center hover:bg-gray-900 hover:text-white duration-300"
                                >
                                  Week Practice {index + 1}
                                </a>
                              ),
                            )}
                          </div>
                        )}
                      </div>

                      {/* Weekly Syllabus */}
                      <div className="flex-1">
                        <button
                          onClick={() => toggleDropdown(`syllabus-${month}`)}
                          className="w-full bg-emerald-500 text-white py-3 rounded-xl font-semibold"
                        >
                          Weekly Syllabus
                        </button>

                        {openDropdowns[`syllabus-${month}`] && (
                          <div className="flex flex-col gap-2 mt-3">
                            {pdfLinks[selectedClass][month].syllabus.map(
                              (link, index) => (
                                <a
                                  key={index}
                                  href={link}
                                  target="_blank"
                                  rel="noreferrer"
                                  className="bg-gray-100 p-3 rounded-xl text-center hover:bg-gray-900 hover:text-white duration-300"
                                >
                                  Weekly Syllabus {index + 1}
                                </a>
                              ),
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default LemcoreCurriculum;
