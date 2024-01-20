import ControlPanelElement from './ControlPanelElement/ControlPanelElement';
import ControlPanelElementProps from './ControlPanelElement/types';
import './WindowsControlPanel.css';

interface WindowsControlPanelProps {
  ControlPanelElements: ControlPanelElementProps[];
}

function WindowsControlPanel({
  ControlPanelElements,
}: WindowsControlPanelProps) {
  return (
    <div className="row footer">
      {ControlPanelElements &&
        ControlPanelElements.map((element) => (
          <ControlPanelElement
            key={element.id}
            title={element.title}
            icon={element.icon}
            id={element.id}
          />
        ))}
    </div>
  );
}
WindowsControlPanel.defaultProps = {};

export default WindowsControlPanel;
