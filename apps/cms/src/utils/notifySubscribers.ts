type NotificationContentType = 'blog' | 'skill' | 'project';

interface NotifySubscribersArgs {
  contentType: NotificationContentType;
  title: string;
  summary?: string;
  url?: string;
}

export async function notifySubscribers({
  contentType,
  title,
  summary,
  url,
}: NotifySubscribersArgs) {
  try {
    const subscribersResult = await strapi.entityService.findMany('api::subscriber.subscriber' as any, {
      filters: { active: true },
      fields: ['email'],
    });

    const subscribers = (Array.isArray(subscribersResult)
      ? subscribersResult
      : [subscribersResult].filter(Boolean)) as unknown as Array<{ email: string }>;

    if (!subscribers.length) {
      console.log('[Newsletter] No active subscribers found.');
      return 0;
    }

    const label =
      contentType === 'blog'
        ? { noun: 'article', headline: 'New article published' }
        : contentType === 'skill'
          ? { noun: 'skill update', headline: 'New skill update' }
          : { noun: 'project update', headline: 'New project update' };

    const websiteUrl = process.env.FRONTEND_URL || process.env.PUBLIC_URL || 'http://localhost:3000';
    const destinationUrl = url || (contentType === 'blog' ? `${websiteUrl}/blog` : websiteUrl);

    for (const subscriber of subscribers) {
      try {
        await strapi.plugin('email').service('email').send({
          to: subscriber.email,
          subject: `${label.headline}: ${title}`,
          text: `Hi there!\n\nA new ${label.noun} is now live: ${title}.\n\n${summary || 'Check it out on our portfolio website.'}\n\nSee it here: ${destinationUrl}`,
          html: `
            <p>Hi there!</p>
            <p>A new <strong>${label.noun}</strong> is now live: <strong>${title}</strong>.</p>
            ${summary ? `<p>${summary}</p>` : ''}
            <p><a href="${destinationUrl}" target="_blank" rel="noreferrer">View it on the website</a></p>
          `,
        });
        console.log(`[Newsletter] Email sent to ${subscriber.email}`);
      } catch (error) {
        console.error(`[Newsletter] Failed to send email to ${subscriber.email}:`, error);
      }
    }

    return subscribers.length;
  } catch (error) {
    console.error('[Newsletter] Error notifying subscribers:', error);
    return 0;
  }
}
