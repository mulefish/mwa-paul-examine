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

  let found = {}
  for (let k in someJsonFromValidationModule) {
    if (k !== "attributes") {
      const v = someJsonFromValidationModule[k]
      if ((typeof v) === "object") {
        if (v.hasOwnProperty("zodValidationFn")) {
          // It is a simple Zod thing. Likely a 'string' that has some logic on it
          found[k] = v["zodValidType"]
        } else {
          found[k] = k // It is a zod thing! Good find it.
        }
      } else {
        found[k] = v
      }
    }
  }
  let expected = ["path", "type", "category", "country", "collections", "currency", "header", "language", "property", "urlRoute"]
  let actual = Object.keys(found)
  expected = expected.sort()
  actual = actual.sort()

  verdict(actual, expected, 'someJsonFromValidationModule')
}






findTypesFromJson()




