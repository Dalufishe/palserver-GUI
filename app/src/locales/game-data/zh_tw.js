import game_data_cmd_zh_tw from "./cmd/zh_tw"
import game_data_items_zh_tw from "./items/zh_tw"
import game_data_pals_zh_tw from "./pals/zh_tw"

const game_data_zh_tw = {
    // 物品
    ...game_data_items_zh_tw,
    // 帕魯
    ...game_data_pals_zh_tw,
    //指令
    ...game_data_cmd_zh_tw
}
export default game_data_zh_tw