<template>
  <div class="doc-item">
    <router-link :to="path">
      <div class="date">{{ date }}</div>
      <router-link :to="path" class="title">{{ title }}</router-link>
      <div class="tags" style>Tags：{{ tags.join('，') }}</div>
    </router-link>
  </div>
</template>
<script>
export default {
  name: 'doc-item',
  props: {
    date: {
      type: [String]
    },
    path: {
      type: [String]
    },
    title: {
      type: [String],
      required: true
    },
    tags: {
      type: [Array]
    },
  },
  methods: {
    handleItemClicked() {
      window.location.href = this.path
    }
  }
}
</script>
<style lang="stylus" scoped>
.doc-item
  box-shadow 0px 0px 7px 2px #eaecef
  padding 10px 15px
  margin 10px
  transition box-shadow .4s ease
  cursor pointer
  &:hover
    box-shadow 0px 0px 11px 4px #bdbdbd
  > *
    margin 10px 0
  .date 
    color #ccc
  .title 
    font-size 20px
  .tags
    color #aaa
    font-size 12px
</style>
<style lang="stylus">
.content:not(.custom)
  .doc-item
    a
      display block
    a:hover
      text-decoration none
</style>
