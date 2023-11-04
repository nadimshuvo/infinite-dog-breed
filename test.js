let timer;
let deletFirstPhotoDelay;

async function start() {
  try {
    const response = await fetch("");
    const data = response.json();
    createBreedList(data.message);
  } catch (e) {
    console.log("There was a problem fetching the breed list");
  }
}

start();

function createBreedList(breedList) {
  document.getElementById("breed").innerHTML = `
    <select onchange="loadByBreed(this.value)">
    <option>Select a dog breed</option>
    ${Object.keys(breedList).map(function (breed) {
      return `<option>${breed}</option>`;
    })}
    </select>
    `;
}

async function loadByBreed(breed) {
  if (breed != "Choose a dog breed") {
    const response = await fetch("...${breed}/...");
    const data = response.json();
    createSlideshow(data.message);
  }
}

function createSlideshow(images) {
  let currentPossition = 0;

  if (images.length > 1) {
    document.getElementById("slideshow").innerHTML = `
        <div class="slide" style="background-image: url('${images[0]}')"></div>
        <div class="slide" style="background-image: url('${images[1]}')"></div>
        `;
  } else {
    document.getElementById("slideshow").innerHTML = `
        <div class="slide" style="background-image: url('${images[0]}')"></div>
        <div class="slide"></div>
        `;
  }

  currentPossition += 2;
  if (images.length === 2) currentPossition = 0;
  timer = setInterval(nextSlide, 3000);

  function nextSlide() {
    document
      .getElementById("slideshow")
      .insertAdjacentHTML(
        "beforeend",
        `<div class="slide" style="background-image: url(${images[currentPosition]})"></div>`
      );
  }

  deletFirstPhotoDelay = setTimeout(function () {
    document.querySelector(".slide").remove();
  }, 1000);

  if (currentPossition + 1 >= images.length) {
    currentPossition = 0;
  }
}
