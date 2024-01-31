type Tlol = {
  value: string;
  onIncrement: () => void;
  onDecrement: () => void;
  onIncrementAsync: () => void;
};

function Counter({ value, onIncrement, onDecrement, onIncrementAsync }: Tlol) {
  return (
    <div>
      <button type="button" onClick={onIncrementAsync}>
        Increment after 1 second
      </button>{' '}
      <button type="button" onClick={onIncrement}>
        Increment
      </button>{' '}
      <button type="button" onClick={onDecrement}>
        Decrement
      </button>
      <hr />
      <div>Clicked: {value} times</div>
    </div>
  );
}

export default Counter;
