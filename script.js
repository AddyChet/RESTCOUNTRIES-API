document.addEventListener('DOMContentLoaded', () => {
  const cardContainer = document.querySelector(".countries-container");
  const filterRegion = document.querySelector("#continent");
  const input = document.querySelector(".search input");
  const body = document.querySelector("body");
  const headContainer = document.querySelector(".header-container");
  const toggleBtn = document.createElement("p");

  toggleBtn.classList.add("toggle-btn");
  toggleBtn.innerHTML = `
    <i class="fa-regular fa-moon"></i> <span class="toggle-text">Dark mode</span>
  `;
  headContainer.appendChild(toggleBtn);

  const icon = document.querySelector(".fa-regular");
  const toggleText = document.querySelector(".toggle-text");

  if (localStorage.getItem("class") === "dark") {
    body.classList.add("dark");
    icon.classList.remove("fa-moon");
    icon.classList.add("fa-sun");
    toggleText.innerText = "Light Mode";
  } else {
    body.classList.add("light");
    icon.classList.remove("fa-sun");
    icon.classList.add("fa-moon");
    toggleText.innerText = "Dark Mode";
  }

  toggleBtn.addEventListener("click", () => {
    if (body.classList.contains("dark")) {
      body.classList.remove("dark");
      body.classList.add("light");
      localStorage.setItem("class", "light");
      icon.classList.remove("fa-sun");
      icon.classList.add("fa-moon");
      toggleText.innerText = "Dark Mode";
    } else {
      body.classList.remove("light");
      body.classList.add("dark");
      localStorage.setItem("class", "dark");
      icon.classList.remove("fa-moon");
      icon.classList.add("fa-sun");
      toggleText.innerText = "Light Mode";
    }
  });

  let allCountriesData;

  fetch("https://restcountries.com/v3.1/all")
    .then(res => res.json())
    .then(data => {
      countryCards(data);
      allCountriesData = data;
    })
    .catch(error => {
      console.error('Error fetching all countries:', error);
    });

  filterRegion.addEventListener("change", () => {
    fetch(`https://restcountries.com/v3.1/region/${filterRegion.value}`)
      .then(res => res.json())
      .then(data => {
        countryCards(data);
      })
      .catch(error => {
        console.error('Error fetching region data:', error);
      });
  });

  input.addEventListener("input", (e) => {
    const filteredCountries = allCountriesData.filter((country) =>
      country.name.common.toLowerCase().includes(e.target.value.toLowerCase())
    );
    countryCards(filteredCountries);
  });

  function countryCards(data) {
    cardContainer.innerHTML = "";
    data.forEach((e) => {
      const card = document.createElement("a");
      card.classList.add("card");
      card.href = `/country.html?name=${e.name.common}`;

      card.innerHTML = `
        <div class="img-container">
             <img src="${e.flags.svg}" id="flag-img">
        </div>
   
        <div class="country-name">
            <h3 class="name">${e.name.common}</h3>
        </div>
        <div class="country-info">
            <p class="info"><b>Population</b>: ${e.population.toLocaleString()}</p>
            <p class="info"><b>Region</b>: ${e.region}</p>
            <p class="info"><b>Capital</b>: ${e.capital?.[0]}</p>
        </div>`;

      cardContainer.appendChild(card);
    });
  }
});
