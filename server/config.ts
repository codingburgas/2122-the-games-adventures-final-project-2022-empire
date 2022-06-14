import dotenv from 'dotenv';

dotenv.config();

export const dbConfig =  {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    port: Number(process.env.DB_PORT),
    database: process.env.DB_NAME,
};
