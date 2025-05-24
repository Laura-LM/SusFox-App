const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  getConnections: () => ipcRenderer.invoke('netstat')
});