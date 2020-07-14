const API_KEY = "563492ad6f917000010000012b166407036b44e3aff7374294caf446";
const gallery = document.querySelector(".gallery");
const searchInput = document.querySelector(".search-input");
const form = document.querySelector(".search-form");
const more = document.querySelector(".more");
let searchValue;
let page = 1;
let fetchLink;
let currentSearch; //varible to differenciate searched value from current input value

//Event Listeners
searchInput.addEventListener("input", updateInput);
form.addEventListener("submit", (e) => {
  e.preventDefault();
  searchPhotos(searchValue);
  currentSearch = searchValue;
});
more.addEventListener("click", loadMore);

//Functions
async function fetchApi(url) {
  const fetchData = await fetch(url, {
    method: "GET",
    headers: { Accept: "application/json", Authorization: API_KEY },
  });
  const data = await fetchData.json();
  return data;
}

function showPhotos(data) {
  data.photos.forEach((photo) => {
    const galleryImg = document.createElement("div");
    galleryImg.classList.add("gallery-img");
    galleryImg.innerHTML = `<img src=${photo.src.medium}></img>
            <div class="gallery-text">
            <a href=${photo.photographer_url}>${photo.photographer}<a>
            <a href=${photo.src.original}>Download Original<a>
            </div>
            `;
    gallery.appendChild(galleryImg);

    const galleryTxts = gallery.querySelectorAll(".gallery-text");
    galleryTxts.forEach((text) => {
      text.lastChild.classList.add("hide");
    });
  });
}

async function curatePhotos() {
  const fetchLink = "https://api.pexels.com/v1/curated?per_page=6&page=1";
  const data = await fetchApi(fetchLink); //wait for this and then go to next line, usually if its time-consuming, js jumps the line and executes it later.
  showPhotos(data);
}

function updateInput(e) {
  searchValue = e.target.value;
}

async function searchPhotos(query) {
  clear();

  fetchLink = `https://api.pexels.com/v1/search?query=${query}&per_page=6&page=1`;
  const data = await fetchApi(fetchLink);
  showPhotos(data);
}

function clear() {
  gallery.innerHTML = "";
  searchInput.value = "";
}

async function loadMore() {
  page++;
  if (currentSearch) {
    fetchLink = `https://api.pexels.com/v1/search?query=${currentSearch}&per_page=6&page=${page}`;
  } else {
    fetchLink = `https://api.pexels.com/v1/curated?per_page=6&page=${page}`;
  }
  const data = await fetchApi(fetchLink);
  showPhotos(data);
}

function init() {
  curatePhotos();
}

init();
