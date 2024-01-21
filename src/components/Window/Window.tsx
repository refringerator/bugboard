import './Window.css';

interface MainMenuProps {
  primary?: boolean;
  // menuElements?: MenuElementProps[];
}

function Window({ primary }: MainMenuProps) {
  return (
    <div className="window">
      <div className="window__header">header</div>
      <div className="window__content">content</div>
    </div>
  );
}

Window.defaultProps = {
  primary: true,
};

export default Window;
