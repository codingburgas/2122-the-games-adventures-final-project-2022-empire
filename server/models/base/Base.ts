import sql, { ConnectionPool} from 'mssql/msnodesqlv8';
import {dbConfig} from "../../config";

export default abstract class BaseModel {
    // @ts-ignore
    protected connection: ConnectionPool;

  protected constructor() {
        this._connectDb()
        .then(() => {
            console.log("Connection to  database initialized!");
        })
        .catch((err) => {
            console.log(err);
        });
  }

  private async _connectDb() {
      this.connection =  await new sql.ConnectionPool(dbConfig).connect();
  }
};
