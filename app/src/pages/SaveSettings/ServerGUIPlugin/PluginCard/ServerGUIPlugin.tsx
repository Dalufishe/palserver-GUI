import PluginCard from "./PluginCard";

export default function ServerGUIPlugin() {
  return (
    <div className="p-2 w-full flex flex-row gap-4 flex-wrap">
      <PluginCard
        name="Palguard"
        author="ulti"
        price={0}
        img="https://staticdelivery.nexusmods.com/mods/6063/images/thumbnails/451/451-1707801845-1316271837.png"
        description={[
          "PalGuard 提供更多的伺服器指令及日誌紀錄。",
          "給予玩家帕魯、道具跟經驗。",
          "紀錄玩家上下線及遊戲中的狀態。",
          "基於 IP 地址的防作弊系統，避免駭客及盜版玩家破壞伺服器。",
        ]}
      />
      <PluginCard
        name="MSE"
        title="MSE (Multiple Server Engine)"
        author="dalufishe"
        price={20}
        img={require("../../../../assets/plugins/multiple_server.png")}
        description={[
          "MSE 允許您在同一時間運行多個伺服器。",
        ]}
      />
    </div>
  );
}
