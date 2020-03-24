const { app, BrowserWindow } = require('electron');


const appName = 'Messsenger';
const appURL = 'http://localhost:4000';

function createWindow() {
  const browserWindow = new BrowserWindow({
    width: 900,
    height: 700,
    webPreferences: {
      webviewTag: true,
    },
    titleBarStyle: 'hiddenInset',
  });
  browserWindow.setTitle(appName);
  browserWindow.webContents.openDevTools();
  // win.loadURL(`file://${__dirname}/index.html`);
  browserWindow.loadURL(appURL);
}

app.on('ready', createWindow);
