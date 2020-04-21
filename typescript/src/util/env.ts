import dotenv from 'dotenv';

dotenv.config();

const env = {
  httpPort: parseInt(process.env.HTTP_PORT || '', 10),
  httpBodyLimit: process.env.HTTP_BODY_LIMIT,

  mysqlPort: parseInt(process.env.MYSQL_PORT || '', 10),
  mysqlHost: process.env.MYSQL_HOST,
  mysqlUser: process.env.MYSQL_USER,
  mysqlPassword: process.env.MYSQL_PASSWORD,
  mysqlSchema: process.env.MYSQL_SCHEMA,
  mysqlDebug: process.env.MYSQL_DEBUG === 'true',
  mysqlPoolMin: parseInt(process.env.MYSQL_POOL_MIN || '0', 10),
  mysqlPoolMax: parseInt(process.env.MYSQL_POOL_MIN || '1', 10),

  paymentProcessorUrl: process.env.PAYMENT_PROCESSOR_URL,
};

export default env;
