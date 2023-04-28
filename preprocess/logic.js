
/* MAIN_LOGIC_BEGIN :  TEMPLATING - DO NOT REMOVE */


const categoricalHoH = {}
const otherObjects_thatNeedAName = {}
let everything;
let lookup = {} 
// let namedEvents = {}
async function setEverything(gaintBallOfJson, isForTddPurposes=false ) {
    // This needs to be set either from xTDD.js OR from the real page.
    everything = gaintBallOfJson
    if (isForTddPurposes === false ) {
        // Emit out to the browser!
        console.log("%c setEverything() " + Object.keys( everything).length, "background:tan;" )
    }
}
function getChosenEvent(whichEvent) {
    return everything["categoricalOptionalityObjects"][whichEvent]
}
function getEverything() {
    return everything
}

function createObjectToSend(event) { 

    const ary_of_keys_to_send = Object.keys(event["default"]["payload"])
    const sendThis = {} 
    ary_of_keys_to_send.forEach((key)=> { 
      const x = lookup[key]
      sendThis[key] = x
    })
    return sendThis



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
function setLookup(x) { 
    // lookup will be stuff like 'screen' or 'event' or 'collectiontion'... 
    lookup = x
}
function getNamedEvents() {
    return namedEvents;
} 
async function stepA(isForTddPurposes=false) { 
    if ( isForTddPurposes===false) {
        // emit to browser
        console.log("%c stepA", "background:lightgreen")
    }
    namedEvents = Object.keys(everything["categoricalOptionalityObjects"])
    const ignore = ["general-component-interaction"]    
    namedEvents = namedEvents.filter((x) => !ignore.includes(x));
    const namedEventKeys = getAllNeededNamedEvents() 
    let l = {} 
    for ( let namedEvent in namedEventKeys ) {
      const x = inflateObject(namedEvent)
      // const n = Object.keys(x).length 
      l[namedEvent] = x
    }
    setLookup(l)
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


function beautifulJson( HoH ) {
    let result = {} 
    for (let k in HoH ) { 
        result[k] = inflateFlatMap( HoH[k])
    }
    inflateFlatMap
    return result
}

try {
    module.exports = {
        setEverything,
        flatten,
        colorize,
        inflateFlatMap,
        getColorizableHOH,
        getEverything,
        getTypesForNamedEvent,
        inflateObject, // version 2 
        getAllNeededNamedEvents, // version 2 
        getLookup, // version2 
        stepA, // version2 
        getNamedEvents, // version2 
        getChosenEvent,
        createObjectToSend, // version2 
        beautifulJson,
        categoricalHoH,
        otherObjects_thatNeedAName
    };
} catch (thisIsJustForNode) {
//    console.log( thisIsJustForNode)
}
/* MAIN_LOGIC_END :  TEMPLATING - DO NOT REMOVE */
