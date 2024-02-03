"use strict";

document.addEventListener("DOMContentLoaded", () => {
  const plantForm = document.getElementById("plantForm");
  const plantsList = document.getElementById("plantsList");
  const sortButton = document.getElementById("sortButton");
  const filterInput = document.getElementById("filterInput");

  // Load plants data and user preferences from localStorage on page load
  let plants = JSON.parse(localStorage.getItem("plants")) || [];
  let sortPreference = localStorage.getItem("sortPreference") || "default";
  let filterText = localStorage.getItem("filterText") || "";

  // // Display existing plants and apply user preferences on page load
  // applyUserPreferences();

  const addPlant = (event) => {
    event.preventDefault();

    // Get form values
    const plantName = document.getElementById("plantName").value;
    const plantSpecies = document.getElementById("plantSpecies").value;
    const waterSchedule = document.getElementById("waterSchedule").value;

    // Create a new plant object
    const newPlant = {
      name: plantName,
      species: plantSpecies,
      waterSchedule: waterSchedule,
    };

    // Add the new plant to the array
    plants.push(newPlant);

    // Save the updated plants array to localStorage
    localStorage.setItem("plants", JSON.stringify(plants));

    // Display the updated list of plants
    applyUserPreferences();

    // Clear the form fields
    plantForm.reset();
  };

  const updatePlant = (listItem) => {
    const newWaterSchedule = prompt("Enter the new water schedule:");
    if (newWaterSchedule !== null) {
      const plantIndex = Array.from(plantsList.children).indexOf(listItem);
      plants[plantIndex].waterSchedule = newWaterSchedule;

      // Save the updated plants array to localStorage
      localStorage.setItem("plants", JSON.stringify(plants));

      // Display the updated list of plants
      applyUserPreferences();
    }
  };

  const removePlant = (listItem) => {
    if (confirm("Are you sure you want to remove this plant?")) {
      const plantIndex = Array.from(plantsList.children).indexOf(listItem);
      plants.splice(plantIndex, 1);

      // Save the updated plants array to localStorage
      localStorage.setItem("plants", JSON.stringify(plants));

      // Display the updated list of plants
      applyUserPreferences();
    }
  };

  const sortPlants = () => {
    // Toggle between default and alphabetical sorting
    sortPreference = sortPreference === "default" ? "alphabetical" : "default";

    // Save the updated sort preference to localStorage
    localStorage.setItem("sortPreference", sortPreference);

    // Display the sorted list of plants
    applyUserPreferences();
  };

  const filterPlants = () => {
    // Update filter text from input field
    filterText = filterInput.value.toLowerCase();

    // Save the updated filter text to localStorage
    localStorage.setItem("filterText", filterText);

    // Display the filtered list of plants
    applyUserPreferences();
  };

  const applyUserPreferences = () => {
    // Apply sorting and filtering based on user preferences
    let filteredPlants = plants.slice(); // Copy the array to avoid modifying the original

    // Filter plants based on user input
    if (filterText.trim() !== "") {
      filteredPlants = filteredPlants.filter((plant) =>
        plant.name.toLowerCase().includes(filterText)
      );
    }

    // Sort plants based on user preference
    if (sortPreference === "alphabetical") {
      filteredPlants.sort((a, b) =>
        a.name.toLowerCase().localeCompare(b.name.toLowerCase())
      );
    }

    // Clear the existing plant list
    plantsList.innerHTML = "";

    // Display each plant in the array
    filteredPlants.forEach((plant) => {
      const listItem = document.createElement("li");
      listItem.innerHTML = `<strong>${plant.name}</strong> - ${plant.species} | Water Schedule: ${plant.waterSchedule}`;

      // Add buttons for updating and removing the plant
      const updateButton = document.createElement("button");
      updateButton.textContent = "Update";
      updateButton.addEventListener("click", () => updatePlant(listItem));

      const removeButton = document.createElement("button");
      removeButton.textContent = "Remove";
      removeButton.addEventListener("click", () => removePlant(listItem));

      listItem.appendChild(updateButton);
      listItem.appendChild(removeButton);

      // Add the new plant to the list
      plantsList.appendChild(listItem);
    });
  };

  // Add event listeners
  plantForm.addEventListener("submit", addPlant);
  sortButton.addEventListener("click", sortPlants);
  filterInput.addEventListener("input", filterPlants);
});
