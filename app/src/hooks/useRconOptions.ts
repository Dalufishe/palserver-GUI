import useWorldSettings from "./useWorldSettings";

const useRconOptions = () => {
  const worldSettings = useWorldSettings();

  const rconOptions = {
    ipAddress: "127.0.0.1",
    port: worldSettings.RCONPort,
    password: worldSettings.AdminPassword?.slice(1, -1),
  };

  return rconOptions

};

export default useRconOptions