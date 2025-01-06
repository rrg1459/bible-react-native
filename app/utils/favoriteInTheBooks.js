const favoriteInTheBooks = ({ favorites }) => {
  return (Object.keys(favorites)).map(Number);
};

export default favoriteInTheBooks;
