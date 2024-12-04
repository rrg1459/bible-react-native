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
      const max = rest === 0 ? rest : (cols - rest);
      filledBook = [
        ...books,
        ...[
          ...new Array(max).keys()].map(
            (_, idx) => (
              {id: lengthValue + idx + 1, ...obj }
            )
          )
      ];
    } else {
      const chapters = Number(props.chapters);
      const initialArray = [...Array(chapters)].map((_, idx) => ({id: idx + 1, show: true}));
      const rest = chapters % 5;
      const max = rest === 0 ? rest : (5 - rest);
      filledBook = [
        ...initialArray,
        ...[
          ...new Array(max).keys()].map(
            (_, idx) => (
              { id: idx + chapters + 1, show: false}
            )
          )
      ];
    };
  }
  return filledBook;
};

export default fillBox;
