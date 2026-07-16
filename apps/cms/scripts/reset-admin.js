/**
 * Reset Strapi Admin User
 * Creates or resets the admin user with new credentials
 * Usage: npm run reset-admin
 */

const path = require('path');

module.exports = async ({ strapi }) => {
  // Define new admin credentials
  const adminEmail = process.env.ADMIN_EMAIL || 'admin@example.com';
  const adminPassword = process.env.ADMIN_PASSWORD || 'Admin@12345';
  const adminFirstName = process.env.ADMIN_FIRST_NAME || 'Admin';
  const adminLastName = process.env.ADMIN_LAST_NAME || 'User';

  try {
    console.log('Resetting Strapi admin user...');

    // Find existing admin user
    const existingAdmin = await strapi.query('admin::user').findOne({
      where: { email: adminEmail },
    });

    if (existingAdmin) {
      console.log(`Admin user found with email: ${adminEmail}`);
      console.log('  Updating password...');
      
      // Update existing admin password
      await strapi.query('admin::user').update({
        where: { id: existingAdmin.id },
        data: {
          password: adminPassword,
          firstname: adminFirstName,
          lastname: adminLastName,
        },
      });

      console.log('Admin password updated successfully!');
    } else {
      console.log(`No admin user found. Creating new admin with email: ${adminEmail}`);
      
      // Create new admin user
      await strapi.query('admin::user').create({
        data: {
          email: adminEmail,
          password: adminPassword,
          firstname: adminFirstName,
          lastname: adminLastName,
          isActive: true,
        },
      });

      console.log('Admin user created successfully!');
    }

    console.log('\nAdmin Credentials:');
    console.log(`   Email: ${adminEmail}`);
    console.log(`   Password: ${adminPassword}`);
    console.log('\nPlease change the password after your first login!');
    console.log('   You can change it in the admin dashboard under Settings > My Account');

  } catch (error) {
    console.error('Error resetting admin user:', error.message);
    process.exit(1);
  }
};
