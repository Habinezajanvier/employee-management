require ('dotenv').config ();

const env = process.env.NODE_ENV || 'development';

const development = {
  db: {
    host: process.env.DB_HOST_DEV,
    port: process.env.DB_PORT_DEV,
    name: process.env.DB_NAME_DEV,
  },
};
const testing = {
  db: {
    host: process.env.DB_HOST_TEST,
    port: process.env.DB_PORT_TEST,
    name: process.env.DB_NAME_TEST,
  },
};
const staging = {
  db: {
    database_url: process.env.DATABASE_URL,
  },
};
const production = {
  db: {
    database_url: process.env.DATABASE_URL,
  },
};

const config = {
  development,
  testing,
  staging,
  production,
};

module.exports = config[env];
