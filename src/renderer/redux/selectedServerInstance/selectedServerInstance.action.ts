import { SelectedServerInstanceAction } from './selectedServerInstance.types';

export const selectedServerInstanceAction = (
  data: string,
): SelectedServerInstanceAction => {
  return {
    type: 'set_selected_server_instance',
    payload: data,
  };
};
