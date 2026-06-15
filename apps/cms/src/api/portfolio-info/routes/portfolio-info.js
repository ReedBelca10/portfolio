'use strict';

/**
 * Routes pour Portfolio Info
 */

module.exports = {
  routes: [
    {
      method: 'GET',
      path: '/portfolio-info',
      handler: 'portfolio-info.list',
    },
    {
      method: 'GET',
      path: '/portfolio-info/:id',
      handler: 'portfolio-info.findOne',
    },
    {
      method: 'POST',
      path: '/portfolio-info',
      handler: 'portfolio-info.create',
    },
    {
      method: 'PUT',
      path: '/portfolio-info/:id',
      handler: 'portfolio-info.update',
    },
    {
      method: 'DELETE',
      path: '/portfolio-info/:id',
      handler: 'portfolio-info.delete',
    },
  ],
};
