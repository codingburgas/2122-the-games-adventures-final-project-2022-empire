import dotenv from 'dotenv';

dotenv.config();

export const dbConfig = {
    driver: 'msnodesqlv8',
    server: process.env.DB_SERVER as string,
    database: process.env.DB_NAME as string,
    options: {
        trustedConnection: true,
        trustServerCertificate: true,
    }
};
