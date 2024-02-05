import { createContext } from 'react';
import { IOpeningWindow } from 'src/hooks/useWindows';

const WindowsContext = createContext({
  closeWindow: (_windowId: string) => {},
  openWindow: (_OpeningWindow: IOpeningWindow) => {},
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  genNewWindows: (_content?: any) => {},
  changeWindowProps: (
    _windowId: string,
    _props: { newTitle?: string; newId?: string; newX?: number; newY?: number }
  ) => {},
});

export default WindowsContext;
