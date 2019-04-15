<template>
  <div style="display: flex; flex-direction: column">
    <doc-item
      v-for="page of pages"
      :key="page.key"
      :date="page.date"
      :path="page.path"
      :title="page.title"
      :tags="getTags(page)"
    ></doc-item>
  </div>
</template>
<script>
export default {
  name: 'doc-list',
  data() {
    return {}
  },
  computed: {
    category() {
      const path = this.$page.path
      const splitPath = typeof path !== undefined ? path.split('/') : ''
      return splitPath ? splitPath[splitPath.length - 2] : 'posts' // 默认 posts
    },
    pages() {
      return this.$site.pages
        .filter(item => item.title && item.path.split('/')[1] === this.category)
        .sort((a, b) => new Date(b.frontmatter.date) - new Date(a.frontmatter.date))
        .map(item => {
          const date = this.formateDate(item.frontmatter.date)
          return {
            ...item,
            date
          }
        })
    }
  },
  methods: {
    getTags(page) {
      return page.frontmatter.tags
    },
    formateDate(dateStr) {
      return dateStr && dateStr.replace(/T.+$/g, ' ')
    }
  }
}
</script>
<style scoped>
.date {
  color: #ccc;
}
.title {
  font-size: 20px;
}
.tags {
  color: #aaa;
  font-size: 12px;
}
</style>
