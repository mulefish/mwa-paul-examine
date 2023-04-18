const { findTheseZodThings, colorize, getTypesFromZod, flatten, findZodTypesToFind, getSchemaKeys } = require("./bagOfFunctions.js");

const everything = {
  "BASE_REQUIRED_LAM": {
    "payload": {
      "screen": {
        "path": false,
        "type": false,
        "category": false,
        "country": false,
        "collections": false,
        "currency": false,
        "header": false,
        "language": false,
        "property": false,
        "urlRoute": false
      }
    },
    "version": false,
    "timestamp": false
  },
  "PAGE_VIEW_WITH_PRODUCTS": {
    "payload": {
      "screen": {
        "path": false,
        "type": false,
        "category": false,
        "country": false,
        "collections": false,
        "currency": false,
        "header": false,
        "language": false,
        "property": false,
        "urlRoute": false
      },
      "collectionList": false
    },
    "version": false,
    "timestamp": false
  },
  "COMPONENT_INTERACTION": {
    "payload": {
      "screen": {
        "path": false,
        "type": false,
        "category": false,
        "country": false,
        "collections": false,
        "currency": false,
        "header": false,
        "language": false,
        "property": false,
        "urlRoute": false
      },
      "event": {
        "component": {
          "id": false,
          "type": false,
          "text": false,
          "placement": false
        }
      }
    },
    "version": false,
    "timestamp": false
  },
  "categoricalOptionalityObjects": {
    "app-response": {
      "default": {
        "payload": {
          "screen": {
            "path": false,
            "type": true,
            "category": false,
            "country": false,
            "collections": false,
            "currency": false,
            "header": true,
            "language": false,
            "property": false,
            "urlRoute": false
          }
        },
        "version": false,
        "timestamp": false
      }
    },
    "error": {
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
    },
    "general-component-interaction": {
      "default": {
        "payload": {
          "screen": {
            "path": false,
            "type": false,
            "category": false,
            "country": false,
            "collections": false,
            "currency": false,
            "header": false,
            "language": false,
            "property": false,
            "urlRoute": false
          },
          "event": {
            "component": {
              "id": false,
              "type": false,
              "text": false,
              "placement": false
            }
          }
        },
        "version": false,
        "timestamp": false
      }
    },
    "general-component-event": {
      "default": {
        "payload": {
          "screen": {
            "path": false,
            "type": false,
            "category": false,
            "country": false,
            "collections": false,
            "currency": false,
            "header": false,
            "language": false,
            "property": false,
            "urlRoute": false
          },
          "event": {
            "component": {
              "id": false,
              "type": false,
              "text": false,
              "placement": false
            }
          }
        },
        "version": false,
        "timestamp": false
      }
    },
    "page-products-displayed": {
      "default": {
        "payload": {
          "screen": {
            "path": false,
            "type": false,
            "category": false,
            "country": false,
            "collections": false,
            "currency": false,
            "header": false,
            "language": false,
            "property": false,
            "urlRoute": false
          },
          "collectionList": false
        },
        "version": false,
        "timestamp": false
      }
    },
    "page-view": {
      "default": {
        "payload": {
          "screen": {
            "path": false,
            "type": false,
            "category": false,
            "country": false,
            "collections": false,
            "currency": false,
            "header": false,
            "language": false,
            "property": false,
            "urlRoute": false
          }
        },
        "version": false,
        "timestamp": false
      }
    },
    "product-interaction": {
      "default": {
        "payload": {
          "screen": {
            "path": false,
            "type": false,
            "category": false,
            "country": false,
            "collections": false,
            "currency": false,
            "header": false,
            "language": false,
            "property": false,
            "urlRoute": false
          },
          "event": {
            "component": {
              "id": false,
              "type": false,
              "text": false,
              "placement": false
            }
          },
          "collectionList": false
        },
        "version": false,
        "timestamp": false
      }
    },
    "purchase": {
      "default": {
        "payload": {
          "screen": {
            "path": false,
            "type": false,
            "category": false,
            "country": false,
            "collections": false,
            "currency": false,
            "header": false,
            "language": false,
            "property": false,
            "urlRoute": false
          },
          "collectionList": false,
          "event": {
            "attributes": {
              "orderId": false
            }
          }
        },
        "version": false,
        "timestamp": false
      }
    }
  },
  "HEADER": {
    "zodValidType": "header",
    "localized": "string",
    "unified": "string"
  },
  "HIERARCHY": {
    "zodValidType": "hierarchy",
    "name": {
      "zodValidType": "header",
      "localized": "string",
      "unified": "string"
    }
  },
  "CATEGORY": {
    "hierarchy": "Array<hierarchy>",
    "gender": "string"
  },
  "INTERNALCAMPAIGNID": {
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
  },
  "PLACEMENT": {
    "position": "number",
    "totalCount": "number"
  },
  "COMPONENT": {
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
    },
    "attributes": {}
  },
  "GOOGLE": {
    "googleClickId": "string"
  },
  "FACEBOOK": {
    "fbClickId": "string",
    "fbc": "string",
    "fbp": "string",
    "testEventCode": "string",
    "eventId": "string"
  },
  "VENDORS": {
    "facebook": {
      "fbClickId": "string",
      "fbc": "string",
      "fbp": "string",
      "testEventCode": "string",
      "eventId": "string"
    },
    "google": {
      "googleClickId": "string"
    }
  },
  "EVENTATTRIBUTES": {
    "orderId?": "string",
    "errorMessage?": "string",
    "errorType?": "string",
    "errorDetails?": "string",
    "errorGuestFacing?": "boolean"
  },
  "EVENT": {
    "id": "string",
    "type": {
      "zodValidType": "string",
      "zodValidationFn": [
        [
          "regex",
          {},
          "Valid event types are onload, page-view, click-tap, impression, video-interaction, scroll, error, app-resonse, or input"
        ]
      ]
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
      },
      "attributes": {}
    }
  },
  "APPID": {
    "fusion?": {
      "id": "string"
    },
    "atg?": {
      "id": "string"
    },
    "sfcc?": {
      "id": "string"
    }
  },
  "USERATTRIBUTES": {
    "zodValidType": "userAttributes",
    "campaignId?": "string",
    "genderAffinity?": "string",
    "vendors?": {
      "facebook": {
        "fbClickId": "string",
        "fbc": "string",
        "fbp": "string",
        "testEventCode": "string",
        "eventId": "string"
      },
      "google": {
        "googleClickId": "string"
      }
    },
    "appId?": {
      "fusion?": {
        "id": "string"
      },
      "atg?": {
        "id": "string"
      },
      "sfcc?": {
        "id": "string"
      }
    }
  },
  "GEOIP": {
    "ip": "string",
    "country": "string",
    "state": "string",
    "city": "string",
    "zip": "string"
  },
  "USER": {
    "anonymousId?": "string",
    "profile": {
      "hashedEmail": "string",
      "isLoggedIn?": "boolean",
      "membershipType?": "string"
    },
    "browserUserAgent": "string",
    "geoIp": {
      "ip": "string",
      "country": "string",
      "state": "string",
      "city": "string",
      "zip": "string"
    },
    "attributes?": {
      "zodValidType": "userAttributes",
      "campaignId?": "string",
      "genderAffinity?": "string",
      "vendors?": {
        "facebook": {
          "fbClickId": "string",
          "fbc": "string",
          "fbp": "string",
          "testEventCode": "string",
          "eventId": "string"
        },
        "google": {
          "googleClickId": "string"
        }
      },
      "appId?": {
        "fusion?": {
          "id": "string"
        },
        "atg?": {
          "id": "string"
        },
        "sfcc?": {
          "id": "string"
        }
      }
    }
  },
  "PRICE": {
    "displayRegular": "string",
    "displaySale": "string",
    "isSale": "boolean",
    "taxOnly": "string",
    "regularWithoutTaxShipping": "string",
    "saleWithoutTaxShipping": "string"
  },
  "GENERAL_STOCK_KEEPING_UNIT": {
    "stockStatus": "string",
    "shippingMethod": "string",
    "colorName": "string",
    "colorId": "string",
    "colorGroup": "string",
    "styleId1": "string",
    "styleId2": "string"
  },
  "STOCK_KEEPING_UNIT": {
    "sku": "string",
    "size": "string",
    "quantity": "number",
    "price": {
      "displayRegular": "string",
      "displaySale": "string",
      "isSale": "boolean",
      "taxOnly": "string",
      "regularWithoutTaxShipping": "string",
      "saleWithoutTaxShipping": "string"
    },
    "attributes": {
      "stockStatus": "string",
      "shippingMethod": "string",
      "colorName": "string",
      "colorId": "string",
      "colorGroup": "string",
      "styleId1": "string",
      "styleId2": "string"
    }
  },
  "PRODUCT": {
    "productId": "string",
    "unifiedId": "string",
    "categoryUnifiedId": "string",
    "name": {
      "zodValidType": "header",
      "localized": "string",
      "unified": "string"
    },
    "price": {
      "displayRegular": "string",
      "displaySale": "string",
      "isSale": "boolean",
      "taxOnly": "string",
      "regularWithoutTaxShipping": "string",
      "saleWithoutTaxShipping": "string"
    },
    "skuList": []
  },
  "COLLECTION": {
    "id": "string",
    "type": "string",
    "name": {
      "zodValidType": "header",
      "localized": "string",
      "unified": "string"
    },
    "productList": []
  },
  "SCREEN": {
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
  },
  "PAYLOAD": {
    "screen": {
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
    },
    "event": {
      "id": "string",
      "type": {
        "zodValidType": "string",
        "zodValidationFn": [
          [
            "regex",
            {},
            "Valid event types are onload, page-view, click-tap, impression, video-interaction, scroll, error, app-resonse, or input"
          ]
        ]
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
        },
        "attributes": {}
      }
    },
    "user": {
      "anonymousId?": "string",
      "profile": {
        "hashedEmail": "string",
        "isLoggedIn?": "boolean",
        "membershipType?": "string"
      },
      "browserUserAgent": "string",
      "geoIp": {
        "ip": "string",
        "country": "string",
        "state": "string",
        "city": "string",
        "zip": "string"
      },
      "attributes?": {
        "zodValidType": "userAttributes",
        "campaignId?": "string",
        "genderAffinity?": "string",
        "vendors?": {
          "facebook": {
            "fbClickId": "string",
            "fbc": "string",
            "fbp": "string",
            "testEventCode": "string",
            "eventId": "string"
          },
          "google": {
            "googleClickId": "string"
          }
        },
        "appId?": {
          "fusion?": {
            "id": "string"
          },
          "atg?": {
            "id": "string"
          },
          "sfcc?": {
            "id": "string"
          }
        }
      }
    },
    "collectionList": []
  },
  "LAM_VERSION": {
    "component": "string",
    "lam": "string",
    "team": "string"
  },
  "categoricalValidatorObjects": {
    "schemaObjects": {
      "app-response": {
        "default": {
          "_def": {
            "unknownKeys": "strip",
            "catchall": {
              "_def": {
                "typeName": "ZodNever"
              }
            },
            "typeName": "ZodObject"
          },
          "_cached": null
        }
      },
      "error": {
        "default": {
          "_def": {
            "unknownKeys": "strip",
            "catchall": {
              "_def": {
                "typeName": "ZodNever"
              }
            },
            "typeName": "ZodObject"
          },
          "_cached": null
        }
      },
      "general-component-interaction": {
        "default": {
          "_def": {
            "unknownKeys": "strip",
            "catchall": {
              "_def": {
                "typeName": "ZodNever"
              }
            },
            "typeName": "ZodObject"
          },
          "_cached": null
        }
      },
      "general-component-event": {
        "default": {
          "_def": {
            "unknownKeys": "strip",
            "catchall": {
              "_def": {
                "typeName": "ZodNever"
              }
            },
            "typeName": "ZodObject"
          },
          "_cached": null
        }
      },
      "page-products-displayed": {
        "default": {
          "_def": {
            "unknownKeys": "strip",
            "catchall": {
              "_def": {
                "typeName": "ZodNever"
              }
            },
            "typeName": "ZodObject"
          },
          "_cached": null
        }
      },
      "page-view": {
        "default": {
          "_def": {
            "unknownKeys": "strip",
            "catchall": {
              "_def": {
                "typeName": "ZodNever"
              }
            },
            "typeName": "ZodObject"
          },
          "_cached": null
        }
      },
      "product-interaction": {
        "default": {
          "_def": {
            "unknownKeys": "strip",
            "catchall": {
              "_def": {
                "typeName": "ZodNever"
              }
            },
            "typeName": "ZodObject"
          },
          "_cached": null
        }
      },
      "purchase": {
        "default": {
          "_def": {
            "unknownKeys": "strip",
            "catchall": {
              "_def": {
                "typeName": "ZodNever"
              }
            },
            "typeName": "ZodObject"
          },
          "_cached": null
        }
      }
    }
  },
  "MODULE_VERSION": "4.3.0"
}


