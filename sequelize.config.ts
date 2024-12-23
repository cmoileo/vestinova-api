import {Sequelize} from 'sequelize';
import * as dotenv from 'dotenv';

dotenv.config();

// @ts-ignore
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  dialect: 'postgres',
  models: [__dirname + '**/*.entity.ts'],
  logging: false,
});

export default sequelize;