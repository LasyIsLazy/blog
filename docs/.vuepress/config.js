let secrets = process.env
if (process.env.NODE_ENV === 'development') {
  try {
    secrets = require('./../../.secrets.json')
  } catch (error) {
    console.warn('开发环境没有配置 secrets')
  }
}
module.exports = {
  title: 'Lasy',
  description: "Lasy's blog",
  head: [
    [
      'link',
      {
        rel: 'icon',
        href: '/favicon.ico'
      }
    ],
    [
      'meta',
      {
        name: 'viewport',
        content: 'width=device-width,initial-scale=1,user-scalable=no'
      }
    ]
  ],
  theme: 'reco',
  themeConfig: {
    nav: [
      {
        text: '主页',
        link: '/',
        icon: 'reco-home'
      },
      {
        text: '时间线',
        link: '/timeline/',
        icon: 'reco-date'
      },
      {
        text: '留言板',
        link: 'views/other/留言板.html/',
        icon: 'reco-suggestion'
      },
      {
        text: '与我相关',
        icon: 'reco-message',
        items: [
          {
            text: 'GitHub',
            link: 'https://github.com/LasyIsLazy',
            icon: 'reco-github'
          },
          {
            text: 'segmentfault',
            link: 'https://segmentfault.com/u/syliu',
            icon: 'reco-sf'
          }
        ]
      }
    ],
    type: 'blog',
    blogConfig: {
      category: {
        location: 2,
        text: '分类'
      },
      tag: {
        location: 3,
        text: '标签'
      }
    },
    // friendLink: [
    //   {
    //     title: '友情链接',
    //     desc: '...',
    //     email: '...@...com',
    //     link: 'https://www.....com'
    //   }
    // ],
    logo: '/logo.jpeg',
    search: true,
    searchMaxSuggestions: 10,
    sidebar: 'auto',
    lastUpdated: '更新时间',
    author: 'Lasy',
    authorAvatar: '/logo.jpeg',
    record: '冀ICP备17005103号',
    recordLink: 'http://www.beian.miit.gov.cn',
    startYear: '2016',
    valineConfig: {
      appId: secrets.LEANCLOUD_APP_ID,
      appKey: secrets.LEANCLOUD_APP_KEY,
      placeholder: '填写昵称和网址，你的昵称会链接到你的博客哦~',
      recordIP: true,
      avator: 'mp'
    }
  }
};
