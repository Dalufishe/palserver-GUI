import useLocalState from '../useLocalState';

const useServerEngineVersion = () => {
  const [serverEngineVersion, setServerEngineVersion] = useLocalState<number>(
    'server-engine-version',
    0,
  );

  return [serverEngineVersion, setServerEngineVersion];
};

export default useServerEngineVersion;
