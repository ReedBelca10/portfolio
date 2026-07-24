import { factories } from '@strapi/strapi';

export default factories.createCoreRouter('api::message.message' as any, {
  config: {
    create: {
      auth: false,
    },
  },
});
