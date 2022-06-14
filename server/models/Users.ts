import BaseModel from "./base/Base";
import { RegisterData, RegisterReturnData } from "../types";

class Users extends BaseModel {
    constructor() {
        super();
    }

    registerUser(data: RegisterData) : Promise<RegisterReturnData> {
        let resultQuery: boolean;
        return this.connection.promise().execute(
            'CALL Users_registerUser(?, ?)',
            [data.username, data.password]);
    }
}

const User: Users = new Users();

export default User;


