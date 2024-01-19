import "./MainHeader.css";

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
  label: string;
  /**
   * Optional click handler
   */
  onClick?: () => void;
}

export const MainHeader = ({ ...props }: ButtonProps) => {
  return (
    <div className="row header">
      <img className="header__icon" src="vite.svg" alt="My Happy SVG" />
      <span className="header__text">BugBoard - Лучше не найти</span>
      <button className="header__button">X</button>
    </div>
  );
};
