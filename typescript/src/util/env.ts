import dotenv from 'dotenv';

dotenv.config();

const env = {
  /* Http Interface Config */
  httpPort: parseInt(process.env.HTTP_PORT || '', 10),
  httpBodyLimit: process.env.HTTP_BODY_LIMIT,

  /* Mysql Adapter Config */
  mysqlPort: parseInt(process.env.MYSQL_PORT || '', 10),
  mysqlHost: process.env.MYSQL_HOST,
  mysqlUser: process.env.MYSQL_USER,
  mysqlPassword: process.env.MYSQL_PASSWORD,
  mysqlSchema: process.env.MYSQL_SCHEMA,
  mysqlDebug: process.env.MYSQL_DEBUG === 'true',
  mysqlPoolMin: parseInt(process.env.MYSQL_POOL_MIN || '0', 10),
  mysqlPoolMax: parseInt(process.env.MYSQL_POOL_MIN || '1', 10),

  /* AMQP Helper Config */
  amqpProtocol: process.env.AMQP_PROTOCOL,
  amqpHostname: process.env.AMQP_HOSTNAME,
  amqpPort: parseInt(process.env.AMQP_PORT || '5672', 10),
  amqpUsername: process.env.AMQP_USERNAME,
  amqpPassword: process.env.AMQP_PASSWORD,
  amqpVhost: process.env.AMQP_VHOST,

  /* Application Config */
  httpActive: process.env.HTTP_ACTIVE === 'true',
  amqpActive: process.env.AMQP_ACTIVE === 'true',
  paymentProcessorUrl: process.env.PAYMENT_PROCESSOR_URL,
};

export { env };
