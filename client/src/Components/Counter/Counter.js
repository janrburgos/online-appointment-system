import { useSelector, useDispatch } from "react-redux";
import React, { useState, useEffect } from "react";
import moment from "moment";

const Counter = () => {
  const counter = useSelector((state) => state.counterReducer.counter);
  const dispatch = useDispatch();

  const months = [
    "january",
    "february",
    "march",
    "april",
    "may",
    "june",
    "july",
    "august",
    "september",
    "october",
    "november",
    "december",
  ];

  const years = [
    moment().year(),
    moment().add(1, "years").year(),
    moment().add(2, "years").year(),
  ];

  const [days, setDays] = useState([]);
  const [year, setYear] = useState(moment().year());
  const [month, setMonth] = useState(months[moment().month()]);
  const [day, setDay] = useState(moment().date());

  const changeDayAmount = (dayMultiplier) => {
    let array = [];
    for (let i = 0; i < dayMultiplier; i++) {
      array.push(i + 1);
    }
    setDays(array);
  };

  useEffect(() => {
    if (month === "february" && year % 4 === 0) {
      changeDayAmount(29);
    } else if (month === "february") {
      changeDayAmount(28);
    } else if (
      month === "april" ||
      month === "june" ||
      month === "september" ||
      month === "november"
    ) {
      changeDayAmount(30);
    } else {
      changeDayAmount(31);
    }
  }, [month, year]);

  return (
    <div className="Counter">
      <button onClick={() => dispatch({ type: "DECREMENT" })}>-</button>
      {counter}
      <button onClick={() => dispatch({ type: "INCREMENT" })}>+</button>
      <br />
      <form
        action="http://localhost:1337/api/upload"
        method="post"
        encType="multipart/form-data"
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
      <select
        name="day"
        id="day"
        value={day}
        onChange={(e) => setDay(e.target.value)}
      >
        {days.map((day) => (
          <option key={`option-appointment-${day}`} value={day}>
            {day}
          </option>
        ))}
      </select>
      <select
        name="month"
        id="month"
        value={month}
        onChange={(e) => setMonth(e.target.value)}
      >
        {months.map((month) => (
          <option key={`option-appointment-${month}`} value={month}>
            {month}
          </option>
        ))}
      </select>
      <select
        name="year"
        id="year"
        value={year}
        onChange={(e) => setYear(e.target.value)}
      >
        {years.map((year) => (
          <option key={`option-appointment-${year}`} value={year}>
            {year}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Counter;
