import { SelectedServerInstanceAction } from './selectedServerInstance.types';

export const selectedServerInstance = (
  prevSate: string = '',
  action: SelectedServerInstanceAction,
) => {
  let newState = prevSate;
  if (action.type === 'set_selected_server_instance') {
    newState = action.payload;
    return newState;
  }
  return prevSate;
};
