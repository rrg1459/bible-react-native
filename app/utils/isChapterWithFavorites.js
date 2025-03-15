const isChapterWithFavorites = (favorites, book, chapter) => {
  if (!favorites.hasOwnProperty(book.id)) return false;
  const nestedObj = favorites[book.id];
  return nestedObj.hasOwnProperty(chapter) ? true : false;
};

export default isChapterWithFavorites;