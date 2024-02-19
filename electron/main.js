const { app, BrowserWindow } = require("electron");
const path = require("path");
const rigisterIPC = require("./rigisterIPC.js");

function createMainWindow() {
  const mainWindow = new BrowserWindow({
    title: "palserver GUI",
    width: 1000,
    height: 600,
    icon: path.join(__dirname + "./assets/palserver.ico"),
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: true,
      preload: path.join(__dirname, "preload.js"),
    },
    autoHideMenuBar: true,
  });

  // for production
  // const startUrl = url.format({
  //   pathname: path.join(__dirname, './frontend/build/index.html'),
  //   protocol: 'file',
  // });
  // mainWindow.loadURL(startUrl)

  // // for development
  mainWindow.webContents.openDevTools();
  mainWindow.loadURL("http://localhost:3000");

  rigisterIPC();

  // mainWindow.on("close", async (e) => {
  //   e.preventDefault();

  //   const { response } = await dialog.showMessageBox(mainWindow, {
  //     type: "question",
  //     title: "  溫馨提醒  ",
  //     message: "請確認關閉所有正在運行的帕魯伺服器，否則可能會造成存檔丟失。",
  //     buttons: ["Yes", "No"],
  //   });

  //   response === 0 && mainWindow.destroy();
  // });
}


app.whenReady().then(createMainWindow);
