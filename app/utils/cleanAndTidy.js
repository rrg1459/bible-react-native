const cleanAndTidy = ({verses, verse, remove}) => {

  // const data = [33,21,2,6,1,2,5,1,9,33];
  // const newData = new Set(data); // removes repeated
  // const result = [...newData].sort((a, b) => a - b);
  // console.log(result); //[1,2,5,6,9,21,33]

  if (!Array.isArray(verses)) {
    throw new Error('`verses` must be an array');
  }

  if (typeof verse !== 'number') {
    throw new Error('`verse` must be a number');
  }

  const newVerses = remove
    ? verses.filter(item => item !== verse)
    : [...verses, verse];
  return newVerses.sort((a, b) => a - b);
};

export default cleanAndTidy;
