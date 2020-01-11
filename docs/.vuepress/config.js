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
          },
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
    friendLink: [
      {
        title: '友情链接',
        desc: '...',
        email: '...@...com',
        link: 'https://www.....com'
      }
    ],
    logo: '/logo.jpeg',
    search: true,
    searchMaxSuggestions: 10,
    sidebar: 'auto',
    lastUpdated: 'Last Updated',
    author: 'Lasy',
    authorAvatar: '/logo.jpeg',
    record: '冀ICP备17005103号',
    recordLink: 'http://www.beian.miit.gov.cn',
    startYear: '2016',
    valineConfig: {
      appId: process.env.LEANCLUOD_APP_ID,
      appKey: process.env.LEANCLUOD_APP_KEY,
      placeholder: '',
      recordIP: true,
      avator: 'mp',
    }
  }
};
