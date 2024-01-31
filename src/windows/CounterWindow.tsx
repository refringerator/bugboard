import { useDispatch, useSelector } from 'react-redux';
import Counter from 'src/components/delete_me/Counter';
import { increment, decrement } from 'src/redux/counterSlice';
import { RootState } from 'src/redux/store';

interface IProps {
  className?: string;
}

function CounterWindow() {
  const dispatch = useDispatch();
  const count = useSelector((state: RootState) => state.counter.value);

  return (
    <Counter
      value={count.toString()}
      onIncrement={() => dispatch(increment())}
      onDecrement={() => dispatch(decrement())}
      onIncrementAsync={() => dispatch(increment())}
    />
  );
}

export default CounterWindow;
