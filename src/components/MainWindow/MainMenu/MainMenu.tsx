import "./MainMenu.css";

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
  size?: "small" | "medium" | "large";
  /**
   * Button contents
   */
  label?: string;
  /**
   * Optional click handler
   */
  onClick?: () => void;
}

const MainMenu = ({ ...props }: ButtonProps) => {
  return (
    <div className="row menu">
      <div className="menu__item">
        <img className="menu__icon" src="vite.svg" alt="My Happy SVG" />
        <span className="menu__text">BugBoard - Лучше не найти</span>
      </div>
    </div>
  );
};

export default MainMenu;
