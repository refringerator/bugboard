import { createContext } from 'react';
import { IOpeningWindow } from 'src/hooks/useWindows';

const WindowsContext = createContext({
  closeWindow: (_windowId: string) => {},
  openWindow: (_OpeningWindow: IOpeningWindow) => {},
  genNewWindows: (
    _id?: string,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    _title?: any,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    _content?: any,
    _props?: {
      newX?: number;
      newY?: number;
      height?: number;
      width?: number;
    }
  ) => {},
  changeWindowProps: (
    _windowId: string,
    _props: { newTitle?: string; newId?: string; newX?: number; newY?: number }
  ) => {},
});

export default WindowsContext;
