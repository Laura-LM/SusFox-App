const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const { getNetstat } = require('./scripts/netstat');

function createWindow() {
  const win = new BrowserWindow({
    width: 900,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
    },
    icon: path.join(__dirname, 'assets', 'icon.png'),
  });

  win.loadFile('index.html');
}

ipcMain.handle('netstat', async () => {
  return await getNetstat();
});

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});