'use strict';

/**
 * Service pour Portfolio Info
 */

module.exports = ({ strapi }) => ({
  async find(params) {
    return await strapi.entityService.findMany('api::portfolio-info.portfolio-info', params);
  },

  async findOne(id, params) {
    return await strapi.entityService.findOne('api::portfolio-info.portfolio-info', id, params);
  },

  async create(data) {
    return await strapi.entityService.create('api::portfolio-info.portfolio-info', { data });
  },

  async update(id, data) {
    return await strapi.entityService.update('api::portfolio-info.portfolio-info', id, { data });
  },

  async delete(id) {
    return await strapi.entityService.delete('api::portfolio-info.portfolio-info', id);
  },
});
