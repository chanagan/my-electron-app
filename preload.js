const { contextBridge, ipcRenderer } = require('electron')
const titleInput = document.getElementById('filePathElement')

let cbData 


contextBridge.exposeInMainWorld('versions', {
  node: () => process.versions.node,
  chrome: () => process.versions.chrome,
  electron: () => process.versions.electron,
  cbCallData: () => cbData
  // we can also expose variables, not just functions
})

contextBridge.exposeInMainWorld('electronAPI', {
    openFile: () => ipcRenderer.invoke('dialog:openFile'),
    getJSON: async () => ipcRenderer.invoke('get-json'),
    setTitle: (title) => ipcRenderer.send('set-title', title)
})


ipcRenderer.on('json-reply', (event, arg) => {
  console.log('got json-reply')
  console.log(event)
    console.log(arg)
    console.log('setting cbData')
    cbData = arg
    cbData.src = 'houseAcctList'
    window.postMessage(cbData)
    // titleInput.innerText = arg
})

