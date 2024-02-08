import { useState } from "react";
import { ErrorMessage } from "../ErrorMessage";
import { isNameValidation } from "../utils/transformations";
import { isEmailValid } from "../utils/validations";
import { isCityValid } from "../utils/validations";
import { allCities } from "../utils/all-cities";
import PhoneInput from "./FunctionalPhoneInput";
import { formatPhoneNumber } from "../utils/transformations";
import FunctionalTextInput from "./FunctionalTextInput";

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

  const [inputValidation, setInputValidation] = useState(false);

  const reset = () => {
    setFirstName("");
    setLastName("");
    setEmailAddress("");
    setCityNames("");
    setPhoneInput(["", "", "", ""]);
  };

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
        phoneInput: formatPhoneNumber(phoneInput),
      },
      isValid
    );

    setInputValidation(false);
    reset();
  };

  const firstNameValid = isNameValidation(firstName);
  const lastNameValid = isNameValidation(lastName);
  const emailValid = isEmailValid(emailAddress);
  const cityValid = isCityValid(cityNames);
  const phoneValid = formatPhoneNumber(phoneInput);

  const showFirstName = inputValidation && !firstNameValid;
  const showLastName = inputValidation && !lastNameValid;
  const showEmail = inputValidation && !emailValid;
  const showCity = inputValidation && !cityValid;
  const showPhone = inputValidation && !phoneValid;

  return (
    <form onSubmit={handleSubmit}>
      <u>
        <h3>User Information Form</h3>
      </u>

      {/* first name input */}
      <div>
        <FunctionalTextInput
          inputProps={{
            placeholder: "Bilbo",
            value: firstName,
            onChange: (e) => {
              setFirstName(e.target.value);
            },
          }}
          lable={"First Name"}
        />
      </div>

      {
        <ErrorMessage message={firstNameErrorMessage} show={showFirstName} />
      }

      {/* last name input */}
      <div>
        <FunctionalTextInput
          inputProps={{
            placeholder: "Baggins",
            value: lastName,
            onChange: (e) => {
              setLastName(e.target.value);
            },
          }}
          lable={"Last Name"}
        />
      </div>

      {<ErrorMessage message={lastNameErrorMessage} show={showLastName} />}

      {/* Email Input */}
      <div>
        <FunctionalTextInput
          inputProps={{
            placeholder: "bilbo-baggins@adventurehobbits.net",
            value: emailAddress,
            onChange: (e) => {
              setEmailAddress(e.target.value);
            },
          }}
          lable={"Email"}
        />
      </div>

      {<ErrorMessage message={emailErrorMessage} show={showEmail} />}

      {/* City Input */}
      <div>
        <FunctionalTextInput
          inputProps={{
            list: "cityList",
            placeholder: "Hobbiton",
            value: cityNames,
            onChange: (e) => {
              setCityNames(e.target.value);
            },
          }}
          lable={"City"}
        />
        <datalist id="cityList">
          {allCities.map((city, index) => (
            <option key={index} value={city} />
          ))}
        </datalist>
      </div>

      {<ErrorMessage message={cityErrorMessage} show={showCity} />}

      <div>
        <PhoneInput updateHandler={setPhoneInput} phoneInput={phoneInput} />
      </div>
      {
        <ErrorMessage message={phoneNumberErrorMessage} show={showPhone} />
      }

      <input type="submit" value="Submit" />
    </form>
  );
};
