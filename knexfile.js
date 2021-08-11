// Update with your config settings.

module.exports = {
  development: {
    client: "postgresql",
    connection: {
      host: "",
      database: "todoapp",
      user: "postgres",
      password: "",
    },
    migrations: {
      directory: "./src/database",
    },
    seeds: {
      directory: "./src/database",
    },
  },

  production: {
    client: "pg",
    connection: {
      connectionString:process.env.DATABASE_URL,
      ssl:{ rejectUnauthorized: false },
    },
    
    migrations: {
      directory: __dirname+"/src/database",
    },
    seeds: {
      directory: __dirname+"/src/database",
    },
  },
};
