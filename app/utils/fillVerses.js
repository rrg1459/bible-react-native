import { verses } from '../bible/verses.js';

const fillVerses = ({book_id, chapter}) => {
  return verses.filter((v) => v.book_id === book_id && v.chapter === chapter);
};

export default fillVerses;
