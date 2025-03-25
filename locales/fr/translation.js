/* eslint-disable no-template-curly-in-string */

import game_data_items_fr from './item';
import game_data_pals_fr from './pal';

/* eslint-disable camelcase */
const fr = {
  ...game_data_items_fr,
  ...game_data_pals_fr,
  ServerIsRunning: 'Le serveur est en cours d exécution',
  Server: 'Serveur',
  BootServer: 'demarrage',
  EditServer: 'Modifier le serveur',
  CreateServer: 'Créer un serveur',
  DeleteServer: 'Supprimer le serveur',
  DeleteServerDesc:
    'Une fois le serveur supprimé, toutes les données, y compris les archives, les paramètres et les données des joueurs, seront difficiles à récupérer. Veuillez réfléchir attentivement avant d effectuer l opération.',
  PleaseEnterServerName: 'Veuillez entrer le nom du serveur',
  OthersEnterIP: 'Il s agit de l adresse IP saisie par d autres joueurs',
  YouselfEnterIP: 'Il s agit de l adresse IP saisie par vous-même',
  HaventSavedYet: 'Pas encore enregistré',
  LuaMods: 'Lua Mods',
  PakMods: 'Pak Mods',
  PakLogicMods: 'Logic Mods',
  Mod: 'Mod',
  Disabled: 'Désactivé',
  Enabled: 'Activé',
  Cancel: 'Annuler',
  Reset: 'Réinitialiser',
  Confirm: 'Confirmer',
  Create: 'Créer',
  VerifyChange: 'Vérifier le changement',
  VerifyDelete: 'Vérifier la Suppression',
  EditFromSourceFile: 'Modifier à partir du fichier source',
  SourceCode: 'Code source',
  ServerIsUpdating: 'Le serveur est en cours de mise à jour...',
  UpdateServerToLatestVersion:
    'Mettre à jour le serveur vers la dernière version',
  ServerUpdateDone: 'Mise à jour du serveur terminée !',
  OpenModsFolder: 'Ouvrir le dossier mods',
  HowToImportMods: 'Comment importer des mods ${1} ?',
  HowToImportLuaModsDesc1:
    'Les mods Lua sont sous une forme prise en charge par le jeu. Pour installer les mods téléchargés, cliquez sur le bouton « Ouvrir le dossier des mods » et placez les mods dans ce dossier pour terminer l installation.',
  HowToImportLuaModsDesc2:
    'Veuillez noter que les mods initialement installés sont définis sur « Désactivés » par défaut (clic droit pour activer les mods), et ils doivent être synchronisés et installés sur le client (corps du jeu) pour prendre effet.',
  HowToImportPakModsDesc1:
    "Les mods Pak sont sous une forme prise en charge par le jeu. Pour installer les mods téléchargés, cliquez sur le bouton « Ouvrir le dossier des mods » et placez les mods dans ce dossier pour terminer l'installation.",
  HowToImportPakModsDesc2:
    "'Veuillez noter qu ils doivent être synchronisés et installés sur le client (corps du jeu) pour prendre effet.",
  Difficulty: 'Difficulté',
  DayTimeSpeedRate: 'Taux de vitesse jour',
  NightTimeSpeedRate: 'Taux de vitesse nouit',
  ExpRate: 'Taux d expérience',
  PalCaptureRate: 'Taux de capture de Pal',
  PalSpawnNumRate: 'Taux d apparition des Pal',
  PalDamageRateAttack: 'Taux de dégâts de Pal (attaque)',
  PalDamageRateDefense: 'Taux de dégâts de Pal (défense)',
  PalStomachDecreaceRate: 'Taux de diminution de Fain Pal',
  PalStaminaDecreaceRate: 'Taux de diminution de l endurance des Pal',
  PalAutoHPRegeneRate: 'Taux de régénération automatique des HP de Pal',
  PalAutoHpRegeneRateInSleep:
    'Taux de régénération automatique des PV de Pal en veille',
  PlayerDamageRateAttack: 'Taux de dégâts du joueur (attaque)',
  PlayerDamageRateDefense: 'Taux de dégâts du joueur (défense)',
  PlayerStomachDecreaceRate: 'Taux de diminution de Fain du joueur',
  PlayerStaminaDecreaceRate: 'Taux de diminution de l endurance du joueur',
  PlayerAutoHPRegeneRate: 'Taux de régénération automatique des PV du joueur',
  PlayerAutoHpRegeneRateInSleep:
    'Taux de régénération automatique des PV du joueur en veille',
  BuildObjectDamageRate: ' le taux de dégâts des objets Construction',
  BuildObjectDeteriorationDamageRate:
    'Taux de détérioration des objets de construction',
  DropItemMaxNum: 'Déposer le nombre maximum d objets dans le monde',
  CollectionObjectHpRate: 'Taux de HP des objets de collection',
  CollectionObjectRespawnSpeedRate:
    'Vitesse de réapparition des objets de collection',
  CollectionDropRate: 'Taux de chute de la collection',
  PalEggDefaultHatchingTime: 'Heure d éclosion par défaut des œufs Pal',
  DeathPenalty: 'Penalite de mort',
  DeathPenalty_All: 'All',
  DeathPenalty_None: 'Aucune',
  DeathPenalty_Item: 'Articles uniquement',
  DeathPenalty_ItemAndEquipment: 'Objets et équipements',
  GuildPlayerMaxNum: 'Nombre maximum de joueurs de guilde',
  EnemyDropItemRate: 'Taux de chute d objets ennemis',
  bEnablePlayerToPlayerDamage: 'Activer les dégâts entre joueurs ?',
  bEnableFriendlyFire: 'Activer les tirs amis ?',
  bEnableInvaderEnemy: 'Activer l ennemi envahisseur ?',
  bActiveUNKO: '',
  bEnableAimAssistPad: 'Activer l assistance à la visée pour le pad',
  bEnableAimAssistKeyboard: 'Activer l assistance à la visée pour le clavier',
  DropItemMaxNum_UNKO: '',
  BaseCampMaxNum: 'Nombre maximum de camp de base',
  BaseCampWorkerMaxNum: 'Nombre maximum de travailleurs du camp de base',
  DropItemAliveMaxHours: 'Lâcher un objet vivant en heures max.',
  bAutoResetGuildNoOnlinePlayers:
    'Réinitialisation automatique de la guilde sans joueurs en ligne',
  AutoResetGuildTimeNoOnlinePlayers:
    'Réinitialisation automatique du temps de guilde sans joueurs en ligne (heures)',
  WorkSpeedRate: 'Taux de vitesse de travail',
  bIsMultiplay: 'Est-ce multijoueur',
  bIsPvP: 'Le PvP est-il activé ?',
  bCanPickupOtherGuildDeathPenaltyDrop:
    "Peut récupérer la pénalité de mort d'une autre guilde",
  bEnableNonLoginPenalty: 'Activer la pénalité de non-connexion',
  bEnableFastTravel: 'Activer les déplacements rapides',
  bIsStartLocationSelectByMap:
    'Démarrer la sélection de l emplacement en fonction de la carte',
  bExistPlayerAfterLogout:
    'Le joueur existant après la déconnexion ferme automatiquement le serveur',
  bEnableDefenseOtherGuildPlayer:
    'Activer la défense des autres joueurs de la guilde',
  CoopPlayerMaxNum: 'Nombre maximum de joueurs coopératifs',
  ServerPlayerMaxNum: 'Nombre maximum de joueurs en ligne sur le serveur',
  ServerName: 'Nom du serveur',
  ServerDescription: 'Description du serveur',
  AdminPassword: 'Mot de passe administrateur',
  ServerPassword: 'Mot de passe du serveur',
  PublicPort: 'Port public',
  PublicIP: 'IP publique',
  LocalIP: 'IP locale',
  RCONEnabled: 'RCON activé',
  RCONPort: 'Port RCON',
  RESTAPIEnabled: 'API REST activée',
  RESTAPIPort: 'Port API REST',
  Region: 'Region',
  bUseAuth: 'Utiliser l authentification',
  BanListURL: 'Ban list URL',
  SwitchOn: 'On',
  SwitchOff: 'Off',
  //
  WorldSettings: 'Modifier les paramètres mondiaux',
  ModsTool: 'Gestionnaire de mods',
  OpenServerFolder: 'Ouvrir le dossier du serveur',
  GoBack: 'Retourner',
  OpenServerFolderDesc:
    'Veuillez noter que les fichiers .pal du dossier ne doivent pas être modifiés, écrasés ou supprimés.',
  //

  ExportModsToClientSide: 'Exporter les mods vers le côté client',
  ExportModsToClientSideDesc1:
    'Les mods doivent être installés à la fois côté client et côté serveur pour être pris en compte. Cliquez sur « Exporter » pour générer une version côté client des mods configurés sur votre serveur.',
  ExportModsToClientSideDesc2:
    'Copiez et collez le contenu généré dans les fichiers locaux Steam (cliquez pour tout remplacer) pour terminer l installation.',
  Export: 'Exporter',
  FAQ: 'FAQs',
  NewUpdate:
    'Nouvelle mise à jour disponible ! (Veuillez télécharger le dernier patch ${1})',
  // 20240214
  MigrateDedicatedServer: 'Migrer un serveur dédié',
  MigrateDedicatedServerToGUI:
    'Migrer un serveur dédié vers une interface graphique',
  MigrateDedicatedServerDesc1:
    'Vous pouvez migrer un serveur dédié existant vers l interface graphique palserver.',
  MigrateDedicatedServerDesc2:
    'Recherchez le chemin d accès à l archive steamcmd d origine (en haut à gauche de l image).',
  MigrateDedicatedServerDesc3:
    "Cliquez sur le bouton jaune en bas à droite « Ouvrir le dossier du serveur » pour ouvrir le chemin du serveur GUI (en bas à droite de l'image) et supprimez tous les dossiers ou fichiers à l'exception de .pal à l'intérieur.",
  MigrateDedicatedServerDesc4:
    'Copiez et collez le contenu de steamcmd dans le dossier du serveur GUI.',
  MigrateDedicatedServerDesc5:
    'Félicitations pour avoir terminé la migration. Vous pouvez maintenant démarrer le serveur et jouer !',
  MigrateFourPlayersSave: 'Migrer la sauvegarde locale (code d invitation)',
  MigrateFourPlayersSaveToGUI:
    'Migrer la sauvegarde locale vers l interface graphique',
  MigrateFourPlayersSaveDesc1:
    'Vous pouvez migrer les sauvegardes du jeu vers l interface graphique du serveur Pal.',
  MigrateFourPlayersSaveDesc2:
    "Après être entré dans le jeu, cliquez sur « Démarrer le jeu », sélectionnez la sauvegarde que vous souhaitez migrer, cliquez sur l'icône de fichier dans le coin inférieur gauche et copiez tous les fichiers sauf WorldOption.sav.",
  MigrateFourPlayersSaveDesc3:
    "Click the bottom right yellow button 'Ouvrir le dossier de sauvegarde'.",
  MigrateFourPlayersSaveDesc4:
    'Collez le contenu copié (sélectionnez « Remplacer tout » si nécessaire).',
  MigrateFourPlayersSaveDesc5:
    'Après avoir joué sur le serveur pendant un certain temps, puis l avoir arrêté, faites attention à tous les fichiers supplémentaires dans le dossier Joueurs.',
  MigrateFourPlayersSaveDesc6:
    "Installez l'environnement d'exécution Python (à partir du Microsoft Store ou du site Web officiel et sélectionnez « ajouter python.exe au chemin »).",
  MigrateFourPlayersSaveDesc7:
    "Téléchargez l'outil de conversion depuis https://github.com/Dalufishe/palworld-host-save-fix/archive/refs/heads/main.zip, décompressez-le, ouvrez une fenêtre de terminal/invite de commande dans ce répertoire et entrez 'pip install palworld-save-tools==0.17.1'.",
  MigrateFourPlayersSaveDesc8: `Dans le terminal/invite de commande, entrez 'python fix-host-save.py "ici entrez le chemin de sauvegarde (le chemin en cliquant sur le bouton jaune) " "nom du fichier de lecteur supplémentaire (ignorez .sav) " "000000000000000000000000000000001" True' et appuyez deux fois sur Entrée.`,
  MigrateFourPlayersSaveDesc9:
    'Une fois l’exécution du script Python terminée, démarrez le serveur.',
  MigrateFourPlayersSaveDesc10:
    'Une fois l’exécution du script Python terminée, démarrez le serveur.',
  MigrateFourPlayersSaveDesc11:
    'Le processus de migration de quatre joueurs est relativement complexe. Si nécessaire, vous pouvez poser des questions dans le groupe Discord palserver-GUI : https://discord.com/invite/sgMMdUZd3V',
  OpenSaveFolder: ' Ouvrir le dossier de sauvegarde ',
  SupportMe: ' Soutenir mon travail ',
  SupportMeDesc:
    ' L interface utilisateur graphique de Palserver est toujours gratuite et continuellement mise à jour. Vous n avez pas besoin de payer pour utiliser l application ; cependant, si vous êtes prêt à soutenir notre travail, pensez à m offrir un café. Ce serait grandement apprécié. ',
  // 20240217
  CloseServer: 'Fermer le serveur',
  BanList: 'bannir les joueurs',
  BanListLong: 'Ban List',
  UnBan: 'Unban',
  Dashboard: 'Tableau de bord',
  Setting: 'Paramètres',
  RAM: 'RAM',
  OnlinePlayer: 'Joueur en ligne',
  KickPlayer: 'expulser le Joueur',
  KickPlayerDesc:
    'Etes-vous sûr de vouloir expulser ${1} ? Cette action supprimera ${2} du serveur.',
  ConfirmKick: ' Confirmer expulsion',
  Ban: 'bannir',
  BanDesc:
    'Êtes-vous sûr de vouloir bannir ${1} ? Cette action supprimera ${2} du serveur et l utilisateur ne pourra pas le rejoindre à nouveau tant qu il n aura pas été débloqué.',
  ConfirmBan: ' Confirmer l interdiction',
  Send: 'Envoyer',
  EnterCommandOrBoardCast: 'Entrez une commande ou un message de diffusion...',
  PlayerName: 'Nom du joueur',
  PlayerID: 'ID du joueur',
  Other: 'Autre',
  // 20240218
  RCONEnabledDesc:
    ' Vous devez activer la console distante (RCON) pour utiliser le tableau de bord.',
  RCONFirst: 'Veuillez d abord activer RCON pour activer cette fonctionnalité.',
  ServerBackupRecord: 'Enregistrements de sauvegarde du serveur',
  Ouvert: 'Ouvrir',
  // 20240226
  SupportBy: '由 <u>${1}</u> 進行供電',
  // 20240227
  MigrateSaveDesc:
    'Si vous devez migrer votre sauvegarde, veuillez accéder aux Paramètres pour continuer.',
  OpenFilePath: 'Ouvrir le chemin du fichier',
  //
  Rename: 'Renommer',
  DeleteMod: 'Supprimer le mod',
  SetTime: 'Régler l heure',
  HourPerTime: 'heures',
  UpdateLog: 'Journal de mise à jour',
  OpenToCommunity: 'Menu ouvert à la communauté',
  PalSettings: 'Paramètres de Pal',
  PlayerSettings: 'Paramètres de Joueur',
  GuildSettings: 'Paramètres de guilde',
  OthersSettings: 'Autres paramètres',
  HasNotASCIIPath:
    'Le chemin d accès à l interface utilisateur de votre serveur PalServer peut contenir des caractères chinois ou non-ASCII. Veuillez le modifier pour terminer la mise à jour. Nom du chemin',

  ChangeIcon: 'Changer d icône',
  CopyServer: 'Copier le serveur',
  DuplicateServer: 'Dupliquer le serveur',
  DuplicateServerDesc:
    'La duplication inclura tous les fichiers de configuration, modules et fichiers mondiaux :',
  ExportServer: 'exporter le serveur',
  CreateRemoteServer: 'Connexion à distance',
  ChangeServerIcon: 'Changer l icône du serveur',
  OpenFolder: 'Ouvrir le dossier',
  ServerFolder: 'Dossier du serveur',
  InstanceFolder: 'Dossier d instance',
  SaveFolder: 'dossier de sauvegarde',
  WorldSaveFolder: 'Dossier de sauvegarde du monde',
  PalConfigFolder: 'Dossier de configuration',
  ServerInstanceFolder: 'Dossier d instance de l interface graphique',
  WorldSettingsFolder: 'Dossier Paramètres mondiaux',
  ImportServer: 'Importer le Server',
  FourPlayerSave: 'Sauvegarde locale',
  DedicatedServer: 'Serveur dédié',
  ServerInstance: 'Instance d interface graphique',
  SwitchToServer: 'Passer au serveur ',
  SwitchToAll: 'Passer à tous les serveur',
  PlayerLocation: 'Emplacement du joueur',
  PlayerId: 'ID du joueur',
  Performance: 'Performance',
  Internet: 'Internet',
  Security: 'Sécurité',
  Restart: 'Redémarrage',
  ServerNeedUpgrade: 'Le serveur doit être mis à niveau !',
  ServerNeedUpgradeDesc:
    'Mettez à jour la version du serveur vers la dernière version jouable.',
  PerformanceOptimizationEnabled: 'Optimisation des performances',
  PerformanceOptimizationEnabledDesc:
    'Supprimez les limites de fréquence d images, améliorez la mise en réseau et améliorez les performances dans les environnements CPU multithread.',
  PerformanceMonitorEnabled: 'Activer la surveillance des performances',
  PerformanceMonitorEnabledDesc:
    'Surveille les performances du serveur et de l ordinateur, les systèmes de mesures et les écrans d affichage. Cela affecte légèrement les performances lorsqu il est activé.',
  PerformanceMonitorAnimationEnabled: 'Animation du moniteur de performances',
  PerformanceMonitorAnimationEnabledDesc:
    'Activer l animation pour la surveillance des performances. Cela a un léger impact sur les performances. Cela a un léger impact sur les performances lorsqu il est activé.',
  RESTAPIEnabledDesc:
    'Activer le serveur API REST. Nous vous recommandons fortement de l activer pour bénéficier de toutes les fonctionnalités.',
  PublicPortDesc: 'Numéro de port public du serveur.',
  RCONPortDesc: 'Numéro de port RCON de la connexion à distance',
  RESTAPIPortDesc: 'Numéro de port réseau de l API REST.',
  ModManagementEnabled: 'Activer le menu Mod',
  ModManagementEnabledDesc:
    'Activer le gestionnaire de modules serveur pour l interface utilisateur graphique du serveur Pal. Prend en charge la gestion des fichiers Lua, Pak et DLL, et prend en charge l exportation vers le client (jeu).',
  UE4SSEnabled: 'Activer UE4SS',
  UE4SSEnabledDesc:
    'Système de script Lua injectable, générateur de SDK et éditeur de propriétés en temps réel pour UE4/5. Certains modules s appuient sur UE4SS.',
  PalguardEnabled: 'Activer Palguard (Anti Triche)',
  PalguardEnabledDesc:
    'Le plugin Palguard fournit une détection anti-triche, des journaux de serveur et d autres commandes d administrateur. Nous vous recommandons de l activer pour bénéficier de toutes les fonctionnalités.',
  EngineInstalling: 'Installation du système en cours... Veuillez patienter',
  EngineInstallFinish: 'Installation du système terminée',
  NoServer:
    'Aucun serveur disponible, veuillez faire un clic droit pour ajouter ou importer.',
  ServerHasNoPlayers: 'Le serveur n a pas de joueurs',
  ServerHasNoLog: 'Aucun journal disponible pour le moment',
  ServerPlayers: 'Joueurs du serveur',
  ServerLog: 'Journal du serveur',
  PerformanceMonitor: 'Moniteur de performances',
  ServerManagement: 'Gestion du serveur',
  ServerSettings: 'Paramètres du serveur',
  Schedule: 'Calendrier',
  CommandsList: 'Liste des commandes',
  OpenToCommunityDesc:
    'Rendre le serveur disponible dans la liste du menu communautaire du jeu.',
  SomeMightRestartToApplyChange:
    'Certains paramètres peuvent nécessiter un redémarrage pour prendre effet !',
  Language: 'Language',
  LanguageDesc: 'Aidez-nous à traduire l interface graphique de Palserver.',
  OfficalWebsite: 'Site web',
  ServerBackupDesc:
    'Emplacement pour les archives de sauvegarde du serveur, pour restaurer les enregistrements de jeu.',
  ServerPasswordDesc: 'Définissez un mot de passe pour le serveur.',
  AdminPasswordDesc: 'Définir un mot de passe administrateur.',
  AutoRestart: 'Auto Restart',
  AutoRestartDesc:
    'Redémarrez le serveur périodiquement. Rcon doit être activé.',
  CrashRestart: 'Redémarrage en cas de crash',
  CrashRestartDesc:
    'Redémarrez le serveur en cas de crash. Nécessite l activation de RCON.',
  OverRamRestart: 'Redémarrage au-delà du seuil de la RAM',
  OverRamRestartDesc:
    'Redémarrez le serveur lorsque l’utilisation de la mémoire dépasse 90 %.',
  All: 'Tout',
  UpTime: 'Temps de disponibilité',
  AppSettings: 'Paramètres de l application',
  MoreActions: 'Plus d actions',
  AdvancedActions: 'Actions avancées',
  Set: 'Définir',
  SetAsAdmin: 'Définir comme administrateur',
  SetAsAdminDesc: 'Définir ${1} comme administrateur du serveur',
  Kick: 'Expulser',
  KickDesc: 'Expulser l utilisateur',
  BanIP: 'Interdire l adresse IP ${1}',
  GiveItem: 'Donner un article',
  GivePlayerItem: 'Donner ${1} article',
  GiveItemDesc: 'Donnez la quantité spécifiée d objets dans le jeu',
  Choose: 'Choisir',
  GivePal: 'Donner Pal',
  GivePlayerPal: 'Donner ${1} Pal',
  GivePalDesc: 'Donner ${1} specified Pal',
  GiveExp: 'Donner de l expérience',
  GivePlayerExp: 'Donner ${1} Exp',
  GiveExpDesc: 'Donner ${1} quantité spécifiée d expérience',
  ClickLink: 'Lien ouvert',
  OpenFolder2: 'Ouvrir le dossier',
  UE4SSNeedUpgrade: 'UE4SS a besoin d une mise à niveau !',
  UE4SSNeedUpgradeDesc:
    'Mettez à niveau UE4SS vers la dernière version, sinon certains modules risquent de ne pas fonctionner correctement.',
  PalguardNeedUpgrade: 'Palguard a besoin d une mise à niveau !',
  PalguardNeedUpgradeDesc:
    'Mettez à niveau Palguard vers la dernière version, sinon certaines fonctionnalités risquent de ne pas fonctionner correctement.',
  Update: 'Mise à jour',
  ModManagement: 'Gestion des modules d extension',
  AddLuaMod: 'Ajouter un module Lua',
  OpenLuaModFolder: 'Ouvrir le dossier Mod',
  OtherExtensions: 'Autres extensions',
  OnlineMap: 'Carte en ligne',
  OnlineMapDesc:
    'Affichez les emplacements des joueurs dent le jeux (en ligne en temps réel.)',
  LogEnabled: 'Journal activé',
  LogEnabledDesc:
    'Prise en charge de l affichage du journal Palguard pour l entrée du joueur, les messages de discussion, etc.',
  LogFolder: 'Dossier des journaux',
  ClearCache: 'Vider le cache',
  ClearCacheDesc:
    'If le serveur ne peut pas démarrer, essayez de supprimer le serveur, de vider le cache, puis de redémarrer l interface graphique du serveur Pal, de recréer le serveur, puis d essayer de démarrer le serveur.',
  Clear: ' effacer',
  ServerInstancePath: 'Instance Path (requires restart)',
  Change: 'Changement',
  ImportGameSaves: 'Importer des sauvegardes de jeu',
  HowToImportDedicatedServer:
    'Comment importer un serveur dédié (Windows / Linux) ?',
  HowToImportFourPlayerSaves:
    'Comment importer des sauvegardes locales (code d invitation à quatre joueurs) ?',
  HelpPlzJoinUs: 'Dépannage - Veuillez vous joindre à notre',
  SpecialThanks: 'Remerciements spéciaux',
  SpeicalThanksDesc:
    'Merci à tous les développeurs, sponsors, assistants et à tous ceux qui utilisent l interface graphique.',
  BuyMeACoffee: 'Offrez-moi un café',
  Process: 'Processus',
  UseIndependentProcess: 'Utiliser un processus indépendant',
  UseIndependentProcessDesc:
    'Lorsque votre serveur subit fréquemment des pannes inattendues, veuillez activer cette option. Par défaut, elle est activée. Lorsqu elle est activée, le serveur et l interface graphique s exécutent en tant que processus distincts. Si vous devez utiliser le panneau de surveillance des performances, veuillez le désactiver. Dans ce cas, le serveur s exécutera en tant que sous-processus de l interface graphique.',
  ServerVersion: 'Version du serveur',
  SupportGUI: 'Support GUI ❤️',
  PlzCloseServerFirst: ' Veuillez d abord fermer le serveur',
  BaseCampMaxNumInGuild: 'Nombre maximum de camps de base par guilde',
  bInvisibleOtherGuildBaseCampAreaFX:
    'Masquer les effets de la zone du camp de base des autres guildes',
  AutoSaveSpan: 'Intervalle de sauvegarde automatique (secondes)',
  ServerCantUse: 'Serveur (Indisponible)',
  CrossplayPlatforms: 'Plateformes de connexion autorisées',
  Give: 'Donner',
  GiveRelic: 'Donner une statue de Souris Feuille',
  GiveRelicDesc: 'Donner ${1} nombre spécifié de statues de Souris Feuille.',
  GiveTech: 'Donner des points de technologie',
  GiveTechDesc: 'Donner ${1} nombre spécifié de points de technologie.',
  GiveBossTech: 'Donner des points de technologie ancienne',
  GiveBossTechDesc:
    'Donner ${1} nombre spécifié de points de technologie ancienne.',
  SupplyDropSpan: 'Plage de largage de fournitures',
  RandomizerType: 'Type de randomisation',
  RandomizerType_None: 'Pas de randomisation',
  RandomizerType_1: 'Randomisation par zone',
  RandomizerType_2: 'Randomisation globale',
  RandomizerSeed: 'Graine de randomisation',
  ServerListFolder: 'Dossier de la liste des serveurs',
  DetailData: 'Données détaillées',
  ServerId: 'ID du serveur',
  ServerReplicatePawnCullDistance: 'Distance joueur-Pal (cm)',
  AllowConnectPlatform: 'Autoriser le jeu cross-platform',
  bAllowGlobalPalboxExport:
    "Autoriser l'exportation depuis le terminal du Palbox global",
  bAllowGlobalPalboxImport:
    "Autoriser l'importation dans le terminal du Palbox global",
  bBuildAreaLimit: 'Interdire la construction près des structures',
  bHardcore: 'Activer le mode Hardcore',
  bIsRandomizerPalLevelRandom: 'Activer le niveau Pal aléatoire',
  bIsUseBackupSaveData: 'Activer la sauvegarde du monde',
  bPalLost: 'Pal perdu définitivement à la mort',
  BuildSettings: 'Paramètres de construction',
  DropSettings: 'Paramètres de largage',
  FixCompleted: 'Réparation terminée !',
  ServerError: 'Erreur du serveur',
  InstallCompleted: 'Installation terminée !',
  FirstTimeWelcome: 'Première fois, bienvenue !',
  UpdateCompleted: 'Mise à jour terminée !',
  ServerNeedsUpdate:
    'Une nouvelle version du jeu est disponible. Le serveur doit être mis à jour.',
  ServerFileFixCompleted: 'Réparation des fichiers du serveur dédié terminée.',
  ServerFileMissing:
    "Il manque des fichiers du serveur dédié, probablement en raison d'une interruption du processus d'installation ou de fichiers corrompus. Veuillez essayer de réparer le serveur dédié.",
  ServerInstalledCompleted: 'Serveur dédié installé avec succès.',
  InstallReminder:
    "Vous devez d'abord installer le serveur dédié avant d'utiliser Palserver-GUI. (L'installation initiale prend environ 7 à 10 minutes).",
  AllServersUpdated:
    'Tous les serveurs dédiés ont été mis à jour vers la dernière version.',
  UpdateReminder:
    "Après la sortie d'une nouvelle version de Palworld, les serveurs dédiés gérés par Palserver-GUI (et non Palserver-GUI lui-même) doivent également être mis à jour. Vous pouvez choisir de mettre à jour tous les serveurs en une seule fois ou de les mettre à jour individuellement (sélectionnable dans la page de gestion des serveurs).",
  Close: 'Fermer',
  Fix: 'Réparer',
  Install: 'Installer',
  OneClickUpdate: 'Mise à jour',
  HowToGetIPAdress: 'Comment obtenir une adresse IP ?',
};
export default fr;
