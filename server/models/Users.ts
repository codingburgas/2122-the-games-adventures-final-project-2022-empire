import BaseModel from "./base/Base";
import {RegisterData, RegisterReturnData} from "../types";
import sql from 'mssql/msnodesqlv8';

class Users extends BaseModel {
    constructor() {
        super();
    }

    registerUser(data: RegisterData) : Promise< RegisterReturnData | null> {
        return this.connection.request()
        .input('Username', sql.VarChar, data.username)
        .input('Password', sql.VarChar, data.password)
        .query('INSERT INTO Users(Username, Password) VALUES(@Username, @Password); SELECT SCOPE_IDENTITY() AS id')
        .then((result) => {
            return new RegisterReturnData(result.recordset[0].id, data.username);
        })
        .catch((_) => {
            return null;
        })
    }
}

const User: Users = new Users();

export default User;


