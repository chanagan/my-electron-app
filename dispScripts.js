// Purpose: display the data from the server
export function displayData(jsonResp) {
    // const tblData = jsonResp.data
    console.log(jsonResp)
    const tblData = jsonResp.data

    // will be putting the results into a table
    let newTable = "<table border='0'>"

    // if this is an array, then we can display it

    if (Array.isArray(tblData)) {
        console.log('tblData is an array')
        console.log(tblData)
        // make the header row
        newTable += "<tr>"
        Object.keys(tblData[0]).forEach(key => {
            newTable += `<th>${key}</th>`
        })
        newTable += '</tr>'
        // fill in the rest of the table
        const rowCnt = tblData.length
        console.log('rows: ' + rowCnt)
        for (let i = 0; i < rowCnt; i++) {
            newTable += '<tr>'
            Object.keys(tblData[i]).forEach(key => {
                newTable += `<td>${tblData[i][key]}</td>`
            })
            newTable += '</tr>'
        }
    } else {
        let colCnt = Object.keys(tblData).length
        console.log('tblData is not an array : ' + colCnt + ' columns')
        // console.log(tblData)
        Object.keys(tblData).forEach(key => {
            newTable += `<tr><th>${key}</th><td>${tblData[key]}</td></tr>`
        })
    }

    newTable += '</table>'

    const cbRes = document.getElementById('cb')
    // cbRes.innerHTML = 'a tabe will go here'
    cbRes.innerHTML = newTable

    return 
    let dataType = typeof tblData
    console.log('dataType: ' + dataType)
    let dataIsArray = Array.isArray(tblData)
    console.log('dataIsArray: ' + dataIsArray)


    // how many rows
    const rowCnt = tblData.length
    console.log('rows: ' + rowCnt)
    // how many columns
    const colCnt = Object.keys(tblData[0]).length
    console.log('rows: ' + rowCnt + ' -- ' + 'cols: ' + colCnt)

    // make the header row
    newTable += "<tr>"
    Object.keys(tblData[0]).forEach(key => {
        newTable += `<th>${key}</th>`
    })
    newTable += '</tr>'

    // fill in the rest of the table    
    for (let i = 0; i < rowCnt; i++) {
        newTable += '<tr>'
    //     newTable += `<tr><td>${i}</td><td>${tblData[i].value}</td></tr>`
        Object.keys(tblData[i]).forEach(key => {
            newTable += `<td>${tblData[i][key]}</td>`
            // console.log('tr row -> ' + key, jsonResp.data[i][key])
        })
        newTable += '</tr>'
    }
    

}
