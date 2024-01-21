import ControlPanelElement from './ControlPanelElement/ControlPanelElement';
import ControlPanelElementProps from './ControlPanelElement/types';
import './WindowsControlPanel.css';

interface WindowsControlPanelProps {
  controlPanelElements: ControlPanelElementProps[];
}

function WindowsControlPanel({
  controlPanelElements,
}: WindowsControlPanelProps) {
  return (
    <div className="row footer">
      {controlPanelElements &&
        controlPanelElements.map((element) => (
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
