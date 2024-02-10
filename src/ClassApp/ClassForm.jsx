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
    inputValidation: false,
  };

  reset = () => {
    this.setState({
      firstName: "",
      lastName: "",
      emailAddress: "",
      cityNames: "",
      phoneInput: ["", "", "", ""],
    });
  };

  handleChangePhoneInput = (input) => {
    this.setState({
      ...this.state,
      phoneInput: input,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const {
      firstName,
      lastName,
      emailAddress,
      cityNames,
      phoneInput,
      inputValidation,
    } = this.state;
    const isValid = inputValidation;

    this.props.onSubmit(
      {
        firstName,
        lastName,
        emailAddress,
        cityNames,
        phoneInput: formatPhoneNumber(phoneInput),
      },
      isValid
    );

    this.setState({
      inputValidation: true,
    });
    this.reset();
  };

  render() {
    const {
      firstName,
      lastName,
      emailAddress,
      cityNames,
      phoneInput,
      inputValidation,
    } = this.state;

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
      <form onSubmit={this.handleSubmit}>
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
          <ClassPhoneInput
            phoneInput={this.state.phoneInput}
            handleChangePhone={this.handleChangePhoneInput}
          />
        </div>

        {showPhone && (
          <ErrorMessage message={phoneNumberErrorMessage} show={true} />
        )}

        <input type="submit" value="Submit" />
      </form>
    );
  }
}
