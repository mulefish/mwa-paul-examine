const everything = require("./everything.json")

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
let headwaters = []
function init() {
    for (let k in everything) {
        headwaters.push(k)
    }
}

function step1_roll(thing, parent, history, loop, result) {
    if (parent.length > 0) {
        history += parent + "."
    }
    if (typeof thing === "object") {
        for (let k in thing) {
            if (thing[k] !== undefined) {
                step1_roll(thing[k], k, history, ++loop, result)
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
        if (headwaters.includes(k)) {
            found[k] = everything[k]
        }
    }
    return found



}

function lowerCaseLeadingKey(str) {
    const components = str.split('.');
    components[0] = components[0].toLowerCase();
    return components.join('.');
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
        if ( parent !== "zodValidType") {
            history = history.slice(0, -1); // Zap the trailing '.'
            history = lowerCaseLeadingKey(history)
            result[history] = { type: thing, parent, "firstClass":true }
        }
    }
}



function product_interaction() {
    const all = everything["categoricalOptionalityObjects"]["product-interaction"]
    let result = {}
    step1_roll(all, "", "", 0, result)
    // console.log( result )
    const firstClassObjects = step2_getNeededFirstClassObjects(result)
    const seenObjects = {}
    for (let k in firstClassObjects) {
        seenObjects[k] = {}
        step3_getNonCategoricalObjects(firstClassObjects, "", "", 0, seenObjects[k])
    }
    console.log( seenObjects)
}


init()
product_interaction()