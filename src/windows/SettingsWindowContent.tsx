import { SubmitHandler } from 'react-hook-form';
import { SettingsForm } from 'src/components';

type Inputs = {
  isDragAndDropEnable: boolean;
};

function SettingsWindowContent() {
  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);
  const closeWindow = () => console.log('close');
  const isDragAndDropEnable = true;
  return (
    <SettingsForm
      isDragAndDropEnable={isDragAndDropEnable}
      onSubmit={onSubmit}
      onClose={closeWindow}
    />
  );
}

SettingsWindowContent.windowId = 'SettingWindow';
SettingsWindowContent.title = 'Настройки';

export default SettingsWindowContent;
