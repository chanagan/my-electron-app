const information = document.getElementById('info')

const setButton = document.getElementById('btn')
const filePathElement = document.getElementById('filePath')

const btn = document.getElementById('btn2')

const titleInput = document.getElementById('title')

btncb.addEventListener('click', async () => {
    console.log('getting JSON')
    const jsonResp = await window.electronAPI.getJSON()
    console.log(jsonResp)
    console.log(Object.keys(jsonResp.data[0]))
    // filePathElement.innerText = filePath
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


