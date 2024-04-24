// Purpose: display the data from the server
export function displayData(jsonResp) {
    // const tblData = jsonResp.data
    console.log(jsonResp)
    const tblData = jsonResp.data
    const cbRes = document.getElementById('cb')

    // how many rows
    const rowCnt = tblData.length
    console.log('rows: ' + rowCnt)
    // how many columns
    const colCnt = Object.keys(tblData[0]).length
    console.log('rows: ' + rowCnt + ' -- ' + 'cols: ' + colCnt)

    let newTable = "<table border='1'>"
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
    
    newTable += '</table>'

    cbRes.innerHTML = newTable

}
