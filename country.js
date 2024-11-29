document.addEventListener("DOMContentLoaded", () => {
  const countryName = new URLSearchParams(location.search).get("name");

  fetch(`https://restcountries.com/v3.1/name/${countryName}?fullText=true`)
    .then(res => res.json())
    .then(([country]) => {
      const countryText = document.querySelector(".country-details .text > h1");
      const img = document.querySelector("#flag-img");
      const native = document.querySelector(".demo-name");
      const pop = document.querySelector(".demo-pop");
      const reg = document.querySelector(".demo-reg");
      const subReg = document.querySelector(".demo-sub-reg");
      const cap = document.querySelector(".demo-cap");
      const tld = document.querySelector(".demo-tld");
      const curr = document.querySelector(".demo-curr");
      const lang = document.querySelector(".demo-lang");
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

      img.src = `${country.flags.svg}`;
      countryText.innerText = `${country.name.common}`;
      if (country.name.nativeName) {
        native.innerHTML = `<b>Native Name:</b> ${Object.values(country.name.nativeName)[0].common}`;
      } else {
        native.innerHTML = `<b>Native Name:</b> ${country.name.common}`;
      }
      
      pop.innerHTML = `<b>Population:</b> ${country.population.toLocaleString()}`;
      reg.innerHTML = `<b>Region:</b> ${country.region}`;
      subReg.innerHTML = country.subregion ? `<b>Sub-Region:</b> ${country.subregion}` : `<b>Sub-Region:</b>`;
      cap.innerHTML = country.capital ? `<b>Capital:</b> ${country.capital?.[0]}` : `<b>Capital:</b>`;
      tld.innerHTML = `<b>Top Level Domain:</b> ${country.tld.join(", ")}`;
      curr.innerHTML = country.currencies ? `<b>Currencies:</b> ${Object.values(country?.currencies)?.[0]?.name}` : `<b>Currencies:</b>`;
      lang.innerHTML = country.languages ? `<b>Languages:</b> ${Object.values(country.languages).join(", ")}` : `<b>Languages:</b>`;

      if (country.borders) {
        const borderinfo = document.querySelector(".border-info");
        const p = document.createElement("p");
        p.classList.add("border-para");
        p.innerHTML = `<b>Border Countries:</b>&nbsp;`;

        country.borders.forEach(border => {
          fetch(`https://restcountries.com/v3.1/alpha/${border}`)
            .then(res => res.json())
            .then(([borderCountry]) => {
              const a = document.createElement("a");
              a.innerText = borderCountry?.name.common;
              a.href = `/country.html?name=${borderCountry.name.common}`;
              p.appendChild(a);
            });
        });
        borderinfo.appendChild(p);
      }
    })
    .catch(err => {
      console.log('Error fetching country data:', err);
    });
});
