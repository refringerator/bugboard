import { createContext } from 'react';
import { IOpeningWindow } from 'src/hooks/useWindows';

const WindowsContext = createContext({
  closeWindow: (_windowId: string) => {},
  openWindow: (_OpeningWindow: IOpeningWindow) => {},
});

export default WindowsContext;
