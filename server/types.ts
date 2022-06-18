export type UserData = {username: string, password: string};

export class UserReturnData {
    public id: number;
    public username: string;

    constructor(_id: number, _username: string) {
        this.id = _id;
        this.username = _username;
    }
}

export interface FilterData{id?: number, username?: string}
