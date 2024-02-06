import { SettingsForm, TSettingsFormInputs } from 'src/components';
import { useDispatch, useSelector } from 'react-redux';
import { settingsSelectors, setDragAndDrop } from 'src/store/settingsSlice';

interface ISettingsWindow {
  windowId?: string;
  onWindowClose: () => void;
}

function SettingsWindowContent({
  windowId: _winId = '',
  onWindowClose,
}: ISettingsWindow) {
  const dispatch = useDispatch();
  const isDragAndDropEnable = useSelector(settingsSelectors.getDragAndDrop);

  const onSubmit = (data: TSettingsFormInputs) => {
    // console.log(data);
    const { isDragAndDropEnable: newValue } = data;
    dispatch(setDragAndDrop(newValue));
  };

  return (
    <SettingsForm
      isDragAndDropEnable={isDragAndDropEnable}
      onSubmit={onSubmit}
      onClose={onWindowClose}
    />
  );
}
SettingsWindowContent.defaultProps = {
  windowId: '',
};

SettingsWindowContent.windowId = 'SettingWindow';
SettingsWindowContent.title = 'Настройки';

export default SettingsWindowContent;
