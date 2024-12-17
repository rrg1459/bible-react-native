const getTypeNames = ({ types }) => {

  const transformedTypes = [];
  for (const key in types()) {
    const value = types()[key];
    transformedTypes.push({ key: parseInt(key), value });
  };
  const sortedTypes = [
      transformedTypes[10],
      transformedTypes[9],
      transformedTypes[8],
      transformedTypes[4],
      transformedTypes[5],
      transformedTypes[6],
      transformedTypes[7],
      transformedTypes[0],
      transformedTypes[1],
      transformedTypes[2],
      transformedTypes[3]
  ];
  return sortedTypes;
}

export default getTypeNames
