const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('path')
const url = require('url');
let win;
let hiddenRenderer;

function sendMessage(window, event, payload) {
	window.webContents.send(event, payload);
}

function createWindows(){
  	win = new BrowserWindow({
		title: 'Main',
    	width: 1000,
     	height: 600,
		frame: false,
		webPreferences: {
            nodeIntegration: true
		},
		enableRemoteModule: true
	});
	win.loadURL(url.format({
		pathname: path.join(__dirname, 'index.html'),
		protocol: 'file:',
		slashes: true
	}));
	win.on('closed', () => {
		win = null;
	});
	// win.openDevTools();


	hiddenRenderer = new BrowserWindow({
		title: 'worker',
		show: false,
		webPreferences: { nodeIntegration: true }
	  });
	hiddenRenderer.loadFile('hiddenRenderer.html');

	ipcMain.on('message-from-worker', (event, arg) => {
		sendMessage(win, 'message-from-worker', arg);
	});
}

app.on('ready', createWindows);

app.on('window-all-closed', () =>{
	if(process.platform !== 'darwin'){
	    app.quit();
	  }
});