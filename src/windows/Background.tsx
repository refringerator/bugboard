import { memo } from 'react';

interface Props {
  color: string;
}

const Background = memo(({ color }: Props) => {
  return (
    <div
      style={{
        backgroundColor: color || 'fff',
        flex: '1 1 auto',
        height: '100%',
      }}
    >
      123
    </div>
  );
});

Background.displayName = '1234';

export default Background;
