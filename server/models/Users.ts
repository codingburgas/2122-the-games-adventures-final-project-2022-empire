import BaseModel from "./base/Base";
import {RegisterData, RegisterReturnData} from "../types";
import {FieldPacket, ResultSetHeader} from "mysql2";

class Users extends BaseModel {
    constructor() {
        super();
    }

    registerUser(data: RegisterData) : Promise<RegisterReturnData | null>{
        // @ts-ignore
        return this.connection.promise().execute(
            'INSERT INTO Users(Username, Password) VALUES(?, ?)',
            [data.username, data.password])
            .then((results: [ResultSetHeader, FieldPacket[]]) => {
                return new RegisterReturnData(results[0].insertId, data.username);
            })
            .catch((_) => {
                return null;
            })
    }
}

const User: Users = new Users();

export default User;


