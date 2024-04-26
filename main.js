const {app, BrowserWindow, dialog, ipcMain, Menu} = require('electron')  
const fetch = require('electron-fetch').default

const path = require('path')   
const fs = require('fs') 

// const request = require('request')

const users = [{accountName: 'chris'}, {accountName: 'joe'}]

async function handleFileOpen() {
    const {canceled, filePaths} = await dialog.showOpenDialog({})
        if (!canceled) {
            return filePaths[0]
        }

    }
let win
const createWindow = () => {
    win = new BrowserWindow({
        width: 1200,
        height: 600,
        x: 0,
        y: 0,
        webPreferences: {
            nodeIntegration: false,
            contextIsolation: true,
            preload: path.join(__dirname, 'preload.js') 
        }
    })
    win.loadFile('index.html')
    ipcMain.on('set-title', (event, title) => {
        win.setTitle(title)
    })

    win.webContents.openDevTools()
}

app.whenReady().then(() => {
    ipcMain.handle('dialog:openFile', handleFileOpen)
    // ipcMain.handle('get-json', getJson)
    createWindow()

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow()
        }
    })

    const mainMenu = Menu.buildFromTemplate(mainMenuTemplate)
    Menu.setApplicationMenu(mainMenu)
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})
const actions = {
    bar: function() {
        console.log('bar')
    },
    about: function() {
        console.log('about')
    }
}
const mainMenuTemplate = require('./js/mainMenu.js')(app)

// stuff for cloud beds
/*
    This file is used to make an API call to the Cloudbeds API.
https://apidog.com/articles/call-rest-api-node-js/#why-use-nodejs-for-calling-rest-apis

    */
let jsonResp = data = '';
let objLength = 0;
async function getJson() {
    console.log('getting JSON')
    const options = {
        type: 'info',
        title: 'Information',
        message: "Do you want to download the JSON file?",
        buttons: ['Yes', 'No']
    }
    const response = await dialog.showMessageBox(null, options)
    if (response.response === 0) {
        jsonResp = await getPosts()
        return jsonResp
    }
}

const https = require('https');
const { abort } = require('process')
// const XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;

const options = {
    hostname: 'hotels.cloudbeds.com',
    // path: '/api/v1.1/getDashboard',
    path: '/api/v1.2/getHouseAccountList',
    // path: '/api/v1.1/getPaymentMethods',
    method: 'GET',
    headers: {
      'x-api-key': 'cbat_06UfnnHdzSwoncUCh7ZOHkLiv02ZqUqc',
    },
  };



const getPosts = () => {
  const request = https.request(options, (response) => {
    response.setEncoding('utf8');

    response.on('data', (chunk) => {
        console.log('------------------  ' + chunk.length)
      data += chunk;
    });

    response.on('end', () => {
        // console.log(Object.keys(data.data[0]));
      jsonResp = JSON.parse(data)
      console.log(jsonResp.success)
      objLength = Object(jsonResp.data).length;
      console.log(objLength)
    //   console.log(jsonResp.data[1].accountName)
    //   win.webContents.send('json', jsonResp)
    });
  });

  request.on('error', (error) => {
    console.error(error);
  });

  request.end();
    return jsonResp;
   
};


// getPosts();



const cbOptions = {
    method: 'GET',
    headers: {
      'x-api-key': 'cbat_06UfnnHdzSwoncUCh7ZOHkLiv02ZqUqc',
    },
  };
    
const cbServer = 'https://hotels.cloudbeds.com/api/v1.1/'
const cbApiCall = 'getHouseAccountList'
// const cbApiCall = 'getDashboard'

ipcMain.handle('get-json', ()  => {

    fetch(cbServer + cbApiCall, cbOptions)
    .then(response => response.json())
    .then(data => { 
        console.log('in get-json')
        console.log(data)
        // win.sendMessage('json-reply', data)
        win.webContents.send('json-reply', data)
        // return( data)
    })
    .catch(error => console.error(error))

})
