module.exports = {
  auth: {
    secret: process.env.ADMIN_JWT_SECRET || 'your_jwt_secret_here',
  },
  apiToken: {
    salt: process.env.TRANSFER_TOKEN_SALT || 'your_transfer_token_salt',
  },
};
