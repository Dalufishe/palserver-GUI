const en = {
  ServerIsRunning: "Server is running",
  Server: "Server",
  BootServer: "Boot Server",
  EditServer: "Edit Server",
  CreateServer: "Create Server",
  DeleteServer: "Delete Server",
  DeleteServerDesc:
    "Once the server is deleted, all data including archives, settings, and player data will be difficult to recover. Please consider carefully before performing the operation.",
  PleaseEnterServerName: "Please enter server name",
  OthersEnterIP: "This is the IP address entered by other players",
  YourselfEnterIP: "This is the IP address entered by yourself",
  HaventSavedYet: "Not yet saved",
  LuaMods: "Lua Mods",
  PakMods: "Pak Mods",
  Mod: "Mod",
  Disabled: "Disabled",
  Enabled: "Enabled",
  Cancel: "Cancel",
  Reset: "Reset",
  Confirm: "Confirm",
  Create: "Create",
  VerifyChange: "Verify Change",
  VerifyDelete: "Verify Delete",
  EditFromSourceFile: "Edit from source file",
  SourceCode: "Source Code",
  ServerIsUpdating: "Server is updating...",
  UpdateServerToLatestVersion: "Update server to latest version",
  ServerUpdateDone: "Server update done!",
  OpenModsFolder: "Open mods folder",
  HowToImportMods: "How to import ${1} mods?",
  HowToImportLuaModsDesc1:
    "Lua mods are in a form supported by the game. To install downloaded mods, click the 'Open Mods Folder' button and place the mods in that folder to complete the installation.",
  HowToImportLuaModsDesc2:
    "Please note that initially installed mods are set to 'Disabled' by default (right-click to enable mods), and they must be synchronized and installed on the client (game body) to take effect.",
  HowToImportPakModsDesc1:
    "Pak mods are in a form supported by the game. To install downloaded mods, click the 'Open Mods Folder' button and place the mods in that folder to complete the installation.",
  HowToImportPakModsDesc2:
    "Please note that they must be synchronized and installed on the client (game body) to take effect.",
  Difficulty: "Difficulty",
  DayTimeSpeedRate: "Daytime speed rate",
  NightTimeSpeedRate: "Nighttime speed rate",
  ExpRate: "Experience rate",
  PalCaptureRate: "Pal capture rate",
  PalSpawnNumRate: "Pal spawn number rate",
  PalDamageRateAttack: "Pal damage rate (attack)",
  PalDamageRateDefense: "Pal damage rate (defense)",
  PalStomachDecreaceRate: "Pal stomach decrease rate",
  PalStaminaDecreaceRate: "Pal stamina decrease rate",
  PalAutoHPRegeneRate: "Pal auto HP regeneration rate",
  PalAutoHpRegeneRateInSleep: "Pal auto HP regeneration rate in sleep",
  PlayerDamageRateAttack: "Player damage rate (attack)",
  PlayerDamageRateDefense: "Player damage rate (defense)",
  PlayerStomachDecreaceRate: "Player stomach decrease rate",
  PlayerStaminaDecreaceRate: "Player stamina decrease rate",
  PlayerAutoHPRegeneRate: "Player auto HP regeneration rate",
  PlayerAutoHpRegeneRateInSleep: "Player auto HP regeneration rate in sleep",
  BuildObjectDamageRate: "Build object damage rate",
  BuildObjectDeteriorationDamageRate: "Build object deterioration damage rate",
  DropItemMaxNum: "Drop item max number in the world",
  CollectionObjectHpRate: "Collection object HP rate",
  CollectionObjectRespawnSpeedRate: "Collection object respawn speed rate",
  CollectionDropRate: "Collection drop rate",
  PalEggDefaultHatchingTime: "Pal egg default hatching time",
  DeathPenalty: "Death penalty",
  DeathPenalty_All: "All",
  DeathPenalty_None: "None",
  DeathPenalty_Item: "Only items",
  DeathPenalty_ItemAndEquipment: "Items and equipment",
  GuildPlayerMaxNum: "Guild player max number",
  EnemyDropItemRate: "Enemy drop item rate",
  bEnablePlayerToPlayerDamage: "Enable player to player damage?",
  bEnableFriendlyFire: "Enable friendly fire?",
  bEnableInvaderEnemy: "Enable invader enemy?",
  bActiveUNKO: "",
  bEnableAimAssistPad: "Enable aim assist for pad",
  bEnableAimAssistKeyboard: "Enable aim assist for keyboard",
  DropItemMaxNum_UNKO: "",
  BaseCampMaxNum: "Base camp max number",
  BaseCampWorkerMaxNum: "Base camp worker max number",
  DropItemAliveMaxHours: "Drop item alive max hours",
  bAutoResetGuildNoOnlinePlayers: "Auto reset guild with no online players",
  AutoResetGuildTimeNoOnlinePlayers:
    "Auto reset guild time with no online players (hours)",
  WorkSpeedRate: "Work speed rate",
  bIsMultiplay: "Is multiplayer",
  bIsPvP: "Is PvP enabled",
  bCanPickupOtherGuildDeathPenaltyDrop:
    "Can pick up other guild's death penalty drop",
  bEnableNonLoginPenalty: "Enable non-login penalty",
  bEnableFastTravel: "Enable fast travel",
  bIsStartLocationSelectByMap: "Start location selection based on map",
  bExistPlayerAfterLogout:
    "Exist player after logout automatically close server",
  bEnableDefenseOtherGuildPlayer: "Enable defense other guild player",
  CoopPlayerMaxNum: "Co-op player max number",
  ServerPlayerMaxNum: "Server player max number online",
  ServerName: "Server Name",
  ServerDescription: "Server description",
  AdminPassword: "Admin Password",
  ServerPassword: "Server Password",
  PublicPort: "Public port",
  PublicIP: "Public IP",
  LocalIP: "Local IP",
  RCONEnabled: "RCON enabled",
  RCONPort: "RCON port",
  Region: "Region",
  bUseAuth: "Use authentication",
  BanListURL: "Ban list URL",
  SwitchOn: "On",
  SwitchOff: "Off",
  //
  ServerSettings: "Server Settings",
  WorldSettings: "Change World Settings",
  ModsTool: "Mods Manager",
  OpenServerFolder: "Open Server Folder",
  GoBack: "Go Back",
  OpenServerFolderDesc:
    "Please note that .pal files in the folder should not be modified, overwritten, or deleted.",
  //

  ExportModsToClientSide: "Export Mods to Client Side",
  ExportModsToClientSideDesc1: "Mods need to be installed on both the client and server side to take effect. Clicking 'Export' will generate a client-side version of the mods configured on your server.",
  ExportModsToClientSideDesc2: "Copy and paste the generated content into the Steam local files (click to replace all) to complete the installation.",
  Export: "Export",
  FAQ: "FAQs",
  //
  NewUpdate: "New version update available! (Please download the latest patch ${1})",
  //20240214
  MigrateDedicatedServer: "Migrate Dedicated Server",
  MigrateDedicatedServerToGUI: "Migrate Dedicated Server to GUI",
  MigrateDedicatedServerDesc1: "You can migrate an existing dedicated server to the palserver GUI.",
  MigrateDedicatedServerDesc2: "Find the original steamcmd archive path (top left of the image).",
  MigrateDedicatedServerDesc3: "Click the bottom right yellow button 'Open Server Folder' to open the GUI server path (bottom right of the image) and delete all folders or files except .pal inside.",
  MigrateDedicatedServerDesc4: "Copy and paste the contents from steamcmd to the GUI server folder.",
  MigrateDedicatedServerDesc5: "Congratulations on completing the migration. You can now start the server and play!",
  MigrateFourPlayersSave: "Migrate Local Save (Invite Code)",
  MigrateFourPlayersSaveToGUI: "Migrate Local Save to GUI",
  MigrateFourPlayersSaveDesc1: "You can migrate in-game saves to the palserver GUI.",
  MigrateFourPlayersSaveDesc2: "After entering the game, click 'Start Game', select the save you want to migrate, click the file icon in the bottom left corner, and copy all files except WorldOption.sav.",
  MigrateFourPlayersSaveDesc3: "Click the bottom right yellow button 'Open Save Folder'.",
  MigrateFourPlayersSaveDesc4: "Paste the copied content (select 'Replace All' if needed).",
  MigrateFourPlayersSaveDesc5: "After playing on the server for a while and then shutting it down, pay attention to any additional files in the Players folder.",
  MigrateFourPlayersSaveDesc6: "Install the Python execution environment (from the Microsoft Store or official website, and select 'add python.exe to path').",
  MigrateFourPlayersSaveDesc7: "Download the conversion tool from https://github.com/Dalufishe/palworld-host-save-fix/archive/refs/heads/main.zip, unzip it, open a terminal/command prompt window in that directory, and enter 'pip install palworld-save-tools==0.17.1'.",
  MigrateFourPlayersSaveDesc8: `In the terminal/command prompt, enter 'python fix-host-save.py "here enter the save path(the path from clicking the yellow button) " "additional player file name(ignore .sav) " "00000000000000000000000000000001" True' and press Enter twice.`,
  MigrateFourPlayersSaveDesc9: "After the Python script finishes running, start the server.",
  MigrateFourPlayersSaveDesc10: "Congratulations on successfully migrating! You can now start the server and play!",
  MigrateFourPlayersSaveDesc11: "The process for four-player migration is relatively complex. If needed, you can ask questions in the palserver-GUI Discord group: https://discord.com/invite/sgMMdUZd3V",
  OpenSaveFolder: "Open Save Folder",
  SupportMe: "Support My Work",
  SupportMeDesc: "palserver GUI is always free and continuously maintained. You don't need to pay to use the application; however, if you're willing to support our work, consider buying me a coffee. It would be greatly appreciated.",
  //20240217
  CloseServer: "Close Server",
  BanList: "Ban Players",
  BanListLong: "Ban List",
  UnBan: "Unban",
  Dashboard: "Dashboard",
  Setting: "Settings",
  RAM: "RAM",
  OnlinePlayer: "Online Player",
  KickPlayer: "Kick",
  KickPlayerDesc: "Are you sure you want to kick ${1} (${2})? This action will remove ${3} from the server.",
  ConfirmKick: " Confirm Kick",
  Ban: "Ban",
  BanDesc: "Are you sure you want to ban ${1} (${2})? This action will remove ${3} from the server and the user will not be able to rejoin until unbanned.",
  ConfirmBan: " Confirm Ban",
  Send: "Send",
  EnterCommandOrBoardCast: "Enter command or broadcast message...",
  PlayerName: "Player Name",
  PlayerID: "Player ID",
  Other: "Other",
  //20240218
  RCONEnabledDesc: "You need to enable Remote Console (RCON) to use the Dashboard. ",
  RCONFirst: "Please enable RCON first to activate this feature.",
  ServerBackupRecord: "Server Backup Records",
  Open: "Open",
  //20240226
  SupportBy: "由 <u>${1}</u> 進行供電",
  //20240227
  MigrateSaveDesc: "If you need to migrate your save, please go to Settings to proceed.",
  OpenFilePath: "Open File Path",
  //
  Rename: "Rename",
  DeleteMod: "Delete Mod",
  SetTime: "Set Time",
  HourPerTime: "Hours Per Time",
  UpdateLog: "Update Log",
  OpenToCommunity: "Open to Community Menu",
  PalSettings: "Pal Settings",
  PlayerSettings: "Player Settings",
  GuildSettings: "Guild Settings",
  OthersSettings: "Other Settings",
  HasNotASCIIPath: "Your palserver GUI path may contain Chinese or non-ASCII characters. Please modify it to complete the update. Path name"
};
export default en;
