const everything = require('./everything.json');

function flattenObject(obj) {
  const accumulator = {};
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      if ((typeof obj[key]) == 'object' && obj[key] != null) {
        const flatObject = flattenObject(obj[key]);
        for (let x in flatObject) {
          if (flatObject.hasOwnProperty(x)) {
            accumulator[key + '.' + x] = flatObject[x];
          }
        }
      } else {
        accumulator[key] = obj[key];
      }
    }
  }
  return accumulator;
}
/////////// END FLATTENING ///////////

// const thing_to_look_for = "categoricalOptionalityObjects.purchase"
const allThings = flattenObject(everything)
function step1_findTarget(thing_to_look_for) { 
  const target = {} 
  let i = 0
  for (let k in allThings) {
    i++
    if ( k.startsWith(thing_to_look_for)) {
      const v = allThings[k]
      // console.log(i + "   " + k + "  " + v)
      target[k] = v 
    } 
  }
  return target
}

const show=(m)=> { 
  console.log()
  let i = 0; 
  for ( let k in m ) {
    i++ 
    const v = m[k]
    console.log( i + "    " + k + "    " + v )
  }
}
let stuff = {}
stuff = step1_findTarget('categoricalOptionalityObjects.purchase')
// console.log( stuff )
show(stuff)
stuff = step1_findTarget('categoricalOptionalityObjects.app-response')
//console.log( stuff )
show(stuff)



