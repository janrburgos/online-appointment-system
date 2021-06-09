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
      <form
        action="http://localhost:1337/api/upload"
        method="post"
        enctype="multipart/form-data"
      >
        <input
          type="file"
          name="avatar"
          id="avatar"
          accept=".jpg,.jpeg,.png,.bmp"
        />
        <br />
        <button>save image</button>
      </form>
    </div>
  );
};

export default Counter;
