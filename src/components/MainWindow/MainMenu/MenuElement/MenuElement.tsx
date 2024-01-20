import './MenuElement.css';

import MenuElementProps from './types';

function MenuElement({ icon, title }: MenuElementProps) {
  return (
    <div className="menu__item">
      <img className="menu__icon" src={icon} alt="" />
      <span className="menu__text">{title}</span>
    </div>
  );
}

MenuElement.defaultProps = {
  icon: '',
};

export default MenuElement;
