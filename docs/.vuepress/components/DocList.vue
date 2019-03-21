<template>
  <div style="display: flex; flex-direction: column">
    <div v-for="page of pages" :key="page.key" class="item">
      <div class="date">{{ formateDate(page.frontmatter.date) }}</div>
      <router-link :to="page.path" class="title">{{ page.title }}</router-link>
      <div class="tags" style>{{ getTags(page) }}</div>
    </div>
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
      return this.$site.pages.filter(item => item.title && item.path.split('/')[1] === this.category)
    }
  },
  methods: {
    getTags(page) {
      return page.frontmatter.tags && page.frontmatter.tags.join('，')
    },
    formateDate(dateStr) {
      return dateStr && dateStr.replace(/\..+$/g, '').replace('T', ' ')
    }
  }
}
</script>
<style scoped>
.item {
  padding: 20px 0;
  margin-left: 20%;
}
.date {
  color: #999;
}
.title {
  font-size: 20px;
}
.tags {
  color: #c2c5cd;
  font-size: 12px;
}
</style>
