import { notifySubscribers } from '../../../../utils/notifySubscribers';

export default {
  async afterCreate(event) {
    const { result } = event;

    if (result.publishedAt) {
      await notifySubscribers({
        contentType: 'blog',
        title: result.title,
        summary: result.description || result.content || undefined,
      });
    }
  },

  async afterUpdate(event) {
    const { result } = event;

    if (result.publishedAt) {
      console.log(`Blog "${result.title}" updated and is published.`);
      await notifySubscribers({
        contentType: 'blog',
        title: result.title,
        summary: result.description || result.content || undefined,
      });
    }
  },
};
