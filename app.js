// Unsplash API
const COUNT = 5;
const API_KEY = 'demo';
const API_URL = `https://api.unsplash.com/photos/random/?client_id=${API_KEY}&count=${COUNT}`;

// Fetch photos from Unsplash API
async function getPhotos() {
	const RESPONSE = await fetch(API_URL);
	const DATA = await RESPONSE.json();
	console.log(DATA);
}

getPhotos();