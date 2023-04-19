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
    for ( let k in everything ) {
        headwaters.push(k)
    }
}

function printJSON(obj, indent = 0) {
    // Iterate over each key-value pair in the object
    for (const [key, value] of Object.entries(obj)) {
        // Print the key with proper indentation
        console.log(`OBJ${'_'.repeat(indent)}${key}:`);

        // If the value is an object, recursively call the function
        if (typeof value === 'object' && !Array.isArray(value)) {
            printJSON(value, indent + 2);
        }
        else if (Array.isArray(value)) {
            for (const element of value) {
                // If the element is an object, recursively call the function
                if (typeof element === 'object') {
                    printJSON(element, indent + 2);
                }
                // Otherwise, print the element with proper indentation
                else {
                    console.log(`HELLO${' '.repeat(indent + 2)}${element}`);
                }
            }
        }
        else {
            console.log(`VAL${' '.repeat(indent + 2)}${value}`);
        }
    }
}

function roll(thing, parent, history, loop, result  ) {
    if ( parent.length > 0 ) {
        history += parent + "."
    }
    if ( typeof thing === "object") {
        for ( let k in thing ) {
            if ( thing[k] !== undefined ) {
                roll( thing[k], k,  history, ++loop, result)
            }
        }
    } else {
        // console.log(parent, thing, history, loop )
        // console.log(`${loop} ${history} ${parent}` )
        history =  history.slice(0, -1); // Zap the trailed '.'
        result[history] = { loop, history, parent, mandatory:thing }
    }
}

function product_interaction() {
   const all = everything["categoricalOptionalityObjects"]["product-interaction"]
   let result = {} 
roll(all, "", "", 0, result)

console.log( result )
    // // // printJSON(everything["categoricalOptionalityObjects"]["product-interaction"]) 
    // const all = flatten(everything["categoricalOptionalityObjects"]["product-interaction"])
    // for (let k in all) {
    //     const v = all[k]
    //     const K = k.toUpperCase() 
    //     if (headwaters.includes( K ) ) {
    //         console.log("!!! " + k ) 
    //     } else {
    //         console.log("___ " + k ) 

    //     }
    // }





}


init() 
product_interaction()