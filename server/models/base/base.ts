import mysql, {Connection} from 'mysql2';
import {dbConfig} from "../../config";

export default abstract class BaseModel {
  protected readonly connection: Connection;

  constructor() {
      this.connection = mysql.createConnection(dbConfig);
  }
};
