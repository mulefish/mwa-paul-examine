const {
  setEverything,
  flatten,
  colorize,
  inflateFlatMap,
  step0_examineSomething,
  step1_recursive_getCategoricalOptionalityObjects,
  getColorizableHOH,
  categoricalHoH,
  otherObjects_thatNeedAName,
} = require("./logic.js")

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
  const thisIsForTDDPurposes = true // Prevent irratating console logs
  events.forEach((thing) => {
    step0_examineSomething(thing, thisIsForTDDPurposes)
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
function inflateFlatMap_simple_test(note) {
  // const x = {
  //     "screen,header": "string",
  //     "event,attributes,errorMessage": "string",
  //     "event,attributes,errorDetails": "string",
  //     "event,attributes,errorType": "string"
  // }
  const x = {
    "a.b.c.d.i": {
      "bool": true,
      "t": "abc"
    }
  }
  const actual = inflateFlatMap(x)
  const expected = {
    "a": {
      "b": {
        "c": {
          "d": {
            "i": {
              "bool": true,
              "t": "abc"
            }
          }
        }
      }
    }
  }
  verdict(actual, expected, note + " inflateFlatMap_test")

}
function inflateFlatMap_complex_test(note) {
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
  const actual = inflateFlatMap(x)
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
  verdict(actual, expected, note + " inflateFlatMap_complex_test")
}

function getColorizableHOH_test(note) {

  const before = {
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

  const after = getColorizableHOH(before)
  const expected = {
    "for_human": {
      "boathouse.event.component.id": "string_1",
      "boathouse.event.component.placement": "string_2",
      "boathouse.water.boats.Jupiter.Eeboo.Shabone.Maggy": "kittycat"
    },
    "for_css": {
      "boathouse.event.component.id": true,
      "boathouse.event.component.placement": true,
      "boathouse.water.boats.Jupiter.Eeboo.Shabone.Maggy": false
    }
  }
  verdict(after, expected, note + " getColorizableHOH_test")
}

function colorize_test(note) {

  const before = {
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

  const intermediate = getColorizableHOH(before)
  const human = intermediate["for_human"]
  const css = intermediate["for_css"]
  const result = colorize(human, css) // result is a bunch of divs used to colorize a JSON.stringified version of the collection 'before'
  let isOk = true
  const expected_substrings = ['boathouse',
    '"Maggy": "kittycat"',
    'class="mandatory"',
    'class="optional"'
  ]
  expected_substrings.forEach((thing) => {
    if (!result.includes(thing)) {
      isOk = false
    }
  })
  verdict(isOk, true, note + " colorize_test")
}
function header_test(note) { 
  const eventType = "error"
  step0_examineSomething(eventType)
//  console.log( categoricalHoH[eventType] )  


  verdict(false, true, note + " header_test")

}
const data = require("./everything.json")
setEverything(data)
/* */
simple_happypath("1 of 8")
happypath_deeperLook("2 of 8")
complex_happypath("3 of 8")
flatten_test("4 of 8")
inflateFlatMap_complex_test("5 of 8")
inflateFlatMap_simple_test("6 of 8")
getColorizableHOH_test("7 of 8")
colorize_test("8 of 8")


