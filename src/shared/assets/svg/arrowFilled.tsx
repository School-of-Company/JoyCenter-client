interface ArrowFilledProps {
  color?: string;
  width?: number;
  height?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
}

export default function ArrowFilled({
  color = '#000000',
  width = 16,
  height = 32,
  direction = 'right',
}: ArrowFilledProps) {
  const getRotation = () => {
    switch (direction) {
      case 'up':
        return 'rotate(-90deg)';
      case 'down':
        return 'rotate(90deg)';
      case 'left':
        return 'rotate(180deg)';
      case 'right':
      default:
        return 'rotate(0deg)';
    }
  };

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 16 32"
      fill="none"
      style={{ transform: getRotation() }}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M13.5427 16.9475L6.00008 24.4902L4.11475 22.6049L10.7147 16.0049L4.11475 9.40486L6.00008 7.51953L13.5427 15.0622C13.7927 15.3122 13.9331 15.6513 13.9331 16.0049C13.9331 16.3584 13.7927 16.6975 13.5427 16.9475Z"
        fill={color}
      />
    </svg>
  );
}
