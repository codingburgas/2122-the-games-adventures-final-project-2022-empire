import sql, { ConnectionPool } from "mssql/msnodesqlv8";
import { dbConfig } from "../../config";
import { LoggerManager } from "../../helpers/loggerManager";


/**
 * Base model for all entities
 * @class
 */
export default abstract class BaseModel {
  // @ts-ignore
  protected connection: ConnectionPool;

  /**
   * @constructor
   * @protected
   */
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

  /**
   * Makes a connection to the database
   * @private
   */
  private async _connectDb() {
    this.connection = await new sql.ConnectionPool(dbConfig).connect();
  }
}
