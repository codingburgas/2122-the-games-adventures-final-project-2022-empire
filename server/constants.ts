import { UserReturnData } from "./types";

export const notEnoughArgumentsResponse: string = JSON.stringify({response: "Not enough arguments!"});

export const invalidArgumentsResponse: string = JSON.stringify({response: "Invalid arguments"});

export const invalidDataResponse: string = JSON.stringify({response: "Invalid data"});

export const successOrFailureResponse = (value: UserReturnData | boolean | null): string => {
    return JSON.stringify({response: value ? "Success" : "Failure"})
};
