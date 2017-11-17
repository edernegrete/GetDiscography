<template lang="pug">
  div(id="app")
    search-component(@search="dispatchSearch")
    footer(class="footer white")
      span Made with ❤️ by &nbsp;
      a(href="https://twitter.com/ederyairr" class="white") @ederyairr
    router-view
</template>

<script>
import SearchComponent from './components/Search';

export default {
  name: 'app',
  methods: {
    dispatchSearch(value) {
      this.$router.push({ name: 'search', params: { id: value } });
    },
  },
  components: {
    SearchComponent,
  },
};
</script>
<style lang="stylus">
  body
    margin 0
    background-color #0E0E0E
  figure
    margin 0
  .container
    margin 2rem auto
    text-align center
  .artist
    color #727272
    text-align center
  .footer
    background #0D0D0D
    position fixed
    bottom 0
  .artist-image
    border-radius 100%
    width 267px
    height 267px
  .table
    display flex
    justify-content space-between
    margin 2rem
    flex-wrap wrap
  .white
    color white
  .error
    color #ab0d0d
    font-size 3rem
  #app
    background-color #0D0D0D
    font-family 'Montserrat'
</style>
