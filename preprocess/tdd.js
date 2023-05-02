const {
  setEverything,
  flatten,
  colorize,
  inflateFlatMap,
  getColorizableHOH,
  getEverything,
  getTypesForNamedEvent,
  inflateObject, // version 2 
  getAllNeededNamedEvents, // version 2 
  stepA, // version2 
  getNamedEvents,
  getChosenEvent, // versoin2
  createObjectToSend, // version2 
  getLookup, //version2 
  beautifulJson, // version2
  makeJsonToSendMatchMinimumSchema, // version2
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
  const expected = `<div contenteditable="true">{</div><div contenteditable="true">  "boathouse": {</div><div contenteditable="true">    "event": {</div><div contenteditable="true">      "component": {</div><div class="mandatory" contenteditable="true">        "id": "string_1",</div><div class="mandatory" contenteditable="true">        "placement": "string_2"</div><div contenteditable="true">      }</div><div contenteditable="true">    },</div><div contenteditable="true">    "water": {</div><div contenteditable="true">      "boats": {</div><div contenteditable="true">        "Jupiter": {</div><div contenteditable="true">          "Eeboo": {</div><div contenteditable="true">            "Shabone": {</div><div class="optional" contenteditable="true">              "Maggy": "kittycat"</div><div contenteditable="true">            }</div><div contenteditable="true">          }</div><div contenteditable="true">        }</div><div contenteditable="true">      }</div><div contenteditable="true">    }</div><div contenteditable="true">  }</div><div contenteditable="true">}</div>`

  verdict(result,expected, note + " colorize_test")
}
function version2_test(note) {
  const ignore = ["MODULE_VERSION"]
  const categoricalValidatorObjects = {}
  const other = {}
  const everything = getEverything()

  const categoricalOptionalityObjects = everything['categoricalOptionalityObjects']

  // c onsole.log(Object.keys(categoricalOptionalityObjects))
  for (let k in categoricalOptionalityObjects) {
    const v = categoricalOptionalityObjects[k]["default"]["payload"]
    // c onsole.log(" *********************************** " + k)
    //  c onsole.log( JSON.stringify( v , null, 2 ) )
    // c onsole.log(Object.keys(v))
  }
}
/* 
function getTypesForNamedEvent_test(note) {
  let seen = {}





  const obj = getTypesForNamedEvent("screen")
  // c onsole.log( Object.keys( obj ))
  // c onsole.log( obj )
  for (let k in obj) {
    let v = obj[k]
    if ((typeof v) === "string") {
      if (v.includes("Array<string>")) {
        seen[k] = "ary_string"
      } else {
        if (v.includes("Record<any>")) {
          seen[k] = "rec_any"
        } else {
          // This is the happy path
          seen[k] = v
        }
      }
    } else {
      if (v.hasOwnProperty("zodValidType")) {
        if (v["zodValidType"] === "string") {
          seen[k] = "zod_string"
        } else {
          c onsole.log("%c A: MISSED A POSSIBLE! k=" + k + " v=" + JSON.stringify(v), "background:red")
        }
      } else if (v.hasOwnProperty("hierarchy")) {
        const otherKey = Object.keys(v).filter(key => key !== "hierarchy")[0];
        seen[otherKey] = "ary_" + v[otherKey]
      } else {
        c onsole.log("%c B: MISSED A POSSIBLE! k=" + k + " v=" + JSON.stringify(v), "background:red")

      }

    }


  }


}
*/

function inflateObject_screen_test(note) {
  let x = getEverything()
  const actual = inflateObject("screen")

  const n = Object.keys(actual).length
  const isOk = n === 14
  // c onsole.log( actual)
  verdict(isOk, true, note + " inflateObject_screen_test n=" + n)

}



function getAllNeededNamedEvents_test(note) {
  const actual = getAllNeededNamedEvents()
  const expected = { screen: 8, event: 5, collectionList: 3 }
  verdict(actual, expected, note + " getAllNeededNamedEvents_test")
}

function inflateObject_everything_test(note) {
  const namedEventKeys = getAllNeededNamedEvents()
  const wittnessed = {}
  for (let namedEvent in namedEventKeys) {
    const x = inflateObject(namedEvent)
    const n = Object.keys(x).length
    wittnessed[namedEvent] = n
  }
  const expected = { "screen": 14, "event": 28, "collectionList": 0 }
  verdict(wittnessed, expected, note + " inflateObject_everything_test " + JSON.stringify(wittnessed))
}

function inflateObject_event_test(note) {
  let x = getEverything()
  const actual = inflateObject("event")
  const n = Object.keys(actual).length
  const isOk = n === 28
  // c onsole.log( actual)
  verdict(isOk, true, note + " inflateObject_event_test n=" + n)

}

