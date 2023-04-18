

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




function colorize(json) {
    const raw = JSON.stringify(json, null, 2)
    const rows = raw.split("\n");
    let output = ""
    rows.forEach((row, i) => {
        let css = "ignore"
        if (row.includes(" false")) {
            css = "optional"
        } else if (row.includes(" true")) {
            css = "mandatory"
        }
        output += `<div class='${css}'>${row}</div>`

    })
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
    switch(categoricalEvent) {
        case "purchase":
            lookup.push("SCREEN")
            lookup.push("EVENT.attributes")
            break; 
        case "product-interaction":
            lookup.push("SCREEN")
            lookup.push("EVENT.component")
            break; 
    
    }
    return lookup
}

try {
    module.exports = {
        flatten,
        colorize,
        getTypesFromZod,
        findZodTypesToFind,
        getSchemaKeys
    };
} catch (thisIsJustForNode) {
    // ignore this error... 
    // this is just for the TDD for node 
}