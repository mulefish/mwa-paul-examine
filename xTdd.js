const {
  setEverything,
  step0_examineSomething,
  categoricalHoH,
  otherObjects_thatNeedAName
} = require("./x.js")

function verdict(a, b, msg) {
  let isOk = "FAIL "
  if (JSON.stringify(a) === JSON.stringify(b)) {
    isOk = "PASS "
  }
  console.log(isOk + " " + msg)
}

function simple_happypath() {
  step0_examineSomething("app-response")
  // for (let k in categoricalHoH) {
  //   const H = categoricalHoH[k]
  //   console.log(k)
  //   console.log(H)
  // }
  // console.log(" ==== ")

  // for (let k in otherObjects_thatNeedAName) {
  //   const H = otherObjects_thatNeedAName[k]
  //   console.log(k)
  //   console.log(H)
  // }

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

  events.forEach((thing)=> { 
    delete categoricalHoH[thing]
  })

  const expected = {
    'app-response': { core: 12, lookup: 1 },
    'product-interaction': { core: 17, lookup: 2 },
    'page-view': { core: 12, lookup: 1 },
    'This does not exist': { core: 1, lookup: 0 } // See? lookup as 0
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
