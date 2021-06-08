import { useSelector, useDispatch } from "react-redux";

const Counter = () => {
  const counter = useSelector((state) => state.counterReducer.counter);
  const dispatch = useDispatch();

  return (
    <div className="Counter">
      <button onClick={() => dispatch({ type: "DECREMENT" })}>-</button>
      {counter}
      <button onClick={() => dispatch({ type: "INCREMENT" })}>+</button>
      <br />
      <input
        type="file"
        name="avatar"
        id="avatar"
        accept=".jpg,.jpeg,.png,.bmp,.gif,"
      />
      <br />
      <button>save image</button>
    </div>
  );
};

export default Counter;
