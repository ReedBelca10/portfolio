import { notifySubscribers } from '../../../../utils/notifySubscribers';

export default {
  async afterCreate(event) {
    const { result } = event;

    if (result.publishedAt) {
      await notifySubscribers({
        contentType: 'skill',
        title: result.name,
        summary: result.subcategory || undefined,
      });
    }
  },

  async afterUpdate(event) {
    const { result } = event;

    if (result.publishedAt) {
      console.log(`Skill "${result.name}" updated and is published.`);
      await notifySubscribers({
        contentType: 'skill',
        title: result.name,
        summary: result.subcategory || undefined,
      });
    }
  },
};
