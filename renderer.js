const information = document.getElementById('info')

const setButton = document.getElementById('btn')
const filePathElement = document.getElementById('filePath')

const btn = document.getElementById('btn2')

const titleInput = document.getElementById('title')

btncb.addEventListener('click', async () => {
    console.log('getting JSON')
    const jsonResp = await window.electronAPI.getJSON()
    console.log(jsonResp)

    const tblData = jsonResp.data
    const cbRes = document.getElementById('cb')

    // how many rows
    const rowCnt = tblData.length
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

})

btn.addEventListener('click', async () => {
    console.log('opening file')
    const filePath = await window.electronAPI.openFile()
    filePathElement.innerText = filePath
}) 

setButton.addEventListener('click', () => {
    console.log('setting title')
    window.electronAPI.setTitle(titleInput.value)
})

information.innerText = `This app is using Chrome (v${versions.chrome()}), 
    Node.js (v${versions.node()}), 
    and Electron (v${versions.electron()})`


