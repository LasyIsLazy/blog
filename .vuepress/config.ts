import { defineUserConfig } from 'vuepress';
import recoTheme from 'vuepress-theme-reco';

export default defineUserConfig({
  title: 'Lasy',
  description: "Lasy's blog",
  lang: 'zh-CN',
  head: [
    [
      'link',
      {
        rel: 'icon',
        href: '/favicon.ico',
      },
    ],
    [
      'meta',
      {
        name: 'viewport',
        content: 'width=device-width,initial-scale=1,user-scalable=no',
      },
    ],
  ],
  theme: recoTheme({
    style: '@vuepress-reco/style-default',
    logo: '/logo.jpeg',
    author: 'Lasy',
    lastUpdatedText: '',
    navbar: [
      { text: '主页', link: '/' },
      { text: '分类', link: 'categories/qianduan/1/' },
    ],
  }),
});
