import './MainMenu.css';

interface ButtonProps {
  primary?: boolean;
}

function MainMenu({ primary }: ButtonProps) {
  return (
    <div className="row menu">
      <div className="menu__item">
        <img className="menu__icon" src="vite.svg" alt="My Happy SVG" />
        {primary && (
          <span className="menu__text">BugBoard - Лучше не найти</span>
        )}
      </div>
    </div>
  );
}

MainMenu.defaultProps = {
  primary: true,
};

export default MainMenu;
