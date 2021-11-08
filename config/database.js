const parse = require("pg-connection-string").parse;
module.exports = ({ env }) => {
  if (env("NODE_ENV") == "production") {
    const config = parse(process.env.DATABASE_URL);
    return {
      defaultConnection: "default",
      connections: {
        default: {
          connector: "bookshelf",
          settings: {
            client: "postgres",
            host: config.host,
            port: config.port,
            database: config.database,
            username: config.user,
            password: config.password,
            ssl: {
              rejectUnauthorized: env.bool("DATABASE_SSL_SELF", false), // For self-signed certificates
            },
          },
          options: {
            ssl: env.bool("DATABASE_SSL", false),
          },
        },
      },
    };
  } else {
    return {
      defaultConnection: "default",
      connections: {
        default: {
          connector: "bookshelf",
          settings: {
            client: "postgres",
            host: env("DATABASE_HOST", "127.0.0.1"),
            port: env.int("DATABASE_PORT", 5435),
            database: env("DATABASE_NAME", "postgres"),
            username: env("DATABASE_USERNAME", "postgres"),
            password: env("DATABASE_PASSWORD", "docker"),
            ssl: env.bool("DATABASE_SSL", false),
          },
          options: {},
        },
      },
    };
  }
};
