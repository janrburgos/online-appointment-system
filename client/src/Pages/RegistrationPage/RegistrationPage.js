import "./RegistrationPage.css";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";

const RegistrationPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [firstName, setFirstName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [lastName, setLastName] = useState("");
  const [gender, setGender] = useState("male");
  const [day, setDay] = useState("01");
  const [month, setMonth] = useState("01");
  const [year, setYear] = useState(new Date().getFullYear().toString());
  const [civilStatus, setCivilStatus] = useState("single");
  const [citizenship, setCitizenship] = useState("");
  const [placeOfBirth, setPlaceOfBirth] = useState("");
  const [currentAddress, setCurrentAddress] = useState("");
  const [permanentAddress, setPermanentAddress] = useState("");
  const [registrationError, setRegistrationError] = useState("");

  const history = useHistory();
  let currentYear = new Date().getFullYear();
  let yearList = [];
  for (let i = 0; i < currentYear - 1920; i++) {
    yearList.push(currentYear - i);
  }

  let dayList = [];
  if (month === "02" && year % 4 === 0) {
    dayList = [];
    for (let i = 0; i < 29; i++) {
      dayList.push(`${i + 1}`);
    }
  } else if (month === "02") {
    dayList = [];
    for (let i = 0; i < 28; i++) {
      dayList.push(`${i + 1}`);
    }
  } else if (
    month === "04" ||
    month === "06" ||
    month === "09" ||
    month === "11"
  ) {
    dayList = [];
    for (let i = 0; i < 30; i++) {
      dayList.push(`${i + 1}`);
    }
  } else {
    dayList = [];
    for (let i = 0; i < 31; i++) {
      dayList.push(`${i + 1}`);
    }
  }

  const monthList = [
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

  let registerButtonClickHandler = () => {
    setRegistrationError("");

    if (password.length < 4) {
      return setRegistrationError("Password should have at least 4 characters");
    } else if (mobileNumber.length > 10) {
      return setRegistrationError(
        "Mobile number input should not exceed 10 numbers"
      );
    } else if (
      email.trim() === "" ||
      password.trim() === "" ||
      mobileNumber.trim() === "" ||
      firstName.trim() === "" ||
      middleName.trim() === "" ||
      lastName.trim() === "" ||
      citizenship.trim() === "" ||
      placeOfBirth.trim() === "" ||
      currentAddress.trim() === "" ||
      permanentAddress.trim() === ""
    ) {
      return setRegistrationError("Do not leave any items blank");
    }

    let registerBody = {
      email: email.trim(),
      password,
      mobileNumber: mobileNumber.trim(),
      firstName: firstName.trim().toLowerCase(),
      middleName: middleName.trim().toLowerCase(),
      lastName: lastName.trim().toLowerCase(),
      gender,
      birthDate: `${year}${month}${day}`,
      civilStatus,
      citizenship: citizenship.trim().toLowerCase(),
      placeOfBirth: placeOfBirth.trim().toLowerCase(),
      currentAddress: currentAddress.trim().toLowerCase(),
      permanentAddress: permanentAddress.trim().toLowerCase(),
    };

    axios(`http://localhost:1337/api/applicants/${email}`).then((res) => {
      if (res.data[0] !== undefined) {
        return setRegistrationError(
          "The email address you provided is already registered"
        );
      }
      axios
        .post("http://localhost:1337/api/applicants", registerBody)
        .then(alert(`added ${firstName} ${lastName} to the database`));
      history.push("/");
    });
  };

  return (
    <div className="RegistrationPage">
      <div className="form-container">
        <div className="form-row">
          <label htmlFor="reg-email">email address</label>
          <input
            type="email"
            id="reg-email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            value={email}
          />
        </div>
        <div className="form-row">
          <label htmlFor="reg-password">password</label>
          <input
            type="password"
            id="reg-password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            value={password}
          />
        </div>
        <div className="form-row">
          <label htmlFor="reg-mobile-number">mobile number +63</label>
          <input
            type="number"
            id="reg-mobile-number"
            onChange={(e) => setMobileNumber(e.target.value)}
            value={mobileNumber}
            maxLength={10}
          />
        </div>
        <div className="form-row">
          <label htmlFor="reg-first-name">first name</label>
          <input
            type="text"
            id="reg-first-name"
            onChange={(e) => {
              setFirstName(e.target.value);
            }}
            value={firstName}
          />
        </div>
        <div className="form-row">
          <label htmlFor="reg-middle-name">middle name</label>
          <input
            type="text"
            id="reg-middle-name"
            onChange={(e) => {
              setMiddleName(e.target.value);
            }}
            value={middleName}
          />
        </div>
        <div className="form-row">
          <label htmlFor="reg-last-name">last name</label>
          <input
            type="text"
            id="reg-last-name"
            onChange={(e) => {
              setLastName(e.target.value);
            }}
            value={lastName}
          />
        </div>
        <div className="form-row">
          <label htmlFor="reg-gender">gender</label>
          <select
            name="reg-gender"
            id="reg-gender"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
          >
            <option value="male">male</option>
            <option value="female">female</option>
          </select>
        </div>
        <div className="form-row">
          <label htmlFor="reg-birth-date">birth date</label>
          <div className="birth-date-group">
            <select
              name="birth-day"
              id="birth-day"
              value={day}
              onChange={(e) => setDay(e.target.value)}
            >
              {dayList.map((day, i) => (
                <option
                  key={`${day}-option`}
                  value={i + 1 < 10 ? `0${i + 1}` : i + 1}
                >
                  {day}
                </option>
              ))}
            </select>
            <select
              name="birth-month"
              id="birth-month"
              value={month}
              onChange={(e) => setMonth(e.target.value)}
            >
              {monthList.map((month, i) => (
                <option
                  key={`${month}-option`}
                  value={i + 1 < 10 ? `0${i + 1}` : i + 1}
                >
                  {month}
                </option>
              ))}
            </select>
            <select
              name="birth-year"
              id="birth-year"
              value={year}
              onChange={(e) => setYear(e.target.value)}
            >
              {yearList.map((year) => (
                <option key={`${year}-option`} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="form-row">
          <label htmlFor="reg-civil-status">civil status</label>
          <select
            name="civil-status"
            id="civil-status"
            value={civilStatus}
            onChange={(e) => setCivilStatus(e.target.value)}
          >
            <option value="single">single</option>
            <option value="married">married</option>
            <option value="annulled">annulled</option>
            <option value="divorced">divorced</option>
            <option value="widowed">widowed</option>
          </select>
        </div>
        <div className="form-row">
          <label htmlFor="reg-citizenship">citizenship</label>
          <input
            type="text"
            id="reg-citizenship"
            onChange={(e) => {
              setCitizenship(e.target.value);
            }}
            value={citizenship}
          />
        </div>
        <div className="form-row">
          <label htmlFor="reg-place-of-birth">place of birth</label>
          <input
            type="text"
            id="reg-place-of-birth"
            onChange={(e) => {
              setPlaceOfBirth(e.target.value);
            }}
            value={placeOfBirth}
          />
        </div>
        <div className="form-row">
          <label htmlFor="reg-current-address">current address</label>
          <input
            type="text"
            id="reg-current-address"
            onChange={(e) => {
              setCurrentAddress(e.target.value);
            }}
            value={currentAddress}
          />
        </div>
        <div className="form-row">
          <label htmlFor="reg-permanent-address">permanent address</label>
          <input
            type="text"
            id="reg-permanent-address"
            onChange={(e) => {
              setPermanentAddress(e.target.value);
            }}
            value={permanentAddress}
          />
        </div>
        <div className="form-row">
          <div></div>
          <button
            onClick={() => {
              registerButtonClickHandler();
            }}
          >
            Register
          </button>
        </div>
      </div>
      <div className="registration-error">{registrationError}</div>
    </div>
  );
};

export default RegistrationPage;
