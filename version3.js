function flattenCategoricalOptionalityObjects() {
    const flat = flatten(everything)
    document.getElementById("selectedEvent").innerHTML = "Flat CategoricalOptionalityObjects"
    document.getElementById("bottom_left_textArea").value = JSON.stringify(flat, null, 2)
}

function flattenTransformationModule_defaultCategorizedEvents() {
    const flat = flatten(transformationModule.defaultCategorizedEvents)
    document.getElementById("selectedEvent").innerHTML = "Flat TransformationModule"
    document.getElementById("bottom_left_textArea").value = JSON.stringify(flat, null, 2)
}
function beautify() {
    try {
        const x = document.getElementById("bottom_left_textArea").value
        const obj = JSON.parse(x)
        document.getElementById("bottom_left_textArea").value = JSON.stringify(obj, null, 2)
    } catch (boom) {
        alert(boom)
    }
}
function inflateFlatMap(simple) {
    const complex = {};
    for (const key in simple) {
        const levels = key.split('.');
        let currLevelObj = complex;
        for (let i = 0; i < levels.length; i++) {
            const levelKey = levels[i];
            if (!currLevelObj.hasOwnProperty(levelKey)) {
                currLevelObj[levelKey] = {};
            }
            if (i === levels.length - 1) {
                currLevelObj[levelKey] = simple[key];
            }
            currLevelObj = currLevelObj[levelKey];
        }
    }
    return complex;
}

function createObjectToSend(event) {
    const ary_of_keys_to_send = Object.keys(event["default"]["payload"])
    const sendThis = {}
    ary_of_keys_to_send.forEach((key) => {
        const x = lookup[key]
        sendThis[key] = x
    })
    return sendThis
}

function setStore() {
    const x = document.getElementById("bottom_left_textArea").value
    localStorage.setItem("register1", x);
}

function getStore() {
    const x = localStorage.getItem("register1")
    try {
        const obj = JSON.parse(x)
        document.getElementById("bottom_left_textArea").value = JSON.stringify(obj, null, 2)
    } catch (ohno_bad_json) {
        document.getElementById("bottom_left_textArea").value = x
    }
}

function beautifulJson(HoH) {
    let result = {}
    for (let k in HoH) {
        result[k] = inflateFlatMap(HoH[k])
    }
    inflateFlatMap
    return result
}

function makeJsonToSendMatchMinimumSchema(schemaMap_flat, toSendMap_flat) {
    let union_keys = []
    for (let k in schemaMap_flat) {
        for (let k2 in toSendMap_flat) {
            if (k2.startsWith(k)) {
                if (k2.endsWith("zodValidType")) {
                    // ignore it
                } else {
                    union_keys.push(k2)
                }
            }
        }
    }
    let union = {}
    union_keys.forEach((key) => {
        let clean_key = key.replace("?", "") // Strip ? from keys
        union[clean_key] = toSendMap_flat[key]
    })
    return union
}

function showEverything() { 
    alert("TODO: This ought to be created. NOTE: Something something event type also")
}


// MYSTERYIES
// "CATEGORY.hierarchy": "Array<hierarchy>",
// "CATEGORY.gender": "string",
// "property"


