import { createContext } from 'react';

const WindowsContext = createContext({
  closeWindow: (windowId: string) => {},
  openWindow: (
    OpeningWindow: React.FC & {
      windowId: string;
      title: string;
      minHeight?: number;
      minWidth?: number;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      params?: Record<string, any>;
    }
  ) => {},
});

export default WindowsContext;
