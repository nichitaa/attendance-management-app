import { Sequelize } from 'sequelize';
import config from './config.json';

const dbConfig = config['development'];

const sequelize = new Sequelize(
  dbConfig.database,
  dbConfig.username,
  dbConfig.password,
  {
    host: dbConfig.host,
    dialect: 'mysql',
    pool: {
      max: 5,
      min: 0,
      acquire: 90000,
      idle: 10000,
    },
    logging: true,
  },
);

export default sequelize;


