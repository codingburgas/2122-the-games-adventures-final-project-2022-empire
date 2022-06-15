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

/**
 * Validations for every input
 */
const validations: ValidationFunctionInterface = {
  isEmailValid: (data: string): boolean => {
    let pattern =
      /(([a-z]+)([._a-z0-9])([a-z0-9]+)).{1,64}(@)([a-z]+)([.a-z])([a-z])+/gim;
    return Boolean(data.match(pattern));
  },

  isUsernameValid: (data: string): boolean => {
    let pattern = /^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/;
    return Boolean(data.match(pattern));
  },
};

/**
 * To check certain data if it is valid
 * @function
 * @param {string} data data to check
 * @param {object} toCheck For what to check
 * @returns {boolean} Is the data valid?
 */
function isDataValid(data: string, toCheck: object): boolean {
  for (const key in toCheck) {
    if (!validations[key](data)) {
      return false;
    }
  }

  return true;
}

/**
 * Function to validate the form received from client
 * @function
 * @param {object} dataToValidate Data that needs to be validated
 * @param {object} criterias Criterias for evaluating the date
 * @returns {(boolean|Array)} Booleant if the data is valid or array of errors
 */
function formValidation(
  dataToValidate: DataInterface,
  criterias: ValidationsInterface
): boolean | DataInterface {
  let errorArr: DataInterface = {};

  for (const key in dataToValidate) {
    if (!isDataValid(dataToValidate[key], criterias[key])) {
      errorArr[key] = criterias[Object.keys(criterias[key])[0]];
    }
  }

  if (Object.keys(errorArr).length === 0) {
    return true;
  }

  return errorArr;
}

/**
 * Validations for registering form
 */
const registerValidations = {
  username: { isUsernameValid: 1 },
  isUsernameValid: "Invalid username",
};

export const isRegisterDataValid = (
  data: UserData
): boolean | DataInterface => {
  return formValidation(data, registerValidations);
};

export const isLoginDataValid = (data: UserData): boolean | DataInterface => {
  return formValidation(data, registerValidations);
};
