'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/setup-deployment-guides/configurations/required/plugins.html)
 * to customize this model
 */

export default {
  'users-permissions': {
    enabled: true,
    resolve: './node_modules/@strapi/plugin-users-permissions'
  },
  settings: {
    bulkActions: false,
    filterBar: true,
    pageSize: 20,
    optimizeEntitiesQueryCount: true,
    sideEffects: true,
    searchWithRegex: true,
  },
};
