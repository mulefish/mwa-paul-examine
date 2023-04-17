const x = {
  "payload": {
    "type": "trackEnd",
    "event": "product-interaction",
    "properties": {
      "eventCategoryName": "product-interaction",
      "urlRoute": "http://localhost:4040/",
      "path": "/",
      "anonymousId": "38d82789-4734-415b-a625-58f06858be32",
      "language": "en_CA",
      "browserAgent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Safari/537.36",
      "timestamp": 1681743963712,
      "property": "web-CA",
      "country": "CA",
      "validationResult": {
        "success": true,
        "data": {
          "version": {
            "team": "",
            "lam": "",
            "component": ""
          },
          "timestamp": 1681743963712,
          "payload": {
            "collectionList": [
              {
                "productList": [
                  {
                    "skuList": [
                      {
                        "attributes": {
                          "errorGuestFacing": false,
                          "errorDetails": "",
                          "errorType": "",
                          "errorMessage": "",
                          "orderId": ""
                        },
                        "price": {
                          "saleWithoutTaxShipping": "",
                          "regularWithoutTaxShipping": "",
                          "taxOnly": "",
                          "isSale": false,
                          "displaySale": "",
                          "displayRegular": ""
                        },
                        "quantity": -1,
                        "size": "",
                        "sku": ""
                      }
                    ],
                    "price": {
                      "saleWithoutTaxShipping": "",
                      "regularWithoutTaxShipping": "",
                      "taxOnly": "",
                      "isSale": false,
                      "displaySale": "",
                      "displayRegular": ""
                    },
                    "name": {
                      "unified": "",
                      "localized": ""
                    },
                    "categoryUnifiedId": "",
                    "unifiedId": "",
                    "productId": ""
                  }
                ],
                "name": {
                  "unified": "",
                  "localized": ""
                },
                "type": "",
                "id": ""
              }
            ],
            "user": {
              "attributes": {
                "appId": {
                  "sfcc": {
                    "id": ""
                  },
                  "atg": {
                    "id": ""
                  },
                  "fusion": {
                    "id": ""
                  }
                },
                "vendors": {
                  "google": {
                    "googleClickId": ""
                  },
                  "facebook": {
                    "eventId": "",
                    "testEventCode": "",
                    "fbp": "",
                    "fbc": "",
                    "fbClickId": ""
                  }
                },
                "genderAffinity": "",
                "campaignId": ""
              },
              "geoIp": {
                "zip": "",
                "city": "",
                "state": "",
                "country": "CA",
                "ip": ""
              },
              "browserUserAgent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Safari/537.36",
              "profile": {
                "membershipType": "unknown",
                "isLoggedIn": false,
                "hashedEmail": ""
              },
              "anonymousId": "38d82789-4734-415b-a625-58f06858be32"
            },
            "event": {
              "component": {
                "attributes": {
                  "errorGuestFacing": false,
                  "errorDetails": "",
                  "errorType": "",
                  "errorMessage": "",
                  "orderId": ""
                },
                "internalCampaignId": {
                  "workstreamSpecified": "",
                  "workstreamBase": "",
                  "type": "",
                  "testVariation": "",
                  "testName": "",
                  "row": -1,
                  "businessInitiative": "",
                  "pageName": {
                    "name": {
                      "unified": "",
                      "localized": ""
                    }
                  },
                  "ctaPageName": {
                    "name": {
                      "unified": "",
                      "localized": ""
                    }
                  }
                },
                "placement": {
                  "totalCount": 3,
                  "position": 2
                },
                "text": "Buy now",
                "type": "ProductCarousel",
                "id": "recommendation:recently-viewed"
              },
              "attributes": {
                "errorGuestFacing": false,
                "errorDetails": "",
                "errorType": "",
                "errorMessage": "",
                "orderId": ""
              },
              "eventSubType": "",
              "type": "click-tap",
              "id": "recommendation:recently-viewed"
            },
            "screen": {
              "attributes": {},
              "category": {
                "gender": "",
                "hierarchy": [
                  {
                    "name": {
                      "unified": "",
                      "localized": ""
                    }
                  }
                ]
              },
              "header": {
                "unified": "home",
                "localized": ""
              },
              "language": "en_CA",
              "property": "web-CA",
              "currency": "",
              "collections": [
                ""
              ],
              "country": "CA",
              "type": "",
              "path": "/",
              "urlRoute": "http://localhost:4040/"
            }
          }
        }
      },
      "hat": "shirt",
      "event": {
        "attributes": {
          "action": "view",
          "algorithm": "personalized"
        }
      },
      "component": {
        "id": "recommendation:recently-viewed",
        "type": "ProductCarousel",
        "text": "Buy now",
        "position": 2,
        "totalCount": 3
      },
      "product": {
        "skuID": "ca_123",
        "productID": "prod789",
        "unifiedID": "",
        "name": "cool 22\" pants",
        "localizedName": "",
        "price": "68.99",
        "salePrice": "",
        "isSale": false,
        "categoryUnifiedID": "",
        "goat": "penny"
      },
      "collection": {
        "type": "recommendation",
        "id": "recently-viewed"
      },
      "headerUnified": "home",
      "pathMutatorObject": {}
    },
    "options": {},
    "userId": "38d82789-4734-415b-a625-58f06858be32",
    "anonymousId": "dd35801c-1e46-4f9b-a423-b871c7ade041",
    "meta": {
      "rid": "d2e67a7d-7428-44bb-a309-92dab3d13c77",
      "ts": 1681743963712,
      "hasCallback": true
    }
  }
}

function printKeys(obj, indent) {
  for (var key in obj) {
    console.log(indent + key);
    if (typeof obj[key] === 'object') {
      printKeys(obj[key], indent + '  ');
    }
  }
}

printKeys(x, "")
