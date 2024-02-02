import { useContext } from 'react';
import IssueForm, { TFormData } from 'src/components/IssueForm';
import WindowsContext from 'src/context/WindowsContext';
import { useGetIssueQuery, useUpdateIssueMutation } from 'src/service/issues';

interface IIssueWindow {
  // onClose?: () => void;
  number?: number;
  windowId?: string;
}
function IssueWindowContent({ number = 4, windowId = '' }: IIssueWindow) {
  const { data: issue, isLoading } = useGetIssueQuery(number);
  const { closeWindow } = useContext(WindowsContext);
  const [updateIssue, { isLoading: isUpdating }] = useUpdateIssueMutation();

  // const isUpdating = false;

  const onUpdate = (formData: TFormData) =>
    updateIssue({
      number,
      title: formData.title,
      body: formData.description,
    })
      .then((result) => {
        // handle the success!
        console.log('Update Result', result);
        // setIsEditing(false);
      })
      .catch((error) => console.error('Update Error', error));

  if (isLoading) {
    return <div>Загрузка...</div>;
  }

  if (!issue) {
    return <div>Ошибка Не найдена задача!</div>;
  }

  const onClose = () => {
    if (windowId) closeWindow(windowId);
  };

  const { body_text: description, title } = issue;

  // console.log({ issue });

  return (
    <div>
      <IssueForm
        description={description}
        title={title}
        onCancel={onClose}
        onUpdate={onUpdate}
        loading={isUpdating}
      />
    </div>
  );
}

IssueWindowContent.defaultProps = {
  number: 4,
  windowId: '',
};

IssueWindowContent.windowId = 'IssueWindow';
IssueWindowContent.title = 'Issue';
IssueWindowContent.minHeight = 250;
IssueWindowContent.minWidth = 250;

export default IssueWindowContent;
