const BOOK_TYPE_COLORS = (type) => {
  const type_colors = {
    pentateuch: "#A52A2AB2",
    historicals: "#E08B63",
    poetics: "#FFD700",
    prophetics: "#3BFF3B",
    gospels: "#FFFF49",
    facts: "#2E90FA",
    letters: "#06EEEE",
    revelations: "#FF4500",
  };
  return type_colors[type];
};

export default BOOK_TYPE_COLORS;
