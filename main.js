const { BrowserWindow, app } = require('electron');
const path = require('path');


const appName = 'Messsenger';
const appURL = 'http://localhost:4000';

function createWindow() {
  const browserWindow = new BrowserWindow({
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

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (mainWindow === null) {
    createWindow();
  }
});
