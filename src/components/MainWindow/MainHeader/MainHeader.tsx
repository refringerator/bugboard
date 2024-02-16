import './MainHeader.css';

interface ButtonProps {
  icon?: string;
  title: string;
  onClick?: () => void;
}

function MainHeader({ onClick, title, icon }: ButtonProps) {
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    } else if (document.exitFullscreen) {
      document.exitFullscreen();
    }
  };

  return (
    <div className="row header">
      <img className="header__icon" src={icon} alt="" />
      <span className="header__text">{title}</span>
      <button type="button" onClick={onClick} className="header__button">
        X
      </button>
      <button
        type="button"
        onClick={toggleFullscreen}
        className="header__button"
      >
        O
      </button>
    </div>
  );
}

MainHeader.defaultProps = {
  icon: '',
  onClick: () => {},
};

export default MainHeader;
