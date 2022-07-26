import { Sequelize } from 'sequelize';
// Forces generatePackageJson to add pg in the dependencies
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { pg } from 'pg';

const isProduction = process.env.APP_ENV === 'production';

export const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  ...(isProduction && {
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  }),
});
