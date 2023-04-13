
const grey = (thing)=> { 
    let msg = thing
    if ( ( typeof thing ) === "object") {
        msg = JSON.stringify( thing)
    }
    console.log("%c " + msg, "background:#e0e0e0")
}
const tan = (thing)=> { 
    let msg = thing
    if ( ( typeof thing ) === "object") {
        msg = JSON.stringify( thing)
    }
    console.log("%c " + msg, "background:tan")
}

const green = (thing)=> { 
    let msg = thing
    if ( ( typeof thing ) === "object") {
        msg = JSON.stringify( thing, null, 2 )
    }
    console.log("%c " + msg, "background:lightgreen")
}
const pink = (thing)=> { 
    let msg = thing
    if ( ( typeof thing ) === "object") {
        msg = JSON.stringify( thing, null, 2 )
    }
    console.log("%c " + msg, "background:pink")
}

const blue = (thing)=> { 
    let msg = thing
    if ( ( typeof thing ) === "object") {
        msg = JSON.stringify( thing, null, 2 )
    }
    console.log("%c " + msg, "background:lightblue")
}

function doValidationModule() { 

    const cvo = self.validationModule.categoricalValidatorObjects["schemaObjects"]
    const _listOfEvents = Object.keys(cvo)
    const listOfEvents = _listOfEvents.map(function(x){ return x.toUpperCase(); })
    // grey(listOfEvents)   
    grey('self.validationModule.categoricalValidatorObjects["schemaObjects"]')
    grey("self.validationModule")
    const listOfvalidationModule = Object.keys(self.validationModule)
    // green(listOfvalidationModule)
    // blue( JSON.stringify( self.validationModule, null, 2 ) )

    document.getElementById("sendInfo").value = JSON.stringify( listOfEvents, null, 2 )

    document.getElementById("receiveInfo").value = JSON.stringify( self.validationModule, null, 2 )
    

    // listOfEvents.forEach((event, i)=> { 
    //     const obj = self.validationModule[event]
    //     blue( i + "   " + event)
    //     green(obj)
    // })
    

}














/////////////////////////////// COLLECTION FOLLOWS ///////////////////
const signals = {}
signals['product-interaction'] = {
    event: {
        attributes: {
            action: 'view',
            algorithm: 'personalized',
        },
    },
    component: {
        id: 'recommendation:recently-viewed',
        type: 'ProductCarousel',
        text: 'Buy now',
        position: 2,
        totalCount: 3,
    },
    product: {
        skuID: 'ca_123',
        productID: 'prod789',
        unifiedID: '',
        name: 'cool 22" pants',
        localizedName: '',
        price: '68.99',
        salePrice: '',
        isSale: false,
        categoryUnifiedID: '',
    },
    collection: {
        type: 'recommendation',
        id: 'recently-viewed',
    },
}



signals["general-component-interaction"] = {
    attributes: {
    dummykey: "dummyValue"
    },
    component: {
       id: "truefit:quiz-start",
       type: "component-library...",
       text: "get your size",
       position: -1,
       totalCount: -1
    },
    attributes: {
       componentKey: "compValue"
    }
}
    

// mport { trackEvent, EVENT_CATEGORY, EVENT_TYPE } from "@lululemon/mwa-analytics";

// ...

// trackEvent(EVENT_CATEGORY.COMPONENT_EVENT, 
// signals['general-component-interaction'] = {


// }



signals['page-view'] = {

    attributes: {
        dummykey: "hello"
        },
        component: {
        },
        attributes: {
           componentKey: "compValue"
        }
}











/////////////////////////////// LOGIC FOLLOWS ///////////////////

MwaAnalytics.initializeAnalytics('TEST', {}, [], true);





async function doFetchNEW(event_name) {
    // PUNT? 
    if ( ! signals.hasOwnProperty(event_name)) {
        document.getElementById("event_name").innerHTML = "none"
        document.getElementById("sendInfo").value = "The supplied " + event_name + " is not in the collection"
    } else {
        document.getElementById("event_name").innerHTML = event_name
        const x = signals[event_name]
        document.getElementById("sendInfo").value = JSON.stringify(x,null, 2)
    }
}

async function sendIt() { 
    const event_name = document.getElementById("event_name").innerHTML
    if ( ! signals.hasOwnProperty(event_name)) {
        document.getElementById("receiveInfo").value = "The supplied " + event_name + " is not in the collection"
    } else {
        // const x = signals[event_name]
        const x = JSON.parse(document.getElementById("sendInfo").value)
        try {             
            const theResult = await MwaAnalytics.trackEvent(event_name, x)
            const base = theResult['payload']['properties'] //["validationResult"] //["data"]["payload"] //['payload']["validationResult"]["data"]["payload"]
            const product = base["product"]
            const payloadInner = base['validationResult']['data']['payload']
            let out = JSON.stringify(product,null,2) 
            out += "\n-----------------\n"
            out += JSON.stringify(payloadInner, null, 2 ) 
            // document.getElementById("receiveInfo").value = out
            document.getElementById("receiveInfo").value = JSON.stringify(theResult, null, 2 )
        } catch ( boom ) {            
            document.getElementById("receiveInfo").value = boom
        }
    }
}


