const {colorize, getTypesFromZod, flatten} = require("./bagOfFunctions.js");
function verdict(a, b, msg) {
  let isOk = "FAIL "
  if (JSON.stringify(a) === JSON.stringify(b)) {
    isOk = "PASS "
  }
  console.log(isOk + " " + msg)
}

function findTypesFromJson() {

  const someJsonFromValidationModule = {
    "urlRoute": "string",
    "path": "string",
    "type": "string",
    "country": {
      "zodValidType": "string",
      "zodValidationFn": [
        [
          "regex",
          {},
          "Country code must match ISO 3166 specifcation"
        ]
      ]
    },
    "collections": "Array<string>",
    "currency": "string",
    "property": {
      "zodValidType": "string",
      "zodValidationFn": [
        [
          "regex",
          {},
          "There was error parsing this from UsrLocale and/or User Language Preference cookie"
        ]
      ]
    },
    "language": {
      "zodValidType": "string",
      "zodValidationFn": [
        [
          "regex",
          {},
          "Must match ISO 639 two letter for language and ISO 3166 for country ex: en_CA (Canadian English)"
        ]
      ]
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
  }

  const found = getTypesFromZod(someJsonFromValidationModule)
  let expected = ["path", "type", "category", "country", "collections", "currency", "header", "language", "property", "urlRoute"]
  let actual = Object.keys(found)
  expected = expected.sort()
  actual = actual.sort()

  verdict(actual, expected, 'someJsonFromValidationModule')
}

function colorize_test() { 
  const obj = {
    "one":" false",
    "two":" true",
    "three":" ",
  }
  const actual = colorize(obj)
  const expected = `<div class='ignore'>{</div><div class='optional'>  "one": " false",</div><div class='mandatory'>  "two": " true",</div><div class='ignore'>  "three": " "</div><div class='ignore'>}</div>`

  verdict(actual, expected, 'colorize_test')
}

function flatten_test() { 
  const obj = {
    "dog":"Eeboo",
    "cities":{
      "Portland":"a",
      "Tokyo":"b"
    }
  }
  const actual = flatten(obj)
  const expected = {
    "dog":"Eeboo",
    "cities.Portland":"a",
    "cities.Tokyo":"b",
  }
  verdict(actual, expected, 'flatten_test')

}

colorize_test()
findTypesFromJson()
flatten_test()



