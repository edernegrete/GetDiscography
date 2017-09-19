<template lang="pug">
  div.main
    figure.image-container
      img(:src="album.image")
    figcaption {{album.title}}
    span.main-desc {{album.description}}
</template>

<script>
export default {
  name: 'Search',
  props: ['album'],
};
</script>

<style lang="stylus" scoped>
  figcaption
    color white
  .main-desc
    color #727272
  .main
    margin-top 1rem
    width 160px
    text-align center
    overflow hidden
    text-overflow ellipsis
</style>
