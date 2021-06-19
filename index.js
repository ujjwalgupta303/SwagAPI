// Utility functions
// 1. To get DOM element from string
function getElementFromString(string) {
    let div = document.createElement('div')
    div.innerHTML = string
    return div.firstElementChild
}

let paramCount = 1
// Hiding parameters box initially as default selected content type is Json 
let parameterBox = document.getElementById('parametersBox')
parameterBox.style.display = 'none'

let responseBox = document.getElementById('responseJsonBox')
responseBox.style.display = 'none'

// if user clicks selects 'JSON' as content-type , then parameterBox should be hidden
let jsonRadio = document.getElementById('json')
jsonRadio.addEventListener('click', () => {
    document.getElementById('parametersBox').style.display = 'none'
    document.getElementById('reqJsonBox').style.display = 'block'
})

// if user clicks selects 'Custom Parameters' as content-type , then jsonReqBox should be hidden
let customRadio = document.getElementById('custom')
customRadio.addEventListener('click', () => {
    document.getElementById('reqJsonBox').style.display = 'none'
    document.getElementById('parametersBox').style.display = 'block'
})


let plusBtn = document.getElementById('addMoreParams')
plusBtn.addEventListener('click', () => {
    let params = document.getElementById('moreParams')
    let string = `<div id="parametersBox">
                    <div class="row g-3">
                        <label for="inputUrl" class="col-sm-2 col-form-label">Query Params</label>
                        <div class="col-sm-4">
                            <input type="text" class="form-control" placeholder="Key" id="Key${paramCount+1}" aria-label="Key">
                        </div>
                        <div class="col-sm-4">
                            <input type="text" class="form-control" placeholder="Value" id="Value${paramCount+1}" aria-label="Value">
                        </div>
                        <div class="col-auto">
                            <button class="btn btn-primary decreamentParams">-</button>
                        </div>
                    </div>
                </div>`;
    // Convert string to DOM 
    let paramEle = getElementFromString(string)
    moreParams.appendChild(paramEle)
    // console.log(paramEle)

    let removeParams = document.getElementsByClassName('decreamentParams')
    for (item of removeParams) {
        item.addEventListener('click', (e) => {
            // TO DO: Add confirmation dialog box to remove params
            e.target.parentElement.parentElement.remove()
        })
    }
    paramCount++
})

let sendBtn=document.getElementById('sendReqBtn')
sendBtn.addEventListener('click',()=>{
    // document.getElementById('responseResult').placeholder = 'Please wait ! Fetching response...'
    responseBox.style.display = 'block'
    document.getElementById('responsePrism').innerHTML = 'Please wait ! Fetching response...'

    // Fetch all the values that user has entered
    let url=document.getElementById('url').value
    let reqType=document.querySelector("input[name='requestType']:checked").value
    let contentType=document.querySelector("input[name='contentType']:checked").value
    console.log(url)
    console.log(reqType)
    console.log(contentType)

    if(contentType == 'CUSTOM') {
        // console.log('hi')
        data = {}
        for(i=1;i<=paramCount;i++) {
            if(document.getElementById('Key'+i) != undefined) {
                let key=document.getElementById('Key'+i).value
                let value=document.getElementById('Value'+i).value
                console.log(key)
                console.log(value)
                data[key]=value
            }
        }
        data = JSON.stringify(data)
    } else {
        data = document.getElementById('reqJsonText').value
    }
    console.log(data)


    // If request type is GET , invoke fetch api() to create a GET req
    if(reqType=='POST') {
        fetch(url,{
            method: 'POST',
            body: data,
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
              }
        })
        .then(response=>response.text())
        .then((text) => {
            // document.getElementById('responseResult').value=text
            document.getElementById('responsePrism').innerHTML=text
        })
    } else {
        fetch(url,{
            method: 'GET',
        })
        .then(response=>response.text())
        .then((text) => {
            // document.getElementById('responseResult').value=text
            document.getElementById('responsePrism').innerHTML=text
            Prism.highlightAll();
        })
    }

})
