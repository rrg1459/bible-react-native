const versesAbbs = ({ numVerses, language }) => {

  let abbreviations = '';
  const more = [' and more...', ' y más...'];

  const consecutiveGroups = (arr) => {

    const result = [];
    let currentGroup = [];

    for (let i = 0; i < arr.length; i++) {
      if (i === 0 || arr[i] === arr[i - 1] + 1) {
        currentGroup.push(arr[i]);
      } else {
        if (currentGroup.length === 1) {
          result.push(currentGroup[0]);
        } else {
          result.push([currentGroup[0], currentGroup[currentGroup.length - 1]]);
        }
        currentGroup = [arr[i]];
      }
    }
    if (currentGroup.length === 1) {
      result.push(currentGroup[0]);
    } else if (currentGroup.length > 1) {
      result.push([currentGroup[0], currentGroup[currentGroup.length - 1]]);
    }

    return result;
  };
  const groups = consecutiveGroups(numVerses);

  groups.map((item, idx) => {
    if (idx < 2) {
      if (typeof item === 'number') {
        abbreviations += item;
      } else {
        abbreviations += item[0] + '-' + item[1]
      }
      abbreviations += ','
    };
  });
  abbreviations = abbreviations.slice(0, -1)
  if (groups.length > 2) {
    abbreviations += more[language];
  };

  if (abbreviations) abbreviations = ':' + abbreviations;

  return abbreviations;
};

export default versesAbbs;