/* 
// These function is directly tested. 
flatten()
step0_examineSomething()
colorize()
setFinalForm_1_of_2() & setFinalForm_2_of_2()

// This function is directly used to set up the test
setEverything()
// These functions are tested but indirectly. If this were Java 
// they would be 'private'
step1_recursive_getCategoricalOptionalityObjects()
step2_findTypescriptObjects()
step3_recursive_getNonCategoricalObjects()
*/

const {
  setEverything,
  flatten,
  colorize,
  setFinalForm_1_of_2, 
  setFinalForm_2_of_2, 
  step0_examineSomething,
  categoricalHoH,
  otherObjects_thatNeedAName,
} = require("./index.js")

const show = (() => {
  for (let k in categoricalHoH) {
    const H = categoricalHoH[k]
    console.log(k)
    console.log(H)
  }
  console.log(" ==== ")

  for (let k in otherObjects_thatNeedAName) {
    const H = otherObjects_thatNeedAName[k]
    console.log(k)
    console.log(H)
  }
})

const verdict = ((a, b, msg) => {
  let isOk = "FAIL "
  if (JSON.stringify(a) === JSON.stringify(b)) {
    isOk = "PASS "
  }
  console.log(isOk + " " + msg)
})

function simple_happypath(note) {
  step0_examineSomething("app-response")

  const cKeys = Object.keys(categoricalHoH)
  const lookup = Object.keys(categoricalHoH["app-response"]["lookup"])
  const oKeys = Object.keys(otherObjects_thatNeedAName)
  const actual = {
    "categorical_keys": cKeys,
    "lookup": lookup.sort(),
    "other_keys": oKeys.sort()
  }
  const expected = {
    categorical_keys: ['app-response'],
    lookup: ['SCREEN'],
    other_keys: ['SCREEN']
  }
  verdict(actual, expected, note + " simple_happypath")
}

function happypath_deeperLook(note) {

  const events = ["app-response", "product-interaction", "page-view", "This does not exist"]
  events.forEach((thing) => {
    step0_examineSomething(thing)
  })
  const actual = {}
  for (let k in categoricalHoH) {
    actual[k] = {
      core: Object.keys(categoricalHoH[k]["core"]).length,
      lookup: Object.keys(categoricalHoH[k]["lookup"]).length,
    }
  }
  const expected = {
    'app-response': { core: 12, lookup: 1 },
    'product-interaction': { core: 17, lookup: 2 },
    'page-view': { core: 12, lookup: 1 },
    // See? 'This does not exist' is not here
  }
  verdict(actual, expected, note + " happypath_deeperLook")
}


function complex_happypath(note) {
  step0_examineSomething("error")
  step0_examineSomething("product-interaction")
  step0_examineSomething("purchase")
  step0_examineSomething("page-view")
  step0_examineSomething("page-products-displayed")
  step0_examineSomething("page-products-displayed")
  step0_examineSomething("general-component-event")
  step0_examineSomething("general-component-interaction")
  step0_examineSomething("app-response")

  const cKeys = Object.keys(categoricalHoH)
  const oKeys = Object.keys(otherObjects_thatNeedAName)
  const actual = {
    "categorical_keys": cKeys.sort(),
    "other_keys": oKeys.sort()
  }
  const expected = {
    categorical_keys: [
      'error',
      'product-interaction',
      'purchase',
      'page-view',
      'page-products-displayed',
      'general-component-event',
      'general-component-interaction',
      'app-response'
    ].sort(),
    other_keys: ['SCREEN', 'EVENT'].sort() // Yes, this is correct and yes this tinyness surprises me.
  }
  verdict(actual, expected, note + " complex_happypath")
}

function flatten_test(note) {
  const flat = flatten(data)
  const n = Object.keys(flat).length
  const isOk = n > 0
  verdict(isOk, true, note + " flatten_test n=" + n)
}

// function colorize_test(note) {
//   const obj = {
//     "one": " false",
//     "two": " true",
//     "three": " ",
//   }
//   const actual = colorize(obj)
//   const expected = `<div class='ignore'>{</div><div class='optional'>  "one": " false",</div><div class='mandatory'>  "two": " true",</div><div class='ignore'>  "three": " "</div><div class='ignore'>}</div>`

//   verdict(actual, expected, note + ' colorize_test')
// }

function colorize_test(note) {

  const someWellFormedObject = {
    "default.payload.screen.header": {
      "mandatory": true,
      "type": "string"
    },
    "default.payload.event.attributes.errorMessage": {
      "mandatory": false,
      "type": "string"
    },
    "default.payload.event.attributes.errorDetails": {
      "mandatory": false,
      "type": "string"
    },
    "default.payload.event.attributes.errorType": {
      "mandatory": "ignore",
      "type": "string"
    },
    "default.version": {
      "mandatory": false,
      "type": "string"
    },
    "default.timestamp": {
      "mandatory": false,
      "type": "string"
    }
  }


  // const properlyFormattedJson = getFinalForm_fromIntermediate(someWellFormedObject) 
  // // const result = colorize(someWellFormedObject)
  // // console.log( JSON.stringify( pretty , null, 2 ) )
  // console.log( JSON.stringify( properlyFormattedJson["default"]["payload"], null, 2 )) 



}

function setFinalForm_test(note) { 
  const intermediate = categoricalHoH["error"]["core"] 
  // console.log( intermediate)
  const paths = Object.keys(intermediate)
  const shell = setFinalForm_1_of_2(paths)

  const result = setFinalForm_2_of_2(shell, intermediate)

  console.log( JSON.stringify( result, null, 2 ))
  verdict(true, false ,note + " setFinalForm_1_of_2_test")
}

/*
Not a test : Needed to set run the test
This is the equivilent of
let everything =  self.validationModule
*/
const data = require("./everything.json")
setEverything(data)
/* */
simple_happypath("1 of 6")
happypath_deeperLook("2 of 6")
complex_happypath("3 of 6")
flatten_test("4 of 6")
setFinalForm_test("5 of 6")
//colorize_test("6 of 6")
