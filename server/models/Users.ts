import BaseModel from "./base/Base";
import { UserData, UserReturnData } from "../types";
import sql from 'mssql/msnodesqlv8';
import * as bcrypt from "bcrypt";

class Users extends BaseModel {
    constructor() {
        super();
    }

    registerUser = async (data: UserData): Promise< UserReturnData | null > => {
        const salt: string = await bcrypt.genSalt(10);

        return this.connection.request()
        .input('Username', sql.VarChar, data.username)
        .input('Password', sql.VarChar, await bcrypt.hash(data.password, salt))
        .input("Salt", sql.VarChar, salt)
        .query('INSERT INTO Users(Username, Password, Salt) VALUES(@Username, @Password, @Salt); SELECT SCOPE_IDENTITY() AS id')
        .then((result) => {
            return new UserReturnData(result.recordset[0].id, data.username);
        })
        .catch((_) => {
            return null;
        })
    };

    loginUser = async (data: UserData): Promise< UserReturnData | null > => {
        const salt = await this.connection.request()
                    .input('LoginUsername', sql.VarChar, data.username)
                    .query('Select Salt as salt FROM Users WHERE Username = @LoginUsername')
                    .catch((err) => {
                        console.log(err);
                        return null;
                    });

        if(!salt)  return null;

        return this.connection.request()
        .input('LoginUsername', sql.VarChar, data.username)
        .input('LoginPassword', sql.VarChar, await bcrypt.hash(data.password, salt.recordsets[0][0].salt))
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


