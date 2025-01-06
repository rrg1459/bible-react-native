import empty from "./emptyObject";

const handleVersesFavorites = (props) => {

  const { favorites, book_id, chapter, numVerses, removeAll } = props;

  if (empty(favorites) === true && removeAll === true) {
    return {};
  };

  let newFavorites = {};
  const saveChapters = favorites[book_id];
  const currentFavorites = JSON.parse(JSON.stringify(favorites));

  if (removeAll) {
    if (favorites[book_id] !== undefined) {
      delete currentFavorites[book_id][chapter];
      if (empty(currentFavorites[book_id]) === true) {
        delete currentFavorites[book_id]
      }
    }
  } else {
    newFavorites = {
      [book_id]: {
        [chapter]: numVerses, ...saveChapters
      }
    };
  };

  return { ...currentFavorites, ...newFavorites };
};

export default handleVersesFavorites;
