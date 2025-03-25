/* eslint-disable no-template-curly-in-string */
/* eslint-disable camelcase */

import game_data_pals_zh_tw from './pal';
import game_data_items_zh_tw from './item';

const zh_tw = {
  ...game_data_items_zh_tw,
  ...game_data_pals_zh_tw,
  ServerIsRunning: '伺服器執行中',
  Server: '伺服器',
  BootServer: '啟動伺服器',
  EditServer: '編輯伺服器',
  CreateServer: '建立伺服器',
  DeleteServer: '刪除伺服器',
  DeleteServerDesc: '刪掉伺服器後，存檔和所有資料都會不見。請再三考慮。',
  PleaseEnterServerName: '請輸入伺服器名稱',
  OthersEnterIP: '這是其他玩家輸入的 IP 位址',
  YourselfEnterIP: '這是你自己輸入的 IP 位址',
  HaventSavedYet: '尚未設定',
  LuaMods: 'Lua 模組',
  PakMods: 'Pak 模組',
  PakLogicMods: 'LogicMods 模組',
  Mod: '模組',
  Disabled: '停用',
  Enabled: '啟用',
  Cancel: '取消',
  Confirm: '確定',
  Create: '新增',
  VerifyChange: '確定修改',
  VerifyDelete: '確定刪除',
  EditFromSourceFile: '編輯原始檔',
  SourceCode: '原始碼',
  ServerIsUpdating: '伺服器更新中，請稍候',
  UpdateServerToLatestVersion: '將伺服器更新到最新版',
  ServerUpdateDone: '伺服器更新完成！',
  OpenModsFolder: '開啟模組資料夾',
  HowToImportMods: '如何匯入 ${1} 模組?',
  HowToImportLuaModsDesc1:
    'Lua 模組是幻獸帕魯使用的模組。要安裝已下載的模組請點擊「開啟模組資料夾」按鈕，並將模組放入該資料夾中即可完成安裝。',
  HowToImportLuaModsDesc2:
    '初次安裝的模組預設為「停用」，需對模組點擊右鍵啟用。並且玩家也要安裝才行。',
  HowToImportPakModsDesc1:
    'Pak 模組是幻獸帕魯使用的模組。要安裝已下載的模組請點擊「開啟模組資料夾」按鈕，並將模組放入該資料夾中即可完成安裝。',
  HowToImportPakModsDesc2:
    '請注意，Pal-WindowsServer.pak 不能被修改、刪除或重新命名。另外玩家也需要安裝模組。',
  Difficulty: '難度',
  DayTimeSpeedRate: '白天流逝速度',
  NightTimeSpeedRate: '夜晚流逝速度',
  ExpRate: '經驗值倍率',
  PalCaptureRate: '捕獲機率倍率',
  PalSpawnNumRate: '帕魯出現數量倍率',
  PalDamageRateAttack: '帕魯攻擊傷害倍率',
  PalDamageRateDefense: '帕魯承受傷害倍率',
  PalStomachDecreaceRate: '帕魯飽食度降低倍率',
  PalStaminaDecreaceRate: '帕魯耐力降低倍率',
  PalAutoHPRegeneRate: '帕魯生命值自然回復倍率',
  PalAutoHpRegeneRateInSleep: '帕魯睡眠時自然回復倍率',
  PlayerDamageRateAttack: '玩家攻擊傷害倍率',
  PlayerDamageRateDefense: '玩家承受傷害倍率',
  PlayerStomachDecreaceRate: '玩家飽食度降低倍率',
  PlayerStaminaDecreaceRate: '玩家耐力降低倍率',
  PlayerAutoHPRegeneRate: '玩家生命值自然回復倍率',
  PlayerAutoHpRegeneRateInSleep: '玩家睡眠時自然回復倍率',
  BuildObjectDamageRate: '對建築傷害倍率',
  BuildObjectDeteriorationDamageRate: '建築物的劣化速度倍率',
  DropItemMaxNum: '世界內的掉落物上限',
  // 道具採集量倍率
  CollectionObjectHpRate: '可採集物品生命值倍率',
  CollectionObjectRespawnSpeedRate: '可採集物品的重生間隔',
  CollectionDropRate: '道具掉落量倍率',
  PalEggDefaultHatchingTime: '巨大蛋孵化所需時間',
  // 是否會發生襲擊事件？
  DeathPenalty: '死亡懲罰',
  DeathPenalty_All: '所有',
  DeathPenalty_None: '無',
  DeathPenalty_Item: '僅道具',
  DeathPenalty_ItemAndEquipment: '道具和裝備',
  GuildPlayerMaxNum: '公會人數上限',

  EnemyDropItemRate: '敵人掉落物品倍率',
  bEnablePlayerToPlayerDamage: '是否會對玩家造成傷害',
  bEnableFriendlyFire: '是否會對友軍造成傷害',
  bEnableInvaderEnemy: '是否會發生襲擊事件',
  bActiveUNKO: '',
  bEnableAimAssistPad: '啟動手柄瞄準輔助',
  bEnableAimAssistKeyboard: '啟動鍵盤瞄準輔助',

  DropItemMaxNum_UNKO: '',
  BaseCampMaxNum: '最大據點數量',
  BaseCampWorkerMaxNum: '據點工作帕魯數量上限',

  DropItemAliveMaxHours: '掉落物要持續存在幾個小時',
  bAutoResetGuildNoOnlinePlayers: '是否自動清除公會裡長時間不在線上的玩家',
  AutoResetGuildTimeNoOnlinePlayers: '多少小時就清除公會裡不在線上的玩家',
  WorkSpeedRate: '工作速度倍率',
  bIsMultiplay: '是否開啟多人遊戲',
  bIsPvP: '是否開啟 PVP',
  bCanPickupOtherGuildDeathPenaltyDrop: '是否可以撿其他公會玩家的死亡掉落物',
  bEnableNonLoginPenalty: '啟用都不登入的懲罰',
  bEnableFastTravel: '啟用快速旅行',
  bIsStartLocationSelectByMap: '根據地圖選擇起始位置',
  bExistPlayerAfterLogout: '當伺服器沒人在線上時是否自動關服',
  bEnableDefenseOtherGuildPlayer: '啟用防禦其他公會玩家',
  CoopPlayerMaxNum: '合作玩家數上限',
  ServerPlayerMaxNum: '玩家數上限',
  ServerName: '伺服器名稱',
  ServerDescription: '伺服器描述',
  AdminPassword: '管理員密碼',
  ServerPassword: '伺服器密碼',
  PublicPort: '端口號',
  PublicIP: 'IP 位址',
  LocalIP: '本機 IP',
  RCONEnabled: '啟用 RCON',
  RCONPort: 'RCON 端口',
  RESTAPIEnabled: '啟用 REST API',
  RESTAPIPort: 'REST API 端口',
  bShowPlayerList: '展示玩家列表',
  Region: '地區',
  bUseAuth: '使用身分驗證',
  BanListURL: '封鎖名單網址',
  SwitchOn: '開啟',
  SwitchOff: '關閉',
  //
  WorldSettings: '修改世界設定',
  ModsTool: '模組管理器',
  OpenServerFolder: '開啟伺服器資料夾',
  GoBack: '回上一頁',
  OpenServerFolderDesc:
    '特別注意不要動到資料夾內的 .pal 檔案。否則可能造成伺服器無法正確啟動的情況。',
  //
  ExportModsToClientSide: '匯出模組到遊戲',
  ExportModsToClientSideDesc1:
    '遊戲跟伺服器都要安裝模組才行。點擊「匯出」會產生伺服器安裝的模組之客戶端版本。',
  ExportModsToClientSideDesc2:
    '將產生的內容複製貼上到 steam 本機檔案 (點選取代全部) 即可完成安裝。',
  Export: '匯出',
  FAQ: '常見問題',
  NewUpdate: '有新版更新！(請下載最新版 ${1} 補丁)',
  // 20240214
  MigrateDedicatedServer: '遷移專用伺服器',
  MigrateDedicatedServerToGUI: '將專用伺服器遷移到 GUI',
  MigrateDedicatedServerDesc1:
    '您可以將已存在的專用伺服器遷移到 palserver GUI。',
  MigrateDedicatedServerDesc2: '找到原先 steamcmd 的存檔路徑 (圖左上)。',
  MigrateDedicatedServerDesc3:
    '點擊右下角黃色按鈕「開啟伺服器資料夾」，打開 GUI 伺服器路徑 (圖右下)，並將裡面除了 .pal 之外的資料夾或檔案全部刪除。',
  MigrateDedicatedServerDesc4:
    '將 steamcmd 中的內容，複製貼上到 GUI 的伺服器資料夾。',
  MigrateDedicatedServerDesc5: '恭喜完成遷移，啟動伺服器後就可以進去遊玩咯！',
  MigrateFourPlayersSave: '遷移本機存檔 (四人邀請碼)',
  MigrateFourPlayersSaveToGUI: '將本機存檔遷移到 GUI',
  MigrateFourPlayersSaveDesc1: '您可以將遊戲中的存檔遷移到 palserver GUI。',
  MigrateFourPlayersSaveDesc2:
    '進入遊戲後點「開始遊戲」，選中要遷移的存檔，點擊左下角檔案圖示，將裡頭除了 WorldOption.sav 以外的所有檔案複製。',
  MigrateFourPlayersSaveDesc3: '點擊右下角黃色按鈕「開啟存檔資料夾」。',
  MigrateFourPlayersSaveDesc4: '將剛剛複製的內容貼上 (若需要擇點選取代全部)。',
  MigrateFourPlayersSaveDesc5:
    '啟動伺服器遊玩一段時間後關閉，並注意 Players 資料夾中多出來的檔案。',
  MigrateFourPlayersSaveDesc6:
    '安裝 Python 執行環境 (到微軟商店或官網，需點選 add python.exe to path)。',
  MigrateFourPlayersSaveDesc7:
    '下載轉檔工具 https://github.com/Dalufishe/palworld-host-save-fix/archive/refs/heads/main.zip，解壓縮後在該路徑上開啟終端命令視窗 (cmd)，並輸入 pip install palworld-save-tools==0.17.1。',
  MigrateFourPlayersSaveDesc8: `在終端命令行輸入 python fix-host-save.py "這邊輸入存檔路徑 (點開黃色按鈕的路徑) " "多出來的玩家檔案名稱 (忽略 .sav)" "00000000000000000000000000000001" True 並點兩下 Enter 鍵。`,
  MigrateFourPlayersSaveDesc9: '等 Python 腳本執行完畢後，啟動伺服器。',
  MigrateFourPlayersSaveDesc10:
    '恭喜你成功完成遷移，啟動伺服器後就可以進去遊玩咯！',
  MigrateFourPlayersSaveDesc11:
    '四人操作流程相對複雜，若有需要，您可以在 palserver-GUI discord 群提問：https://discord.com/invite/sgMMdUZd3V',
  OpenSaveFolder: '開啟存檔資料夾',
  SupportMe: '支持我的工作',
  SupportMeDesc:
    'palserver GUI 永遠免費並持續維護。您不需要為使用應用程式收費，然而，若您樂意支持我們的工作，不妨考慮請我喝杯咖啡，將是我們莫大的鼓勵。',
  // 20240217
  CloseServer: '關閉伺服器',
  BanList: '黑名單',
  BanListLong: '黑名單列表',
  UnBan: '解除',
  Dashboard: '管理面板',
  Setting: '設定',
  RAM: '記憶體',
  OnlinePlayer: '在線玩家',
  KickPlayer: '踢出',
  KickPlayerDesc: '確定踢出 ${1}? 此舉動將會將 ${2} 從伺服器移除。',
  ConfirmKick: ' 確認踢出',
  Ban: '封鎖',
  BanDesc: '確定封鎖 ${1}? 此舉動將會將 ${2} 從伺服器移除。',
  ConfirmBan: ' 確認封鎖',
  Send: '送出',
  EnterCommandOrBoardCast: '輸入指令或廣播訊息 . . .',
  PlayerName: '玩家名稱',
  PlayerID: '玩家 ID',
  Other: '其他',
  // 20240218
  // RCONEnabledDesc: '您需要啟用遠端控制台 (RCON) 才能使用管理面板功能。',
  RCONFirst: '請先啟用 RCON 才能開啟此功能。',
  ServerBackupRecord: '伺服器存檔備份紀錄',
  Open: '開啟',
  // 20240226
  SupportBy: '由 <u>${1}</u> 進行供電',
  // 20240227
  MigrateSaveDesc: '若您需要遷移存檔，請前往設定進行操作。',
  OpenFilePath: '開啟檔案位置',
  //
  Rename: '重新命名',
  DeleteMod: '刪除模組',
  SetTime: '設定時間',
  HourPerTime: '小時',
  UpdateLog: '更新日誌',
  OpenToCommunity: '公開到社群選單',
  PalSettings: '帕魯設定',
  PlayerSettings: '玩家設定',
  GuildSettings: '公會設定',
  OthersSettings: '其它設定',
  HasNotASCIIPath:
    '您的 palserver GUI 路徑可能存在中文或非 ASCII 字元，請將其修改才可完成下載或更新。路徑名稱',
  // 20240410
  ChangeIcon: '變更圖示',
  CopyServer: '複製伺服器',
  DuplicateServer: '複製伺服器',
  DuplicateServerDesc: '複製將會包含所有設定檔、模組及世界檔案：',
  ExportServer: '匯出伺服器',
  CreateRemoteServer: '建立遠端連接',
  ChangeServerIcon: '變更伺服器圖示',
  OpenFolder: '其他檔案位置',
  ServerFolder: '伺服器資料夾',
  InstanceFolder: '實例資料夾',
  SaveFolder: '存檔資料夾',
  WorldSaveFolder: '世界檔資料夾',
  PalConfigFolder: '設定檔資料夾',
  ServerInstanceFolder: 'GUI 實例資料夾',
  WorldSettingsFolder: '世界設定檔案',
  ImportServer: '導入伺服器',
  FourPlayerSave: '遊戲存檔',
  DedicatedServer: '專用伺服器',
  ServerInstance: 'GUI 實例',
  Reset: '重置',
  SwitchToServer: '切換到伺服器',
  SwitchToAll: '切換到整體',
  PlayerLocation: '玩家座標',
  PlayerId: '玩家 ID',
  Performance: '效能',
  Internet: '網路',
  Security: '安全性',
  Restart: '重啟',
  ServerNeedUpgrade: '更新伺服器到最新版！',
  ServerNeedUpgradeDesc: '將伺服器版本更新到最新可遊玩版本。',
  PerformanceOptimizationEnabled: '效能最佳化',
  PerformanceOptimizationEnabledDesc:
    '解除幀率限制，加強網路，並提高多執行緒 CPU 環境中的效能。',
  PerformanceMonitorEnabled: '啟用效能監測',
  PerformanceMonitorEnabledDesc:
    '對伺服器及電腦的效能、數值監測系統及顯示畫面。開啟後會稍微占用效能。',
  PerformanceMonitorAnimationEnabled: '效能監測動畫',
  PerformanceMonitorAnimationEnabledDesc:
    '是否對效能監測啟用動畫。會稍微占用效能。開啟後會稍微占用效能。',
  RCONEnabledDesc: '啟用遠端控制 RCON。我們強烈建議您打開以體驗完整功能。',
  RESTAPIEnabledDesc:
    '啟用 REST API 伺服器。我們強烈建議您打開以體驗完整功能。',
  PublicPortDesc: '伺服器公開端口號。',
  RCONPortDesc: '遠端控制 RCON 端口號。',
  RESTAPIPortDesc: 'REST API 網路端口號。',
  ModManagementEnabled: '啟用模組選單',
  ModManagementEnabledDesc:
    '啟用 palserver GUI 的伺服器模組管理器。支援 Lua、Pak 及 dll 檔管理，並支援匯出到客戶端 (遊戲)。',
  UE4SSEnabled: '啟用 UE4SS',
  UE4SSEnabledDesc:
    'UE4/5 的可注入的 Lua 腳本系統、SDK 生成器、即時屬性編輯器。部分模組依賴 UE4SS。',
  PalguardEnabled: '啟用 Palguard',
  PalguardEnabledDesc:
    'Palguard 插件提供防作弊檢測、伺服器日誌及更多管理員指令。我們建議您將他開啟以體驗完整功能。',
  EngineInstalling: '系統安裝進行中... 請勿關閉視窗',
  EngineInstallFinish: '系統安裝完成',
  NoServer: '暫無伺服器，請點擊右鍵新增或導入。',
  ServerHasNoPlayers: '伺服器沒有玩家',
  ServerHasNoLog: '暫時沒有紀錄',
  ServerPlayers: '伺服器玩家',
  ServerLog: '伺服器日誌',
  PerformanceMonitor: '效能監測',
  ServerManagement: '伺服器管理',
  ServerSettings: '伺服器設定',
  Schedule: '排程',
  CommandsList: '指令表',
  OpenToCommunityDesc: '將伺服器公開到遊戲中的社群選單列表。',
  SomeMightRestartToApplyChange: '某些設定項需要重啟才能生效！',
  Language: '語言',
  LanguageDesc: '幫助我們翻譯 palserver GUI。',
  OfficalWebsite: '官方網站',
  ServerBackupDesc: '伺服器備份存檔位置，復原遊玩紀錄。',
  ServerPasswordDesc: '為伺服器設置密碼。',
  AdminPasswordDesc: '設置管理員密碼。',
  AutoRestart: '自動重啟',
  AutoRestartDesc: '每隔一段時間時重新啟動伺服器。需啟用 RCON 才能使用。',
  CrashRestart: '崩潰重啟',
  CrashRestartDesc: '在伺服器崩潰時重新啟動伺服器。需啟用 RCON 才能使用。',
  OverRamRestart: '超過閥值重啟',
  OverRamRestartDesc: '在伺服器記憶體使用率超過 90% 時重新啟動伺服器。',
  All: '整體',
  UpTime: '運行時間',
  AppSettings: '應用程式設定',
  MoreActions: '其他操作',
  AdvancedActions: '進階操作',
  Set: '設置',
  SetAsAdmin: '設置為管理員',
  SetAsAdminDesc:
    '將 ${1} 設置為伺服器管理員。\n需要到 Palguard 設定將 "useAdminWhitelist" 設定為 false 才能使用。',
  Kick: '踢出',
  KickDesc: '踢出該用戶',
  BanIP: '封鎖 ${1} 的 IP 地址',
  GiveItem: '給予道具',
  GivePlayerItem: '給予 ${1} 道具',
  GiveItemDesc: '給予 ${1} 指定數量的遊戲道具。',
  Choose: '選擇',
  GivePal: '給予帕魯',
  GivePlayerPal: '給予 ${1} 帕魯',
  GivePalDesc: '給予 ${1} 指定帕魯。',
  GiveExp: '給予經驗值',
  GivePlayerExp: '給予 ${1} 經驗值',
  GiveExpDesc: '給予 ${1} 指定數量的經驗值。',
  ClickLink: '點擊連結',
  //
  OpenFolder2: '開啟資料夾',
  UE4SSNeedUpgrade: 'UE4SS 需要更新！',
  UE4SSNeedUpgradeDesc: '將 UE4SS 更新到最新版，否則有些模組可能失效。',
  PalguardNeedUpgrade: 'Palguard 需要更新！',
  PalguardNeedUpgradeDesc: '將 Palguard 更新到最新版，否則有些功能可能失效。',
  Update: '更新',
  ModManagement: '模組插件管理',
  AddLuaMod: '新增 Lua模組',
  OpenLuaModFolder: '開啟模組資料夾',
  OtherExtensions: '額外擴展',
  OnlineMap: '線上地圖',
  OnlineMapDesc: '實時查看在線玩家遊戲位置。',
  LogEnabled: '啟用日誌',
  LogEnabledDesc: '支援 Palguard 日誌顯示玩家進出，聊天訊息等。',
  PalguardSettings: 'Palguard 設定',
  PalguardSettingsDesc: '開啟 palguard.json 插件相關設置介面。',
  LogFolder: '日誌資料夾',
  //
  ClearCache: '清除暫存',
  ClearCacheDesc:
    '若伺服器無法啟動，請嘗試刪除該伺服器，清除暫存後，重新啟動 palserver GUI，建立伺服器後再嘗試啟動伺服器。',
  Clear: '清除',
  ServerInstancePath: '伺服器列表路徑 "需重新啟動"',
  Change: '修改',
  //
  ImportGameSaves: '導入遊戲存檔',
  HowToImportDedicatedServer: '如何導入專用伺服器 (Windows / Linux)？',
  HowToImportFourPlayerSaves: '如何導入本機存檔 (四人邀請碼)？',
  HelpPlzJoinUs: '疑難排解 - 請加入我們的',
  SpecialThanks: '特別感謝',
  SpeicalThanksDesc: '感謝所有的開發人員、贊助者、小幫手及使用 GUI 的大家。',
  BuyMeACoffee: '請我喝杯咖啡',
  //
  Process: '進程',
  UseIndependentProcess: '使用獨立進程',
  UseIndependentProcessDesc:
    '當您的伺服器經常發生非預期性的崩潰時，請開啟此選項。預設情況下為開啟。開啟時伺服器與 GUI 為相互獨立的進程。若您需要使用效能監測面板，請關閉他。此時伺服器為 GUI 的子進程。',
  ServerVersion: '伺服器版本',
  SupportGUI: '贊助 GUI ❤️',
  //
  PlzCloseServerFirst: '請先關閉伺服器',
  BaseCampMaxNumInGuild: '各公會據點上限',
  bInvisibleOtherGuildBaseCampAreaFX: '隱藏其他公會區域',
  AutoSaveSpan: '自動存檔時間 (秒)',
  //11
  ServerCantUse: '伺服器 (無法使用)',
  //
  CrossplayPlatforms: '允許的連接平台',
  //20250115
  Give: '給予',
  GiveRelic: '給予翠葉鼠雕像',
  GiveRelicDesc: '給予 ${1} 指定數量的翠葉鼠雕像。',
  GiveTech: '給予科技點',
  GiveTechDesc: '給予 ${1} 指定數量的科技點。',
  GiveBossTech: '給予古代科技點',
  GiveBossTechDesc: '給予 ${1} 指定數量的古代科技點。',
  SupplyDropSpan: '補給掉落範圍',
  RandomizerType: '隨機化類型',
  RandomizerType_None: '無隨機',
  RandomizerType_1: '區域隨機',
  RandomizerType_2: '全域隨機',
  RandomizerSeed: '隨機種子',
  //
  ServerListFolder: '伺服器列表資料夾',
  DetailData: '詳細資料',
  ServerId: '伺服器 ID',
  ServerReplicatePawnCullDistance: '玩家和帕魯距離 (公分)',
  AllowConnectPlatform: '允許跨平台遊玩',
  bAllowGlobalPalboxExport: '允許從跨界帕魯終端匯出',
  bAllowGlobalPalboxImport: '允許從跨界帕魯終端匯入',
  bBuildAreaLimit: '禁止在結構附近建造',
  bHardcore: '啟用 Hardcore 模式',
  bIsRandomizerPalLevelRandom: '啟用隨機化 Pal 等級',
  bIsUseBackupSaveData: '啟用世界備份',
  bPalLost: '死亡永久丟失帕魯',
  BuildSettings: '建築物設定',
  DropSettings: '掉落物設定',
  // "FixCompleted": "修復完成！",
  ServerError: '伺服器存在異常',
  InstallCompleted: '安裝完成！',
  FirstTimeWelcome: '初次見面，歡迎您！',
  UpdateCompleted: '更新完成！',
  ServerNeedsUpdate: '遊戲存在新版本，伺服器需要更新',
  ServerFileFixCompleted: '專用伺服器檔案修復完成。',
  ServerFileMissing:
    '專用伺服器檔案存在缺失，可能是因為安裝過程中斷或檔案損毀。請嘗試修復專用伺服器。',
  ServerInstalledCompleted: '專用伺服器已安裝完成。',
  InstallReminder:
    '您必須先安裝專用伺服器，才能使用 Palserver-GUI。（初次安裝時間約 7 ~ 10 分鐘）。',
  AllServersUpdated: '所有專用伺服器均已更新至最新版本。',
  UpdateReminder:
    'Palworld 釋出新版本後，palserver-GUI 管理的專用伺服器（並非 palserver-GUI 本身）也需要更新。您可以選擇一次性更新所有伺服器，或逐一手動更新（可在伺服器管理頁面選擇）。',
  Close: '關閉',
  Fix: '修復',
  Install: '安裝',
  OneClickUpdate: '一次更新',
  //
  HowToGetIPAdress: '如何獲取 IP 位址？',
};

export default zh_tw;
