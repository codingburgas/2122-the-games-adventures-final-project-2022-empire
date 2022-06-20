import sql, { ConnectionPool } from "mssql/msnodesqlv8";
import { dbConfig } from "../../config";
import { LoggerManager } from "../../helpers/loggerManager";

export default abstract class BaseModel {
  // @ts-ignore
  protected connection: ConnectionPool;

  protected constructor() {
    const loggerManager = new LoggerManager();
    this._connectDb()
      .then(() => {
        loggerManager.logInfo(`Database connection successful.`);
      })
      .catch((err) => {
        loggerManager.logError(`Database connection failed. Reason: ${err}`);
      });
  }

  private async _connectDb() {
    this.connection = await new sql.ConnectionPool(dbConfig).connect();
  }
}
