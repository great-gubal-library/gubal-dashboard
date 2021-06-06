import MockAdapter from 'axios-mock-adapter';

// import { API_PATHS } from './api';

export const initMockApi = (instance: any) => {
  const mock = new MockAdapter(instance, { delayResponse: 500 });
  // mock.onPost(API_PATHS.login).reply(() => [200, {
  //   accessToken: 'my-bearer-token',
  // }]);
  mock.onAny().passThrough();
};
