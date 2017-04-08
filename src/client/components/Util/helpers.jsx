const formatResponse = (string) => {
  let map = {};
  let o = string.replace(/(["\\{}])/g, "").split(',');
  o.forEach((v) => {
    var tuple = v.split(':');
    map[tuple[0]] = tuple[1]
  });
  
  return map;
}

export default formatResponse;