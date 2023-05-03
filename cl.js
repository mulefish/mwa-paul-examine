
const x = {
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
                "country": "US",
                "ip": ""
            },
            "browserUserAgent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Safari/537.36",
            "profile": {
                "membershipType": "unknown",
                "isLoggedIn": false,
                "hashedEmail": ""
            },
            "anonymousId": ""
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
                    "totalCount": -1,
                    "position": -1
                },
                "text": "",
                "type": "",
                "id": ""
            },
            "attributes": {
                "errorGuestFacing": false,
                "errorDetails": "",
                "errorType": "",
                "errorMessage": "",
                "orderId": ""
            },
            "eventSubType": "",
            "type": "page-view",
            "id": "string"
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
                "unified": "string",
                "localized": "string"
            },
            "language": "en_US",
            "property": "web-CA",
            "currency": "string",
            "collections": [
                ""
            ],
            "country": "US",
            "type": "",
            "path": "string",
            "urlRoute": "string"
        }
    }
}



console.log( x["payload"]["collectionList"][0])
