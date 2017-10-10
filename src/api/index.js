import { API_KEY } from './config';

export function getAlbums(key) {
  const ALBUMS_URL = `https://itunes.apple.com/search?term==${key}&entity=album`;
  return fetch(ALBUMS_URL).then(res => res.json()).then(data => data.results.map(item => ({
    image: item.artworkUrl100,
    title: item.collectionName,
    description: item.artistName,
  })));
}
export function getImage(key) {
  const IMAGE_URL = `https://ws.audioscrobbler.com/2.0/?artist=${key}&api_key=${API_KEY}&format=json&method=artist.getinfo`;
  return fetch(IMAGE_URL).then(res => res.json()).then(data => data.artist.image[3]['#text']);
}
