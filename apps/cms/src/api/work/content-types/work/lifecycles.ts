import { notifySubscribers } from '../../../../utils/notifySubscribers';

export default {
  async afterCreate(event) {
    const { result } = event;

    if (result.publishedAt) {
      await notifySubscribers({
        contentType: 'project',
        title: result.title,
        summary: result.description || undefined,
      });
    }
  },

  async afterUpdate(event) {
    const { result } = event;

    if (result.publishedAt) {
      console.log(`Project "${result.title}" updated and is published.`);
      await notifySubscribers({
        contentType: 'project',
        title: result.title,
        summary: result.description || undefined,
      });
    }
  },
};
