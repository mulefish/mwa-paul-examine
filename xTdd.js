const everything = require("./everything.json")
const {         
  setEverything,
  step0_examineSomething, 
  //step1_recursive_getCategoricalOptionalityObjects,
  //step2_findTypescriptObjects,
  //step3_recursive_getNonCategoricalObjects,
  categoricalHoH,
  otherObjects_thatNeedAName
} = require("./x.js")


function verdict(a, b, msg) {
  let isOk = "FAIL "
  if (JSON.stringify(a) === JSON.stringify(b)) {
    isOk = "PASS "
  }
  console.log(isOk + " " + msg)
}

function happypath() { 
  setEverything(everything)
  step0_examineSomething("product-interaction")
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

happypath() 