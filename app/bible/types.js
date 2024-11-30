const types = (id) => {
  const types = {
    1: "pentateuch",
    2: "historical" ,
    3: "poetic" ,
    4: "prophetic" ,
    5: "gospels" ,
    6: "facts" ,
    7: "letters" ,
    8: "revelations"}
  return types[id];
};

export default types;