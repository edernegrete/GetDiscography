<template lang="pug">
  div(id="app")
    search-component
    div.loading(v-if="loading")
      spinner
    div.results(v-else-if="albums.length && !loading")
      div.container
        img(:src="image" class="artist-image")
        div.artist {{searchValue.toUpperCase()}}
      div.table
        image-table(v-for="album in albums" :album="album" :key="album.image")
    div.error(v-else-if="!albums.length && !loading && searchValue")
        span(style="error") No Results Found 🙁
    footer(class="footer white")
      span Made with ❤️ by &nbsp;
      a(href="https://twitter.com/ederyairr" class="white") @ederyairr
</template>

<script>
import SearchComponent from './components/Search';
import Spinner from './components/Spinner';
import ImageTable from './components/ImageTable';
import { getAlbums, getImage } from './api/requests';

export default {
  name: 'app',
  data() {
    return {
      albums: [],
      image: '',
      loading: false,
    };
  },
  computed: {
    searchValue() {
      return this.$store.state.searchInput;
    },
  },
  watch: {
    searchValue(data) {
      this.loading = true;
      const dataRequests = [Promise.resolve(getAlbums(data)), Promise.resolve(getImage(data))];
      Promise.all(dataRequests).then((res) => {
        this.loading = false;
        this.albums = res[0];
        this.image = res[1];
      });
    },
  },
  mounted() {
    const params = this.$route.params.id;
    if (params) {
      this.$store.dispatch('setValue', params);
    }
  },
  components: {
    SearchComponent,
    Spinner,
    ImageTable,
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
