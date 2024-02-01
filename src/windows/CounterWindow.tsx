import { useDispatch, useSelector } from 'react-redux';
import Counter from 'src/components/delete_me/Counter';
import { countSelectors, increment } from 'src/redux/counterSlice';

function CounterWindow() {
  const dispatch = useDispatch();
  const { value: count } = useSelector(countSelectors.get);

  return (
    <Counter
      value={count.toString()}
      onIncrement={() => dispatch(increment())}
      onDecrement={() => dispatch({ type: 'counter/decrement' })}
      onIncrementAsync={() => dispatch({ type: 'INCREMENT_ASYNC' })}
    />
  );
}

export default CounterWindow;
