#!/usr/bin/env node

/**
 * Strapi Admin User Creator/Resetter
 * Standalone script to create or reset admin credentials
 * Usage: node scripts/create-admin.js [email] [password]
 * Example: node scripts/create-admin.js admin@example.com MyPassword123
 */

async function createAdmin() {
  const email = process.argv[2] || 'reedbelca55@gmail.com';
  const password = process.argv[3] || 'Admin@1234';

  console.log('\nStrapi Admin User Creator/Resetter');
  console.log('=====================================\n');

  // Load environment
  const path = require('path');
  const dotenv = require('dotenv');
  
  dotenv.config({ path: path.join(__dirname, '../.env') });
  dotenv.config({ path: path.join(__dirname, '../.env.local') });

  try {
    // Initialize Strapi
    console.log('Initializing Strapi instance...');
    const strapi = require('@strapi/strapi').default;
    const app = new strapi.Strapi({
      dir: path.join(__dirname, '..'),
      autoReload: false,
    });

    await app.load();
    console.log('Strapi initialized\n');

    // Check for existing admins
    console.log('Checking for existing admin users...');
    const adminUsers = await app.query('admin::user').findMany();

    if (adminUsers && adminUsers.length > 0) {
      console.log(`Found ${adminUsers.length} admin user(s)\n`);
      
      // Update first admin
      const admin = adminUsers[0];
      console.log(`Updating admin: ${admin.email} → ${email}`);
      
      await app.query('admin::user').update({
        where: { id: admin.id },
        data: { 
          email: email,
          password: password,
        },
      });

      console.log('Admin credentials updated!\n');
    } else {
      console.log('No admin users found\n');
      console.log('Creating new admin user...');
      
      await app.query('admin::user').create({
        data: {
          email: email,
          password: password,
          firstname: 'Admin',
          lastname: 'User',
          isActive: true,
          roles: [],
        },
      });

      console.log('Admin user created!\n');
    }

    // Display credentials
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('New Admin Credentials:');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log(`Email:    ${email}`);
    console.log(`Password: ${password}`);
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
    
    console.log('IMPORTANT:');
    console.log('   1. Use these credentials to log in to Strapi admin');
    console.log('   2. Change the password immediately after login');
    console.log('   3. Store your credentials securely\n');

    process.exit(0);
  } catch (error) {
    console.error('Error:', error.message);
    console.error(error.stack);
    process.exit(1);
  }
}

createAdmin();
