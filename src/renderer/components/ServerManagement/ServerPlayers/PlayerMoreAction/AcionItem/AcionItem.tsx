import { Blockquote, Button, Heading, Text } from '@radix-ui/themes';

export default function ActionItem({
  title,
  subtitle,
  buttonText,
  color,
  onButtonClick,
}: {
  title: string;
  subtitle: string;
  buttonText: string;
  color?: string;
  onButtonClick?: any;
}) {
  return (
    <ul className="flex items-center justify-between">
      <Blockquote color={color as any}>
        <Heading size="3" style={{ color: '#222' }}>
          {title}
        </Heading>
        <Text size="2" color="gray">
          {subtitle}
        </Text>
      </Blockquote>
      <Button onClick={onButtonClick} color={color as any}>
        {buttonText}
      </Button>
    </ul>
  );
}
