const { app, BrowserWindow, dialog } = require("electron");
const { ipcMain } = require('electron');
const url = require("url");
const path = require("path");
const fs = require("fs/promises");
const fsc = require("fs")
const ini = require("ini")
const { spawn } = require("child_process");
const palServerSettingConverter = require("./utils/palServerSettingConverter");
const { existsSync } = require("fs");


function createMainWindow() {
    const mainWindow = new BrowserWindow({
        title: "palserver GUI",
        width: 1000,
        height: 600,
        icon: path.join(__dirname + './assets/palserver.ico'),
        webPreferences: {
            contextIsolation: true,
            nodeIntegration: true,
            preload: path.join(__dirname, "preload.js"),
        },
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

    rigisterIPC()

    mainWindow.on('close', async (e) => {
        e.preventDefault()

        const { response } = await dialog.showMessageBox(mainWindow, {
            type: 'question',
            title: '  溫馨提醒  ',
            message: '請確認關閉所有正在運行的帕魯伺服器，否則可能會造成存檔丟失。',
            buttons: ['Yes', 'No'],
        })

        response === 0 && mainWindow.destroy()


    });

}

function rigisterIPC() {

    const SaveRootPath = path.join(__dirname, "./saves")
    const EngineSavePath = path.join(__dirname, "./engine/PalServer/Pal/Saved")



    // 啟動伺服器
    ipcMain.on('request-exec-server', (event, arg) => {
        // 這裡放置原有的 execServer 實現
        // 在 execServer 的 callback 中，使用 event.reply 发送数据回渲染器进程
        // 例如: event.reply('exec-server-response', data);
        const cmd = `${path.join(__dirname, "./engine/PalServer/PalServer.exe")}`
        palserver = spawn(cmd);

        const currentSave = JSON.parse(fsc.readFileSync(path.join(EngineSavePath, ".pal"), { encoding: "utf-8" })).saveId

        event.reply('exec-server-response:done', currentSave);

        // 捕获标准输出并将其打印到控制台 
        palserver.stdout.on('data', function (data) {
            console.log('standard output:\n' + data);
            event.reply('exec-server-response:data', currentSave, data);
        });

        // 捕获标准错误输出并将其打印到控制台 
        palserver.stderr.on('data', function (data) {
            console.log('standard error output:\n' + data);
            event.reply('exec-server-response:error', currentSave, data);
        });

        // 注册子进程关闭事件 
        palserver.on('exit', function (code, signal) {
            console.log('child process eixt ,exit:' + code);
            event.reply('exec-server-response:exit', currentSave, code);
        });
    });
    // 請求當前伺服器世界設定
    ipcMain.on("request-world-settings", async (event, arg) => {
        const SettingsPath = path.join(__dirname, "./engine/PalServer/Pal/Saved/Config/WindowsServer/PalWorldSettings.ini")
        const SettingsFile = await fs.readFile(SettingsPath, { encoding: "utf-8" })
        const Settings = palServerSettingConverter.parse(ini.parse(SettingsFile)["/Script/Pal"].PalGameWorldSettings.OptionSettings)
        event.reply('world-settings-response', Settings);
    })
    //請求單個存檔
    ipcMain.on(`request-save`, async (event, savePath) => {

        const SaveSettingsPath = path.join(SaveRootPath, savePath, "./Config/WindowsServer/PalWorldSettings.ini");
        const SaveSettingsFile = await fs.readFile(SaveSettingsPath, { encoding: "utf-8" })
        const SaveSettings = palServerSettingConverter.parse(ini.parse(SaveSettingsFile)["/Script/Pal"].PalGameWorldSettings.OptionSettings)

        event.reply(`save-response-${savePath}`, {
            savePath,
            settings: SaveSettings

        });
    })
    // 設置存檔
    ipcMain.on("request-set-save", async (event, savePath, data, mode = "w") => {
        const SaveSettingsPath = path.join(SaveRootPath, savePath, "./Config/WindowsServer/PalWorldSettings.ini");
        if (!existsSync(SaveSettingsPath) && mode === "w") {
            // 建立存檔
            await fs.cp(path.join(__dirname, "./.save-template"), path.join(__dirname, `./saves/${savePath}`), { recursive: true })
            // 建立資訊文件
            await fs.writeFile(
                path.join(SaveRootPath, savePath, ".pal"),
                JSON.stringify({ saveId: savePath }),
                { encoding: "utf-8" })
        }
        const SaveSettingsFile = await fs.readFile(SaveSettingsPath, { encoding: "utf-8" })
        // console.log(palServerSettingConverter.parse(ini.parse(SaveSettingsFile)["/Script/Pal"].PalGameWorldSettings.OptionSettings))
        const prevSaveSettings = palServerSettingConverter.parse(ini.parse(SaveSettingsFile)["/Script/Pal"].PalGameWorldSettings.OptionSettings)
        const SaveSettings = { ...prevSaveSettings, ...data.settings }
        await fs.writeFile(SaveSettingsPath, ini.stringify({
            "/Script/Pal": {
                PalGameWorldSettings: { OptionSettings: palServerSettingConverter.format(SaveSettings) }

            }
        }), { encoding: "utf-8" })
        event.reply(`save-response-${savePath}`, {
            savePath,
            settings: SaveSettings,
        });
    })
    // 請求存檔資訊 
    ipcMain.on("request-save-metadata", async (event, arg) => {
        event.reply("save-metadata-response", JSON.parse(fsc.readFileSync(path.join(__dirname, "./saves/meta.json"), {
            encoding: "utf-8",
        })))
    })
    // 設置存檔資訊
    ipcMain.on("request-set-save-metadata", async (event, data) => {
        await fs.writeFile(path.join(__dirname, "./saves/meta.json"), JSON.stringify(data), {
            encoding: "utf-8",
        });
        event.reply("save-metadata-response", JSON.parse(fsc.readFileSync(path.join(__dirname, "./saves/meta.json"), {
            encoding: "utf-8",
        })))
    })
    // 將當前存檔存入引擎
    ipcMain.on("request-set-save-to-engine", async (event, savePath) => {
        const SavePath = path.join(SaveRootPath, savePath);
        if (fsc.existsSync(SavePath)) {
            // 將存檔確實清空
            fsc.rmSync(path.join(EngineSavePath, "/SaveGames"), { recursive: true, force: true })
            await fs.cp(SavePath, EngineSavePath, { recursive: true, force: true })
            event.reply("set-save-to-engine-response:done", { savePath })
        }
    })
    // 將引擎內存檔導出保存
    ipcMain.on("request-set-engine-to-save", async (event) => {
        const currentSave = JSON.parse(fsc.readFileSync(path.join(EngineSavePath, ".pal"), { encoding: "utf-8" })).saveId
        const SavePath = path.join(SaveRootPath, currentSave);
        if (fsc.existsSync(SavePath)) {
            await fs.cp(EngineSavePath, SavePath, { recursive: true, force: true })
            event.reply("set-engine-to-save-response:done", { savePath: currentSave })
        }
    })
}

app.whenReady().then(createMainWindow);

