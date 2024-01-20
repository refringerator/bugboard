import './MainMenu.css';
import MenuElement from './MenuElement/MenuElement';
import MenuElementProps from './MenuElement/types';

interface MainMenuProps {
  menuElements?: MenuElementProps[];
}

function MainMenu({ menuElements }: MainMenuProps) {
  return (
    <div className="row menu">
      {menuElements &&
        menuElements.map((element) => (
          <MenuElement
            key={element.id}
            title={element.title}
            icon={element.icon}
            id={element.id}
          />
        ))}
    </div>
  );
}

MainMenu.defaultProps = {
  menuElements: [],
};

export default MainMenu;
