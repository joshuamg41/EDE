import { WordPressApi } from '../BaseApi';

const contentWalkthroughUrl = '/wp-json/movil/v1/welcome';

const getWalkthroughContent = request => {
  return WordPressApi.get(contentWalkthroughUrl, {});
};

export default {
  getWalkthroughContent,
};
