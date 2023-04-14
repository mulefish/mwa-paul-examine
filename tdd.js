const everything = require('./everything.json');



function flattenObject(ob) {
  let toReturn = {};
  for (let key in ob) {
    if (!ob.hasOwnProperty(key)) { continue; } 
    if ((typeof ob[key]) == 'object' && ob[key] != null) {
      const flatObject = flattenObject(ob[key]);
      for (let x in flatObject) {
        if (!flatObject.hasOwnProperty(x)) { continue; } 
        toReturn[key + '.' + x] = flatObject[x];
      }
    } else {
      toReturn[key] = ob[key];
    }
  }
  return toReturn;
}



const path_value = flattenObject(everything)
let i = 0
for (let k in path_value) {
  i++
  const v = path_value[k]
  console.log(i + "   " + k + "  " + v)
}