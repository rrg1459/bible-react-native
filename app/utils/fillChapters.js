const fillChapters = ({ screen, chapters }) => {

  if (screen !== 'chapters') return [];

  const numChapters = Number(chapters);
  const filledChapters = [...Array(numChapters)].map((_, idx) => ({ id: idx + 1, show: true }));
  const rest = numChapters % 5;
  const remainingSlots = rest === 0 ? rest : (5 - rest);
  const dummyChapters = [...new Array(remainingSlots).keys()].map(
    (_, idx) => (
      { id: idx + numChapters + 1, show: false }
    )
  )

  return [...filledChapters, ...dummyChapters];

};

export default fillChapters;
