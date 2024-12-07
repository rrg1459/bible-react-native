// export const BOOK_TYPE_COLORS = {
//   pentateuch: "#A52A2AB2",
//   historical: "#E08B63",
//   poetic: "#FFD700",
//   prophetic: "#3BFF3B",
//   gospels: "#FFFF49",
//   facts: "#2E90FA",
//   letters: "#06EEEE",
//   revelations: "#FF593B",
// };

const BOOK_TYPE_COLORS = (type) => {
  const type_colors = {
    pentateuch: "#A52A2AB2",
    historical: "#E08B63",
    poetic: "#FFD700",
    prophetic: "#3BFF3B",
    gospels: "#FFFF49",
    facts: "#2E90FA",
    letters: "#06EEEE",
    revelations: "#FF4500",
  };
  return type_colors[type];
};

export default BOOK_TYPE_COLORS;
