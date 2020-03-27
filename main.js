const { BrowserWindow, app, ipcMain } = require('electron');
const path = require('path');


let browserWindow = null;
const appName = 'Messsenger';
const appURL = 'http://localhost:4000';

function createWindow() {
  browserWindow = new BrowserWindow({
    height: 680,
    titleBarStyle: 'hiddenInset',
    webPreferences: {
      nodeIntegration: true,
      preload: path.join(__dirname, 'preload.js'),
      webviewTag: true,
    },
    width: 1000,
  });
  browserWindow.setTitle(appName);
  browserWindow.webContents.openDevTools();
  // browserWindow.loadURL(`file://${__dirname}/build/index.html`);
  browserWindow.loadURL(appURL);
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (browserWindow === null) {
    createWindow();
  }
});

ipcMain.on('notificationClicked', () => {
  browserWindow.show();
  browserWindow.webContents.focus();
});