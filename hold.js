const fetch = require('electron-fetch').default

const optionsHA = {
    method: 'GET',
    headers: {
      'x-api-key': 'cbat_06UfnnHdzSwoncUCh7ZOHkLiv02ZqUqc',
    },
  };
    
const cbServer = 'https://hotels.cloudbeds.com/api/v1.1/'
const cbHseAcctLst = 'getHouseAccountList'

fetch(cbServer + cbHseAcctLst, optionsHA)
    .then(response => response.json())
    .then(data =>  console.log(data))
    .catch(error => console.error(error))


