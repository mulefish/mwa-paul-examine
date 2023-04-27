
/* MAIN_LOGIC_BEGIN :  TEMPLATING - DO NOT REMOVE */


const categoricalHoH = {}
const otherObjects_thatNeedAName = {}
let everything;
let lookup = {} 
let namedEvents = {}
function setEverything(gaintBallOfJson) {
    // This needs to be set either from xTDD.js OR from the real page.
    everything = gaintBallOfJson
}
function getEverything() {
    return everything
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


function colorize(forHuman, forCss) {
    const a = inflateFlatMap(forHuman)
    const b = inflateFlatMap(forCss)

    const human = JSON.stringify(a, null, 2).split("\n")
    const css = JSON.stringify(b, null, 2).split("\n")
    contenteditable = "true"
    let accumulator = ""
    for (let i = 0; i < human.length; i++) {
        const h = human[i]
        const c = css[i]
        if (c.includes("true")) {
            accumulator += `<div class="mandatory" contenteditable="true">${h}</div>`
        } else if (c.includes("false")) {
            accumulator += `<div class="optional" contenteditable="true">${h}</div>`
        } else {
            accumulator += `<div contenteditable="true">${h}</div>`
        }
    }
    return accumulator
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



function getLookup() { 
    return lookup
}
function getNamedEvents() {
    return namedEvents; // finch
} 
function stepA() { 
    namedEvents = Object.keys(everything["categoricalOptionalityObjects"])
    const namedEventKeys = getAllNeededNamedEvents() 
    for ( let namedEvent in namedEventKeys ) {
      const x = inflateObject(namedEvent)
      // const n = Object.keys(x).length 
      lookup[namedEvent] = x
    }
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
        if (thing !== undefined) {
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
    for (let k in HoH) {
        if (k.includes("payload.")) {
            //[ 'screen', 'path' ]
            const path = k.split("payload.")[1]
            // 'screen'
            const objectOfInterest = path.split(".")[0]
            // Look to see if this key is in 'everything'. Purpose? 
            // Prevent 'COLLECTIONLIST' from getting into the system. 
            // If 'COLLECTIONLIST' is doing something - then...  change this. 
            if (everything.hasOwnProperty(objectOfInterest.toUpperCase())) {
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
//https://lululemon.atlassian.net/wiki/spaces/DCP/pages/2967410421/TDR+Web+NA+-+Reviews+Funnel+Tracking

function step0_examineSomething(eventName, isTDD = false) {
    if (everything["categoricalOptionalityObjects"].hasOwnProperty(eventName)) {
        const all = everything["categoricalOptionalityObjects"][eventName]
        const core = {}
        step1_recursive_getCategoricalOptionalityObjects(all, "", "", 0, core)
        const lookup = step2_findTypescriptObjects(core)

        categoricalHoH[eventName] = {
            "core": core,
            "lookup": lookup
        }

        for (let k in categoricalHoH) {
            const v = categoricalHoH[k]
        }

        for (let k in categoricalHoH[eventName]["lookup"]) {
            if (!otherObjects_thatNeedAName.hasOwnProperty(k)) {
                const cleaned = {}
                step3_recursive_getNonCategoricalObjects(everything[k], "", "", 0, cleaned)
                otherObjects_thatNeedAName[k] = cleaned
            }
        }
    } else {
        if (isTDD === false) {
            console.log("%c MISSING " + eventName, "background:red")
        }
    }
}

function getColorizableHOH(obj) {
    const before = {};

    const traverseObject = (obj, path) => {
        for (const [key, value] of Object.entries(obj)) {
            const currentPath = path.concat([key]);
            if (typeof value === "object") {
                traverseObject(value, currentPath);
            } else if (typeof value === "string" && key === "type") {
                before[currentPath.join(".")] = value;
            } else {
                before[currentPath.join(".")] = value;
            }
        }
    };
    // Get raw
    traverseObject(obj, []);
    // Clean up

    const for_human_with_commas = {}
    const for_css_with_commas = {}
    for (k in before) {
        const path_tmp = k.split(".")

        const path = path_tmp.slice(0, -1);

        if (k.endsWith("mandatory")) {
            for_css_with_commas[path] = before[k] // This will be true or false boolean 
        }
        else {
            for_human_with_commas[path] = before[k] // This wwill be 'string' or 'number' or Kittycats<Vector> etc etc
        }
    }
    // The next replace , for . section is weird, but at this point
    // the paths in for_human_with_commas and for_css_with_commas are something like:
    // 'boathouse,event,component,id'
    // but what is needed would be:
    // 'boathouse.event.component.id'
    const for_human = {}
    const for_css = {}
    for (let k in for_human_with_commas) {
        // const v = for_human_with_commas[k]
        const path = k.replace(/,/g, ".")
        for_human[path] = for_human_with_commas[k]
        for_css[path] = for_css_with_commas[k]
    }

    const result = {
        for_human,
        for_css
    }

    return result;
}

///////////// version 2 ///////////////

function getTypesForNamedEvent(namedEvent_lowerCase) {
    const namedEvent = namedEvent_lowerCase.toUpperCase()
    console.log("namedEvent: " + namedEvent)
    const obj = everything[namedEvent]
    return obj
}

function inflateObject(eventType) {
    const EVENT_TYPE = eventType.toUpperCase()
    const tmp = flatten( everything[EVENT_TYPE ]) 
    const seen = {} 
    for ( let k in tmp ) {
        if ( k.includes("zodValidationFn")) {
            // ignore it 
        } else {
            seen[k] = tmp[k]
        }
    }
    return seen
}
function getAllNeededNamedEvents() {
    let seen = {}
    const coo = Object.keys(everything['categoricalOptionalityObjects'])
    coo.forEach((thing, i) => {
        const payloads = Object.keys(everything['categoricalOptionalityObjects'][thing]["default"]["payload"])
        payloads.forEach((payload) => {
            if (seen.hasOwnProperty(payload)) {
                seen[payload]++
            } else {
                seen[payload] = 1
            }
        })
    })
    return seen
}




try {
    module.exports = {
        setEverything,
        flatten,
        colorize,
        step0_examineSomething,
        step1_recursive_getCategoricalOptionalityObjects,
        inflateFlatMap,
        getColorizableHOH,
        getEverything,
        getTypesForNamedEvent,
        inflateObject, // version 2 
        getAllNeededNamedEvents, // version 2 
        getLookup, // version2 
        stepA, // version2 
        getNamedEvents, // version2 
        categoricalHoH,
        otherObjects_thatNeedAName
    };
} catch (thisIsJustForNode) {
    // ignore this error... 
    // this is just for the TDD for node 
}
///////////// END OUGHT TO BE IN DIFFERENT


/* MAIN_LOGIC_END :  TEMPLATING - DO NOT REMOVE */
