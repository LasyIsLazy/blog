<div style="display: flex; flex-direction: column">
    <div v-for="page of $site.pages.filter(item => item.path !== '/' && item.title && item.path.split('/')[1] === 'notes')" :key="page.key" style="padding: 20px 0; margin-left: 25%; text-align: left;">
        <router-link :to="page.path">
            {{page.title}}
            <div style="color: #c2c5cd; font-size: .5rem;">{{page.frontmatter.tags&&page.frontmatter.tags.join(',  ')}}</div>
        </router-link>
    </div>
</div>
