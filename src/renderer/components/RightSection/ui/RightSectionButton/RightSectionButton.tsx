import React from 'react';

type Props = {
  onClick: () => void;
  children: string;
};

export default function RightSectionButton(props: Props) {
  return (
    <div onClick={props.onClick}>
      <div className="w-full h-10 bg-bg1 hover:opacity-70 text-gray-200 rounded-lg flex items-center justify-center select-none cursor-pointer">
        {props.children}
      </div>
    </div>
  );
}
