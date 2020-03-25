const { shell } = require('electron');


window.appDirName = __dirname;
window.openUrlInDefaultBrowser = (url) => shell.openExternal(url);