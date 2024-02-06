type TCounterProps = {
  value: string;
  onIncrement: () => void;
  onDecrement: () => void;
  onIncrementAsync: () => void;
};

function Counter({
  value,
  onIncrement,
  onDecrement,
  onIncrementAsync,
}: TCounterProps) {
  return (
    <div>
      <button type="button" onClick={onIncrementAsync}>
        Увеличить через секунду
      </button>
      <button type="button" onClick={onIncrement}>
        Прибавить
      </button>
      <button type="button" onClick={onDecrement}>
        Убавить
      </button>
      <hr />
      <div>Текущее значение счетчика: {value}</div>
    </div>
  );
}

export default Counter;
