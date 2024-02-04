/* TODO 
  - добавить уникальные идентификаторы для окон, отличные от текущих
  - не менять идентификатор окна, чтобы он не перерендеривался

*/

import { useContext, useEffect, useState } from 'react';
import IssueForm, { TFormData } from 'src/components/IssueForm';
import WindowsContext from 'src/context/WindowsContext';
import {
  useAddIssueMutation,
  useLazyGetIssueQuery,
  useUpdateIssueMutation,
} from 'src/service/issues';

interface IIssueWindow {
  number?: number;
  windowId?: string;
}
function IssueWindowContent({ number = 0, windowId = '' }: IIssueWindow) {
  const [currentNumber, setCurrentNumber] = useState(number);
  const [lazyGetIssue, lqresult] = useLazyGetIssueQuery();
  const { closeWindow, changeWindowProps } = useContext(WindowsContext);
  const [updateIssue, { isLoading: isUpdating }] = useUpdateIssueMutation();
  const [addIssue, { isLoading: isAdditng, data: addData }] =
    useAddIssueMutation();

  const { data: issue, isLoading } = lqresult;

  useEffect(() => {
    if (currentNumber) {
      lazyGetIssue(currentNumber);
      changeWindowProps(
        windowId,
        `Задача #${currentNumber}`,
        `${'IssueWindow'}_${currentNumber}` // TODO: мб можно как-то достать из self
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentNumber]);

  if (!currentNumber && addData) {
    setCurrentNumber(addData.number);
  }

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
        })
        .catch((error) => console.error('Update Error', error));
    } else {
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
