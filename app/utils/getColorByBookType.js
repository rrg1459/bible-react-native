import types from "../bible/types"
import  BOOK_TYPE_COLORS from "./constants";

const getColorByBookType = (id) => BOOK_TYPE_COLORS(types(id)[0]);

export default getColorByBookType;
