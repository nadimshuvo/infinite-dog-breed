// fetch("https://dog.ceo/api/breeds/list/all")
//   .then(function (response) {
//     return response.json();
//   })
//   .then(function (data) {
//     console.log(data.message);
//   })
//   .catch("Error");

let timer;
let deletFirstPhotoDelay;

async function start() {
  try {
    const response = await fetch("https://dog.ceo/api/breeds/list/all");
    const data = await response.json();
    createBreedList(data.message);
  } catch (e) {
    console.log("There was a problem fetching the bred list.");
  }
}

start();

function createBreedList(breedList) {
  document.getElementById("breed").innerHTML = `
     <select onfocus='this.size=10;' onblur='this.size=0;' onchange='this.size=1; this.blur();loadByBreed(this.value);'>
        <option style="background-color: #DBC0B0"> Choose a dog breed </option>
        ${Object.keys(breedList).map(function (breed) {
          return `<option class="option"> ${breed} </option>`;
        })}
      </select>
    `;
}

async function loadByBreed(breed) {
  if (breed != "Choose a dog breed") {
    const response = await fetch(`https://dog.ceo/api/breed/${breed}/images`);
    const data = await response.json();
    createSlideshow(data.message);
  }
}

function createSlideshow(images) {
  let currentPossition = 0;
  clearInterval(timer);
  clearTimeout(deletFirstPhotoDelay);

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
    document.getElementById("slideshow").insertAdjacentHTML(
      "beforeend",
      `
    <div class="slide" style="background-image: url('${images[currentPossition]}')"></div>

        `
    );
    deletFirstPhotoDelay = setTimeout(function () {
      document.querySelector(".slide").remove();
    }, 1000);

    if (currentPossition + 1 >= images.length) {
      currentPossition = 0;
    } else {
      currentPossition++;
    }
  }
}