function stepA_test(note) {
  const isForTddPurposes = true
  stepA(isForTddPurposes)   /// THIS!!!! 
  // lookup is a {collection} of objects that look something like this: 
  /* 
  {
  screen: {
    urlRoute: 'string',
    path: 'string',
    type: 'string',
    'country.zodValidType': 'string',
    collections: 'Array<string>',
    currency: 'string',
    'property.zodValidType': 'string',
    'language.zodValidType': 'string',
    'header.zodValidType': 'header',
    'header.localized': 'string',
    'header.unified': 'string',
    'category.hierarchy': 'Array<hierarchy>',
    'category.gender': 'string',
    attributes: 'Record<any>'
  },
  */
  const lookup = getLookup()

  /* 
  namedEvents will look something like: 
  [
  'app-response',
  'error',
  'general-component-interaction',
  'general-component-event',
  'page-products-displayed',
  'page-view',
  'product-interaction',
  'purchase'
  */
  const namedEvents = getNamedEvents()

  const howManyObjects = Object.keys(lookup).length
  const counts = []

  for (let key in lookup) {
    const n = Object.keys(lookup[key]).length
    counts.push(n)
  }
  const isOk = true
  if (!howManyObjects > 0) { isOk = false }
  if (!namedEvents.length > 0) { isOk = false }

  verdict(isOk, true, note + " stepA_test n=" + howManyObjects + " Lookup's member counts: " + counts + " namedEvents=" + namedEvents.length)


}
function getChosenEvent_test(note) {
  const actual = getChosenEvent("page-view")
  const expected = { "default": { "payload": { "screen": { "path": false, "type": false, "category": false, "country": false, "collections": false, "currency": false, "header": false, "language": false, "property": false, "urlRoute": false } }, "version": false, "timestamp": false } }
  verdict(actual, expected, note + " getChosenEvent_test")
}

function createObjectToSend_test(note) {
  const x = {
    "default": {
      "payload": {
        "screen": {
          "header": true
        },
        "event": {
          "attributes": {
            "errorMessage": false,
            "errorDetails": false,
            "errorType": false
          }
        }
      },
      "version": false,
      "timestamp": false
    }
  }
  const sendThis = createObjectToSend(x)

  const isOk = Object.keys(sendThis).length === 2
  verdict(isOk, true, note + " createObjectToSend_test ")
}

function beautifulJson_test(note) {
  const x = {
    screen: {
      urlRoute: 'string',
      path: 'string',
      type: 'string',
      'country.zodValidType': 'string',
      collections: 'Array<string>',
      currency: 'string',
      'property.zodValidType': 'string',
      'language.zodValidType': 'string',
      'header.zodValidType': 'header',
      'header.localized': 'string',
      'header.unified': 'string',
      'category.hierarchy': 'Array<hierarchy>',
      'category.gender': 'string',
      attributes: 'Record<any>'
    },
    event: {
      id: 'string',
      'type.zodValidType': 'string',
      'eventSubType?': 'string',
      'attributes.orderId?': 'string',
      'attributes.errorMessage?': 'string',
      'attributes.errorType?': 'string',
      'attributes.errorDetails?': 'string',
      'attributes.errorGuestFacing?': 'boolean',
      'component.id': 'string',
      'component.type': 'string',
      'component.text': 'string',
      'component.placement.position': 'number',
      'component.placement.totalCount': 'number',
      'component.internalCampaignId.ctaPageName.zodValidType': 'hierarchy',
      'component.internalCampaignId.ctaPageName.name.zodValidType': 'header',
      'component.internalCampaignId.ctaPageName.name.localized': 'string',
      'component.internalCampaignId.ctaPageName.name.unified': 'string',
      'component.internalCampaignId.pageName.zodValidType': 'hierarchy',
      'component.internalCampaignId.pageName.name.zodValidType': 'header',
      'component.internalCampaignId.pageName.name.localized': 'string',
      'component.internalCampaignId.pageName.name.unified': 'string',
      'component.internalCampaignId.businessInitiative': 'string',
      'component.internalCampaignId.row': 'number',
      'component.internalCampaignId.testName': 'string',
      'component.internalCampaignId.testVariation': 'string',
      'component.internalCampaignId.type': 'string',
      'component.internalCampaignId.workstreamBase': 'string',
      'component.internalCampaignId.workstreamSpecified': 'string'
    }
  }
  const actual = beautifulJson(x)
  const expected = {
    "screen": {
      "urlRoute": "string",
      "path": "string",
      "type": "string",
      "country": {
        "zodValidType": "string"
      },
      "collections": "Array<string>",
      "currency": "string",
      "property": {
        "zodValidType": "string"
      },
      "language": {
        "zodValidType": "string"
      },
      "header": {
        "zodValidType": "header",
        "localized": "string",
        "unified": "string"
      },
      "category": {
        "hierarchy": "Array<hierarchy>",
        "gender": "string"
      },
      "attributes": "Record<any>"
    },
    "event": {
      "id": "string",
      "type": {
        "zodValidType": "string"
      },
      "eventSubType?": "string",
      "attributes": {
        "orderId?": "string",
        "errorMessage?": "string",
        "errorType?": "string",
        "errorDetails?": "string",
        "errorGuestFacing?": "boolean"
      },
      "component": {
        "id": "string",
        "type": "string",
        "text": "string",
        "placement": {
          "position": "number",
          "totalCount": "number"
        },
        "internalCampaignId": {
          "ctaPageName": {
            "zodValidType": "hierarchy",
            "name": {
              "zodValidType": "header",
              "localized": "string",
              "unified": "string"
            }
          },
          "pageName": {
            "zodValidType": "hierarchy",
            "name": {
              "zodValidType": "header",
              "localized": "string",
              "unified": "string"
            }
          },
          "businessInitiative": "string",
          "row": "number",
          "testName": "string",
          "testVariation": "string",
          "type": "string",
          "workstreamBase": "string",
          "workstreamSpecified": "string"
        }
      }
    }
  }
  verdict(actual, expected, note + " beautiful_test ")
}


