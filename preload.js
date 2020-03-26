const { ipcRenderer, shell } = require('electron');


window.appDirName = __dirname;
window.ipcRendererSend = (message, data) => ipcRenderer.send(message, data);
window.openUrlInDefaultBrowser = (url) => shell.openExternal(url);