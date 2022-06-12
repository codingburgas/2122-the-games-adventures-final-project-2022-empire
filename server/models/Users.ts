import BaseModel from "./base/Base";
import { RegisterData } from "../types";
import {Query} from "mysql2";

class Users extends BaseModel {
    constructor() {
        super();
    }

    async registerUser(data: RegisterData) : Promise<boolean> {
        const result: Query = await this.connection.execute('CALL Users_registerUser(?, ?)', [data.username, data.password]);
        console.log(result)
        return true;
    }
};

const User: Users = new Users();

export default User;


