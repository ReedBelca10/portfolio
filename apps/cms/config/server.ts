export default {
  host: process.env.STRAPI_HOST || process.env.HOST || '0.0.0.0',
  port: Number(process.env.PORT || process.env.STRAPI_PORT || 1337),
  url: process.env.STRAPI_URL || process.env.RENDER_EXTERNAL_URL || 'http://localhost:1337',
  app: {
    keys: process.env.APP_KEYS
      ? process.env.APP_KEYS.split(',')
      : ['toBeModified1', 'toBeModified2', 'toBeModified3'],
  },
  webhooks: {
    populateRelations: true,
  },
};