const types = {

    "product-interaction": { 
        "path": "string",
        "type": "string",
        "category": "string",
        "country": "US",
        "collections": {},
        "currency": "string",
        "headerUnified": "string",
        "headerLocalized": "string",
        "language": "en_US",
        "TODOproperty": "cookie",
        "urlRoute": "string",
        "component.id":"string",
        "component.type":"string",
        "component.text":"string",
        "component.type":"string",
        "component.placement.position":123,
        "component.placement.totalCount":123,

        "collectionList":["TODO - this will be tricky"]

    }, 
    "page-products-displayed":{ 
        "path": "string",
        "type": "string",
        "category": "string",
        "country": "US",
        "collections": {},
        "currency": "string",
        "headerUnified": "string",
        "headerLocalized": "string",
        "language": "en_US",
        "TODOproperty": "cookie",
        "urlRoute": "string",
        "collectionList":["TODO - this will be tricky"]

    }, 


    "purchase": { 
        "path": "string",
        "type": "string",
        "category": "string",
        "country": "US",
        "collections": {},
        "currency": "string",
        "headerUnified": "string",
        "headerLocalized": "string",
        "language": "en_US",
        "TODOproperty": "cookie",
        "collectionList":["TODO - this will be tricky"], 
        "urlRoute": "string",
        "event.orderId": "string"

        // "error.errorType": "string",
        // "error.errorDetails": "string",
        // "error.errorGuestFacing": true,
        // "error.errorMessage": "string"


    }, 
    "page-view":{ 
        "path": "string",
        "type": "string",
        "category": "string",
        "country": "US",
        "collections": {},
        "currency": "string",
        "headerUnified": "string",
        "headerLocalized": "string",
        "language": "en_US",
        // "property": "string",
        "urlRoute": "string"

    }, 

    "app-response_big": {
        "path": "string",
        "urlRoute": "string",
        "screenType": "string",
        "currency": "string",
        "country": "US",
        "language": "en_US",
        //"property":"string",
        "headerUnified": "string",
        "headerLocalized": "string",
        "gender": "string",
        "screen": {
            "attributes": {
                "anything": "can go here"
            }
        },
        "id": "String",
        "event": {
            "attributes": {
                "anything": "can go here"
            }
        }
    },

    "app-response": {
        "path": "string",
        "type": "string",
        "category": "string",
        "country": "US",
        "collections": {},
        "currency": "string",
        "headerUnified": "string",
        "headerLocalized": "string",
        "language": "en_US",
        "TODOproperty": "cookie",
        "urlRoute": "string"
    },
    "general-component-event": {
        "path": "string",
        "type": "string",
        "category": "string",
        "country": "US",
        "collections": {},
        "currency": "string",
        "headerUnified": "string",
        "headerLocalized": "string",
        "language": "en_US",
        "TODOproperty": "cookie",
        "urlRoute": "string",
        "component.id":"string",
        "component.type":"string",
        "component.text":"string",
        "component.type":"string",
        "component.placement.position":123,
        "component.placement.totalCount":123,
    },

    "error": {

        "headerUnified": "string",
        "headerLocalized": "string",
        "error.errorType": "string",
        "error.errorDetails": "string",
        "error.errorGuestFacing": true,
        "error.errorMessage": "string"
    },
    "error_big": {
        "urlRoute": "string",
        "path": "string",
        "screenType": "string",
        "currency": "string",
        "country": "US",
        "language": "en_CA",
        "headerUnified": "string",
        "headerLocalized": "string",
        "gender": "string",
        "screen": {
            "attributes": {
                "anything": "can go here"
            }
        },
        "error.errorType": "string",
        "error.errorDetails": "string",
        "error.errorGuestFacing": true,
        "error.errorMessage": "string",
        "error": "string",
        "errorType": "error",
        "anonymousId": "string",
        "browserAgent": "string",
        "ip": "string",
        "country": "US",
        "state": "OR",
        "city": "Portland",
        "zip": "97211",
        "language": "en_US",
        "hashedEmail": "string",
        "atgAppId": "string",
        "membershipType": "anything",
        "payload.user.attributes.campaignId": "anything",
        "payload.user.attributes.vendors.facebook.fb": "anything",
        "payload.user.attributes.vendors.facebook.fbClickId": "anything",
        "payload.user.attributes.vendors.facebook.fbc": "anything",
        "payload.user.attributes.vendors.facebook.fbp": "anything",
        "payload.user.attributes.vendors.facebook.testEventCode": "anything",
        "payload.user.attributes.vendors.facebook.eventId": "anything",
        "payload.user.attributes.vendors.google.googleClickId": "anything",
        "payload.user.attributes.appId.atg.id": "anything",
        "payload.user.attributes.appId.sfcc.id": "anything",
        "version.lam": "default",
        "version.team": "default",
        "timestamp": "default"
    },
}



function loadThisEvent(eventName) {
    currentEventName = eventName
    document.getElementById("selectedEvent").innerHTML = eventName
    const inputObject = everything["categoricalOptionalityObjects"][eventName]
    console.log(inputObject)
    const sendThis_flat = createObjectToSend(inputObject)
    const sendThis = beautifulJson(sendThis_flat)
    let schema = inflateFlatMap(inputObject)
    schema = schema["default"]["payload"]
    // document.getElementById("top_left_textArea").innerHTML = JSON.stringify(schema, null, 2)

    const x = flatten(transformationModule.defaultCategorizedEvents[eventName])
    // const possible = []
    // const seen = 0
    // for (let k in x) {
    //     v = x[k]
    //     if (seen.hasOwnProperty(v)) {
    //         // skip it 
    //     } else {
    //         seen[v] = 1
    //         possible.push(v + " ====> " + k)
    //     }
    // }
    // document.getElementById("top_left_textArea").innerHTML = JSON.stringify(possible, null, 2)
    document.getElementById("top_left_textArea").innerHTML = JSON.stringify(x, null, 2)
    // const flat_schema = flatten(schema)
    // const schema = inflateFlatMap(flat_schema)

    document.getElementById("top_right_textArea").value = JSON.stringify(schema, null, 2)

    const flat_sendThis = flatten(sendThis)
    //    const union_flat = makeJsonToSendMatchMinimumSchema(flat_schema, flat_sendThis)
    //   const union = inflateFlatMap(union_flat)
    //    document.getElementById("bottom_left_textArea").value = JSON.stringify(union, null, 2)
    //  property
    //    "membershipType":"string",
    //    "unknown":"string"
    const union = inflateFlatMap(types[eventName])
    document.getElementById("bottom_left_textArea").value = JSON.stringify(union, null, 2)
}


async function sendIt() {

    const eventName = document.getElementById("selectedEvent").innerHTML
    try {
        const x = JSON.parse(document.getElementById("bottom_left_textArea").value)
        const theResult = await MwaAnalytics.trackEvent(eventName, x)
        const base = theResult['payload']['properties'] //["validationResult"] //["data"]["payload"] //['payload']["validationResult"]["data"]["payload"]
        const product = base["product"]
        const payloadInner = base['validationResult']['data']['payload']
        // let out = JSON.stringify(product, null, 2)
        // out += "\n-----------------\n"
        // out += JSON.stringify(payloadInner, null, 2)
        // document.getElementById("receiveInfo").value = out
        document.getElementById("bottom_right_textArea").value = JSON.stringify(theResult, null, 2)
    } catch (boom) {
        document.getElementById("bottom_right_textArea").value = boom
    }
}