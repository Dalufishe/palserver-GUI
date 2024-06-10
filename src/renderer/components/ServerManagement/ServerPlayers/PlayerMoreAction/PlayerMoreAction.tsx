import { AlertDialog, Button } from '@radix-ui/themes';
import useTranslation from '../../../../hooks/translation/useTranslation';
import ActionList from './ActionList/ActionList';
import { useState } from 'react';
import GivePalToPlayer from './GivePalToPlayer/GivePalToPlayer';
import GiveItemToPlayer from './GiveItemToPlayer/GiveItemToPlayer';
import GiveExpToPlayer from './GiveExpToPlayer/GiveExpToPlayer';

export default function PlayerMoreAction({
  playerId,
  steamId,
  name,
}: {
  playerId: string;
  steamId: string;
  name: string;
}) {
  const { t } = useTranslation();

  const [actionType, setActionType] = useState<
    'list' | 'give_items' | 'give_pals' | 'give_exps'
  >('list');

  return (
    <AlertDialog.Root
      onOpenChange={() => {
        setActionType('list');
      }}
    >
      <AlertDialog.Trigger>
        <Button size="1" color="gray">
          {t('MoreActions')}
        </Button>
      </AlertDialog.Trigger>
      {actionType === 'list' && (
        <ActionList
          actionType={actionType}
          setActionType={setActionType}
          playerId={playerId}
          steamid={steamId}
          name={name}
        />
      )}
      {actionType === 'give_items' && (
        <GiveItemToPlayer
          actionType={actionType}
          setActionType={setActionType}
          playerId={playerId}
          steamId={steamId}
          name={name}
        />
      )}
      {actionType === 'give_pals' && (
        <GivePalToPlayer
          actionType={actionType}
          setActionType={setActionType}
          playerId={playerId}
          steamId={steamId}
          name={name}
        />
      )}
      {actionType === 'give_exps' && (
        <GiveExpToPlayer
          actionType={actionType}
          setActionType={setActionType}
          playerId={playerId}
          steamId={steamId}
          name={name}
        />
      )}
    </AlertDialog.Root>
  );
}
