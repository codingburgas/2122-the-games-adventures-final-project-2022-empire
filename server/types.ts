import { FieldPacket, QueryError, RowDataPacket } from "mysql2";

export type RegisterData = {username: string, password: string};

export type ErrorData = QueryError | null;

export type RegisterReturnData = [RowDataPacket[][], FieldPacket[]];
