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
const flattened = flattenObject(everything)
const eventLookup = {}
const seen = {}
const seenBy = {}
function step1_findTarget(thing_to_look_for, index) {
  let FINDME = "categoricalOptionalityObjects." + thing_to_look_for
  Object.keys(flattened).forEach((key, i) => {
    // const v = flattened[key]
    if (key.startsWith(FINDME) && key.includes("payload")) {
      eventLookup[thing_to_look_for] = index
      const v = key.replace(thing_to_look_for, "______")
      // events particulars 
      if (seen.hasOwnProperty(v)) {
        seen[v]++
      } else {
        seen[v] = 1
      }
      
      // events seen by step_A
      const eventId = eventLookup[thing_to_look_for]
      if (! seenBy.hasOwnProperty(v)) { 
        seenBy[v] = []
      }
      // events seen by step_B
      if ( ! seenBy[v].includes(3)) {
        seenBy[v].push(eventId)
      }

      




    }
  })
}
const findThese = [
  "APP-RESPONSE",
  "ERROR",
  "GENERAL-COMPONENT-INTERACTION",
  "GENERAL-COMPONENT-EVENT",
  "PAGE-PRODUCTS-DISPLAYED",
  "PAGE-VIEW",
  "PRODUCT-INTERACTION",
  "PURCHASE"
]

findThese.forEach((thing, i) => {
  step1_findTarget(thing.toLowerCase(), i)
})


for (let k in seen) {
  const v = seen[k]
  console.log(v + "    " + k + "   ")
}
console.log(seenBy)
