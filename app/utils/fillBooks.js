import { books } from '../bible/books.js';

const fillBooks = ({ screen, columnsValue}) => {

  if (screen !== 'books') return books;

  const totalBooks = books.length;
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

  return [...books, ...dummyBooks];
};

export default fillBooks;