export default function request(baseUrl) {
  const url = baseUrl;
  return fetch(url).then(res => res.json()).then(data => data);
}
