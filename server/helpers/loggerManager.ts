/**
 * Class for management the logging system
 * @class
 */
 export class LoggerManager {
    /**
     * Initialise the logging system
     * @constructor
     */
    constructor() {
        this.#winston = require('winston');
        this.#LokiTransport = require('winston-loki');
        this.#DiscordLogger = require('winston3-discord');
        this.#logger = this.#winston.createLogger();

        this.#logger.add(new this.#winston.transports.Console({
            format: this.#winston.format.simple(),
            level: 'silly'
        }));

        this.#logger.add(new this.#LokiTransport({
            host: process.env.LOKI_IP,
            json: true,
            labels: { job: 'Empire' },
            level: 'silly',
            basicAuth: `${process.env.LOKI_USER}:${process.env.LOKI_PASSWORD}`
        }));

        this.#logger.add(new this.#DiscordLogger({
            webhooks: {
                id: process.env.DISCORD_ID,
                token: process.env.DISCORD_TOKEN
            },
            level: 'silly'
        }));
    }

    //public methods
    /**
     * Send error log
     * @public
     * @param {string} logMsg Message to be logged
     */
    logError(logMsg: string) {
        this.#logger.error(logMsg)
    }

    /**
     * Send warn log
     * @public
     * @param {string} logMsg Message to be logged
     */
    logWarn(logMsg: string) {
        this.#logger.warn(logMsg)
    }
    
    /**
     * Send info log
     * @public
     * @param {string} logMsg Message to be logged
     */
    logInfo(logMsg: string) {
        this.#logger.info(logMsg);
    }

    /**
     * Send http log
     * @public
     * @param {string} logMsg Message to be logged
     */
    logHttp(logMsg: string) {
        this.#logger.http(logMsg);
    }

    /**
     * Send verbose log
     * @public
     * @param {string} logMsg Message to be logged
     */
    logVerbose(logMsg: string) {
        this.#logger.verbose(logMsg);
    }

    /**
     * Send debug log
     * @public
     * @param {string} logMsg Message to be logged
     */
    logDebug(logMsg: string) {
        this.#logger.debug(logMsg);
    }

    /**
     * Send Silly log
     * @public
     * @param {string} logMsg Message to be logged
     */
    logSilly(logMsg: string) {
        this.#logger.silly(logMsg);
    }

    //private
    #winston;
    #LokiTransport;
    #DiscordLogger;
    #logger;
}