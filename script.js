const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];

// Unsplash API

let count = 5;
const apiKey = '9mIzoNFfxBOJNDGyY9bpQeFbD4Ga8uaTesnXbarx7CU';
const apiUrl = `https://api.unsplash.com/photos/random?client_id=${apiKey}&count=${count}`;

//Chceck if all images were loaded
function imageLoaded() {
    imagesLoaded++;
    if (imagesLoaded === totalImages) {
        ready = true;
        loader.hidden = true;
        count = 30;
    }
}

//Helper function to set atributes on DOM Elements
function setAttributes(element, attributes) {
    for (const key in attributes) {
        element.setAttribute(key, attributes[key]);
    }
}

//Create Elements for links & photos, Add to ODM
function displayPhotos() {
    imagesLoaded = 0;
    totalImages = photosArray.length;
    console.log('total images', totalImages);
    //Run fucntion for each object in photosArray
    photosArray.forEach((photo) => {
        //Create <a> to link to unsplash
        const item = document.createElement('a');
        setAttributes(item, {
            href: photo.links.html,
            target: '_blank',
        });
        // Create <img> for photo
        const img = document.createElement('img');
        setAttributes(img, {
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description,
        });

        //Event listener, check when each is finished loading
        img.addEventListener('load', imageLoaded)
        // Put img inside a element, then put both inside imageContainer Element
        item.appendChild(img);
        imageContainer.appendChild(item);
    });
};



// Get photos from unsplash API
async function getPhotos() {
    try {
        const response = await fetch(apiUrl);
        photosArray = await response.json();
        displayPhotos();
    } catch(error) {

    }
}

//Load more photos - check to see if scrolling is near rhe bottom of the page
window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
        ready = false;
        getPhotos();
    }
});


//On load
getPhotos();
