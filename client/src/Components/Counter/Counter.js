import { useSelector, useDispatch } from "react-redux";

const Counter = () => {
  const counter = useSelector((state) => state.counterReducer.counter);
  const numChange = useSelector((state) => state.numChangeReducer.numChange);
  const dispatch = useDispatch();

  return (
    <div className="Counter">
      <button onClick={() => dispatch({ type: "DECREMENT" })}>-</button>
      {counter}
      <button onClick={() => dispatch({ type: "INCREMENT" })}>+</button>
      <br />
      <button onClick={() => dispatch({ type: "DECREMENT_NUM_CHANGE" })}>
        -
      </button>
      {numChange}
      <button onClick={() => dispatch({ type: "INCREMENT_NUM_CHANGE" })}>
        +
      </button>
    </div>
  );
};

export default Counter;
