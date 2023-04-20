/* 
// This function is directly tested. 
step0_examineSomething()
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
  step0_examineSomething,
  categoricalHoH,
  otherObjects_thatNeedAName
} = require("./x.js")

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

function simple_happypath() {
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
  verdict(actual, expected, "simple_happypath")
}

function happypath_deeperLook() { 

  const events = ["app-response", "product-interaction", "page-view", "This does not exist"]
  events.forEach((thing)=> { 
    step0_examineSomething(thing)
  })
  const actual = {} 
  for ( let k in categoricalHoH ) {
    actual[k] = {
      core:Object.keys( categoricalHoH[k]["core"] ).length,
      lookup:Object.keys(categoricalHoH[k]["lookup"] ).length,
    }
  }
  const expected = {
    'app-response': { core: 12, lookup: 1 },
    'product-interaction': { core: 17, lookup: 2 },
    'page-view': { core: 12, lookup: 1 },
    // See? 'This does not exist' is not here
  }
  verdict(actual, expected, "happypath_deeperLook")
}


function complex_happypath() {
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
  verdict(actual, expected, "complex_happypath")
}

// Not a test : Needed to set run the test
// This is the equivilent of
// let everything =  self.validationModule
const data = require("./everything.json")
setEverything(data) 
//
//
simple_happypath()
happypath_deeperLook()
complex_happypath()
