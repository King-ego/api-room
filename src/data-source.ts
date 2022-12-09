import 'reflect-metadata';
import 'dotenv/config';
import { DataSource } from 'typeorm';

const port = process.env.DB_PORT as number | undefined;

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port,
  password: process.env.DB_PASS,
  username: process.env.DB_USER,
  database: process.env.DB_NAME,
  entities: [`${__dirname}/**/entities/*.{ts,js}`],
  migrations: [`${__dirname}/**/migrations/*.{ts,js}`]
});
