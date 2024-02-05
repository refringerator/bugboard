import { createContext } from 'react';
import { IOpeningWindow } from 'src/hooks/useWindows';

const WindowsContext = createContext({
  closeWindow: (_windowId: string) => {},
  openWindow: (_OpeningWindow: IOpeningWindow) => {},
  changeWindowProps: (
    _windowId: string,
    _props: { newTitle?: string; newId?: string; newX?: number; newY?: number }
  ) => {},
});

export default WindowsContext;
