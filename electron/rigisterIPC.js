const { ipcMain } = require("electron");
const path = require("path");
const fs = require("fs/promises");
const fsc = require("fs");
const ini = require("ini");
const { spawn, exec } = require("child_process");
const palServerSettingConverter = require("./src/utils/palServerSettingConverter");
const { existsSync } = require("fs");
const { forEach } = require("lodash");
const getServerInfo = require("./src/palworld/getServerInfo")
const cheerio = require("cheerio");
const sendCommand = require("./src/palworld/sendCommand");
const getSaveMetaData = require("./src/utils/data/getSaveMetaData")

module.exports = function rigisterIPC() {
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
  const BackUpPath = path.join(__dirname, "./saves-backup")

  ipcMain.on("request-latest-version", (event) => {
    fetch(
      "https://firebasestorage.googleapis.com/v0/b/honkai-stargazer-bf382.appspot.com/o/palserver-GUI%2Fversion.txt?alt=media&token=b2c5b7fd-5664-404c-9a03-1b72d049dd98"
    )
      .then((data) => data.text())
      .then((data) => {
        event.reply("latest-version-response", data);
      });
  });

  // 啟動伺服器
  ipcMain.on("request-exec-server", async (event, arg) => {

    // 判斷當前引擎中存檔
    const currentSave = JSON.parse(
      fsc.readFileSync(path.join(EngineSavePath, ".pal"), { encoding: "utf-8" })
    ).saveId;

    // ue4ss 啟用
    let isEnabledUe4ss = (await getSaveMetaData()).filter(save => save.id == currentSave)[0]?.ue4ssEnabled
    if (typeof isEnabledUe4ss === "undefined") isEnabledUe4ss = true


    const dwmapidllLocation = path.join(EngineLuaModPath, "../")

    if (!isEnabledUe4ss) {
      if (existsSync(path.join(dwmapidllLocation, "dwmapi.dll")))
        await fs.rename(path.join(dwmapidllLocation, "dwmapi.dll"), path.join(dwmapidllLocation, "dwmapi.dll.disabled"))
    } else {
      if (existsSync(path.join(dwmapidllLocation, "dwmapi.dll.disabled")))
        await fs.rename(path.join(dwmapidllLocation, "dwmapi.dll.disabled"), path.join(dwmapidllLocation, "dwmapi.dll"))
    }

    const cmd = `${path.join(
      __dirname,
      "./engine/steamapps/common/PalServer/PalServer.exe"
    )}`;
    const palserver = spawn(cmd);

    event.reply("exec-server-response:done", currentSave);

    // 自動備份
    const backupTimer = setInterval(() => {
      const DistPath = path.join(BackUpPath, currentSave, Date.now().toString())
      fs.cp(EngineSavePath, DistPath, { recursive: true })
    }, 1000 * 60 * 5)


    // 當伺服器關閉時
    palserver.on("exit", function (code, signal) {
      event.reply("exec-server-response:exit", currentSave, code);
      clearInterval(backupTimer)
    });



  });
  // 更新伺服器
  ipcMain.on("request-update-server", (event) => {
    const cmd = path.join(__dirname, "./engine/steamcmd.exe");
    const palserverUpdate = spawn(cmd, [
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

    // currentSave
    const currentSave = JSON.parse(fsc.readFileSync(
      path.join(__dirname, "./engine/steamapps/common/PalServer/Pal/Saved/.pal"), { encoding: "utf-8" })
    ).saveId

    const isInEngine = currentSave === savePath

    // settings
    const SaveSettingsPath = isInEngine ?
      path.join(
        EngineSavePath,
        "./Config/WindowsServer/PalWorldSettings.ini") :
      path.join(
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

    // banlist
    const BanListPath =
      isInEngine ?
        path.join(
          EngineSavePath,
          "./SaveGames/banlist.txt") :
        path.join(
          SaveRootPath,
          savePath,
          "./SaveGames/banlist.txt")

    const BanListFile = existsSync(BanListPath) ? await fs.readFile(BanListPath, {
      encoding: "utf-8",
    }) : ""

    const BanList = BanListFile.trim() ? BanListFile.trim().split("\n").map(user => user.slice(6)) : []


    event.reply(`save-response-${savePath}`, {
      savePath,
      settings: SaveSettings,
      banList: BanList
    });
  });
  // 設置存檔
  ipcMain.on("request-set-save", async (event, savePath, data, mode = "w") => {

    // currentSave
    const currentSave = JSON.parse(fsc.readFileSync(
      path.join(__dirname, "./engine/steamapps/common/PalServer/Pal/Saved/.pal"), { encoding: "utf-8" })
    ).saveId

    const isInEngine = currentSave === savePath

    const SavePath = isInEngine ?
      EngineSavePath :
      path.join(
        SaveRootPath,
        savePath,
      );

    const SaveSettingsPath = isInEngine ?
      path.join(
        EngineSavePath,
        "./Config/WindowsServer/PalWorldSettings.ini") :
      path.join(
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
    const prevSaveSettings = palServerSettingConverter.parse(
      ini.parse(SaveSettingsFile)["/Script/Pal"].PalGameWorldSettings
        .OptionSettings
    );
    const SaveSettings = { ...prevSaveSettings, ...data.settings };

    // 寫入 .ini
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
      const SavePath = path.join(SaveRootPath, currentSave);
      if (fsc.existsSync(SavePath)) {
        await fs.cp(path.join(EngineSavePath), SavePath, {
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
      modsStatsTxt += `${k}: ${v ? 1 : 0}\n`;
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
    const ClientSideModPath = path.join(__dirname, "./.clientside-mods");
    const ClientSideLuaModPath = path.join(
      ClientSideModPath,
      "./Pal/Binaries/Win64/Mods"
    );
    const ClientSidePakModPath = path.join(
      ClientSideModPath,
      "./Pal/Content/Paks"
    );
    // 將上次生成的 lua 模組清空
    fsc.rmSync(ClientSideLuaModPath, {
      recursive: true,
      force: true,
    });
    // 將上次生成的 pak 模組清空
    fsc.rmSync(ClientSidePakModPath, {
      recursive: true,
      force: true,
    });

    // 生成中 ...
    await Promise.all([
      fs.cp(EngineLuaModPath, ClientSideLuaModPath, {
        recursive: true,
        force: true,
      }),
      fs.cp(EnginePakModPath, ClientSidePakModPath, {
        recursive: true,
        force: true,
      }),
    ]);

    await fs.rm(path.join(ClientSidePakModPath, "Pal-WindowsServer.pak"));

    event.reply("export-clientside-mods-response:done", {});
  });

  // 請求伺服器資訊
  ipcMain.on("request-server-info", async (event, { ipAddress, port, password }) => {
    const serverOptions = {
      ipAddress,
      port,
      password,
    };
    const serverInfo = await getServerInfo(serverOptions)
    event.reply("server-info-response", serverInfo);
  });

  // 執行 rcon 指令
  ipcMain.on("request-rcon-command", async (event, { ipAddress, port, password }, command) => {
    const serverOptions = {
      ipAddress,
      port,
      password,
    };
    const response = await sendCommand(serverOptions, command)
    console.log(response)
    event.reply("rcon-command-response", response)
  })

  // 取得 steam 資料
  ipcMain.on("request-steam-data", async (event, steamId) => {
    const res = await fetch("https://steamid.tatlead.com/" + steamId)
    const data = await res.text()
    const $ = cheerio.load(data)
    const userName = $("#personaname").val()
    const avatarUrl = $("#avatar").val()
    event.reply("steam-data-response", { userName, avatarUrl })

  })

  // 解除封鎖 steam 玩家
  ipcMain.on("request-unban-user", async (event, savePath, steamId) => {

    // currentSave
    const currentSave = JSON.parse(fsc.readFileSync(
      path.join(__dirname, "./engine/steamapps/common/PalServer/Pal/Saved/.pal"), { encoding: "utf-8" })
    ).saveId

    const isInEngine = currentSave === savePath

    // settings
    const SaveSettingsPath = isInEngine ?
      path.join(
        EngineSavePath,
        "./Config/WindowsServer/PalWorldSettings.ini") :
      path.join(
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

    // banlist
    const BanListPath =
      isInEngine ?
        path.join(
          EngineSavePath,
          "./SaveGames/banlist.txt") :
        path.join(
          SaveRootPath,
          savePath,
          "./SaveGames/banlist.txt")

    const BanListFile = existsSync(BanListPath) ? await fs.readFile(BanListPath, {
      encoding: "utf-8",
    }) : ""

    const BanList = BanListFile.trim() ? BanListFile.trim().split("\n").map(user => user.slice(6)) : []

    const BanListAfterUnBan = BanList.filter(user => user !== steamId)

    const BanListFileAfterUnBan = BanListAfterUnBan.map(user => "steam_" + user).join("\n")



    await fs.writeFile(BanListPath, BanListFileAfterUnBan, { encoding: "utf-8" })

    event.reply(`save - response - ${savePath}`, {
      savePath,
      settings: SaveSettings,
      banList: BanList
    });

  })

  

}

