import sql, { ConnectionPool} from 'mssql/msnodesqlv8';
import {dbConfig} from "../../config";

export default abstract class BaseModel {
    // @ts-ignore
    protected connection: ConnectionPool;

  protected constructor() {
        this._connectDb();
  }

  private async _connectDb() {
      this.connection =  await new sql.ConnectionPool(dbConfig).connect();
  }
};
