// Update with your config settings.

module.exports = {
  development: {
    client: "postgresql",
    connection: {
      host: "localhost",
      database: "todoapp",
      user: "postgres",
      password: "root",
    },
    migrations: {
      directory: "./src/database",
    },
    seeds: {
      directory: "./src/database",
    },
  },

  production: {
    client: "postgresql",
    connection: process.env.DATABASE_URL,
    migrations: {
      directory: __dirname+"/src/database",
    },
    seeds: {
      directory: __dirname+"/src/database",
    },
  },
};
