import { AlertDialog, Button, Flex } from '@radix-ui/themes';
import useTranslation from '../../../hooks/translation/useTranslation';
import Link from '../../Link';
import useOnlineLinksMap from '../../../hooks/firebase/useOnlineLinksMap';

export default function ImportServer() {
  const { t } = useTranslation();

  const howToImportFourPlayerSavesLink = useOnlineLinksMap(
    'HowToImportFourPlayerSaves',
  );
  const howToImportDedicatedServerLink = useOnlineLinksMap(
    'HowToImportDedicatedServer',
  );
 
  return (
    <AlertDialog.Content style={{ maxWidth: 450 }}>
      <AlertDialog.Title>{t('ImportServer')}</AlertDialog.Title>
      <div className="flex flex-col py-2">
        <ul className="list-disc pl-6 flex flex-col gap-2">
          <Link href={howToImportFourPlayerSavesLink} appearance="light">
            <li>{t('HowToImportFourPlayerSaves')}</li>
          </Link>
          <Link href={howToImportDedicatedServerLink} appearance="light">
            <li>{t('HowToImportDedicatedServer')}</li>
          </Link>
          <li>
            {t('HelpPlzJoinUs')}{' '}
            <Link
              href="https://discord.com/invite/sgMMdUZd3V"
              appearance="light"
            >
              Discord
            </Link>
            。
          </li>
        </ul>
      </div>
      <Flex gap="3" mt="4" justify="end">
        <AlertDialog.Cancel>
          <Button variant="soft" color="gray">
            {t('Cancel')}
          </Button>
        </AlertDialog.Cancel>
      </Flex>
    </AlertDialog.Content>
  );
}
