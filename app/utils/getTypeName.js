import types from "../bible/types"

const getTypeName = ({ language, type_id }) => {

  return type_id === 11 ? '' : types(type_id)[language];

};

export default getTypeName;
