// let everything = require("./everything.json")
const categoricalHoH = {} 
const otherObjects_thatNeedAName = {} 
let everything;
function setEverything(gaintBallOfJson) {
    // This needs to be set either from xTDD.js OR from the real page.
    everything = gaintBallOfJson

}

function colorize(jsonTypes) {
    const raw = JSON.stringify(jsonTypes, null, 2)
    const rows = raw.split("\n");

    let output = ""
    // rows.forEach((row, i) => {
    for ( let i = 0 ; i < rows.length; i++ ) { 
        let row = rows[i]
        let css = "ignore"
        // try {
        if (row.includes(" false")) {
            css = "optional"
        } else if (row.includes(" true")) {
            css = "mandatory"
        }
        output += `<div class='${css}'>${row}</div>`
    }
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

function step1_recursive_getCategoricalOptionalityObjects(thing, parent, history, loop, result) {
    if (parent.length > 0) {
        history += parent + "."
    }
    if (typeof thing === "object") {
        for (let k in thing) {
            if (thing[k] !== undefined) {
                step1_recursive_getCategoricalOptionalityObjects(thing[k], k, history, ++loop, result)
            }
        }
    } else {
        const type = "string"
        // Zap the trailing '.'
        history = history.slice(0, -1); 
        // Prevent impossible things from getting into the state
        if ( thing !== undefined ) {
            result[history] = { mandatory: thing, type }
        }
    }
}
function step2_findTypescriptObjects(HoH) {
    // This is a map of objects like: 
    // 'default.payload.screen.path': { mandatory: false, type: 'string' },
    // 
    // Here, for this example the goal was to find 'screen'
    let found = {}
    for ( let k in HoH ) {
        if ( k.includes("payload.")) {
            //[ 'screen', 'path' ]
            const path = k.split("payload.")[1]
            // 'screen'
            const objectOfInterest = path.split(".")[0]           
            // Look to see if this key is in 'everything'. Purpose? 
            // Prevent 'COLLECTIONLIST' from getting into the system. 
            // If 'COLLECTIONLIST' is doing something - then...  change this. 
           if ( everything.hasOwnProperty(objectOfInterest.toUpperCase()) ) {
                // UPPER CASE : lower case
                found[objectOfInterest.toUpperCase()] = objectOfInterest
            } 
        }        
    }
    return found
}

function step3_recursive_getNonCategoricalObjects(thing, parent, history, loop, result) {
    if (parent.length > 0) {
        history += parent + "."
    }
    if (typeof thing === "object") {
        for (let k in thing) {
            if (thing[k] !== undefined && k !== "zodValidationFn") {
                step3_recursive_getNonCategoricalObjects(thing[k], k, history, ++loop, result)
            }
        }
    } else {
        if (parent !== "zodValidType") {
            history = history.slice(0, -1); // Zap the trailing '.'
            result[history] = { type: thing, parent }
        }
    }
}


function step0_examineSomething(eventName) {
    if ( everything["categoricalOptionalityObjects"].hasOwnProperty(eventName)) {
    const all = everything["categoricalOptionalityObjects"][eventName]
    const core = {} 
    step1_recursive_getCategoricalOptionalityObjects(all, "", "", 0, core)
    const lookup = step2_findTypescriptObjects(core)
    
    categoricalHoH[eventName] = {
        "core":core,
        "lookup":lookup
    }

    for ( let k in categoricalHoH  ) {
       const v = categoricalHoH[k]
    }

    for ( let k in categoricalHoH[eventName]["lookup"]) {
        if ( ! otherObjects_thatNeedAName.hasOwnProperty( k )) {
            const cleaned = {}
            step3_recursive_getNonCategoricalObjects(everything[k], "", "", 0, cleaned)
            otherObjects_thatNeedAName[k] = cleaned
        }
    }
}
}

try {
    if (require.main === module) {

        function show() { 
            for ( let k in categoricalHoH ) {
                const H =  categoricalHoH[k]
                console.log( k)
                console.log( H )
            }
            console.log( " ==== ")
        
            for ( let k in otherObjects_thatNeedAName ) {
                const H = otherObjects_thatNeedAName[k]
                console.log( k )
                console.log( H )
            }
        }
        
        step0_examineSomething("product-interaction")
        // examineSomething("purchase")
        // examineSomething("page-view")
        // examineSomething("page-products-displayed")
        // examineSomething("page-products-displayed")
        // examineSomething("general-component-event")
        // examineSomething("general-component-interaction")
        // examineSomething("app-response")
        show() 
        
    }
    module.exports = {
        setEverything,
        flatten,
        colorize,
        step0_examineSomething,
        step1_recursive_getCategoricalOptionalityObjects,
        step2_findTypescriptObjects,
        step3_recursive_getNonCategoricalObjects,
        categoricalHoH,
        otherObjects_thatNeedAName
    };
} catch (thisIsJustForNode) {
    // ignore this error... 
    // this is just for the TDD for node 
}