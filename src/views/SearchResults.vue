<template lang="pug">
  div.SearchResults
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
</template>

<script>
import { getAlbums, getImage } from '../api/requests';
import Spinner from '../components/Spinner';
import ImageTable from '../components/ImageTable';

export default {
  name: 'SearchResults',
  components: {
    Spinner,
    ImageTable,
  },
  data() {
    return {
      albums: [],
      image: '',
      loading: false,
    };
  },
  mounted() {
    const value = this.$route.params.id;
    this.$store.dispatch('setValue', value);
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
};
</script>

<style lang="stylus">
</style>
