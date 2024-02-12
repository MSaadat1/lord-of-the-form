/* eslint-disable no-undef */
import { Component } from "react";
import { ErrorMessage } from "../ErrorMessage";
import { isNameValidation } from "../utils/transformations";
import { isEmailValid } from "../utils/validations";
import { isCityValid } from "../utils/validations";
import { allCities } from "../utils/all-cities";
import { formatPhoneNumber } from "../utils/transformations";
import ClassPhoneInput from "./ClassPhoneInput";
import { ClassTextIput } from "./ClassTextInputs";

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
    this.setState({
      inputValidation: true,
    });
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
    if (isValid) {
      this.setState({
        inputValidation: false,
      });
      this.reset();
    }
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
          <ClassTextIput
            inputProps={{
              placeholder: "Bilbo",
              value: firstName,
              onChange: (e) => {
                this.setState({ firstName: e.target.value });
              },
            }}
            label={"First Name"}
          />
        </div>
        {showFirstName && (
          <ErrorMessage message={firstNameErrorMessage} show={true} />
        )}

        {/* last name input */}
        <div className="input-wrap">
          <ClassTextIput
            inputProps={{
              placeholder: "Baggins",
              value: firstName,
              onChange: (e) => {
                this.setState({ lastName: e.target.value });
              },
            }}
            label={"Last Name"}
          />
        </div>
        {showLastName && (
          <ErrorMessage message={lastNameErrorMessage} show={true} />
        )}

        {/* Email Input */}
        <div className="input-wrap">
          <ClassTextIput
            inputProps={{
              placeholder: "bilbo-baggins@adventurehobbits.net",
              value: emailAddress,
              onChange: (e) => {
                this.setState({ emailAddress: e.target.value });
              },
            }}
            label={"Email"}
          />
        </div>
        {showEmail && <ErrorMessage message={emailErrorMessage} show={true} />}

        {/* City Input */}
        <div className="input-wrap">
          <ClassTextIput
            inputProps={{
              list: "cityList",
              placeholder: "Hobbiton",
              value: cityNames,
              onChange: (e) => {
                this.setState({ cityNames: e.target.value });
              },
            }}
            label={"City"}
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
