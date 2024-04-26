// const { ipcRenderer, ipcMain } = require("electron")
// import { ipcRenderer } from "electron"
import { displayData } from "./dispScripts.js"

const information = document.getElementById('info')

const setButton = document.getElementById('btn')
const filePathElement = document.getElementById('filePath')

const btnFile = document.getElementById('fileBtn')

const titleInput = document.getElementById('title')

btnGetHA.addEventListener('click', async () => {
    console.log('getting JSON')
    // const jsonResp = 
    await window.electronAPI.getJSON()
    // console.log(jsonResp)
})



btnFile.addEventListener('click', async () => {
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

// ipcMain.on('cbGotData', (event, data) => {
//     console.log(data)
//     information.innerText = data
// })

/* ipcRenderer.on('json-reply', (event, arg) => {
    console.log('got json-reply')
      console.log(arg)
      console.log('setting cbData')
      cbData = arg
      // titleInput.innerText = arg
  })
 */
  window.addEventListener('message', (event) => {
    console.log('got cbData')
    console.log('src: ' + event.data.src)
    console.log(event)
    // console.log(arg)
    displayData(event.data)
    // console.log('setting cbData')
    // cbData = event.detail
    // titleInput.innerText = arg
  })