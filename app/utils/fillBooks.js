import { books } from '../bible/books.js';

const fillBooks = ({ screen, columnsValue, type_id }) => {

  if (screen !== 'books') return books;

  let currentBooks = [];
  switch (true) {
    case (type_id < 9):
      currentBooks = books.filter((b) => b.type_id === type_id);
      break;
    case (type_id < 11):
      const testament_id = type_id === 9 ? 1 : 2;
      currentBooks = books.filter((b) => b.testament_id === testament_id);
      break;
    default:
      currentBooks = [...books];
      break;
  };

  const totalBooks = currentBooks.length;
  const rest = totalBooks % columnsValue;
  const remainingSlots = rest === 0 ? rest : (columnsValue - rest);
  const dummyBooks = [...new Array(remainingSlots)].map((_, idx) => ({
    id: totalBooks + idx + 1,
    testament_id: null,
    type_id: null,
    name: [],
    abbreviation: [],
    chapters: null
  }));

  return [...currentBooks, ...dummyBooks];
};

export default fillBooks;