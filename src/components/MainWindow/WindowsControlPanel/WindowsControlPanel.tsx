import './WindowsControlPanel.css';

interface ButtonProps {
  primary?: boolean;
}

function WindowsControlPanel({ primary }: ButtonProps) {
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
      {primary && (
        <div className="footer__win">
          <img className="footer__icon" src="vite.svg" alt="My Happy SVG" />
          <span className="footer__text">BugBoard - Лучше не найти</span>
        </div>
      )}
    </div>
  );
}
WindowsControlPanel.defaultProps = {
  primary: true,
};

export default WindowsControlPanel;
