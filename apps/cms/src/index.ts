/**
 * Strapi entry point
 */

export default {
  async bootstrap({ strapi }) {
    console.log('Strapi portfolio is starting (bootstrap)');

    // Grant public permissions for public-facing APIs
    try {
      console.log('Attempting to find public role...');
      const role = await strapi.db
        .query('plugin::users-permissions.role')
        .findOne({ where: { type: 'public' } });

      console.log('Found public role?', !!role);

      if (role) {
        const actions = [
          'api::skill.skill.find',
          'api::skill.skill.findOne',
          'api::work.work.find',
          'api::work.work.findOne',
          'api::blog.blog.find',
          'api::blog.blog.findOne',
          'api::blog.blog.update',
          'api::cv.cv.find',
          'api::portfolio-info.portfolio-info.find',
          'api::project.project.find',
          'api::project.project.findOne',
          'api::subscriber.subscriber.create',
          'api::message.message.create',
        ];

        for (const action of actions) {
          const permission = await strapi.db
            .query('plugin::users-permissions.permission')
            .findOne({ where: { role: role.id, action } });

          if (!permission) {
            console.log(`Creating permission for ${action}...`);
            await strapi.db.query('plugin::users-permissions.permission').create({
              data: {
                action,
                role: role.id,
              },
            });
          }
        }
        console.log('Successfully granted public permissions for public APIs');
      }
      
      // Auto-add French locale if it doesn't exist
      try {
        const frenchLocale = await strapi.db.query('plugin::i18n.locale').findOne({
          where: { code: 'fr' }
        });
        if (!frenchLocale) {
          console.log('Adding French locale...');
          await strapi.db.query('plugin::i18n.locale').create({
            data: {
              name: 'French (fr)',
              code: 'fr',
            }
          });
          console.log('Successfully added French locale');
        }
      } catch (localeErr) {
        console.error('Failed to auto-add French locale:', localeErr);
      }
      
    } catch (err) {
      console.error('Failed to set public permissions:', err);
    }
  },
};
