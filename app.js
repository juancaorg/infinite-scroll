// Get elements from index.html
const IMAGE_CONTAINER = document.getElementById('image-container');
const LOADER = document.getElementById('loader');

// The photos array that will contain the fetched photos
// from the Unsplash API.
let photosArray = [];

// Unsplash API
const COUNT = 10;
const API_KEY = 'demo';
const API_URL = `https://api.unsplash.com/photos/random/?client_id=${API_KEY}&count=${COUNT}`;

// Display photos in the DOM fetched from the Unsplash API.
function displayPhotos() {
	// Run function for each object in photosArray.
	photosArray.forEach((photo) => {
		// Create an <a> element to link to Unsplash.
		const ITEM = document.createElement('a');
		ITEM.setAttribute('href', photo.links.html);
		ITEM.setAttribute('target', '_blank');

		// Create an <img> element to set the photo in the page.
		const IMAGE = document.createElement('img');
		IMAGE.setAttribute('src', photo.urls.regular);
		// Most photos have an 'alt_description=null', so we are going to use 'description' to set the alt description for our feed.
		IMAGE.setAttribute('alt', photo.description);
		IMAGE.setAttribute('title', photo.description);

		// Put <img> inside the <a> element, then put both inside the IMAGE_CONTAINER.
		ITEM.appendChild(IMAGE);
		IMAGE_CONTAINER.appendChild(ITEM);
	});
}

// Fetch photos from Unsplash API.
async function getPhotos() {
	const RESPONSE = await fetch(API_URL);
	photosArray = await RESPONSE.json();
	console.log(photosArray);
	displayPhotos();
}

getPhotos();