export default ({ env }: any) => ({
  connection: {
    client: 'postgres',
    connection: env('DATABASE_URL') ? {
      connectionString: env('DATABASE_URL'),
      ssl: { rejectUnauthorized: false },
      keepAlive: true,
    } : {
      host: env('DATABASE_HOST', 'localhost'),
      port: env.int('DATABASE_PORT', 5432),
      database: env('DATABASE_NAME', 'portfolio_db'),
      user: env('DATABASE_USERNAME', 'postgres'),
      password: env('DATABASE_PASSWORD', 'postgres'),
      ssl: env.bool('DATABASE_SSL', false) ? { rejectUnauthorized: false } : false,
    },
    pool: {
      min: 0,
      max: 10,
      acquireTimeoutMillis: 60000,
      createTimeoutMillis: 30000,
      idleTimeoutMillis: 30000,
    },
    useNullAsDefault: true,
  },
});
