import IssueForm, { TFormData } from 'src/components/IssueForm';
import { useGetIssueQuery } from 'src/service/issues';

interface IIssueWindow {
  onClose?: () => void;
  number?: number;
}
function IssueWindowContent({ number = 4, onClose = () => {} }: IIssueWindow) {
  const { data: issue, isFetching, isLoading } = useGetIssueQuery(number);

  const isUpdating = false;

  const onUpdate = () => console.log('yay');

  // conts onUpdate = (name) =>
  // updatePost({ id, name })
  //   .then((result) => {
  //     // handle the success!
  //     console.log('Update Result', result)
  //     setIsEditing(false)
  //   })
  //   .catch((error) => console.error('Update Error', error))

  if (isLoading) {
    return <div>Загрузка...</div>;
  }

  if (!issue) {
    return <div>Ошибка Не найдена задача!</div>;
  }

  const { body_text: description, title } = issue;

  console.log({ issue });

  return (
    <div>
      <IssueForm
        description={description}
        title={title}
        // onCancel={onClose}
        onUpdate={onUpdate}
        loading={isUpdating}
      />
    </div>
  );
}

IssueWindowContent.defaultProps = {
  number: 4,
  onClose: () => {},
};

IssueWindowContent.windowId = 'IssueWindow';
IssueWindowContent.title = 'Issue';
IssueWindowContent.minHeight = 250;
IssueWindowContent.minWidth = 250;

export default IssueWindowContent;
