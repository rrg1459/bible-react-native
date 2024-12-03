import { books } from '../bible/books.js';

const fillBox = (props) => {

  let filledBook = [];
  if (props) {
    if (props.screen === 'index') {
      const obj = {
        testament_id: null,
        type_id: null,
        label: [],
        abbreviation: [],
        chapters: null
      }
      const lengthValue = books.length;
      const cols = props.columnsValue;
      const rest = lengthValue % cols;
      const max = rest === 0 ? rest : (cols - (lengthValue % cols));
      filledBook = [
        ...books,
        ...[
          ...new Array(max).keys()].map(
            (_, idx) => (
              {
                id: lengthValue + idx + 1,
                ...obj
              }
            )
          )
      ];
    };
    return filledBook;
  } else {
    return filledBook;
  }
};

export default fillBox;
