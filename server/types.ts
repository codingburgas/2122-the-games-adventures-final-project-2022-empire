export type RegisterData = {username: string, password: string};

export class RegisterReturnData {
    public id: number;
    public username: string;

    constructor(_id: number, _username: string) {
        this.id = _id;
        this.username = _username;
    }
};

