export default function electronAlert(message: string) {
  window.electron.alert(message);
}
