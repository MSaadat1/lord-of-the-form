import { Component } from "react";
import { ClassForm } from "./ClassForm";
import { ProfileInformation } from "../ProfileInformation";

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
        <ProfileInformation userData={this.state.userData} />
        <ClassForm onSubmit={this.handleSubmitApp} />
      </>
    );
  }
}
