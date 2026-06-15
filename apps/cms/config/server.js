module.exports = {
  host: process.env.STRAPI_HOST || '0.0.0.0',
  port: process.env.STRAPI_PORT || 1337,
  app: {
    keys: process.env.APP_KEYS
      ? process.env.APP_KEYS.split(',')
      : ['toBeModified1', 'toBeModified2', 'toBeModified3'],
  },
  webhooks: {
    populateRelations: true,
  },
};
