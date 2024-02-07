import { useContext, useEffect } from 'react';
import { WindowsContext } from 'src/context';
import { IOpeningWindow } from 'src/hooks';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type TWindowOpener = { window: any };

function WindowOpener({ window }: TWindowOpener) {
  const { openWindow } = useContext(WindowsContext);

  useEffect(() => {
    openWindow(window as IOpeningWindow);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [window]);

  return null;
}

export default WindowOpener;
