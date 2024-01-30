"use strict";

// const examplePlant = {
//   name: "Orchid",
//   species: "Flower",
//   schedule: 2,
// };

const plants = [];

// plants.push(examplePlant);
// console.log(plants);

function displayPlants() {
  const plantList = document.getElementById("plantList");
  plantList.innerHTML = "";

  plants.forEach((plant) => {
    const li = document.createElement("li");

    li.innerHTML = `<p>Name: ${plant.name}</p>
    <p>Species: ${plant.species}</p>
    <p>Schedule: ${plant.schedule}</p>`;
    plantList.appendChild(li);
  });
}

function addPlant(name, species, schedule) {
  const newPlant = { name, species, schedule };
  plants.push(newPlant);
  displayPlants();
}

const form = document.getElementById("plant-form");

form.addEventListener("submit", addPlantFromForm);

function addPlantFromForm(event) {
  event.preventDefault();

  const name = form.name.value;
  const species = form.species.value;
  const schedule = form.schedule.value;

  addPlant(name, species, schedule);
  form.reset();
}

displayPlants();
