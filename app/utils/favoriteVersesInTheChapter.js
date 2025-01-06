const favoriteVersesInTheChapter = ({ favorites, book_id, chapter }) => {
  return (
    favorites[book_id]?.[chapter] === undefined
      ? []
      : favorites[book_id][chapter]
  )
};

export default favoriteVersesInTheChapter;
