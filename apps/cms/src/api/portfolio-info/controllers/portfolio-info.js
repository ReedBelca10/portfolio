'use strict';

/**
 * Controller pour Portfolio Info
 */

module.exports = {
  async list(ctx) {
    try {
      const portfolioInfo = await strapi
        .service('api::portfolio-info.portfolio-info')
        .find({ populate: '*' });

      ctx.body = portfolioInfo;
    } catch (err) {
      ctx.throw(500, err);
    }
  },

  async findOne(ctx) {
    const { id } = ctx.params;

    try {
      const portfolioInfo = await strapi
        .service('api::portfolio-info.portfolio-info')
        .findOne(id, { populate: '*' });

      if (!portfolioInfo) {
        return ctx.notFound();
      }

      ctx.body = portfolioInfo;
    } catch (err) {
      ctx.throw(500, err);
    }
  },

  async create(ctx) {
    try {
      const portfolioInfo = await strapi
        .service('api::portfolio-info.portfolio-info')
        .create(ctx.request.body);

      ctx.body = portfolioInfo;
      ctx.status = 201;
    } catch (err) {
      ctx.throw(400, err);
    }
  },

  async update(ctx) {
    const { id } = ctx.params;

    try {
      const portfolioInfo = await strapi
        .service('api::portfolio-info.portfolio-info')
        .update(id, ctx.request.body);

      ctx.body = portfolioInfo;
    } catch (err) {
      ctx.throw(400, err);
    }
  },

  async delete(ctx) {
    const { id } = ctx.params;

    try {
      await strapi
        .service('api::portfolio-info.portfolio-info')
        .delete(id);

      ctx.status = 204;
    } catch (err) {
      ctx.throw(500, err);
    }
  },
};
