

const grey = (thing) => {
    let msg = thing
    if ((typeof thing) === "object") {
        msg = JSON.stringify(thing)
    }
    console.log("%c " + msg, "background:#e0e0e0")
}
const tan = (thing) => {
    let msg = thing
    if ((typeof thing) === "object") {
        msg = JSON.stringify(thing)
    }
    console.log("%c " + msg, "background:tan")
}

const green = (thing) => {
    let msg = thing
    if ((typeof thing) === "object") {
        msg = JSON.stringify(thing, null, 2)
    }
    console.log("%c " + msg, "background:lightgreen")
}
const pink = (thing) => {
    let msg = thing
    if ((typeof thing) === "object") {
        msg = JSON.stringify(thing, null, 2)
    }
    console.log("%c " + msg, "background:pink")
}

const blue = (thing) => {
    let msg = thing
    if ((typeof thing) === "object") {
        msg = JSON.stringify(thing, null, 2)
    }
    console.log("%c " + msg, "background:lightblue")
}

function doValidationModule() {

    const cvo = self.validationModule.categoricalValidatorObjects["schemaObjects"]
    const _listOfEvents = Object.keys(cvo)
    const listOfEvents = _listOfEvents.map(function (x) { return x.toUpperCase(); })
    // grey(listOfEvents)   
    grey('self.validationModule.categoricalValidatorObjects["schemaObjects"]')
    grey("self.validationModule")
    const listOfvalidationModule = Object.keys(self.validationModule)
    // green(listOfvalidationModule)
    // blue( JSON.stringify( self.validationModule, null, 2 ) )

    document.getElementById("sendInfo").value = JSON.stringify(listOfEvents, null, 2)

    document.getElementById("receiveInfo").value = JSON.stringify(self.validationModule, null, 2)


    // listOfEvents.forEach((event, i)=> { 
    //     const obj = self.validationModule[event]
    //     blue( i + "   " + event)
    //     green(obj)
    // })


}
/////////////////////////////// LOGIC FOLLOWS ///////////////////
async function doFetchNEW(event_name) {
    // PUNT? 
    if (!signals.hasOwnProperty(event_name)) {
        document.getElementById("event_name").innerHTML = "none"
        document.getElementById("sendInfo").value = "The supplied " + event_name + " is not in the collection"
    } else {
        document.getElementById("event_name").innerHTML = event_name
        const x = signals[event_name]
        document.getElementById("sendInfo").value = JSON.stringify(x, null, 2)
    }
}

async function sendIt() {
    const event_name = document.getElementById("event_name").innerHTML
    if (!signals.hasOwnProperty(event_name)) {
        document.getElementById("receiveInfo").value = "The supplied " + event_name + " is not in the collection"
    } else {
        // const x = signals[event_name]
        const x = JSON.parse(document.getElementById("sendInfo").value)
        try {
            const theResult = await MwaAnalytics.trackEvent(event_name, x)
            const base = theResult['payload']['properties'] //["validationResult"] //["data"]["payload"] //['payload']["validationResult"]["data"]["payload"]
            const product = base["product"]
            const payloadInner = base['validationResult']['data']['payload']
            let out = JSON.stringify(product, null, 2)
            out += "\n-----------------\n"
            out += JSON.stringify(payloadInner, null, 2)
            // document.getElementById("receiveInfo").value = out
            document.getElementById("receiveInfo").value = JSON.stringify(theResult, null, 2)
        } catch (boom) {
            document.getElementById("receiveInfo").value = boom
        }
    }
}




// function colorize(json) {
//     const raw = JSON.stringify(json, null, 2)
//     const rows = raw.split("\n");
//     let output = ""
//     rows.forEach((row, i) => {
//         let css = "ignore"
//         if (row.includes(" false")) {
//             css = "optional"
//         } else if (row.includes(" true")) {
//             css = "mandatory"
//         }
//         css = "optional"
//         output += `<div class='${css}'>${row}</div>`

//     })
//     return output
// }



/* Merge 'optionality' dimension in with the 'type' dimensions - the keys of these maps are identical */ 
function colorize(jsonTypes, jsonOptions) {
    const raw = JSON.stringify(jsonTypes, null, 2)
    const rows = raw.split("\n");

    const raw2 = JSON.stringify(jsonOptions, null, 2)
    const rows2 = raw2.split("\n");


    let output = ""
    // rows.forEach((row, i) => {
    for ( let i = 0 ; i < rows.length; i++ ) { 
        let row = rows[i]
        let row2 = rows2[i]
        let css = "ignore"
        // try {
        if ( row2 !== undefined ) { 
        if (row2.includes(" false")) {
            css = "optional"
            blue("rows2 |"+ row2)
        } else if (row2.includes(" true")) {
            css = "mandatory"
            tan("rows2 |" + row2  )
        }
    }
    // } catch(boom ) {
    //     console.log( boom )
    // }
    //    css = "optional"
        output += `<div class='${css}'>${row}</div>`

    }
    green(output)
    return output
}


