/* 
function convertObject(inputObj) {
  const outputObj = {};
  for (const key in inputObj) {
    const value = inputObj[key];
    const levels = key.split('.');
    let currLevelObj = outputObj;
    for (let i = 0; i < levels.length; i++) {
      const levelKey = levels[i];
      if (!currLevelObj.hasOwnProperty(levelKey)) {
        currLevelObj[levelKey] = {};
      }
      if (i === levels.length - 1) {
        currLevelObj[levelKey] = value;
      }
      currLevelObj = currLevelObj[levelKey];
    }
  }
  return outputObj;
}
*/ 

function convertObject(simple) {
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


const x = {
  "default.payload.screen.header": {
    "mandatory": true,
    "type": "string"
  },
  "default.payload.event.attributes.errorMessage": {
    "mandatory": false,
    "type": "string"
  },
  "default.payload.event.attributes.errorDetails": {
    "mandatory": false,
    "type": "string"
  },
  "default.payload.event.attributes.errorType": {
    "mandatory": false,
    "type": "string"
  },
  "default.version": {
    "mandatory": false,
    "type": "string"
  },
  "default.timestamp": {
    "mandatory": false,
    "type": "string"
  }
}
const newthing = convertObject(x)
console.log(JSON.stringify(newthing, null, 2))
