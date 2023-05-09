import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import './custom.scss';
import Layout from './layout.vue'
import NotFound from './not-found.vue'
import DefaultTheme from 'vitepress/theme'
import RemoteSingle from '@components/remote-single.vue'
import RemoteMultiple from '@components/remote-multiple.vue'

export default {
  ...DefaultTheme,
  // Layout,
  NotFound,
  enhanceApp({ app, router, siteData }) {
    app.use(ElementPlus);
    app.component('RemoteSingle', RemoteSingle)
    app.component('RemoteMultiple', RemoteMultiple)
  }
};