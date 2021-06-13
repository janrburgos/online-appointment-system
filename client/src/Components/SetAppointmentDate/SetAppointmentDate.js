import "./SetAppointmentDate.css";
import React, { useState, useEffect } from "react";
import moment from "moment";

const SetAppointmentDate = (props) => {
  // console.log(moment("20210601").day());
  // console.log(moment().date() + 1);
  // console.log(moment(`${moment().format("YYYY")}0101`).day());
  console.log(moment(`20210601`).day());

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

  const setAppointmentButtonClickHandler = () => {
    let mm = months.indexOf(month) + 1;
    mm = mm < 10 ? `0${mm}` : mm;
    props.setAppointmentDateHandler(`${year}${mm}${day}`);
  };

  useEffect(() => {
    const newDaysArray = (days) => {
      let array = [];

      // filter weekends and makes sure applicant sets appointment at least two days from now
      for (let i = 0; i < days; i++) {
        let dayIndex = i < 9 ? `0${i + 1}` : i + 1;
        if (
          moment(`${year}${month}${dayIndex}`).day() !== 0 &&
          moment(`${year}${month}${dayIndex}`).day() !== 6
        ) {
          if (i < moment().date() + 1) {
            if (
              moment().month() === months.indexOf(month) &&
              moment().year() === year
            ) {
              continue;
            } else {
              array.push(i + 1);
            }
          } else {
            array.push(i + 1);
          }
        }
      }

      setDays(array);
    };

    if (month === "february" && year % 4 === 0) {
      newDaysArray(29);
    } else if (month === "february") {
      newDaysArray(28);
    } else if (
      month === "april" ||
      month === "june" ||
      month === "september" ||
      month === "november"
    ) {
      newDaysArray(30);
    } else {
      newDaysArray(31);
    }
  }, [month, year]);

  return (
    <div className="SetAppointmentDate">
      <div className="date-select-group">
        <select
          name="year"
          id="year"
          value={year}
          onChange={(e) => setYear(Number(e.target.value))}
        >
          {years.map((year) => (
            <option key={`option-appointment-${year}`} value={year}>
              {year}
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
      </div>
      <button onClick={setAppointmentButtonClickHandler}>
        set appointment date
      </button>
    </div>
  );
};

export default SetAppointmentDate;
