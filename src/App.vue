<template lang="pug">
  div(id="app")
    search-component
    div.loading(v-if="loading")
      spinner
    div.results(v-if="albums.length && !loading")
      div.container
        img(:src="image" class="artist-image")
        div.artist {{searchValue.toUpperCase()}}
      div.table
        image-table(v-for="album in albums" :album="album" :key="album.image")
    div.error(v-else-if="error.hasError")
      error-component(:errorMsg="error.msg")
    footer(class="footer white")
      span Made with ❤️ by &nbsp;
      a(href="https://twitter.com/ederyairr" class="white") @ederyairr
</template>

<script>
import SearchComponent from './components/Search';
import Spinner from './components/Spinner';
import ImageTable from './components/ImageTable';
import ErrorComponent from './components/Error';
import { getAlbums, getImage } from './api/requests';

export default {
  name: 'app',
  data() {
    return {
      albums: [],
      image: '',
      loading: false,
      errorMessages: {
        notFound: 'No se encontraron resultados 🙁',
        offline: '🆘 No tienes conexión a Internet 🆘',
      },
      error: {
        hasError: false,
        msg: '',
      },
    };
  },
  computed: {
    searchValue() {
      return this.$store.state.searchInput;
    },
  },
  watch: {
    searchValue(data) {
      if (!this.checkConection()) {
        return;
      }
      this.loading = true;
      const dataRequests = [Promise.resolve(getAlbums(data)), Promise.resolve(getImage(data))];
      Promise.all(dataRequests).then((res) => {
        const albums = res[0];
        const image = res[1];
        if (this.isEmpty(albums)) {
          this.loading = false;
          return;
        }
        this.albums = albums;
        this.image = image;
        this.loading = false;
      });
    },
  },
  mounted() {
    this.handleConection();
    const params = this.$route.params.id;
    if (params) {
      this.$store.dispatch('setValue', params);
    }
  },
  methods: {
    checkConection() {
      const online = window.navigator.onLine;
      return online;
    },
    handleConection() {
      const isOnline = this.checkConection();
      if (!isOnline) {
        this.error.hasError = true;
        this.error.msg = this.errorMessages.offline;
      }
    },
    isEmpty(albums) {
      if (!albums.length && this.searchValue) {
        this.handleEmpty();
        return true;
      }
      return false;
    },
    handleEmpty() {
      this.error.hasError = true;
      this.error.msg = this.errorMessages.notFound;
    },
  },
  components: {
    SearchComponent,
    Spinner,
    ImageTable,
    ErrorComponent,
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
  #app
    background-color #0D0D0D
    font-family 'Montserrat'
</style>
