const { app, BrowserWindow } = require('electron');


const appName = `http://localhost:4000`;
const appURL = `http://localhost:4000`;

function createWindow() {
  const browserWindow = new BrowserWindow({
    width: 905,
    height: 700,
    webPreferences: {
      webviewTag: true,
    },
  });
  browserWindow.setTitle(appName);
  browserWindow.webContents.openDevTools();
  // win.loadURL(`file://${__dirname}/index.html`);
  browserWindow.loadURL(appURL);
}

app.on('ready', createWindow);
