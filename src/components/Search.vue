<template lang="pug">
  div.search
    span.search-title Type your favorite artist name
    input.b-input(placeholder="Start typing...", v-model="search" @keyup.enter="submit")
    span(class="icon-search icon" @click="submit") 🔎
</template>

<script>
export default {
  name: 'Search',
  data() {
    return {
      search: '',
    };
  },
  methods: {
    submit() {
      if (this.search) { this.$emit('search', this.search); }
    },
  },
};
</script>

<style lang="stylus" scoped>
  .search
    background-color #242424
    padding 2rem
    &-title
      color #fff
  .icon
    position absolute
    top 80px
    font-size 3rem
    right 1rem
    color white
    cursor pointer
  .b-input
    position relative
    caret-color #1db954
    box-sizing border-box
    width 100%
    background-color transparent
    border none
    color #fff
    font-weight 700
    font-size 62px
    line-height 1.6
    &:focus
      outline none
    &::placeholder
      color #666666
</style>