function flatten(objectToFlatten) {
    // This will not be used in the logic of the page - but it will be helpful to put this page together
    function flattenObject(obj) {
        const accumulator = {};
        for (let key in obj) {
            if (obj.hasOwnProperty(key)) {
                if ((typeof obj[key]) == 'object' && obj[key] != null) {
                    const flatObject = flattenObject(obj[key]);
                    for (let x in flatObject) {
                        if (flatObject.hasOwnProperty(x)) {
                            accumulator[key + '.' + x] = flatObject[x];
                        }
                    }
                } else {
                    accumulator[key] = obj[key];
                }
            }
        }
        return accumulator;
    }
    return flattenObject(objectToFlatten)
}
// function getTypesFromZod(someJsonFromValidationModule) {
//     let found = {}
//     for (let k in someJsonFromValidationModule) {
//         if (k !== "attributes") {
//             const v = someJsonFromValidationModule[k]
//             if ((typeof v) === "object") {
//                 if (v.hasOwnProperty("zodValidationFn")) {
//                     // It is a simple Zod thing. Likely a 'string' that has some logic on it
//                     found[k] = v["zodValidType"]
//                 } else {
//                     found[k] = k // It is a zod thing! Good find it.
//                 }
//             } else {
//                 found[k] = v
//             }
//         }
//     }
//     return found
// }

function getTypesFromZod(someJsonFromValidationModule) {
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
    return found
}


function findZodTypesToFind(complexJson) {
    const flatMap = flatten(complexJson)

}

function getSchemaKeys(categoricalEvent) {
    const lookup = []
    switch (categoricalEvent) {
        case "purchase":
            lookup.push(["SCREEN"])
            lookup.push(["EVENT", "attributes"])
            break;
        case "product-interaction":
            lookup.push(["SCREEN"])
            lookup.push(["EVENT", "component"])
            break;
        case "page-view":
            lookup.push(["SCREEN"])
            break;
        case "page-products-displayed":
            lookup.push(["SCREEN"])
            break;

        case "general-component-event":
            lookup.push(["SCREEN"])
            lookup.push(["EVENT", "component"])
            break;

        case "general-component-interaction":
            lookup.push(["SCREEN"])
            lookup.push(["EVENT", "component"])
            break;

        case "error":
            lookup.push(["SCREEN"])
            lookup.push(["EVENT", "attributes"])
            break;

        case "app-response":
            lookup.push(["SCREEN"])
            break;

        default:
            console.log("Case statement fall through! This should not have been reached.")

    }
    return lookup
}

