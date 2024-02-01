/* eslint-disable no-undef */
import { Component } from "react";
import { ErrorMessage } from "../ErrorMessage";
import { isNameValidation } from "../utils/transformations";
import { isEmailValid } from "../utils/validations";
import { isCityValid } from "../utils/validations";
import { allCities } from "../utils/all-cities";
import { formatPhoneNumber } from "../utils/transformations";
import ClassPhoneInput from "./ClassPhoneInput";

const firstNameErrorMessage = "First name must be at least 2 characters long";
const lastNameErrorMessage = "Last name must be at least 2 characters long";
const emailErrorMessage = "Email is Invalid";
const cityErrorMessage = "State is Invalid";
const phoneNumberErrorMessage = "Invalid Phone Number";

export class ClassForm extends Component {
  state = {
    firstName: "",
    lastName: "",
    emailAddress: "",
    cityNames: "",
    phoneInput: ["", "", "", ""],
    isNameValid: false,
    emailValidation: false,
    cityValidation: false,
    phoneValidation: false,
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const {
      firstName,
      lastName,
      emailAddress,
      cityNames,
      isNameValid,
      emailValidation,
      cityValidation,
      phoneInput,
      phoneValidation,
    } = this.state;
    const isValid =
      isNameValid && emailValidation && cityValidation && phoneValidation;

    this.props.onSubmit(
      {
        firstName,
        lastName,
        emailAddress,
        cityNames,
        phoneInput,
      },
      isValid
    );

    this.setState({
      isNameValid: true,
      emailValidation: true,
      cityValidation: true,
      phoneValidation: true,
    });
  };

  render() {
    const {
      firstName,
      lastName,
      emailAddress,
      cityNames,
      isNameValid,
      emailValidation,
      cityValidation,
      phoneInput,
      phoneValidation,
    } = this.state;


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
      <form
        onSubmit={this.handleSubmit}
      >
        <u>
          <h3>User Information Form</h3>
        </u>

        {/* first name input */}
        <div className="input-wrap">
          <label>{"First Name"}:</label>
          <input
            placeholder="Bilbo"
            type="text"
            value={firstName}
            onChange={(e) => {
              this.setState({ firstName: e.target.value });
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
            type="text"
            value={lastName}
            onChange={(e) => {
              this.setState({ lastName: e.target.value });
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
            type="text"
            value={emailAddress}
            onChange={(e) => {
              this.setState({ emailAddress: e.target.value });
            }}
          />
        </div>
        {showEmail && <ErrorMessage message={emailErrorMessage} show={true} />}

        {/* City Input */}
        <div className="input-wrap">
          <label>{"City"}:</label>
          <input
            placeholder="Hobbiton"
            type="text"
            value={cityNames}
            onChange={(e) => {
              this.setState({ cityNames: e.target.value });
            }}
            list="cityList"
          />
          <datalist id="cityList">
            {allCities.map((city, index) => (
              <option key={index} value={city} />
            ))}
          </datalist>
        </div>
        {showCity && <ErrorMessage message={cityErrorMessage} show={true} />}

        <div>
          <ClassPhoneInput phoneInput={phoneInput} />
        </div>

        {showPhone && (
          <ErrorMessage message={phoneNumberErrorMessage} show={true} />
        )}

        <input type="submit" value="Submit" />
      </form>
    );
  }
}
