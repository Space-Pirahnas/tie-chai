const formatResponse = string => {
  let map = {};
  let o = string.split(',')
  o.forEach((v) => {
    var tuple = v.replace(/[{}"]/g, "").split(':');
    map[tuple[0]] = tuple.slice(1).join('');
  });
  
  return map;
}

export default formatResponse;