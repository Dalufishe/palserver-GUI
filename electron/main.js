const { app, BrowserWindow, dialog } = require("electron");
const { ipcMain } = require("electron");
const url = require("url");
const path = require("path");
const fs = require("fs/promises");
const fsc = require("fs");
const ini = require("ini");
const { spawn } = require("child_process");
const palServerSettingConverter = require("./utils/palServerSettingConverter");
const { existsSync } = require("fs");
const { forEach } = require("lodash");

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
  const startUrl = url.format({
    pathname: path.join(__dirname, './frontend/build/index.html'),
    protocol: 'file',
  });
  mainWindow.loadURL(startUrl)

  // for development
  // mainWindow.webContents.openDevTools();
  // mainWindow.loadURL("http://localhost:3000");

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

function rigisterIPC() {
  const SaveRootPath = path.join(__dirname, "./saves");
  const PalServerPath = path.join(
    __dirname,
    "./engine/steamapps/common/PalServer"
  );
  const EngineSavePath = path.join(
    __dirname,
    "./engine/steamapps/common/PalServer/Pal/Saved"
  );
  const EngineLuaModPath = path.join(
    __dirname,
    "./engine/steamapps/common/PalServer/Pal/Binaries/Win64/Mods"
  );
  const EnginePakModPath = path.join(
    __dirname,
    "./engine/steamapps/common/PalServer/Pal/Content/Paks"
  );

  // 啟動伺服器
  ipcMain.on("request-exec-server", (event, arg) => {
    // 這裡放置原有的 execServer 實現
    // 在 execServer 的 callback 中，使用 event.reply 发送数据回渲染器进程
    // 例如: event.reply('exec-server-response', data);
    const cmd = `${path.join(
      __dirname,
      "./engine/steamapps/common/PalServer/PalServer.exe"
    )}`;
    palserver = spawn(cmd);

    const currentSave = JSON.parse(
      fsc.readFileSync(path.join(EngineSavePath, ".pal"), { encoding: "utf-8" })
    ).saveId;

    event.reply("exec-server-response:done", currentSave);

    // 捕获标准输出并将其打印到控制台
    palserver.stdout.on("data", function (data) {
      console.log("standard output:\n" + data);
      event.reply("exec-server-response:data", currentSave, data);
    });

    // 捕获标准错误输出并将其打印到控制台
    palserver.stderr.on("data", function (data) {
      console.log("standard error output:\n" + data);
      event.reply("exec-server-response:error", currentSave, data);
    });

    // 注册子进程关闭事件
    palserver.on("exit", function (code, signal) {
      console.log("child process eixt ,exit:" + code);
      event.reply("exec-server-response:exit", currentSave, code);
    });
  });
  // 更新伺服器
  ipcMain.on("request-update-server", (event) => {
    const cmd = path.join(__dirname, "./engine/steamcmd.exe");
    palserverUpdate = spawn(cmd, [
      "+login",
      "anonymous",
      "+app_update",
      "2394010",
      "validate",
      "+quit",
    ]);

    palserverUpdate.on("exit", function (code, signal) {
      console.log("child process eixt ,exit:" + code);
      event.reply("update-server-response:done", code);
    });
  });
  // 請求當前伺服器世界設定
  ipcMain.on("request-world-settings", async (event, arg) => {
    const SettingsPath = path.join(
      __dirname,
      "./engine/steamapps/common/PalServer/Pal/Saved/Config/WindowsServer/PalWorldSettings.ini"
    );
    const SettingsFile = await fs.readFile(SettingsPath, { encoding: "utf-8" });
    const Settings = palServerSettingConverter.parse(
      ini.parse(SettingsFile)["/Script/Pal"].PalGameWorldSettings.OptionSettings
    );
    event.reply("world-settings-response", Settings);
  });
  //請求單個存檔
  ipcMain.on(`request-save`, async (event, savePath) => {
    const SaveSettingsPath = path.join(
      SaveRootPath,
      savePath,
      "./Config/WindowsServer/PalWorldSettings.ini"
    );
    const SaveSettingsFile = await fs.readFile(SaveSettingsPath, {
      encoding: "utf-8",
    });
    const SaveSettings = palServerSettingConverter.parse(
      ini.parse(SaveSettingsFile)["/Script/Pal"].PalGameWorldSettings
        .OptionSettings
    );

    event.reply(`save-response-${savePath}`, {
      savePath,
      settings: SaveSettings,
    });
  });
  // 設置存檔
  ipcMain.on("request-set-save", async (event, savePath, data, mode = "w") => {
    const SaveSettingsPath = path.join(
      SaveRootPath,
      savePath,
      "./Config/WindowsServer/PalWorldSettings.ini"
    );
    if (!existsSync(SaveSettingsPath) && mode === "w") {
      // 建立存檔
      await fs.cp(
        path.join(__dirname, "./.save-template"),
        path.join(__dirname, `./saves/${savePath}`),
        { recursive: true }
      );
      // 建立資訊文件
      await fs.writeFile(
        path.join(SaveRootPath, savePath, ".pal"),
        JSON.stringify({ saveId: savePath }),
        { encoding: "utf-8" }
      );
    }
    const SaveSettingsFile = await fs.readFile(SaveSettingsPath, {
      encoding: "utf-8",
    });
    // console.log(palServerSettingConverter.parse(ini.parse(SaveSettingsFile)["/Script/Pal"].PalGameWorldSettings.OptionSettings))
    const prevSaveSettings = palServerSettingConverter.parse(
      ini.parse(SaveSettingsFile)["/Script/Pal"].PalGameWorldSettings
        .OptionSettings
    );
    const SaveSettings = { ...prevSaveSettings, ...data.settings };
    await fs.writeFile(
      SaveSettingsPath,
      ini.stringify({
        "/Script/Pal": {
          PalGameWorldSettings: {
            OptionSettings: palServerSettingConverter.format(SaveSettings),
          },
        },
      }),
      { encoding: "utf-8" }
    );
    event.reply(`save-response-${savePath}`, {
      savePath,
      settings: SaveSettings,
    });
  });
  // 請求存檔資訊
  ipcMain.on("request-save-metadata", async (event, arg) => {
    event.reply(
      "save-metadata-response",
      JSON.parse(
        fsc.readFileSync(path.join(__dirname, "./saves/meta.json"), {
          encoding: "utf-8",
        })
      )
    );
  });
  // 設置存檔資訊
  ipcMain.on("request-set-save-metadata", async (event, data) => {
    await fs.writeFile(
      path.join(__dirname, "./saves/meta.json"),
      JSON.stringify(data),
      {
        encoding: "utf-8",
      }
    );
    event.reply(
      "save-metadata-response",
      JSON.parse(
        fsc.readFileSync(path.join(__dirname, "./saves/meta.json"), {
          encoding: "utf-8",
        })
      )
    );
  });
  // 將當前存檔存入引擎
  ipcMain.on("request-set-save-to-engine", async (event, savePath) => {
    const SavePath = path.join(SaveRootPath, savePath);
    if (fsc.existsSync(SavePath)) {
      // 將存檔確實清空
      fsc.rmSync(path.join(EngineSavePath, "/SaveGames"), {
        recursive: true,
        force: true,
      });
      await fs.cp(SavePath, EngineSavePath, { recursive: true, force: true });
      event.reply("set-save-to-engine-response:done", { savePath });
    }
  });
  // 將引擎內存檔導出保存
  ipcMain.on("request-set-engine-to-save", async (event) => {
    const dotPalPath = path.join(EngineSavePath, ".pal");

    if (dotPalPath) {
      const currentSave = JSON.parse(
        fsc.readFileSync(dotPalPath, { encoding: "utf-8" })
      ).saveId;
      const SavePath = path.join(SaveRootPath, currentSave, "SaveGames");
      if (fsc.existsSync(SavePath)) {
        await fs.cp(path.join(EngineSavePath, "SaveGames"), SavePath, {
          recursive: true,
          force: true,
        });
        event.reply("set-engine-to-save-response:done", {
          savePath: currentSave,
        });
      }
    } else {
      event.reply("set-engine-to-save-response:done", { savePath: null });
    }
  });
  // 讀取 lua 模組
  ipcMain.on("request-lua-mods", async (event) => {
    const modNames = (await fs.readdir(EngineLuaModPath)).filter(
      (mod) => mod !== "mods.txt"
    );
    const modsTXT = await fs.readFile(path.join(EngineLuaModPath, "mods.txt"), {
      encoding: "utf-8",
    });

    const modsStats = {};

    modsTXT.split("\n").forEach((modOption) => {
      modsStats[modOption.split(":")[0]] = modOption.split(":")[1] === "1";
    });

    event.reply("lua-mods-response", {
      mods: modNames.map((modName) => ({
        name: modName,
        enabled: modsStats[modName],
      })),
    });
  });

  // 啟用 / 禁用 lua 模組
  ipcMain.on("request-enabled-lua-mods", async (event, modName, enabled) => {
    const modsTXT = await fs.readFile(path.join(EngineLuaModPath, "mods.txt"), {
      encoding: "utf-8",
    });

    const modsStats = {};

    modsTXT.split("\n").forEach((modOption) => {
      modsStats[modOption.split(":")[0]] = modOption.split(":")[1] === "1";
    });

    modsStats[modName] = enabled;

    let modsStatsTxt = "";

    forEach(modsStats, (v, k) => {
      modsStatsTxt += `${k}:${v ? 1 : 0}\n`;
    });

    await fs.writeFile(
      path.join(EngineLuaModPath, "mods.txt"),
      modsStatsTxt.trim(),
      {
        encoding: "utf-8",
      }
    );
  });

  // 讀取 pak 模組
  ipcMain.on("request-pak-mods", async (event) => {
    const modNames = (await fs.readdir(EnginePakModPath)).filter(
      (mod) => mod !== "Pal-WindowsServer.pak"
    );

    event.reply("pak-mods-response", {
      mods: modNames.map((modName) => ({
        name: modName,
      })),
    });
  });

  // 倒出客戶端模組
  ipcMain.on("request-export-clientside-mods", async (event) => {

    const ClientSideModPath = path.join(__dirname, "./.clientside-mods")
    const ClientSideLuaModPath = path.join(ClientSideModPath, "./Pal/Binaries/Win64/Mods")
    const ClientSidePakModPath = path.join(ClientSideModPath, "./Pal/Content/Paks")
    // 將上次生成的 lua 模組清空
    fsc.rmSync(ClientSideLuaModPath, {
      recursive: true,
      force: true,
    })
    // 將上次生成的 pak 模組清空
    fsc.rmSync(ClientSidePakModPath, {
      recursive: true,
      force: true,
    })

    // 生成中 ... 
    await Promise.all([
      fs.cp(EngineLuaModPath, ClientSideLuaModPath, {
        recursive: true,
        force: true,
      }),
      fs.cp(EnginePakModPath, ClientSidePakModPath, {
        recursive: true,
        force: true,
      })])

    event.reply("export-clientside-mods-response:done", {})


  })
}

app.whenReady().then(createMainWindow);
