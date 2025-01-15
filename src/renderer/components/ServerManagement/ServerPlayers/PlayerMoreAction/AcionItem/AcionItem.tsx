import { Blockquote, Button, Heading, Text, TextField } from '@radix-ui/themes';
import { useState } from 'react';

export default function ActionItem({
  title,
  subtitle,
  buttonText,
  color,
  onButtonClick,
  hasInput,
  inputDefaultValue,
}: {
  title: string;
  subtitle: string;
  buttonText: string;
  color?: string;
  onButtonClick?: any;
  hasInput?: boolean;
  inputDefaultValue: number;
}) {
  const [inputValue, setInputValue] = useState(inputDefaultValue || 1);

  return (
    <ul className="flex items-center pr-16">
      <Blockquote color={color as any}>
        <Heading size="3" style={{ color: '#222' }}>
          {title}
        </Heading>
        <Text size="2" color="gray">
          {subtitle}
        </Text>
      </Blockquote>
      <div className="flex gap-3 absolute right-8">
        {hasInput && (
          <TextField.Root
            className="w-24"
            value={inputValue}
            onChange={(e) => {
              if (!Number.isNaN(Number(e.target.value))) {
                setInputValue(Number(e.target.value));
              }
            }}
          />
        )}
        <Button
          onClick={() => {
            onButtonClick(inputValue);
          }}
          color={color as any}
        >
          {buttonText}
        </Button>
      </div>
    </ul>
  );
}
