import { useState } from "react";
import { ProfileInformation } from "../ProfileInformation";
import { FunctionalForm } from "./FunctionalForm";

export const FunctionalApp = () => {
  const [userData, setUserData] = useState(null);
  const handleSubmitApp = (formData, isValid) => {
    if (isValid) {
      setUserData(formData);
      alert("Form submitted successfully!");
    } else {
      alert("Correct the input and try again!");
    }
  };

  return (
    <>
      <h2>Functional</h2>
      <ProfileInformation userData={userData} />
      <FunctionalForm onSubmit={handleSubmitApp} />
    </>
  );
};
