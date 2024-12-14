const fillChapters = ({ screen, chapters, columnsValue }) => {

  if (screen !== 'chapters') return [];
  const filledChapters = [...Array(chapters)].map((_, idx) => ({ id: idx + 1, show: true }));
  const rest = chapters % columnsValue;
  const remainingSlots = rest === 0 ? rest : (columnsValue - rest);
  const dummyChapters = [...new Array(remainingSlots).keys()].map(
    (_, idx) => (
      { id: idx + chapters + 1, show: false }
    )
  )

  return [...filledChapters, ...dummyChapters];

};

export default fillChapters;
