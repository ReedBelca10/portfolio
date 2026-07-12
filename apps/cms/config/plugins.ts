'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/setup-deployment-guides/configurations/required/plugins.html)
 * to customize this model
 */

export default ({ env }) => ({
  'users-permissions': {
    enabled: true,
    resolve: './node_modules/@strapi/plugin-users-permissions'
  },
  upload: {
    config: {
      provider: 'cloudinary',
      providerOptions: {
        cloud_name: env('CLOUDINARY_NAME'),
        api_key: env('CLOUDINARY_KEY'),
        api_secret: env('CLOUDINARY_SECRET'),
      },
      actionOptions: {
        upload: {},
        uploadStream: {},
        delete: {},
      },
    },
  },
});
