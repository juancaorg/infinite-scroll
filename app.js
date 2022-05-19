// Get elements from index.html
const IMAGE_CONTAINER = document.getElementById("image-container");
const LOADER = document.getElementById("loader");

// The photos array that will contain the fetched photos
// from the Unsplash API.
let photosArray = [];

// Variables to check if images loaded and stuff.
let ready = false;
let imagesLoaded = 0;
let totalImages = 0;

// Unsplash API set constants. If you do more than 50 requests in one hour, the app won't be able to fetch more photos. For that, apply in Unsplash.com for a production app.
const COUNT = 30;
const API_KEY = "2dN-4rLBw8tKW6XyaTHKPiGF9Oaw7G3nRVkbtEjtMD8";
const API_URL = `https://api.unsplash.com/photos/random/?client_id=${API_KEY}&count=${COUNT}`;

// Check if all images were loaded.
function imageLoaded() {
	imagesLoaded++;
	if (imagesLoaded === totalImages) {
		ready = true;
		// Hide loader when images finish loading.
		LOADER.hidden = true;
	}
}

// Display photos in the DOM fetched from the Unsplash API.
function displayPhotos() {
	// Reset imagesLoaded everytime we display photos.
	imagesLoaded = 0;
	// Set totalImages to the number of photos in the photosArray.
	totalImages = photosArray.length;

	// Run function for each object in photosArray.
	photosArray.forEach((photo) => {
		// Create an <a> element to link to Unsplash.
		const ITEM = document.createElement("a");
		ITEM.setAttribute("href", photo.links.html);
		ITEM.setAttribute("target", "_blank");

		// Create an <img> element to set the photo in the page.
		const IMAGE = document.createElement("img");
		IMAGE.setAttribute("src", photo.urls.regular);
		// Most photos have an 'alt_description=null', so we are going to use 'description' to set the alt description for our feed.
		IMAGE.setAttribute("alt", photo.description);
		IMAGE.setAttribute("title", photo.description);

		// Event listener: check when each image is finished loading.
		IMAGE.addEventListener("load", imageLoaded);

		// Put <img> inside the <a> element, then put both inside the IMAGE_CONTAINER.
		ITEM.appendChild(IMAGE);
		IMAGE_CONTAINER.appendChild(ITEM);
	});
}

// Fetch photos from Unsplash API.
async function getPhotos() {
	const RESPONSE = await fetch(API_URL);
	photosArray = await RESPONSE.json();
	displayPhotos();
}

// Check to see if scrolling near bottom of the page, then load more photos.
window.addEventListener("scroll", () => {
	if (
		window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 &&
		ready
	) {
		ready = false;
		getPhotos();
	}
});

// On load.
getPhotos();
