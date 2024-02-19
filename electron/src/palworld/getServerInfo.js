const parseCSV = require("../utils/format/parseCSV");
const sendCommand = require("./sendCommand");

module.exports = async function getServerInfo(options) {
  const getServerInfo = (await sendCommand(options, "Info")).toString();
  const parts = getServerInfo.split("[");
  const serverVersion = parts[1].split("]")[0];
  const serverName = parts[1]
    .split("]")[1]
    .replace(/[\n\u0000]+$/, "")
    .trim();
  const getPlayers = await sendCommand(options, "ShowPlayers");
  const playerlist = parseCSV(
    getPlayers.toString().replace(/\u0000/g, "")
  ).filter((x) => x.playeruid);



  return {
    serverName, serverVersion, playerlist
  }
}
