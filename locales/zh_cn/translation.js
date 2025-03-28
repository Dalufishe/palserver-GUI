/* eslint-disable no-template-curly-in-string */
/* eslint-disable camelcase */

import game_data_items_zh_cn from './item';
import game_data_pals_zh_cn from './pal';

const zh_cn = {
  ...game_data_items_zh_cn,
  ...game_data_pals_zh_cn,
  ServerIsRunning: '服务器运行中',
  Server: '服务器',
  BootServer: '启动服务器',
  EditServer: '编辑服务器',
  CreateServer: '创建服务器',
  DeleteServer: '删除服务器',
  DeleteServerDesc: '删除服务器后，存档和所有数据都会丢失。请谨慎操作。',
  PleaseEnterServerName: '请输入服务器名称',
  OthersEnterIP: '这是其他玩家输入的 IP 地址',
  YourselfEnterIP: '这是你自己输入的 IP 地址',
  HaventSavedYet: '尚未设置',
  LuaMods: 'Lua 模组',
  PakMods: 'Pak 模组',
  PakLogicMods: 'LogicMods 模组',
  Mod: '模组',
  Disabled: '停用',
  Enabled: '启用',
  Cancel: '取消',
  Confirm: '确定',
  Create: '新增',
  VerifyChange: '确认修改',
  VerifyDelete: '确认删除',
  EditFromSourceFile: '编辑原始文件',
  SourceCode: '源代码',
  ServerIsUpdating: '服务器更新中，请稍候',
  UpdateServerToLatestVersion: '将服务器更新到最新版本',
  ServerUpdateDone: '服务器更新完成！',
  OpenModsFolder: '打开模组文件夹',
  HowToImportMods: '如何导入 ${1} 模组?',
  HowToImportLuaModsDesc1:
    'Lua 模组是幻兽帕鲁使用的模组。要安装已下载的模组，请点击“打开模组文件夹”按钮，并将模组放入该文件夹中即可完成安装。',
  HowToImportLuaModsDesc2:
    '初次安装的模组默认为“停用”，需右键点击模组启用。并且玩家也需要安装才行。',
  HowToImportPakModsDesc1:
    'Pak 模组是幻兽帕鲁使用的模组。要安装已下载的模组，请点击“打开模组文件夹”按钮，并将模组放入该文件夹中即可完成安装。',
  HowToImportPakModsDesc2:
    '请注意，Pal-WindowsServer.pak 不能被修改、删除或重命名。另外玩家也需要安装模组。',
  Difficulty: '难度',
  DayTimeSpeedRate: '白天流逝速度',
  NightTimeSpeedRate: '夜晚流逝速度',
  ExpRate: '经验值倍率',
  PalCaptureRate: '捕获概率倍率',
  PalSpawnNumRate: '帕鲁出现数量倍率',
  PalDamageRateAttack: '帕鲁攻击伤害倍率',
  PalDamageRateDefense: '帕鲁承受伤害倍率',
  PalStomachDecreaceRate: '帕鲁饱食度降低倍率',
  PalStaminaDecreaceRate: '帕鲁耐力降低倍率',
  PalAutoHPRegeneRate: '帕鲁生命值自然恢复倍率',
  PalAutoHpRegeneRateInSleep: '帕鲁睡眠时自然恢复倍率',
  PlayerDamageRateAttack: '玩家攻击伤害倍率',
  PlayerDamageRateDefense: '玩家承受伤害倍率',
  PlayerStomachDecreaceRate: '玩家饱食度降低倍率',
  PlayerStaminaDecreaceRate: '玩家耐力降低倍率',
  PlayerAutoHPRegeneRate: '玩家生命值自然恢复倍率',
  PlayerAutoHpRegeneRateInSleep: '玩家睡眠时自然恢复倍率',
  BuildObjectDamageRate: '对建筑伤害倍率',
  BuildObjectDeteriorationDamageRate: '建筑物的劣化速度倍率',
  DropItemMaxNum: '世界内的掉落物上限',
  CollectionObjectHpRate: '可采集物品生命值倍率',
  CollectionObjectRespawnSpeedRate: '可采集物品的重生间隔',
  CollectionDropRate: '道具掉落量倍率',
  PalEggDefaultHatchingTime: '巨大蛋孵化所需时间',
  DeathPenalty: '死亡惩罚',
  DeathPenalty_All: '所有',
  DeathPenalty_None: '无',
  DeathPenalty_Item: '仅道具',
  DeathPenalty_ItemAndEquipment: '道具和装备',
  GuildPlayerMaxNum: '公会人数上限',
  EnemyDropItemRate: '敌人掉落物品倍率',
  bEnablePlayerToPlayerDamage: '是否会对玩家造成伤害',
  bEnableFriendlyFire: '是否会对友军造成伤害',
  bEnableInvaderEnemy: '是否会发生袭击事件',
  bActiveUNKO: '',
  bEnableAimAssistPad: '启用手柄瞄准辅助',
  bEnableAimAssistKeyboard: '启用键盘瞄准辅助',
  DropItemMaxNum_UNKO: '',
  BaseCampMaxNum: '最大据点数量',
  BaseCampWorkerMaxNum: '据点工作帕鲁数量上限',
  DropItemAliveMaxHours: '掉落物持续存在的小时数',
  bAutoResetGuildNoOnlinePlayers: '是否自动清除公会里长时间不在线的玩家',
  AutoResetGuildTimeNoOnlinePlayers: '多少小时后清除公会里不在线的玩家',
  WorkSpeedRate: '工作速度倍率',
  bIsMultiplay: '是否开启多人游戏',
  bIsPvP: '是否开启 PVP',
  bCanPickupOtherGuildDeathPenaltyDrop: '是否可以捡其他公会玩家的死亡掉落物',
  bEnableNonLoginPenalty: '启用未登录惩罚',
  bEnableFastTravel: '启用快速旅行',
  bIsStartLocationSelectByMap: '根据地图选择起始位置',
  bExistPlayerAfterLogout: '当服务器无人在线时是否自动关闭',
  bEnableDefenseOtherGuildPlayer: '启用防御其他公会玩家',
  CoopPlayerMaxNum: '合作玩家数上限',
  ServerPlayerMaxNum: '玩家数上限',
  ServerName: '服务器名称',
  ServerDescription: '服务器描述',
  AdminPassword: '管理员密码',
  ServerPassword: '服务器密码',
  PublicPort: '端口号',
  PublicIP: 'IP 地址',
  LocalIP: '本机 IP',
  RCONEnabled: '启用 RCON',
  RCONPort: 'RCON 端口',
  RESTAPIEnabled: '启用 REST API',
  RESTAPIPort: 'REST API 端口',
  bShowPlayerList: '显示玩家列表',
  Region: '地区',
  bUseAuth: '使用身份验证',
  BanListURL: '封锁名单网址',
  SwitchOn: '开启',
  SwitchOff: '关闭',
  WorldSettings: '修改世界设置',
  ModsTool: '模组管理器',
  OpenServerFolder: '打开服务器文件夹',
  GoBack: '回上一页',
  OpenServerFolderDesc:
    '特别注意不要动到文件夹内的 .pal 文件。否则可能导致服务器无法正确启动。',
  ExportModsToClientSide: '导出模组到游戏',
  ExportModsToClientSideDesc1:
    '游戏和服务器都需要安装模组才行。点击“导出”会生成服务器安装的模组的客户端版本。',
  ExportModsToClientSideDesc2:
    '将生成的内容复制粘贴到 Steam 本地文件（点击替换全部）即可完成安装。',
  Export: '导出',
  FAQ: '常见问题',
  NewUpdate: '有新版更新！（请下载最新版 ${1} 补丁）',
  MigrateDedicatedServer: '迁移专用服务器',
  MigrateDedicatedServerToGUI: '将专用服务器迁移到 GUI',
  MigrateDedicatedServerDesc1:
    '您可以将已存在的专用服务器迁移到 palserver GUI。',
  MigrateDedicatedServerDesc2: '找到原先 steamcmd 的存档路径（图左上）。',
  MigrateDedicatedServerDesc3:
    '点击右下角黄色按钮“打开服务器文件夹”，打开 GUI 服务器路径（图右下），并将里面除了 .pal 之外的文件夹或文件全部删除。',
  MigrateDedicatedServerDesc4:
    '将 steamcmd 中的内容，复制粘贴到 GUI 的服务器文件夹。',
  MigrateDedicatedServerDesc5: '恭喜完成迁移，启动服务器后就可以进入游戏了！',
  MigrateFourPlayersSave: '迁移本地存档（四人邀请码）',
  MigrateFourPlayersSaveToGUI: '将本地存档迁移到 GUI',
  MigrateFourPlayersSaveDesc1: '您可以将游戏中的存档迁移到 palserver GUI。',
  MigrateFourPlayersSaveDesc2:
    '进入游戏后点击“开始游戏”，选中要迁移的存档，点击左下角文件图标，将里面除了 WorldOption.sav 以外的所有文件复制。',
  MigrateFourPlayersSaveDesc3: '点击右下角黄色按钮“打开存档文件夹”。',
  MigrateFourPlayersSaveDesc4: '将刚刚复制的内容粘贴（如有需要选择替换全部）。',
  MigrateFourPlayersSaveDesc5:
    '启动服务器游戏一段时间后关闭，并注意 Players 文件夹中多出来的文件。',
  MigrateFourPlayersSaveDesc6:
    '安装 Python 运行环境（到微软商店或官网下载，需选择 add python.exe to path）。',
  MigrateFourPlayersSaveDesc7:
    '下载转换工具 https://github.com/Dalufishe/palworld-host-save-fix/archive/refs/heads/main.zip，解压缩后在该路径上打开终端命令窗口（cmd），并输入 pip install palworld-save-tools==0.17.1。',
  MigrateFourPlayersSaveDesc8:
    '在终端命令行输入 python fix-host-save.py "此处输入存档路径（点击黄色按钮的路径）" "多出来的玩家文件名称（忽略 .sav）" "00000000000000000000000000000001" True。',
  MigrateFourPlayersSaveDesc9: '等 Python 脚本执行完毕后，启动服务器。',
  MigrateFourPlayersSaveDesc10:
    '恭喜你成功完成迁移，启动服务器后就可以进入游戏了！',
  MigrateFourPlayersSaveDesc11:
    '四人操作流程相对复杂，若有需要，您可以在 palserver-GUI discord 群提问：https://discord.com/invite/sgMMdUZd3V',
  OpenSaveFolder: '打开存档文件夹',
  SupportMe: '支持我的工作',
  SupportMeDesc:
    'palserver GUI 永远免费并持续维护。您不需要为使用应用程序付费，然而，若您愿意支持我们的工作，不妨考虑请我喝杯咖啡，将是我们莫大的鼓励。',
  CloseServer: '关闭服务器',
  BanList: '黑名单',
  BanListLong: '黑名单列表',
  UnBan: '解除',
  Dashboard: '管理面板',
  Setting: '设置',
  RAM: '内存',
  OnlinePlayer: '在线玩家',
  KickPlayer: '踢出',
  KickPlayerDesc: '确定踢出 ${1}? 此举动将会将 ${2} 从服务器移除。',
  ConfirmKick: '确认踢出',
  Ban: '封锁',
  BanDesc: '确定封锁 ${1}? 此举动将会将 ${2} 从服务器移除。',
  ConfirmBan: '确认封锁',
  Send: '发送',
  EnterCommandOrBoardCast: '输入指令或广播消息 . . .',
  PlayerName: '玩家名称',
  PlayerID: '玩家 ID',
  Other: '其他',
  RCONFirst: '请先启用 RCON 才能开启此功能。',
  ServerBackupRecord: '服务器存档备份记录',
  Open: '打开',
  SupportBy: '由 <u>${1}</u> 进行供电',
  MigrateSaveDesc: '若您需要迁移存档，请前往设置进行操作。',
  OpenFilePath: '打开文件位置',
  Rename: '重新命名',
  DeleteMod: '删除模块',
  SetTime: '设置时间',
  HourPerTime: '小时',
  UpdateLog: '更新日志',
  OpenToCommunity: '公开到社区菜单',
  PalSettings: '帕鲁设置',
  PlayerSettings: '玩家设置',
  GuildSettings: '公会设置',
  OthersSettings: '其他设置',
  HasNotASCIIPath:
    '您的 palserver GUI 路径可能存在中文或非 ASCII 字符，请将其修改才可完成下载或更新。路径名称',
  ChangeIcon: '变更图标',
  CopyServer: '复制服务器',
  DuplicateServer: '复制服务器',
  DuplicateServerDesc: '复制将会包含所有设置文件、模块及世界文件：',
  ExportServer: '导出服务器',
  CreateRemoteServer: '建立远程连接',
  ChangeServerIcon: '变更服务器图标',
  OpenFolder: '其他文件位置',
  ServerFolder: '服务器文件夹',
  InstanceFolder: '实例文件夹',
  SaveFolder: '存档文件夹',
  WorldSaveFolder: '世界档文件夹',
  PalConfigFolder: '设置文件夹',
  ServerInstanceFolder: 'GUI 实例文件夹',
  WorldSettingsFolder: '世界设置文件',
  ImportServer: '导入服务器',
  FourPlayerSave: '本地存档',
  DedicatedServer: '专用服务器',
  ServerInstance: 'GUI 实例',
  Reset: '重置',
  SwitchToServer: '切换到服务器',
  SwitchToAll: '切换到整体',
  PlayerLocation: '玩家坐标',
  PlayerId: '玩家 ID',
  Performance: '性能',
  Internet: '网络',
  Security: '安全性',
  Restart: '重启',
  ServerNeedUpgrade: '更新服务器到最新版！',
  ServerNeedUpgradeDesc: '将服务器版本更新到最新可玩版本。',
  PerformanceOptimizationEnabled: '性能优化',
  PerformanceOptimizationEnabledDesc:
    '解除帧率限制，加强网络，并提高多线程 CPU 环境中的性能。',
  PerformanceMonitorEnabled: '启用性能监测',
  PerformanceMonitorEnabledDesc:
    '对服务器及电脑的性能、数值监测系统及显示画面。开启后会稍微占用性能。',
  PerformanceMonitorAnimationEnabled: '性能监测动画',
  PerformanceMonitorAnimationEnabledDesc:
    '是否对性能监测启用动画。会稍微占用性能。开启后会稍微占用性能。',
  RCONEnabledDesc: '启用远程控制 RCON。我们强烈建议您打开以体验完整功能。',
  RESTAPIEnabledDesc:
    '启用 REST API 服务器。我们强烈建议您打开以体验完整功能。',
  PublicPortDesc: '服务器公开端口号。',
  RCONPortDesc: '远程控制 RCON 端口号。',
  RESTAPIPortDesc: 'REST API 网络端口号。',
  ModManagementEnabled: '启用模块管理',
  ModManagementEnabledDesc:
    '启用 palserver GUI 的服务器模块管理器。支持 Lua、Pak 及 dll 文件管理，并支持导出到客户端 (游戏)。',
  UE4SSEnabled: '启用 UE4SS',
  UE4SSEnabledDesc:
    'UE4/5 的可注入的 Lua 脚本系统、SDK 生成器、实时属性编辑器。部分模块依赖 UE4SS。',
  PalguardEnabled: '启用 Palguard',
  PalguardEnabledDesc:
    'Palguard 插件提供防作弊检测、服务器日志及更多管理员指令。我们建议您将他开启以体验完整功能。',
  EngineInstalling: '系统安装进行中... 请勿关闭窗口',
  EngineInstallFinish: '系统安装完成',
  NoServer: '暂无服务器，请点击右键新增或导入。',
  ServerHasNoPlayers: '服务器没有玩家',
  ServerHasNoLog: '暂时没有记录',
  ServerPlayers: '服务器玩家',
  ServerLog: '服务器日志',
  PerformanceMonitor: '性能监测',
  ServerManagement: '服务器管理',
  ServerSettings: '服务器设置',
  Schedule: '排程',
  CommandsList: '指令表',
  OpenToCommunityDesc: '将服务器公开到游戏中的社区菜单列表。',
  SomeMightRestartToApplyChange: '某些设置项需要重启才能生效！',
  Language: '语言',
  LanguageDesc: '帮助我们翻译 palserver GUI。',
  OfficalWebsite: '官方网站',
  ServerBackupDesc: '服务器备份存档位置，复原游戏记录。',
  ServerPasswordDesc: '为服务器设置密码。',
  AdminPasswordDesc: '设置管理员密码。',
  AutoRestart: '自动重启',
  AutoRestartDesc: '每隔一段时间时重新启动服务器。需啟用 RCON 才能使用。',
  CrashRestart: '崩溃重启',
  CrashRestartDesc: '在服务器崩溃时重新启动服务器。需啟用 RCON 才能使用。',
  OverRamRestart: '超过阈值重启',
  OverRamRestartDesc: '在服务器内存使用率超过 90% 时重新启动服务器。',
  All: '整体',
  UpTime: '运行时间',
  AppSettings: '应用程序设置',
  MoreActions: '其他操作',
  AdvancedActions: '进阶操作',
  Set: '设置',
  SetAsAdmin: '设置为管理员',
  SetAsAdminDesc: '将 ${1} 设置为服务器管理员。',
  Kick: '踢出',
  KickDesc: '踢出该用户',
  BanIP: '封锁 ${1} 的 IP 地址',
  GiveItem: '给予道具',
  GivePlayerItem: '给予 ${1} 道具',
  GiveItemDesc: '给予 ${1} 指定数量的游戏道具。',
  Choose: '选择',
  GivePal: '给予帕鲁',
  GivePlayerPal: '给予 ${1} 帕鲁',
  GivePalDesc: '给予 ${1} 指定帕鲁。',
  GiveExp: '给予经验值',
  GivePlayerExp: '给予 ${1} 经验值',
  GiveExpDesc: '给予 ${1} 指定数量的经验值。',
  ClickLink: '点击链接',
  OpenFolder2: '打开文件夹',
  UE4SSNeedUpgrade: 'UE4SS 需要更新！',
  UE4SSNeedUpgradeDesc: '将 UE4SS 更新到最新版，否则有些模块可能失效。',
  PalguardNeedUpgrade: 'Palguard 需要更新！',
  PalguardNeedUpgradeDesc: '将 Palguard 更新到最新版，否则有些功能可能失效。',
  Update: '更新',
  ModManagement: '模块插件管理',
  AddLuaMod: '新增 Lua模块',
  OpenLuaModFolder: '打开模块文件夹',
  OtherExtensions: '额外扩展',
  OnlineMap: '线上地图',
  OnlineMapDesc: '实时查看在线玩家游戏位置。',
  LogEnabled: '启用日志',
  LogEnabledDesc: '支持 Palguard 日志显示玩家进出，聊天消息等。',
  PalguardSettings: 'Palguard 设置',
  PalguardSettingsDesc: '开启 palguard.json 插件相关设置界面。',
  LogFolder: '日志文件夹',
  ClearCache: '清除缓存',
  ClearCacheDesc:
    '若服务器无法启动，请尝试删除该服务器，清除缓存后，重新启动 palserver GUI，建立服务器后再尝试启动服务器。',
  Clear: '清除',
  ServerInstancePath: '实例路径 (需重新啟動)',
  Change: '修改',
  ImportGameSaves: '导入游戏存档',
  HowToImportDedicatedServer: '如何导入专用服务器 (Windows / Linux)？',
  HowToImportFourPlayerSaves: '如何导入本机存档 (四人邀请码)？',
  HelpPlzJoinUs: '疑难排解 - 请加入我们的',
  SpecialThanks: '特别感谢',
  SpeicalThanksDesc: '感谢所有的开发人员、赞助者、小帮手及使用 GUI 的大家。',
  BuyMeACoffee: '请我喝杯咖啡',
  Process: '进程',
  UseIndependentProcess: '使用独立进程',
  UseIndependentProcessDesc:
    '当您的服务器经常发生意外崩溃时，请启用此选项。默认情况下为启用状态。启用时，服务器与 GUI 将作为相互独立的进程运行。如果您需要使用性能监控面板，请关闭它。此时服务器将作为 GUI 的子进程运行。',
  ServerVersion: '服务器版本',
  SupportGUI: '支持 GUI ❤️',
  PlzCloseServerFirst: '请先关闭服务器',
  BaseCampMaxNumInGuild: '各公会据点上限',
  bInvisibleOtherGuildBaseCampAreaFX: '隐藏其他公会区域',
  AutoSaveSpan: '自动存档时间 (秒)',
  //
  ServerCantUse: '服务器 (无法使用)',
  CrossplayPlatforms: '允许的连接平台',
  Give: '给予',
  GiveRelic: '给予翠叶鼠雕像',
  GiveRelicDesc: '给予 ${1} 指定数量的翠叶鼠雕像。',
  GiveTech: '给予科技点',
  GiveTechDesc: '给予 ${1} 指定数量的科技点。',
  GiveBossTech: '给予古代科技点',
  GiveBossTechDesc: '给予 ${1} 指定数量的古代科技点。',
  SupplyDropSpan: '补给掉落范围',
  RandomizerType: '随机化类型',
  RandomizerType_None: '无随机',
  RandomizerType_1: '区域随机',
  RandomizerType_2: '全域随机',
  RandomizerSeed: '随机种子',
  ServerListFolder: '服务器列表文件夹',
  DetailData: '详细资料',
  ServerId: '服务器 ID',
  ServerReplicatePawnCullDistance: '玩家和帕鲁距离 (厘米)',
  AllowConnectPlatform: '允许跨平台游玩',
  bAllowGlobalPalboxExport: '允许从跨界帕鲁终端导出',
  bAllowGlobalPalboxImport: '允许从跨界帕鲁终端导入',
  bBuildAreaLimit: '禁止在结构附近建造',
  bHardcore: '启用 Hardcore 模式',
  bIsRandomizerPalLevelRandom: '启用随机化 Pal 等级',
  bIsUseBackupSaveData: '启用世界备份',
  bPalLost: '死亡永久丢失帕鲁',
  BuildSettings: '建筑物设置',
  DropSettings: '掉落物设置',
  FixCompleted: '修復完成！',
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
  HowToGetIPAdress: '如何获取 IP 地址？',
};
export default zh_cn;
