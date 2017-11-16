import request from './index';
import { API_KEY } from './config';


export function getAlbums(key) {
  return request(`https://itunes.apple.com/search?term==${key}&entity=album`).then(res =>
    res.results.map(item => ({
      image: item.artworkUrl100,
      title: item.collectionName,
      description: item.artistName,
    })),
  );
}

export function getImage(key) {
  const IMAGE_URL = `https://ws.audioscrobbler.com/2.0/?artist=${key}&api_key=${API_KEY}&format=json&method=artist.getinfo`;
  return request(IMAGE_URL)
    .then((data) => {
      if (data.error) { return false; }
      return data.artist.image[3]['#text'];
    });
}