function findTheseZodThings(eventName, everything) {
    function getScreen() { 
        return {
            "path": everything["SCREEN"]["path"],
            "type": everything["SCREEN"]["type"],
            "category": "TODO",
            "country": everything["SCREEN"]["country"]["zodValidType"],
            "collections": everything["SCREEN"]["collections"],
            "currency": everything["SCREEN"]["currency"],
            "header.localized": everything["HEADER"]["localized"],
            "header.unified": everything["HEADER"]["unified"],
            "language": everything["SCREEN"]["language"]["zodValidType"],
            "property": everything["SCREEN"]["property"]["zodValidType"],
            "urlRoute": everything["SCREEN"]["urlRoute"]
        }
    }
    let found = {}
    if (eventName === "purchase") {
        // found = {
        //     "screen": {
        //         "path": everything["SCREEN"]["path"],
        //         "type": everything["SCREEN"]["type"],
        //         "category": "TODO",
        //         "country": everything["SCREEN"]["country"]["zodValidType"],
        //         "collections": everything["SCREEN"]["collections"],
        //         "currency": everything["SCREEN"]["currency"],
        //         "header.localized": everything["HEADER"]["localized"],
        //         "header.unified": everything["HEADER"]["unified"],
        //         "language": everything["SCREEN"]["language"]["zodValidType"],
        //         "property": everything["SCREEN"]["property"]["zodValidType"],
        //         "urlRoute": everything["SCREEN"]["urlRoute"]
        //     },
        //     "event": {
        //         "attributes": {
        //             "orderId": everything["EVENT"]["attributes"]["orderId?"]
        //         }
        //     }
        // }
        found = {
            "screen":getScreen(), 
            "event": {
                "attributes": {
                    "orderId": everything["EVENT"]["attributes"]["orderId?"]
                }
            }

        }

    } else if (eventName === "product-interaction") {

        found = {
            // "screen": {

            //     "path": everything["SCREEN"]["path"],
            //     "type": everything["SCREEN"]["type"],
            //     "category": "TODO",
            //     "country": everything["SCREEN"]["country"]["zodValidType"],
            //     "collections": everything["SCREEN"]["collections"],
            //     "currency": everything["SCREEN"]["currency"],
            //     "header": "TODO",
            //     "language": everything["SCREEN"]["language"]["zodValidType"],
            //     "property": everything["SCREEN"]["property"]["zodValidType"],
            //     "urlRoute": everything["SCREEN"]["urlRoute"]
            // },
            "screen": getScreen(), 
            "event": {
                "component": {
                    "id": everything["EVENT"]["component"]["id"],
                    "type": everything["EVENT"]["component"]["type"],
                    "text": everything["EVENT"]["component"]["text"],
                    "placement": everything["EVENT"]["component"]["placement"]
                }
            },
            "collectionList": "TODO"
        }

    } else if (eventName === "page-view") {
        found = {
            /* 
            "screen": {
                "path": everything["SCREEN"]["path"],
                "type": everything["SCREEN"]["type"],
                "category": "TODO",
                "country": everything["SCREEN"]["country"]["zodValidType"],
                "collections": everything["SCREEN"]["collections"],
                "currency": everything["SCREEN"]["currency"],
                "header": "TODO",
                "language": everything["SCREEN"]["language"]["zodValidType"],
                "property": everything["SCREEN"]["property"]["zodValidType"],
                "urlRoute": everything["SCREEN"]["urlRoute"]
            },*/
            screen: getScreen()

        }
    } else if (eventName === "page-products-displayed") {
        found = {
            /*"screen": {
                "path": everything["SCREEN"]["path"],
                "type": everything["SCREEN"]["type"],
                "category": "TODO",
                "country": everything["SCREEN"]["country"]["zodValidType"],
                "collections": everything["SCREEN"]["collections"],
                "currency": everything["SCREEN"]["currency"],
                "header": "TODO",
                "language": everything["SCREEN"]["language"]["zodValidType"],
                "property": everything["SCREEN"]["property"]["zodValidType"],
                "urlRoute": everything["SCREEN"]["urlRoute"]
            }, */ 
            "screen": getScreen(), 
            "collectionList": "TODO"
        }
    } else if ( eventName === "general-component-event") { 

        found = {
            /*"screen": {
                "path": everything["SCREEN"]["path"],
                "type": everything["SCREEN"]["type"],
                "category": "TODO",
                "country": everything["SCREEN"]["country"]["zodValidType"],
                "collections": everything["SCREEN"]["collections"],
                "currency": everything["SCREEN"]["currency"],
                "header": "TODO",
                "language": everything["SCREEN"]["language"]["zodValidType"],
                "property": everything["SCREEN"]["property"]["zodValidType"],
                "urlRoute": everything["SCREEN"]["urlRoute"]
            },*/ 
            "screen": getScreen(), 
            "event": {
                "component": {
                    "id": everything["EVENT"]["component"]["id"],
                    "type": everything["EVENT"]["component"]["type"],
                    "text": everything["EVENT"]["component"]["text"],
                    "placement": everything["EVENT"]["component"]["placement"]
                }
            }
        }
    } else if ( eventName === "general-component-interaction") { 
        found = {
            /*"screen": {
                "path": everything["SCREEN"]["path"],
                "type": everything["SCREEN"]["type"],
                "category": "TODO",
                "country": everything["SCREEN"]["country"]["zodValidType"],
                "collections": everything["SCREEN"]["collections"],
                "currency": everything["SCREEN"]["currency"],
                "header": "TODO",
                "language": everything["SCREEN"]["language"]["zodValidType"],
                "property": everything["SCREEN"]["property"]["zodValidType"],
                "urlRoute": everything["SCREEN"]["urlRoute"]
            },*/
            "screen": getScreen(), 
            "event": {
                "component": {
                    "id": everything["EVENT"]["component"]["id"],
                    "type": everything["EVENT"]["component"]["type"],
                    "text": everything["EVENT"]["component"]["text"],
                    "placement": everything["EVENT"]["component"]["placement"]
                }
            }
        }
    } else if ( eventName === "error") {
        found = {
            "screen": {
                "header": "TODO",
            },
            "event": {
                "attributes": {
                    "errorMessage": everything["EVENT"]["attributes"]["errorMessage?"],
                    "errorDetails": everything["EVENT"]["attributes"]["errorDetails?"],
                    "errorType": everything["EVENT"]["attributes"]["errorType?"],
                }
            }
        }
    } else if ( eventName === "app-response") {
        found = {
            "screen": {

                /*"screen": {
                    "path": everything["SCREEN"]["path"],
                    "type": everything["SCREEN"]["type"],
                    "category": "TODO",
                    "country": everything["SCREEN"]["country"]["zodValidType"],
                    "collections": everything["SCREEN"]["collections"],
                    "currency": everything["SCREEN"]["currency"],
                    "header": "TODO",
                    "language": everything["SCREEN"]["language"]["zodValidType"],
                    "property": everything["SCREEN"]["property"]["zodValidType"],
                    "urlRoute": everything["SCREEN"]["urlRoute"]
                },*/   
            }
        }
    } 
    return found
}


try {
    module.exports = {
        flatten,
        colorize,
        getTypesFromZod,
        findZodTypesToFind,
        getSchemaKeys,
        findTheseZodThings
    };
} catch (thisIsJustForNode) {
    // ignore this error... 
    // this is just for the TDD for node 
}