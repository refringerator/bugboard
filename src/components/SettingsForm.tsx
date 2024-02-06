import { useForm, SubmitHandler } from 'react-hook-form';

type Inputs = {
  isDragAndDropEnable: boolean;
  onSubmit: SubmitHandler<Inputs>;
  onClose: () => void;
};

function SettingsForm({ isDragAndDropEnable, onSubmit, onClose }: Inputs) {
  const {
    register,
    handleSubmit,
    // formState: { errors },
  } = useForm<Inputs>({
    defaultValues: { isDragAndDropEnable },
  });

  return (
    /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
    <form onSubmit={handleSubmit(onSubmit)}>
      <label htmlFor="isDragAndDropEnable">
        Включить драг и дроп:
        <input
          id="isDragAndDropEnable"
          type="checkbox"
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...register('isDragAndDropEnable')}
        />
      </label>

      {/* register your input into the hook by invoking the "register" function */}
      {/* include validation with required or other standard HTML validation rules */}
      {/* <input {...register('exampleRequired', { required: true })} /> */}
      {/* errors will return when field validation fails  */}
      {/* {errors.exampleRequired && <span>This field is required</span>} */}
      <button type="submit" onClick={onClose}>
        Сохранить
      </button>
      <button type="button" onClick={onClose}>
        Отмена
      </button>
    </form>
  );
}

export default SettingsForm;
