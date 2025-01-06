const favoriteChaptersInTheBook = ({ favorites, book_id }) => {
  const chapters = favorites[book_id] === undefined
    ? []
    : Object.keys(favorites[book_id]);
  return chapters.map(Number);
};

export default favoriteChaptersInTheBook;


