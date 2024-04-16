import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { selectedServerInstanceAction } from './selectedServerInstance.action';

const useSelectedServerInstance = () => {
  const dispatch = useDispatch();
  const selectedServerInstance = useSelector<RootState, string>(
    (state) => state.selectedServerInstance,
  );
  const setSelectedServerInstance = (v: string) => {
    dispatch(selectedServerInstanceAction(v));
  };

  return { selectedServerInstance, setSelectedServerInstance };
};

export default useSelectedServerInstance;
