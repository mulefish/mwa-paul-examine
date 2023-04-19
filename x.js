const everything = require("./everything.json")
const lowerCaseLeadingKey = ((str) => {
    const components = str.split('.');
    components[0] = components[0].toLowerCase();
    return components.join('.');
})
const len = (map)=> { 
    return Object.keys(map).length
}
function step1_getCategoricalOptionalityObjects(thing, parent, history, loop, result) {
    if (parent.length > 0) {
        history += parent + "."
    }
    if (typeof thing === "object") {
        for (let k in thing) {
            if (thing[k] !== undefined) {
                step1_getCategoricalOptionalityObjects(thing[k], k, history, ++loop, result)
            }
        }
    } else {
        const type = "string"
        history = history.slice(0, -1); // Zap the trailing '.'
        result[history] = { mandatory: thing, type }
    }
}

function step2_getNeededFirstClassObjects(categoricalOptionalityObject) {
    const paths = Object.keys(categoricalOptionalityObject)
    const seen = {}
    for (let i = 0; i < paths.length; i++) {
        const pieces = paths[i].toUpperCase().split(".")
        pieces.forEach((p) => {
            if (!seen.hasOwnProperty(p)) {
                seen[p] = 1 // should use a Set() but I forget how to in JS
            }
        })
    }
    let found = {}
    for (let k in seen) {
        if (everything.hasOwnProperty(k)) {
            found[k] = everything[k]
        }
    }
    return found
}


function step3_getNonCategoricalObjects(thing, parent, history, loop, result) {
    if (parent.length > 0) {
        history += parent + "."
    }
    if (typeof thing === "object") {
        for (let k in thing) {
            if (thing[k] !== undefined && k !== "zodValidationFn") {
                step3_getNonCategoricalObjects(thing[k], k, history, ++loop, result)
            }
        }
    } else {
        if (parent !== "zodValidType") {
            history = history.slice(0, -1); // Zap the trailing '.'
            history = lowerCaseLeadingKey(history)
            result[history] = { type: thing, parent }
        }
    }
}




function examineSomething(eventName) {
    console.log(eventName)
    const all = everything["categoricalOptionalityObjects"][eventName]
    let result = {}
    step1_getCategoricalOptionalityObjects(all, "", "", 0, result)
    const firstClassObjects = step2_getNeededFirstClassObjects(result)
    const seenObjects = {}
    for (let k in firstClassObjects) {
        seenObjects[k] = {}
        step3_getNonCategoricalObjects(firstClassObjects, "", "", 0, seenObjects[k])
    }
    // console.log("non-categorical...")
    // let i = 0 
    // for ( let k in seenObjects ) { 
    //     console.log( ++i + "    " + len(seenObjects[k] )) 
    // }

    // console.log("categorical... ")

    // // i = 0 
    // // for ( let k in result ) { 
    // //     console.log( ++i + "    " + len(result[k] )) 
    // // }

    console.log( result )
    console.log("LEN=" + len(result))
}

examineSomething("product-interaction")
examineSomething("purchase")
examineSomething("page-view")
examineSomething("page-products-displayed")
examineSomething("page-products-displayed")
examineSomething("general-component-event")
examineSomething("general-component-interaction")
examineSomething("app-response")
