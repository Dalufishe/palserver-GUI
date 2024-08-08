/* eslint-disable global-require */
/* eslint-disable import/no-dynamic-require */
import { Text, TextField } from '@radix-ui/themes';
import React, { useEffect, useState } from 'react';
import useTranslation from '../../../../../../hooks/translation/useTranslation';
import { useHover } from '../../../../../../hooks/useHover';

export default function PalItem(props: {
  type: 'boss' | 'pal';
  pal: { id: string; name: string; image: string };
  amount: number;
  onAmountChange: (v: number) => void;
}) {
  const { t } = useTranslation();

  const [hoverRef, isHover] = useHover();

  const [amount, setAmount] = useState(0);

  useEffect(() => {
    props.onAmountChange(amount);
  }, [amount]);

  useEffect(() => {
    setAmount(props.amount);
  }, [props.amount]);

  return (
    <li
      onMouseDown={(e) => {
        if (e.button === 2) {
          if (amount < 2) setAmount(0);
          else if (amount === 10) setAmount(1);
          else setAmount(amount - 10);
        } else {
          if (amount < 1) setAmount(1);
          else if (amount === 1) setAmount(10);
          else setAmount(amount + 10);
        }
      }}
      className="flex items-center justify-between w-[97%] hover:bg-slate-100 rounded-lg p-2 cursor-pointer select-none"
      title={props.pal.id}
    >
      <div className="flex items-center relative">
        <img className="w-12 h-12" src={props.pal.image} alt="" />
        {props.type === 'boss' && (
          <img
            className="absolute w-6 h-6 -top-2 left-8"
            src={require('../../../../../../../../assets/game-data/images/others/bossIcon.png')}
            alt=""
          />
        )}
        <span className="ml-3 select-text">
          {props.type === 'boss' ? t(props.pal.id.slice(5)) : t(props.pal.id)}
        </span>
      </div>

      {!!amount && (
        // @ts-ignore
        <div className="flex items-center w-16" ref={hoverRef}>
          {isHover ? (
            <TextField.Root
              onMouseDown={(e) => {
                e.stopPropagation();
              }}
              type="number"
              value={amount}
              onChange={(e) => {
                if (!e.target.value) {
                  setAmount(Number(e.target.value));
                } else if (Number(e.target.value) < 0) {
                  setAmount(0);
                } else {
                  setAmount(Number(e.target.value));
                }
              }}
              size="3"
            />
          ) : (
            <span className="w-16 text-center">
              <span className="text-xs font-mono">LV</span> {amount}
            </span>
          )}
        </div>
      )}
    </li>
  );
}
