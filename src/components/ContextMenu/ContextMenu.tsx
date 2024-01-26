/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useState } from 'react';
import './ContextMenu.css';

interface ContextMenuProps {
  //   width?: number;
  //   height?: number;
  //   minWidth?: number;
  //   minHeight?: number;
  //   id: string;
  //   title: string;
  //   content: string;
  //   zIndex?: number;
  startX?: number;
  startY?: number;
  onCloseClick: () => void;
  //   onWindowFocus: (id: string) => void;
}

function ContextMenu({ startX, startY, onCloseClick }: ContextMenuProps) {
  const customAction = (action: string) => () => {
    alert(`Performing ${action}`);
    onCloseClick();
  };

  return (
    <ul style={{ left: startX, top: startY }} className="context-menu">
      <li className="context-menu-item" onClick={customAction('Action 1')}>
        Action 1
      </li>
      <li className="context-menu-item" onClick={customAction('Action 2')}>
        Action 2
      </li>
      <li className="context-menu-item" onClick={customAction('Action 3')}>
        Action 3
      </li>
    </ul>
  );
}

ContextMenu.defaultProps = {
  //   minWidth: 100,
  //   minHeight: 80,
  //   width: 200,
  //   height: 150,
  //   zIndex: 5,
  startX: 100,
  startY: 100,
};

export default ContextMenu;
