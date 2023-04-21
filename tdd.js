/* 
// These function is directly tested. 
flatten()
step0_examineSomething()
colorize()
convertObject()
getLeafMaps()
// setFinalForm_1_of_2() & setFinalForm_2_of_2()

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
  convertObject,
  step0_examineSomething,
  getLeafMaps,
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
  //  verdict(actual, expected, note + " happypath_deeperLook")
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
}

function convertObject_test(note) {
  const x = {
    "a.b.c.d.i": {
      "bool": true,
      "t": "abc"
    },
    "a.b.c.e.f.j": {
      "bool": false,
      "t": "abc"
    },
    "a.b.c.e.f.k": {
      "bool": false,
      "t": "abc"
    },
    "a.b.c.e.f.l": {
      "bool": false,
      "t": "abc"
    },
    "a.b.g": {
      "bool": false,
      "t": "abc"
    },
    "a.b.h": {
      "bool": false,
      "t": "abc"
    }
  }
  const actual = convertObject(x)
  const expected = {
    "a": {
      "b": {
        "c": {
          "d": {
            "i": {
              "bool": true,
              "t": "abc"
            }
          },
          "e": {
            "f": {
              "j": {
                "bool": false,
                "t": "abc"
              },
              "k": {
                "bool": false,
                "t": "abc"
              },
              "l": {
                "bool": false,
                "t": "abc"
              }
            }
          }
        },
        "g": {
          "bool": false,
          "t": "abc"
        },
        "h": {
          "bool": false,
          "t": "abc"
        }
      }
    }
  }
  verdict(actual, expected, note + " convertObject_test")
}

function getLeafMaps_test(note) {

  const b = {
    "boathouse": {
      "event": {
        "component": {
          "id": {
            "mandatory": true,
            "type": "string_1"
          },
          "placement": {
            "mandatory": true,
            "type": "string_2"
          }
        }
      },
      "water": {
        "boats": {
          "Jupiter": {
            "Eeboo": {
              "Shabone": {
                "Maggy": {
                  "mandatory": false,
                  "type": "kittycat"
                }
              }
            }
          }
        }
      }
    }
  }
  const x = getLeafMaps(b)
console.log(  JSON.stringify( x , null ,2 )) 
  }
  const data = require("./everything.json")
  setEverything(data)
  /* */
  simple_happypath("1 of 6")
  happypath_deeperLook("2 of 6")
  complex_happypath("3 of 6")
  flatten_test("4 of 6")
  convertObject_test("5 of 6")
  getLeafMaps_test("6 of 6") 