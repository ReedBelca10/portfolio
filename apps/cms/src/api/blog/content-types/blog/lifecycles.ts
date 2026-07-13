export default {
  async afterCreate(event) {
    const { result, params } = event;
    
    // Check if the blog is published
    if (result.publishedAt) {
      await notifySubscribers(result);
    }
  },

  async afterUpdate(event) {
    const { result, params } = event;
    
    // For update, we want to notify if it just got published
    // We could check previous state if needed, but for simplicity, 
    // we'll just check if it's published and maybe log it.
    // Note: In a real world scenario, you'd want to ensure you only notify ONCE.
    // For now, we will notify if publishedAt is set.
    
    // Usually strapi sets publishedAt when hitting "Publish"
    // To prevent spamming on every save, we check if it was just published
    // We can't easily access previous state in Strapi v4 without querying beforeUpdate.
    // For this demonstration, we'll log the intention.
    if (result.publishedAt) {
      // await notifySubscribers(result); // Disabled by default on update to avoid spam.
      console.log(`Blog "${result.title}" updated and is published.`);
    }
  }
};

async function notifySubscribers(blog) {
  try {
    console.log(`[Lifecycle] New blog published: ${blog.title}. Fetching subscribers...`);
    
    // Fetch all active subscribers
    const subscribers = await strapi.entityService.findMany('api::subscriber.subscriber' as any, {
      filters: { active: true },
    });
    
    if (!subscribers || subscribers.length === 0) {
      console.log('[Lifecycle] No active subscribers found.');
      return;
    }
    
    const emails = subscribers.map(sub => sub.email);
    console.log(`[Lifecycle] Found ${emails.length} subscribers. Sending emails...`);
    
    // Strapi default email plugin
    // This requires an email provider to be configured to actually send
    for (const email of emails) {
      try {
        await strapi.plugins['email'].services.email.send({
          to: email,
          subject: `New Blog Post: ${blog.title}`,
          text: `Hi there!\n\nA new blog post has just been published: ${blog.title}.\n\nRead it now on our website!`,
          html: `<p>Hi there!</p><p>A new blog post has just been published: <strong>${blog.title}</strong>.</p><p>Read it now on our website!</p>`,
        });
        console.log(`[Lifecycle] Email sent to ${email}`);
      } catch (err) {
        console.error(`[Lifecycle] Failed to send email to ${email}:`, err.message);
      }
    }
  } catch (error) {
    console.error('[Lifecycle] Error notifying subscribers:', error);
  }
}
