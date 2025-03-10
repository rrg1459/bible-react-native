const tabletChapterStyles = (chapters) => {
  const chapterConfig = {
     1:  { columns:  1, rows: 1, chapterFontSize: 45, adjustHeight: 18 },
     2:  { columns:  2, rows: 1, chapterFontSize: 40, adjustHeight: 18 },
     3:  { columns:  3, rows: 1, chapterFontSize: 40, adjustHeight: 18 },
     4:  { columns:  2, rows: 2, chapterFontSize: 40, adjustHeight: 13 },
     5:  { columns:  3, rows: 2, chapterFontSize: 40, adjustHeight: 13 },
     6:  { columns:  3, rows: 2, chapterFontSize: 40, adjustHeight: 13 },
     7:  { columns:  4, rows: 2, chapterFontSize: 40, adjustHeight: 13 },
     8:  { columns:  4, rows: 2, chapterFontSize: 40, adjustHeight: 13 },
     9:  { columns:  3, rows: 3, chapterFontSize: 35, adjustHeight: 11.5 },
    10:  { columns:  5, rows: 2, chapterFontSize: 40, adjustHeight: 13 },
    12:  { columns:  4, rows: 3, chapterFontSize: 35, adjustHeight: 11.5 },
    13:  { columns:  5, rows: 3, chapterFontSize: 35, adjustHeight: 11.5 },
    14:  { columns:  5, rows: 3, chapterFontSize: 35, adjustHeight: 11.5 },
    16:  { columns:  4, rows: 4, chapterFontSize: 30, adjustHeight: 10.5 },
    21:  { columns:  7, rows: 3, chapterFontSize: 30, adjustHeight: 11.5 },
    22:  { columns:  6, rows: 4, chapterFontSize: 30, adjustHeight: 10.5 },
    24:  { columns:  6, rows: 4, chapterFontSize: 30, adjustHeight: 10.5 },
    25:  { columns:  9, rows: 3, chapterFontSize: 28, adjustHeight: 11.5 },
    27:  { columns:  9, rows: 3, chapterFontSize: 28, adjustHeight: 11.5 },
    28:  { columns:  7, rows: 4, chapterFontSize: 30, adjustHeight: 10.5 },
    29:  { columns: 10, rows: 3, chapterFontSize: 28, adjustHeight: 11.5 },
    31:  { columns: 11, rows: 3, chapterFontSize: 24, adjustHeight: 11.5 },
    34:  { columns:  6, rows: 6, chapterFontSize: 25, adjustHeight: 9.6 },
    36:  { columns:  6, rows: 6, chapterFontSize: 25, adjustHeight: 9.6 },
    40:  { columns: 10, rows: 4, chapterFontSize: 25, adjustHeight: 10.5 },
    42:  { columns:  7, rows: 6, chapterFontSize: 25, adjustHeight: 9.6 },
    48:  { columns:  8, rows: 6, chapterFontSize: 25, adjustHeight: 9.6 },
    50:  { columns: 10, rows: 5, chapterFontSize: 23, adjustHeight: 10 },
    52:  { columns:  9, rows: 6, chapterFontSize: 25, adjustHeight: 9.6 },
    66:  { columns: 11, rows: 6, chapterFontSize: 22, adjustHeight: 9.6 },
    150: { columns: 10, rows: 5, chapterFontSize: 22, adjustHeight: 10 },
    xxx: { columns:  1, rows: 1, chapterFontSize: 40, adjustHeight: 18 },
  };

  return chapterConfig[chapters] || chapterConfig.xxx;
};

export default tabletChapterStyles;