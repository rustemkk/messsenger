const { BrowserWindow, app, ipcMain } = require('electron');
const windowStateKeeper = require('electron-window-state');
const path = require('path');


let browserWindow = null;
let appURL = `file://${__dirname}/build-frontend/index.html`;
let isWithDevTools = false;

if (process.env.NODE_ENV === 'dev') {
  appURL = 'http://localhost:4000';
  isWithDevTools = true;
}

function createWindow() {
  const mainWindowState = windowStateKeeper({
    defaultWidth: 1000,
    defaultHeight: 800
  });
  browserWindow = new BrowserWindow({
    height: mainWindowState.height,
    titleBarStyle: 'hidden',
    webPreferences: {
      nodeIntegration: true,
      preload: path.join(__dirname, 'preload.js'),
      webviewTag: true,
    },
    width: mainWindowState.width,
    x: mainWindowState.x,
    y: mainWindowState.y,
  });
  mainWindowState.manage(browserWindow);
  isWithDevTools && browserWindow.webContents.openDevTools();
  browserWindow.loadURL(appURL);
  browserWindow.on('closed', () => browserWindow = null);
}

app.on('ready', createWindow);

app.on('window-all-closed', () => app.quit());

app.on('activate', () => browserWindow === null && createWindow());

ipcMain.on('notificationClicked', () => {
  browserWindow.show();
  browserWindow.webContents.focus();
});
