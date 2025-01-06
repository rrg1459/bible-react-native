import empty from "./emptyObject";

const handleOneFavorite = (props) => {

  const { favorites, verse, remove } = props;

  if (empty(favorites) === true && remove === true) {
    return {};
  };

  const book_id = verse.book_id;
  const chapter = verse.chapter;

  const currentFavorites = JSON.parse(JSON.stringify(favorites));

  // Initialize book_id if it doesn't exist
  if (!currentFavorites[book_id]) {
    currentFavorites[book_id] = {};
  }

  // Initialize chapter if it doesn't exist
  if (!currentFavorites[book_id][chapter]) {
    currentFavorites[book_id][chapter] = [];
  }

  // Add or remove the verse depending on the 'remove' flag
  if (remove) {
    // Remove the verse if it exists
    currentFavorites[book_id][chapter] = currentFavorites[book_id][chapter].filter(v => v !== verse.verse);
  } else {
    // Add the verse to the array
    if (!currentFavorites[book_id][chapter].includes(verse.verse)) {
      currentFavorites[book_id][chapter].push(verse.verse);
      currentFavorites[book_id][chapter].sort((a, b) => a - b)
    }
  }

  return currentFavorites;
};

export default handleOneFavorite;
