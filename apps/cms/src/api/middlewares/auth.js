'use strict';

/**
 * Middleware d'authentification pour les rôles
 */

module.exports = (policyName, config) => {
  return async (ctx, next) => {
    const { state } = ctx;

    if (ctx.state.user) {
      // Utilisateur authentifié
      return next();
    }

    return ctx.unauthorized(`Unauthorized`);
  };
};
