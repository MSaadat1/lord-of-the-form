import { Component } from "react";
import { ClassForm } from "./ClassForm";
import { ProfileInformation } from "../ProfileInformation";

// const defaultUser = {
//   email: "default@default.com",
//   firstName: "Default",
//   lastName: "Default",
//   phone: "1234567",
//   city: "Hobbiton",
// };

export class ClassApp extends Component {
  state = {
    userData: null,
  };
  handleSubmitApp = (formData, isValid) => {
    if (isValid) {
      this.setState((prevState) => ({
        userData: { ...prevState.userData, ...formData },
      }));
      alert("Form submitted successfully!");
    } else {
      alert("Correct the input and try again!");
    }
  };
  render() {
    return (
      <>
        <h2>Class</h2>
        <ProfileInformation
          userData={
            // // toggle the following lines to change
            // // null
            //defaultUser
            this.state.userData
          }
        />
        <ClassForm onSubmit={this.handleSubmitApp} />
      </>
    );
  }
}
