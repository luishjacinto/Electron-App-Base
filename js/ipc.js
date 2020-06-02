const { ipcRenderer } = require('electron');

ipcRenderer.on('message-from-worker', (event, arg) => {
    let payload = arg.payload;
    alert(payload);
});
