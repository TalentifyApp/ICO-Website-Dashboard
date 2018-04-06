import {InjectionToken} from '@angular/core';

export let APP_CONFIG = new InjectionToken('app.config');

export const AppConfig = {
  routes: {
    root: '/',
    error404: '404'
  },
  api: {
    main: '', // main api path
    local: '' // local api path
  },
  repositoryURL: 'https://github.com/DiscoverBlockchain/ICO-Website-Dashboard'
};
