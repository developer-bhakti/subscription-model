// Where the four rows of every Level 5 and Level 6 worksheet page sit, so a game can show the picture the
// school printed for a word (see SheetPicture in components/PhonicsSkills/PhonicsShared.jsx).
//
// Each page has four rows, top to bottom. A row is a purple frame with the picture and its name in a cell at
// the left. The numbers below are measured from the pages: for each letter, the pixel row just INSIDE the
// top and bottom of each row's frame, `[top1, bottom1, top2, bottom2, top3, bottom3, top4, bottom4]`, on the
// pages' 1089 x 1445 pixels. The rows are not in exactly the same place on every page, which is why each
// page has its own numbers.
//
// If a page is replaced by one whose rows sit somewhere else, change that letter's numbers. A letter with
// no numbers here simply shows its words with an emoji (or a plain frame) instead of the printed picture.

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
};

// The picture cell inside a row: its left and right edge in pixels of the page, and how many pixels are trimmed
// from the top and bottom of the row. The row's frame has rounded corners that reach into the cell, so the cell
// is cut a little inside its edges to leave no piece of the frame in the picture.
export const SHEET_CELL = {
  5: { x: [28, 316], inset: 4 },
  6: { x: [32, 366], inset: 4 },
};
