/* eslint-disable jsx-a11y/label-has-associated-control */
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
  }: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setFormData((prevState) => ({ ...prevState, [name]: value }));

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    onUpdate(formData);
  };
  const handleCancel = () => onCancel();

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <form
        style={{ display: 'flex', flexDirection: 'column' }}
        onSubmit={handleSubmit}
      >
        <label htmlFor="title">
          Заголовок
          <input
            id="title"
            type="text"
            onChange={handleChange}
            name="title"
            value={formData.title}
            disabled={loading}
          />
        </label>
        <label htmlFor="description">Описание</label>
        <textarea
          rows={5}
          // type="text"
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