function verdict(a, b, msg) {
  let isOk = "FAIL "
  if (JSON.stringify(a) === JSON.stringify(b)) {
    isOk = "PASS "
  }
  console.log(isOk + " " + msg)
}

function findTypesFromJson_test() {

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

  verdict(actual, expected, 'findTypesFromJson_test')
}

function colorize_test() {
  const obj = {
    "one": " false",
    "two": " true",
    "three": " ",
  }
  const actual = colorize(obj)
  const expected = `<div class='ignore'>{</div><div class='optional'>  "one": " false",</div><div class='mandatory'>  "two": " true",</div><div class='ignore'>  "three": " "</div><div class='ignore'>}</div>`

  verdict(actual, expected, 'colorize_test')
}

function flatten_test() {
  const obj = {
    "dog": "Eeboo",
    "cities": {
      "Portland": "a",
      "Tokyo": "b"
    }
  }
  const actual = flatten(obj)
  const expected = {
    "dog": "Eeboo",
    "cities.Portland": "a",
    "cities.Tokyo": "b",
  }
  verdict(actual, expected, 'flatten_test')

}

function eq(a,b) {
  return JSON.stringify(a) === JSON.stringify(b)
}
function getSchemaKeys_test() {
  let isOk = true 
  let expected = [["SCREEN"], ["EVENT", "attributes"]]
  let actual = getSchemaKeys("purchase")
  if ( eq(expected, actual) === false ) { isOk = false  } 

  expected = [["SCREEN"], ["EVENT", "component"]]
  actual = getSchemaKeys("product-interaction")
  if ( eq(expected, actual) === false ) { isOk = false  } 

  expected = [["SCREEN"]]
  actual = getSchemaKeys("page-view")
  // if ( eq(expected, actual) === false ) { isOk = false  } 
  expected = [["SCREEN"]]
  actual = getSchemaKeys("page-products-displayed")
  if ( eq(expected, actual) === false ) { isOk = false  } 

  expected = [["SCREEN"], ["EVENT", "component"]]
  actual = getSchemaKeys("general-component-event")
  if ( eq(expected, actual) === false ) { isOk = false  } 

  expected = [["SCREEN"], ["EVENT", "component"]]
  actual = getSchemaKeys("general-component-interaction")
  if ( eq(expected, actual) === false ) { isOk = false  } 

  expected = [["SCREEN"], ["EVENT", "attributes"]]
  actual = getSchemaKeys("error")
  if ( eq(expected, actual) === false ) { isOk = false  } 

  expected = [["SCREEN"]]
  actual = getSchemaKeys("app-response")
  if ( eq(expected, actual) === false ) { isOk = false  } 

  verdict(isOk , true, "getSchemaKeys_test")
}

function findZodTypes_forProduct_test() {
  let findTheseAry = getSchemaKeys("purchase")
  findTheseZodThings(findTheseAry, everything)

}


// colorize_test()
// flatten_test()
// getSchemaKeys_test()
// findTypesFromJson_test()
findZodTypes_forProduct_test()
