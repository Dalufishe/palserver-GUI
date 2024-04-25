import RCONClient from './client';

export default async (
  options: { ipAddress: string; port: number; password: string },
  command: string,
) => {
  const client = new RCONClient(options.ipAddress, options.port);

  await client.connect(options.password || '');

  const response = await client.sendCommand(command);

  return response.toString().replace(/\u0000/g, '');
};
