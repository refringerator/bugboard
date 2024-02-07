import { useForm, SubmitHandler } from 'react-hook-form';

export type TSettingsFormInputs = {
  isDragAndDropEnable: boolean;
  onSubmit: SubmitHandler<TSettingsFormInputs>;
  onClose?: () => void;
};

function SettingsForm({
  isDragAndDropEnable,
  onSubmit,
  onClose,
}: TSettingsFormInputs) {
  const { register, handleSubmit } = useForm<TSettingsFormInputs>({
    defaultValues: { isDragAndDropEnable },
  });

  return (
    /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
    <form
      style={{ display: 'flex', flexDirection: 'column' }}
      onSubmit={handleSubmit(onSubmit)}
    >
      <label htmlFor="isDragAndDropEnable">
        Включить драг и дроп:
        <input
          id="isDragAndDropEnable"
          type="checkbox"
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...register('isDragAndDropEnable')}
        />
      </label>

      <div>
        <button type="submit">Сохранить</button>
        <button type="button" onClick={onClose}>
          Отмена
        </button>
      </div>
    </form>
  );
}

SettingsForm.defaultProps = {
  onClose: () => {},
};

export default SettingsForm;
