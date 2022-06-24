export type UserData = {username: string, password: string};

export class UserReturnData {
    public id: number;
    public username: string;

    constructor(_id: number, _username: string) {
        this.id = _id;
        this.username = _username;
    }
}

export interface FilterData {id?: number, username?: string}

export interface UpdateData {id: number, username: string}

export class Vector2 {
    public x: number;
    public y: number;

    constructor(_x: number, _y: number) {
        this.x = _x;
        this.y = _y;
    }
}
