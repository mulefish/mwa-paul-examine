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