function makeJsonToSendMatchMinimumSchema_test(note) {
  const schema = {
    "screen.header": true,
    "event.attributes.errorMessage": false,
    "event.attributes.errorDetails": false,
    "event.attributes.errorType": false
  }
  const comlete = {
    "screen.urlRoute": "string",
    "screen.path": "string",
    "screen.type": "string",
    "screen.country.zodValidType": "string",
    "screen.collections": "Array<string>",
    "screen.currency": "string",
    "screen.property.zodValidType": "string",
    "screen.language.zodValidType": "string",
    "screen.header.zodValidType": "header",
    "screen.header.localized": "string",
    "screen.header.unified": "string",
    "screen.category.hierarchy": "Array<hierarchy>",
    "screen.category.gender": "string",
    "screen.attributes": "Record<any>",
    "event.id": "string",
    "event.type.zodValidType": "string",
    "event.eventSubType?": "string",
    "event.attributes.orderId?": "string",
    "event.attributes.errorMessage?": "string",
    "event.attributes.errorType?": "string",
    "event.attributes.errorDetails?": "string",
    "event.attributes.errorGuestFacing?": "boolean",
    "event.component.id": "string",
    "event.component.type": "string",
    "event.component.text": "string",
    "event.component.placement.position": "number",
    "event.component.placement.totalCount": "number",
    "event.component.internalCampaignId.ctaPageName.zodValidType": "hierarchy",
    "event.component.internalCampaignId.ctaPageName.name.zodValidType": "header",
    "event.component.internalCampaignId.ctaPageName.name.localized": "string",
    "event.component.internalCampaignId.ctaPageName.name.unified": "string",
    "event.component.internalCampaignId.pageName.zodValidType": "hierarchy",
    "event.component.internalCampaignId.pageName.name.zodValidType": "header",
    "event.component.internalCampaignId.pageName.name.localized": "string",
    "event.component.internalCampaignId.pageName.name.unified": "string",
    "event.component.internalCampaignId.businessInitiative": "string",
    "event.component.internalCampaignId.row": "number",
    "event.component.internalCampaignId.testName": "string",
    "event.component.internalCampaignId.testVariation": "string",
    "event.component.internalCampaignId.type": "string",
    "event.component.internalCampaignId.workstreamBase": "string",
    "event.component.internalCampaignId.workstreamSpecified": "string"
  }
  const union_flat = makeJsonToSendMatchMinimumSchema(schema, comlete)
  const union = inflateFlatMap(union_flat)
  const expected = {
    "screen": {
      "header": {
        "localized": "string",
        "unified": "string"
      }
    },
    "event": {
      "attributes": {
        "errorMessage": "string",
        "errorDetails": "string",
        "errorType": "string"
      }
    }
  }

  verdict(union, expected, note + " makeJsonToSendMatchMinimumSchema_test")


}


const data = require("./everything.json")
const thisIsTDD = true
setEverything(data, thisIsTDD)

/*
// flatten_test("4 of 8")
// inflateFlatMap_complex_test("5 of 8")
// inflateFlatMap_simple_test("6 of 8")
// getColorizableHOH_test("7 of 8")
// colorize_test("8 of 8")
*/
// version2_test("1 of 10")
// inflateObject_screen_test("2 of 10")
// getAllNeededNamedEvents_test("3 of 10")
// inflateObject_everything_test("4 of 10")
// inflateObject_event_test("5 of 10")
// stepA_test("6 of 10")
// getChosenEvent_test("7 of 10")
// createObjectToSend_test("8 of 10")
// beautifulJson_test("9 of 10")
// makeJsonToSendMatchMinimumSchema_test("10 of 10")
colorize_test("11 of 10")