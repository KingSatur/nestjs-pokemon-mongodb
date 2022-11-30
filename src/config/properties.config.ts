export const Properties = () => ({
  environment: process.env.NODE_ENV || 'local',
  database_url: process.env.DATABASE_URL,
  port: process.env.PORT || 4501,
  default_limit: process.env.DEFAULT_LIMIT || 10,
});
