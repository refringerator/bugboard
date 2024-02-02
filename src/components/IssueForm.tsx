import React from 'react';

export type TFormData = { title: string; description: string };

function IssueForm({
  title,
  description,
  onUpdate,
  onCancel = () => {},
  loading = false,
}: {
  title: string;
  description: string;
  onUpdate: (formData: TFormData) => void;
  onCancel?: () => void;
  loading?: boolean;
}) {
  const [formData, setFormData] = React.useState({ title, description });

  const handleChange = ({
    target: { name, value },
  }: React.ChangeEvent<HTMLInputElement>) =>
    setFormData((prevState) => ({ ...prevState, [name]: value }));

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    onUpdate(formData);
  };
  const handleCancel = () => onCancel();

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          onChange={handleChange}
          name="title"
          value={formData.title}
          disabled={loading}
        />
        <input
          type="text"
          name="description"
          onChange={handleChange}
          value={formData.description}
          disabled={loading}
        />
        <div>
          <button type="submit" disabled={loading}>
            {loading ? 'Updating...' : 'OK'}
          </button>
          <button type="button" onClick={handleCancel} disabled={loading}>
            Отмена
          </button>
        </div>
      </form>
    </div>
  );
}

IssueForm.defaultProps = {
  loading: false,
  onCancel: () => {},
};

export default IssueForm;
