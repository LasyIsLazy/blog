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
        text: 'Home',
        link: '/',
        icon: 'reco-home'
      },
      {
        text: 'TimeLine',
        link: '/timeline/',
        icon: 'reco-date'
      },
      {
        text: 'Contact',
        icon: 'reco-message',
        items: [
          {
            text: 'GitHub',
            link: 'https://github.com/LasyIsLazy',
            icon: 'reco-github'
          }
        ]
      }
    ],
    type: 'blog',
    blogConfig: {
      category: {
        location: 2,
        text: 'Category'
      },
      tag: {
        location: 3,
        text: 'Tag'
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
      placeholder: '填写昵称和网址可以让昵称链接到自己的博客哦~',
      recordIP: true,
      avator: 'mp',
    }
  }
};
