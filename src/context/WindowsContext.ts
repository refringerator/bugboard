// TODO: продумать типы для контента и заголовка, чтобы убрать any
/* eslint-disable @typescript-eslint/no-explicit-any */

import { createContext } from 'react';
import { IOpeningWindow } from 'src/hooks/useWindows';

export const WindowsContext = createContext({
  closeWindow: (_windowId: string) => {},
  openWindow: (_OpeningWindow: IOpeningWindow) => {},
  genNewWindows: (
    _id?: string,
    _title?: any,
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
