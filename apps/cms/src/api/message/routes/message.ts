export default {
  routes: [
    {
      method: 'POST',
      path: '/messages',
      handler: 'message.create',
      config: {
        auth: false, // Allow public submissions from the contact form
      },
    },
    {
      method: 'GET',
      path: '/messages',
      handler: 'message.find',
      // GET stays authenticated — only admin can view messages
    },
    {
      method: 'GET',
      path: '/messages/:id',
      handler: 'message.findOne',
    },
    {
      method: 'DELETE',
      path: '/messages/:id',
      handler: 'message.delete',
    },
  ],
};
