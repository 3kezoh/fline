import { Sequelize } from 'sequelize';
// Forces generatePackageJson to add pg in the dependencies
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { pg } from 'pg';

export const sequelize = new Sequelize(process.env['POSTGRES_HOST']);
