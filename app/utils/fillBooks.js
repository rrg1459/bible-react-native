import { books } from '../bible/books.js';

const fillBooks = ({ screen, columnsValue}) => {

  if (screen !== 'index') return books;

  const totalBooks = books.length;
  const desiredColumns = columnsValue;
  const remainingSlots = desiredColumns - (totalBooks % desiredColumns);

  // Create dummy book objects to fill remaining slots
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