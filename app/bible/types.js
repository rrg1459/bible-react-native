const types = (id) => {
  const types = {
    1: "pentateuch",
    2: "historicals" ,
    3: "poetics" ,
    4: "prophetics" ,
    5: "gospels" ,
    6: "facts" ,
    7: "letters" ,
    8: "revelations"}
  return types[id];
};

export default types;