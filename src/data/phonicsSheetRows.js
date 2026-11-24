// Where the pictures are on the Level 5, 6, 7 and 8 worksheet pages, so a game can show the picture the school
// printed for a word (see SheetPicture and CvcPicture in components/PhonicsSkills/PhonicsShared.jsx).
//
// LEVELS 5, 6 AND 7. Each page has four rows, top to bottom. A row is a frame with the picture in a cell inside it.
// The numbers below are measured from the pages: for each page, the pixel row just INSIDE the top and bottom of
// each row's frame, `[top1, bottom1, top2, bottom2, top3, bottom3, top4, bottom4]`. The rows are not in exactly the
// same place on every page, which is why each page has its own numbers. Levels 5 and 6 have a page for each
// letter (A to Z) on 1089 x 1445 pixels; Level 7 has a page for each vowel and number of sounds ("A2" is vowel A,
// two sounds; "E4" is vowel E, four sounds) on 1052 x 1494 pixels.
//
// If a page is replaced by one whose rows sit somewhere else, change that page's numbers. A page with no numbers
// here simply shows its words with an emoji (or a plain frame) instead of the printed picture.

export const SHEET_ROWS = {
  5: {
    A: [395, 645, 666, 900, 920, 1152, 1172, 1422],
    B: [395, 646, 666, 900, 920, 1152, 1173, 1422],
    C: [394, 645, 666, 899, 920, 1152, 1172, 1422],
    D: [394, 645, 666, 899, 919, 1151, 1172, 1422],
    E: [393, 645, 666, 899, 920, 1151, 1172, 1422],
    F: [394, 645, 666, 899, 919, 1151, 1172, 1422],
    G: [393, 645, 666, 899, 919, 1151, 1172, 1422],
    H: [394, 645, 666, 899, 919, 1151, 1172, 1422],
    I: [393, 645, 666, 899, 919, 1151, 1172, 1422],
    J: [393, 645, 665, 899, 919, 1151, 1172, 1422],
    K: [393, 645, 665, 899, 919, 1151, 1172, 1422],
    L: [393, 645, 666, 899, 919, 1151, 1172, 1422],
    M: [393, 645, 665, 899, 919, 1151, 1172, 1422],
    N: [393, 644, 665, 898, 919, 1151, 1172, 1422],
    O: [393, 644, 665, 898, 919, 1151, 1171, 1422],
    P: [393, 644, 665, 898, 918, 1151, 1172, 1422],
    Q: [393, 644, 665, 898, 918, 1151, 1171, 1422],
    R: [393, 644, 665, 898, 918, 1151, 1171, 1422],
    S: [393, 644, 665, 898, 918, 1151, 1171, 1422],
    T: [393, 644, 665, 898, 918, 1150, 1171, 1422],
    U: [393, 644, 665, 898, 918, 1150, 1171, 1422],
    V: [392, 643, 664, 898, 918, 1150, 1171, 1423],
    W: [392, 644, 665, 898, 918, 1150, 1171, 1423],
    X: [392, 643, 664, 897, 917, 1150, 1171, 1423],
    Y: [392, 643, 664, 897, 918, 1150, 1171, 1423],
    Z: [392, 643, 664, 897, 918, 1150, 1171, 1423],
  },
  6: {
    A: [380, 624, 643, 884, 902, 1135, 1155, 1413],
    B: [380, 624, 643, 883, 902, 1135, 1155, 1414],
    C: [380, 625, 643, 883, 902, 1135, 1155, 1414],
    D: [380, 625, 643, 883, 901, 1133, 1154, 1415],
    E: [381, 630, 650, 894, 912, 1145, 1164, 1417],
    F: [380, 628, 648, 885, 902, 1135, 1154, 1414],
    G: [380, 630, 649, 887, 903, 1136, 1155, 1415],
    H: [381, 626, 644, 886, 903, 1136, 1156, 1418],
    I: [380, 627, 646, 886, 903, 1136, 1155, 1417],
    J: [382, 625, 643, 883, 900, 1134, 1154, 1418],
    K: [382, 631, 649, 895, 913, 1143, 1163, 1417],
    L: [382, 630, 650, 894, 912, 1147, 1165, 1419],
    M: [382, 630, 650, 894, 912, 1147, 1164, 1419],
    N: [382, 630, 649, 894, 911, 1147, 1164, 1420],
    O: [368, 623, 641, 892, 908, 1149, 1168, 1422],
    P: [368, 623, 642, 893, 908, 1149, 1168, 1422],
    Q: [368, 623, 641, 893, 907, 1149, 1168, 1422],
    R: [368, 623, 641, 893, 907, 1149, 1167, 1422],
    S: [367, 623, 641, 893, 907, 1149, 1167, 1422],
    T: [367, 623, 640, 892, 906, 1148, 1166, 1421],
    U: [366, 623, 641, 892, 905, 1149, 1167, 1423],
    V: [366, 623, 641, 893, 905, 1149, 1167, 1423],
    W: [366, 623, 641, 892, 904, 1149, 1166, 1423],
    X: [366, 623, 641, 892, 909, 1149, 1168, 1425],
    Y: [362, 623, 640, 893, 908, 1149, 1168, 1424],
    Z: [361, 624, 641, 894, 907, 1150, 1168, 1425],
  },
  7: {
    A2: [435, 674, 692, 920, 937, 1160, 1179, 1409],
    A3: [450, 673, 694, 909, 927, 1141, 1160, 1393],
    A4: [448, 669, 688, 899, 922, 1132, 1156, 1375],
    E2: [418, 661, 681, 917, 935, 1165, 1185, 1427],
    E3: [415, 661, 683, 911, 933, 1160, 1184, 1417],
    E4: [423, 665, 686, 918, 937, 1172, 1194, 1434],
    I2: [414, 658, 681, 917, 936, 1166, 1188, 1428],
    I3: [421, 664, 683, 914, 933, 1164, 1185, 1422],
    I4: [422, 664, 684, 917, 934, 1167, 1187, 1425],
    O2: [416, 662, 682, 916, 935, 1163, 1182, 1420],
    O3: [416, 661, 682, 911, 932, 1161, 1183, 1417],
    O4: [414, 659, 682, 911, 934, 1161, 1183, 1418],
    U2: [416, 662, 682, 912, 932, 1162, 1182, 1417],
    U3: [417, 664, 683, 913, 932, 1162, 1182, 1415],
    U4: [417, 662, 682, 913, 933, 1162, 1182, 1416],
  },
};

