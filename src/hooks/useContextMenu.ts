import { useEffect, useState } from 'react';

export const useContextMenu = () => {
  const [cm, setCm] = useState(false);
  const [cmCoords, setCmCoords] = useState({ x: 0, y: 0 });

  const handleContextMenu = (event: MouseEvent) => {
    event.preventDefault(); // Prevent the browser's default context menu
    setCmCoords({ x: event.pageX, y: event.pageY });
    setCm(true);
  };

  const handleHideContextMenu = () => {
    setCm(false);
  };

  useEffect(() => {
    window.addEventListener('contextmenu', handleContextMenu);
    window.addEventListener('click', handleHideContextMenu);
    return () => {
      window.removeEventListener('contextmenu', handleContextMenu);
      window.removeEventListener('click', handleHideContextMenu);
    };
  }, []);

  return { cm, cmCoords, hideMenu: handleHideContextMenu };
};

export default useContextMenu;
