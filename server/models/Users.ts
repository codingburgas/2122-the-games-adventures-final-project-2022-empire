import BaseModel from "./base/Base";
import {FilterData, UpdateData, UserData, UserReturnData} from "../types";
import sql, {IResult} from 'mssql/msnodesqlv8';
import * as bcrypt from "bcrypt";

class Users extends BaseModel {
    private _transitionalVar!: Promise<IResult<any>>;

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

    getUsers = (): this => {
        this._transitionalVar = this.connection.request()
        .query('SELECT Id as id, Username as username FROM Users')

        return this;
    };

    by = async (data: FilterData): Promise<UserReturnData[]> => {
       const keys: Array<keyof FilterData> = ["id", "username"];

       return this._transitionalVar.then((result) => {
           let filterData: UserReturnData[] = [];
           for (let key of keys) {
               if(data[key]) {
                   for (let object of result.recordset) {
                       if(object[key] === data[key]) {
                           filterData.push(new UserReturnData(object.id, object.username));
                       }
                   }
               }
           }
       return filterData;
       })
       .catch((err) => {
           console.log(err);
           return [];
       });
    };

    deleteUserById = (id: number): void => {
        this.connection.request()
        .input('DeleteId', sql.Int, id)
        .query('DELETE FROM Users WHERE Id = @DeleteId')
        .catch((err) => {
            console.log(err);
        });
    };

    updateUserById = (data: {oldUsername: string, newUsername: string}): Promise<boolean> => {
        return this.connection.request()
        .input('OldUsername', sql.VarChar, data.oldUsername)
        .input('NewUsername', sql.VarChar, data.newUsername)
        .query('UPDATE Users SET Username = @NewUsername WHERE Username = @OldUsername')
        .then((result) => {
            return !!result.rowsAffected[0];
        })
    };

}

const User: Users = new Users();

export default User;


