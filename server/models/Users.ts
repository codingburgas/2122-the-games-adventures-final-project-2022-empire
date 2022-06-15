import BaseModel from "./base/Base";
import {UserData, UserReturnData} from "../types";
import sql from 'mssql/msnodesqlv8';

class Users extends BaseModel {
    constructor() {
        super();
    }

   registerUser = (data: UserData): Promise< UserReturnData | null > => {
        return this.connection.request()
        .input('Username', sql.VarChar, data.username)
        .input('Password', sql.VarChar, data.password)
        .query('INSERT INTO Users(Username, Password) VALUES(@Username, @Password); SELECT SCOPE_IDENTITY() AS id')
        .then((result) => {
            return new UserReturnData(result.recordset[0].id, data.username);
        })
        .catch((_) => {
            return null;;
        })
    };

    getUser = (data: UserData): Promise< UserReturnData | null > => {
        return this.connection.request()
        .input('LoginUsername', sql.VarChar, data.username)
        .input('LoginPassword', sql.VarChar, data.password)
        .query('SELECT Id AS id FROM Users WHERE Username = @LoginUsername AND Password = @LoginPassword')
        .then((result) => {
            if(result.recordset[0])
                return new UserReturnData(result.recordset[0].id, data.username);
            return null;
        })
        .catch((err) => {
            console.log(err);
            return null;
        });
    };

}


const User: Users = new Users();

export default User;