// The picture cell inside a row: its left and right edge in pixels of the page, and how many pixels are trimmed
// from the top and bottom of the row. The row's frame has rounded corners that reach into the cell, so the cell
// is cut a little inside its edges to leave no piece of the frame in the picture. On Level 7 the cell is not in
// the same place on every page (the sound tiles are wider on the four-sound pages), so each page has its own.
export const SHEET_CELL = {
  5: { x: [28, 316], inset: 4 },
  6: { x: [32, 366], inset: 4 },
  7: {
    inset: 6,
    x: {
      A2: [748, 1015],
      A3: [782, 1010],
      A4: [807, 1010],
      E2: [733, 1013],
      E3: [765, 1012],
      E4: [785, 1015],
      I2: [735, 1010],
      I3: [766, 1012],
      I4: [789, 1011],
      O2: [724, 1008],
      O3: [763, 1010],
      O4: [789, 1010],
      U2: [721, 1010],
      U3: [759, 1009],
      U4: [789, 1009],
    },
  },
};

/* ----------------------------------------- Level 8 pictures ----------------------------------------- */
// Level 8's pages are all different (a pattern page, matching pages, spelling pages...), so each picture has its own
// box instead of a row. `page` is the number in the file's name (3 is "3_CVC Words Worksheet.jpg") and `box` is
// [left, top, right, bottom] in pixels of a page that is 1052 wide and 1494 tall. Some of the files are bigger
// (2079 x 2953) but they have the same shape, so the same box fits. Each box holds just the picture, without the
// word printed with it. A word is on several pages, and the page chosen for it is one where its picture is clear.
export const L8_PAGE_SIZE = [1052, 1494];

export const L8_PICTURES = {
  cat: { page: 7, box: [131, 358, 370, 589] },
  dog: { page: 7, box: [646, 358, 888, 590] },
  bed: { page: 7, box: [119, 744, 412, 940] },
  sun: { page: 7, box: [664, 744, 900, 941] },
  cap: { page: 7, box: [124, 1098, 408, 1290] },
  mug: { page: 7, box: [672, 1108, 918, 1290] },
  pig: { page: 8, box: [107, 358, 421, 575] },
  hen: { page: 8, box: [653, 358, 891, 592] },
  fan: { page: 8, box: [165, 742, 376, 944] },
  mop: { page: 8, box: [653, 738, 887, 948] },
  bug: { page: 8, box: [150, 1107, 410, 1294] },
  log: { page: 8, box: [621, 1100, 936, 1296] },
  bat: { page: 1, box: [50, 740, 238, 940] },
  mat: { page: 1, box: [34, 1023, 261, 1131] },
  hat: { page: 1, box: [34, 1247, 261, 1393] },
  pot: { page: 4, box: [790, 1172, 1010, 1333] },
  van: { page: 5, box: [75, 1287, 343, 1430] },
  pin: { page: 11, box: [210, 735, 331, 852] },
  map: { page: 11, box: [665, 350, 905, 478] },
};
