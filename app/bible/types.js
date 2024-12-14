const types = (id) => {
  const types = {
    1: ["pentateuch", "pentateuco"],
    2: ["historicals", "históricos"],
    3: ["poetics", "poéticos"],
    4: ["prophetics", "proféticos"],
    5: ["gospels", "evangelios"],
    6: ["facts", "hechos"],
    7: ["letters", "cartas"],
    8: ["revelations", "revelaciones"]}
  return types[id];
};

export default types;