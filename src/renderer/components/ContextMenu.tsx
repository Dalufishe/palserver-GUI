/* eslint-disable @typescript-eslint/no-shadow */
import { AlertDialog, ContextMenu } from '@radix-ui/themes';
import React from 'react';
import useTranslation from '../hooks/translation/useTranslation';

export type ContextMenuOptions = {
  id: string;
  type: 'action' | 'seperator' | 'sub' | 'disabled';
  shortcut?: string;
  sub?: any;
  value?: any;
  color?: string;
  action?: () => void;
}[];

type Props = {
  trigger: React.ReactNode;
  content: ContextMenuOptions;
};

export default function TheContextMenu(props: Props) {
  const { t } = useTranslation();

  return (
    <ContextMenu.Root>
      <ContextMenu.Trigger>{props.trigger}</ContextMenu.Trigger>
      <ContextMenu.Content>
        {props.content.map((option) => {
          if (option.type === 'seperator') {
            return <ContextMenu.Separator />;
          }
          if (option.type === 'sub') {
            return (
              <ContextMenu.Sub>
                <ContextMenu.SubTrigger>
                  {option.value || t(option.id)}
                </ContextMenu.SubTrigger>
                <ContextMenu.SubContent>
                  {option.sub.map((option: any) => {
                    if (option.type === 'seperator') {
                      return <ContextMenu.Separator />;
                    }
                    if (option.type === 'sub') {
                      return (
                        <ContextMenu.Sub>
                          <ContextMenu.SubTrigger>
                            {option.value || t(option.id)}
                          </ContextMenu.SubTrigger>
                          <ContextMenu.SubContent></ContextMenu.SubContent>
                        </ContextMenu.Sub>
                      );
                    }
                    return (
                      <AlertDialog.Trigger onClick={option.action}>
                        <ContextMenu.Item
                          disabled={option.type === 'disabled'}
                          shortcut={option.shortcut}
                          // @ts-ignore
                          color={option.color}
                          style={{
                            color:
                              option.type === 'disabled' ? option.color : '',
                          }}
                        >
                          {option.value || t(option.id)}
                        </ContextMenu.Item>
                      </AlertDialog.Trigger>
                    );
                  })}
                </ContextMenu.SubContent>
              </ContextMenu.Sub>
            );
          }
          return (
            <AlertDialog.Trigger onClick={option.action}>
              <ContextMenu.Item
                disabled={option.type === 'disabled'}
                shortcut={option.shortcut}
                // @ts-ignore
                color={option.color}
                style={{
                  color: option.type === 'disabled' ? option.color : '',
                }}
              >
                {option.value || t(option.id)}
              </ContextMenu.Item>
            </AlertDialog.Trigger>
          );
        })}
      </ContextMenu.Content>
    </ContextMenu.Root>
  );
}
