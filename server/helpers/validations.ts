import { UserData } from "../types";

interface DataInterface {
  [key: string]: string;
}

interface ValidationsInterface {
  [key: string]: any;
}

interface ValidationFunctionInterface {
  [key: string]: Function;
}

const validations: ValidationFunctionInterface = {
  isPasswordValid: (data: string): boolean => {
    let pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]{8,}/;
    return Boolean(data.match(pattern));
  },

  isUsernameValid: (data: string): boolean => {
    let pattern = /^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/;
    return Boolean(data.match(pattern));
  },
};

const isDataValid = (data: string, toCheck: object): boolean => {
  for (const key in toCheck) {
    if (!validations[key](data)) {
      return false;
    }
  }
  return true;
};

const formValidation = (dataToValidate: DataInterface, criteria: ValidationsInterface): boolean => {
  let errorArr: DataInterface = {};

  for (const key in dataToValidate) {
    if (!isDataValid(dataToValidate[key], criteria[key])) {
      errorArr[key] = criteria[Object.keys(criteria[key])[0]];
    }
  }
  return Object.keys(errorArr).length === 0;
};

const registerValidations = {
  username: { isUsernameValid: 1 },
  password: { isPasswordValid: 1},
  isUsernameValid: "Invalid username",
  isPasswordValid: "Invalid password"
};

const updateValidations = {
  username: { isUsernameValid: 1 },
  isUsernameValid: "Invalid username",
}

export const isRegisterDataValid = (data: UserData): boolean => {
  return formValidation(data, registerValidations);
};

export const isLoginDataValid = (data: UserData): boolean => {
  return formValidation(data, registerValidations);
};

export const isUpdateDataValid = (data: UserData): boolean => {
  return formValidation(data, updateValidations);
}
