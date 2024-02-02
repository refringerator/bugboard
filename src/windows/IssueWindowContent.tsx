import IssueForm, { TFormData } from 'src/components/IssueForm';

interface IIssueWindow {
  onClose?: () => void;
}
function IssueWindowContent({ onClose = () => {} }: IIssueWindow) {
  const description = 'Описание';
  const title = 'titel';
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
  onClose: () => {},
};

IssueWindowContent.windowId = 'IssueWindow';
IssueWindowContent.title = 'Issue';
IssueWindowContent.minHeight = 250;
IssueWindowContent.minWidth = 250;

export default IssueWindowContent;
