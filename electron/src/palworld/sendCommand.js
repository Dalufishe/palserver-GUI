const RCONClient = require("../utils/rcon/client");

module.exports = async (
  options,
  command
) => {
  const client = new RCONClient(options.ipAddress, options.port);

  await client.connect(options.password || "");

  const response = await client.sendCommand(command);

  return response.toString().replace(/\u0000/g, "");
};