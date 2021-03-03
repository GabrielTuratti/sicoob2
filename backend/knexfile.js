// Update with your config settings.

module.exports = {
  development: {
    client: "pg",
    connection: {
      database: "sicoob",
      user: "postgres",
      password: "1234",
    },
    migrations: {
      directory: `${__dirname}/src/database/migration`,
    },
    seeds: {
      directory: `${__dirname}/src/database/seeds`,
    },
  },
};
