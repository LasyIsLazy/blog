import 'gitalk/dist/gitalk.css'
import Gitalk from 'gitalk'
function initGitTalk(path) {
  const splitPath = path.split('.')
  if (splitPath[splitPath.length - 1] !== 'html') {
    return
  }
  let gitalkContainer = document.getElementById('gitalk-container')
  if (!gitalkContainer) {
    gitalkContainer = document.createElement('div')
    gitalkContainer.id = 'gitalk-container'
    gitalkContainer.classList.add('content')
  }
  const page = document.querySelector('.page')
  if (page) {
    page.appendChild(gitalkContainer)
    const matched = decodeURI(path).match(/(?<=\/(?!.+\/)).+(?=\.html)/g)
    let article = decodeURI(path)
    matched && (article = matched[0])
    // TODO: 安全性测试
    new Gitalk({
      clientID: '6f10271d17c81d0e70b5',
      clientSecret: 'd7944dba77131b7eed5a5e5c58bd81bfeffacefc',
      repo: 'blog-comments',
      owner: 'LasyIsLazy',
      admin: ['LasyIsLazy'],
      id: article,
      distractionFreeMode: false,
      language: 'zh-CN'
    }).render('gitalk-container')
  }
}
export default ({
  Vue, // VuePress 正在使用的 Vue 构造函数
  options, // 附加到根实例的一些选项
  router, // 当前应用的路由实例
  siteData // 站点元数据
}) => {
  router.afterEach(to => {
    Vue.nextTick(() => {
      initGitTalk(to.path)
    })
  })
}
