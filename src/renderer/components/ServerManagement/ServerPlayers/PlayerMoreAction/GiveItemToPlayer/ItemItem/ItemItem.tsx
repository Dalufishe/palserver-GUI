/* eslint-disable global-require */
import { TextField } from '@radix-ui/themes';
import { useEffect, useState } from 'react';
import useTranslation from '../../../../../../hooks/translation/useTranslation';
import { useHover } from '../../../../../../hooks/useHover';

export default function ItemItem(props: {
  item: { id: string; name: string; image: string };
  amount: number;
  onAmountChange: (v: number) => void;
}) {
  const { t } = useTranslation();

  const [hoverRef, isHover] = useHover();

  const [amount, setAmount] = useState(props.amount);

  useEffect(() => {
    props.onAmountChange(amount);
  }, [amount]);

  useEffect(() => {
    setAmount(props.amount);
  }, [props.amount]);

  return (
    // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
    <li
      onMouseDown={(e) => {
        if (e.button === 2) {
          if (amount < 1) setAmount(0);
          else setAmount(amount - 1);
        } else {
          setAmount(amount + 1);
        }
      }}
      className="flex items-center justify-between w-[97%] hover:bg-slate-100 rounded-lg p-2 cursor-pointer select-none"
      title={props.item.id}
    >
      <div className="flex items-center">
        <img
          className="w-12 h-12"
          loading="lazy"
          src={props.item.image}
          alt=""
        />
        <span className="ml-3 select-text">{t(props.item.id)}</span>
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
              <span className="text-xs font-mono"></span> {amount}
            </span>
          )}
        </div>
      )}
    </li>
  );
}
