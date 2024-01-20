import './WindowsControlPanel.css';

interface ButtonProps {
  /**
   * Is this the principal call to action on the page?
   */
  primary?: boolean;
  /**
   * What background color to use
   */
  backgroundColor?: string;
  /**
   * How large should the button be?
   */
  size?: 'small' | 'medium' | 'large';
  /**
   * Button contents
   */
  label?: string;
  /**
   * Optional click handler
   */
  onClick?: () => void;
}

function WindowsControlPanel({ ...props }: ButtonProps) {
  return (
    <div className="row footer">
      <div className="footer__win">
        <img className="footer__icon" src="vite.svg" alt="My Happy SVG" />
        <span className="footer__text">BugBoard - Лучше не найти</span>
      </div>
      <div className="footer__win">
        <img className="footer__icon" src="vite.svg" alt="My Happy SVG" />
        <span className="footer__text">BugBoard - Лучше не найти</span>
      </div>
      <div className="footer__win">
        <img className="footer__icon" src="vite.svg" alt="My Happy SVG" />
        <span className="footer__text">BugBoard - Лучше не найти</span>
      </div>
    </div>
  );
}

export default WindowsControlPanel;
