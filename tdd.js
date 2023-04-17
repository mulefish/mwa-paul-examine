const everything = require('./everything.json');

function step1_flatten() {
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
  return flattenObject(everything)
}



/////////// END FLATTENING ///////////
const flat = step1_flatten()

const findThese = [
  "app-response",
  "error",
  "general-component-interaction",
  "general-component-event",
  "page-products-displayed",
  "page-view",
  "product-interaction",
  "purchase"
]

///////////// 
findThese.forEach((item, j)=> { 
  const coo = "categoricalOptionalityObjects." + item
    console.log(coo )
    let i = 0 
    for ( let k in flat ) {
      if ( k.includes(coo)) {

        if ( "payload.screen")


        console.log( j + "    " +  ++i  + "    " + k )




      }
    }
  });



console.log(" ... ")
console.log( JSON.stringify( Object.keys(everything["PAYLOAD"]["screen"]), null, 2 ) ) 

//console.log( JSON.stringify( Object.keys(everything['SCREEN']), null, 2 ) ) 
