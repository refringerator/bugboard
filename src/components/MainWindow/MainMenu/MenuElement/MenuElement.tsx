import './MenuElement.css';

import MenuElementProps from './types';

function MenuElement({ icon, title, onClick }: MenuElementProps) {
  return (
    <button type="button" className="menu__item" onClick={onClick}>
      <img className="menu__icon" src={icon} alt="" />
      <span className="menu__text">{title}</span>
    </button>
  );
}

MenuElement.defaultProps = {
  icon: '',
  onClick: () => {},
};

export default MenuElement;
