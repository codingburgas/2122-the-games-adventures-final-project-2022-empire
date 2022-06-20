import { UserReturnData } from "./types";

export const notEnoughArgumentsResponse: string = JSON.stringify({response: "Not enough arguments!"});

export const invalidArgumentsResponse: string = JSON.stringify({response: "Invalid arguments"});

export const invalidDataResponse: string = JSON.stringify({response: "Invalid data"});

export const successOrFailureResponse = (
  value: UserReturnData | boolean | null,
  data: null | string = null
): string => {
  return data
    ? JSON.stringify({ response: value ? "Success" : "Failure", data })
    : JSON.stringify({ response: value ? "Success" : "Failure" });
};
