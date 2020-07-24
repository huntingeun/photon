const API_KEY = "563492ad6f917000010000012b166407036b44e3aff7374294caf446";
const imgs = document.querySelector(".imgs");
const searchInput = document.querySelector(".search-input");
const searchForm = document.querySelector(".search-form");
const moreBtn = document.querySelector(".more");
let searchValue;
let fetchLink;
let page = 1;
let currentSearch;

searchInput.addEventListener("input", updateInput);
searchForm.addEventListener("submit", () => {
  event.preventDefault();
  clear();
  showSearch(searchValue);
});
moreBtn.addEventListener("click", loadMore);

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
    const img = document.createElement("div");
    img.classList.add("img");
    img.innerHTML = `<img src=${photo.src.medium}></img><a href=${photo.src.original}>Download</a>`;
    imgs.appendChild(img);
  });
}

async function showCurated() {
  fetchLink = "https://api.pexels.com/v1/curated?per_page=6&page=1";
  const data = await fetchApi(fetchLink);
  showPhotos(data);
}

async function showSearch(query) {
  if (query) {
    currentSearch = searchValue;

    fetchLink = `https://api.pexels.com/v1/search?query=${query}&per_page=6&page=1`;
    const data = await fetchApi(fetchLink);
    showPhotos(data);
  } else {
    fetchLink = "https://api.pexels.com/v1/curated?per_page=6&page=1";
    const data = await fetchApi(fetchLink);
    showPhotos(data);
  }
}

async function loadMore() {
  page++;

  if (currentSearch) {
    fetchLink = `https://api.pexels.com/v1/search?query=${currentSearch}&per_page=6&page=${page}`;
    const data = await fetchApi(fetchLink);
    showPhotos(data);
  } else {
    fetchLink = `https://api.pexels.com/v1/curated?per_page=6&page=${page}`;
    const data = await fetchApi(fetchLink);
    showPhotos(data);
  }
}

function updateInput() {
  searchValue = event.target.value;
}

function clear() {
  imgs.innerHTML = "";
  searchInput.value = "";
}

function init() {
  showCurated();
}

init();
