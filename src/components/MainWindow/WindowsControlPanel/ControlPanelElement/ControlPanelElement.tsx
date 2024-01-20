import './ControlPanelElement.css';

import ControlPanelElementProps from './types';

function ControlPanelElement({ icon, title }: ControlPanelElementProps) {
  return (
    <div className="footer__win">
      <img className="footer__icon" src={icon} alt="" />
      <span className="footer__text">{title}</span>
    </div>
  );
}

ControlPanelElement.defaultProps = {
  icon: '',
};

export default ControlPanelElement;
