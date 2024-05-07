export default function electronAlert(message: string) {
  window.electron.ipcRenderer.sendMessage('alert', message);
}
