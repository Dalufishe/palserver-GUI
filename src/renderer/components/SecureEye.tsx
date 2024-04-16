import { IconButton } from '@radix-ui/themes';
import React, { useEffect, useState } from 'react';
import { PiEyeBold, PiEyeClosedBold } from 'react-icons/pi';

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export default function SecureEye(props: Props) {
  const [open, setOpen] = useState(props.open || false);

  useEffect(() => {
    props.onOpenChange(open);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  return (
    <IconButton
      onClick={() => {
        setOpen(!open);
      }}
      radius="full"
      variant="soft"
      color="gray"
    >
      {open ? <PiEyeBold /> : <PiEyeClosedBold />}
    </IconButton>
  );
}
