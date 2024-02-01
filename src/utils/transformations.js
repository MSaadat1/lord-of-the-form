export const isNameValidation = (name) => {
  return /^[a-zA-Z]+$/.test(name) && name.length > 2;
};

export const formatPhoneNumber = (phone) => {
  if (phone.every((part) => part !== "" && /^\d+$/.test(part))) {
    return phone.join("-");
  } else {
    return "";
  }
};

