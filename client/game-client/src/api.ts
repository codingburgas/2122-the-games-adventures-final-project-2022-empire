import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { readStorage, writeStorage } from "./localstorage";
export const SERVER_ENDPOINT = "//localhost:4000";
// export const SERVER_ENDPOINT = "//20.86.31.10:80";
export const API_ENDPOINT = SERVER_ENDPOINT + "/api";

const MySwal = withReactContent(Swal);

/**
 * Converts data to urlencoded data
 * @param data {any} The data to be converted
 * @returns URLEncoded data
 */
function toURLEncoded(data: any): BodyInit {
  return Object.keys(data)
    .map((key) => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
    .join("&");
}

interface JSONResponse {
    [key: string]: string
}

/**
 * Fetches the date of the current user
 * (bound to /users/@me)
 * @param {string} token
 * @returns {Promise<object>}
 */
export async function fetchUser(token: string): Promise<JSONResponse> {
  return new Promise((res, rej) => {
    fetchAPI(
      "/users/@me",
      {},
      {
        Authorization: `Bearer ${token}`,
      }
    )
      .then(res)
      .catch((err) => {
        console.log(`Internal server error: ${err}`);

        MySwal.fire(
          "Oops...",
          "There was problem with the server. Please try again later!",
          "error"
        );

        rej(err);
      });
  });
}

/**
 * Checks if given token is valid
 * @param {string} token
 * @returns {boolean}
 */
export async function validateToken(token: string): Promise<boolean> {
  try {
    let response = await fetchUser(token);

    return response.response === "Success";
  } catch {
    return false;
  }
}

export async function fetchAPI(
  endpoint: string,
  data = {},
  headers = {},
  method = "GET"
) {
  let response = await fetch(API_ENDPOINT + endpoint, {
    method,
    mode: "cors",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      ...headers,
    },
    body: method === "GET" ? null : toURLEncoded(data),
  });

  return response.json();
}

