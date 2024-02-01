import { useState } from "react";
import { ErrorMessage } from "../ErrorMessage";
import { isNameValidation } from "../utils/transformations";
import { isEmailValid } from "../utils/validations";
import { isCityValid } from "../utils/validations";
import { allCities } from "../utils/all-cities";
import PhoneInput from "./FunctionalPhoneInput";
import { formatPhoneNumber } from "../utils/transformations";

const firstNameErrorMessage = "First name must be at least 2 characters long";
const lastNameErrorMessage = "Last name must be at least 2 characters long";
const emailErrorMessage = "Email is Invalid";
const cityErrorMessage = "State is Invalid";
const phoneNumberErrorMessage = "Invalid Phone Number";

export const FunctionalForm = ({ onSubmit }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [cityNames, setCityNames] = useState("");
  const [phoneInput, setPhoneInput] = useState(["", "", "", ""]);

  const [isNameValid, setNameValid] = useState(false);
  const [emailValidation, setEmailValidation] = useState(false);
  const [cityValidation, setCityValidation] = useState(false);
  const [phoneValidation, setPhoneValidation] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid =
      firstNameValid && lastNameValid && emailValid && cityValid && phoneValid;

    onSubmit(
      {
        firstName,
        lastName,
        emailAddress,
        cityNames,
        phoneInput,
      },
      isValid
    );

    setNameValid(true);
    setEmailValidation(true);
    setCityValidation(true);
    setPhoneValidation(true);
  };

  const firstNameValid = isNameValidation(firstName);
  const lastNameValid = isNameValidation(lastName);
  const emailValid = isEmailValid(emailAddress);
  const cityValid = isCityValid(cityNames);
  const phoneValid = formatPhoneNumber(phoneInput);

  const showFirstName = isNameValid && !firstNameValid;
  const showLastName = isNameValid && !lastNameValid;
  const showEmail = emailValidation && !emailValid;
  const showCity = cityValidation && !cityValid;
  const showPhone = phoneValidation && !phoneValid;

  return (
    <form onSubmit={handleSubmit}>
      <u>
        <h3>User Information Form</h3>
      </u>

      {/* first name input */}
      <div className="input-wrap">
        <label>{"First Name"}:</label>
        <input
          placeholder="Bilbo"
          value={firstName}
          onChange={(e) => {
            setFirstName(e.target.value);
          }}
        />
      </div>
      {showFirstName && (
        <ErrorMessage message={firstNameErrorMessage} show={true} />
      )}

      {/* last name input */}
      <div className="input-wrap">
        <label>{"Last Name"}:</label>
        <input
          placeholder="Baggins"
          value={lastName}
          onChange={(e) => {
            setLastName(e.target.value);
          }}
        />
      </div>
      {showLastName && (
        <ErrorMessage message={lastNameErrorMessage} show={true} />
      )}

      {/* Email Input */}
      <div className="input-wrap">
        <label>{"Email"}:</label>
        <input
          placeholder="bilbo-baggins@adventurehobbits.net"
          value={emailAddress}
          onChange={(e) => {
            setEmailAddress(e.target.value);
          }}
        />
      </div>
      {showEmail && <ErrorMessage message={emailErrorMessage} show={true} />}

      {/* City Input */}
      <div className="input-wrap">
        <label>{"City"}:</label>
        <input
          list="cityList"
          placeholder="Hobbiton"
          value={cityNames}
          onChange={(e) => setCityNames(e.target.value)}
        />
        <datalist id="cityList">
          {allCities.map((city, index) => (
            <option key={index} value={city} />
          ))}
        </datalist>
      </div>
      {showCity && <ErrorMessage message={cityErrorMessage} show={true} />}

      <div>
        <PhoneInput updateHandler={setPhoneInput} phoneInput={phoneInput} />
      </div>
      {showPhone && (
        <ErrorMessage message={phoneNumberErrorMessage} show={true} />
      )}

      <input type="submit" value="Submit" />
    </form>
  );
};
