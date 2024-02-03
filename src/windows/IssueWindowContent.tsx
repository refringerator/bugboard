import { useContext } from 'react';
import IssueForm, { TFormData } from 'src/components/IssueForm';
import WindowsContext from 'src/context/WindowsContext';
import {
  useAddIssueMutation,
  useGetIssueQuery,
  useUpdateIssueMutation,
} from 'src/service/issues';

interface IIssueWindow {
  // onClose?: () => void;
  number?: number;
  windowId?: string;
}
function IssueWindowContent({ number = 0, windowId = '' }: IIssueWindow) {
  const { data: issue, isLoading } = useGetIssueQuery(number);
  const { closeWindow } = useContext(WindowsContext);
  const [updateIssue, { isLoading: isUpdating }] = useUpdateIssueMutation();
  const [addIssue, { isLoading: isAdditng }] = useAddIssueMutation();

  // console.log({ number });
  // const isUpdating = false;

  const onUpdate = async (formData: TFormData) => {
    if (number !== 0) {
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
    } else {
      console.log('create');
      await addIssue({ title: formData.title, body: formData.description });
    }
  };
  if (isLoading) {
    return <div>Загрузка...</div>;
  }

  if (!issue && number !== 0) {
    return <div>Ошибка Не найдена задача!</div>;
  }

  const onClose = () => {
    if (windowId) closeWindow(windowId);
  };

  let description = '';
  let title = '';

  if (issue) {
    description = issue.body_text;
    title = issue.title;
  }

  // console.log({ issue });

  return (
    <div>
      <IssueForm
        description={description}
        title={title}
        onCancel={onClose}
        onUpdate={onUpdate}
        loading={isUpdating || isAdditng}
      />
    </div>
  );
}

IssueWindowContent.defaultProps = {
  number: 0,
  windowId: '',
};

IssueWindowContent.windowId = 'IssueWindow';
IssueWindowContent.title = 'Issue';
IssueWindowContent.minHeight = 250;
IssueWindowContent.minWidth = 250;

export default IssueWindowContent;
