function getLeafMaps(obj) {
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
  const for_human = {}
  const for_css = {}  
  for ( k in before) {
    const path_tmp = k.split(".")
    const path = path_tmp.slice(0, -1); 
    if ( k.endsWith("mandatory")) {
      for_css[path] = before[k] // This will be true or false boolean 
    }
    else {
      for_human[path] = before[k] // This wwill be 'string' or 'number' or Kittycats<Vector> etc etc
    }
  }  

  const result = {
    for_human, 
    for_css
  }
  return result;
}

const b = {
  "boathouse": {
    "event": {
      "component": {
        "id": {
          "mandatory": true,
          "type": "string_1"
        },
        "placement": {
          "mandatory": true,
          "type": "string_2"
        }
      }
    },
    "water": {
      "boats": {
        "Jupiter": {
          "Eeboo": {
            "Shabone": {
              "Maggy": {
                "mandatory": false,
                "type": "kittycat"
              }
            }
          }
        }
      }
    }
  }
} 
const x = getLeafMaps(b)
console.log(  JSON.stringify( x , null ,2 ))
