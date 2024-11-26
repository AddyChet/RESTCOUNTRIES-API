document.addEventListener("DOMContentLoaded", () => {
  const countryName = new URLSearchParams(location.search).get("name");
  fetch(`https://restcountries.com/v3.1/name/${countryName}?fullText=true`)
    .then((res) => res.json())
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

      img.src = `${country.flags.svg}`;

      countryText.innerText = `${country.name.common}`;
      if (country.name.nativeName) {
        native.innerHTML = `<b>Native Name:</b> ${
          Object.values(country.name.nativeName)[0].common
        }`;
      } else {
        native.innerHTML = `<b>Native Name:</b> ${country.name.common}`;
      }

      console.log(country);
      pop.innerHTML = `<b>Population:</b> ${country.population.toLocaleString()}`;
      reg.innerHTML = `<b>Region:</b> ${country.region}`;
      if (country.subregion) {
        subReg.innerHTML = `<b>Sub-Region:</b> ${country.subregion}`;
      } else {
        subReg.innerHTML = `<b>Sub-Region:</b>`;
      }

      if (country.capital) {
        cap.innerHTML = `<b>Capital:</b> ${country.capital?.[0]}`;
      } else {
        cap.innerHTML = `<b>Capital:</b>`;
      }
      tld.innerHTML = `<b>Top Level Domain:</b> ${country.tld.join(", ")}`;

      if (country.currencies) {
        curr.innerHTML = `<b>Currencies:</b> ${
          Object.values(country?.currencies)?.[0]?.name
        }`;
      } else {
        curr.innerHTML = `<b>Currencies:</b>`;
      }

      if (country.languages) {
        lang.innerHTML = `<b>Languages:</b> ${Object.values(
          country.languages
        ).join(", ")}`;
      } else {
        lang.innerHTML = `<b>Languages:</b>`;
      }

      if (country.borders) {
        const borderinfo = document.querySelector(".border-info");

        const p = document.createElement("p");
        p.classList.add("border-para");
        p.innerHTML = `<b>Border Countries:</b>&nbsp;`;

        country.borders.forEach((border) => {
          fetch(`https://restcountries.com/v3.1/alpha/${border}`)
            .then((res) => res.json())
            .then(([country]) => {
              const a = document.createElement("a");
              a.innerText = country?.name.common;
              a.href = `/country.html?name=${country.name.common}`;
              p.appendChild(a);
            });
        });
        borderinfo.appendChild(p);
      }
    })
    .catch((err) => console.log(err));
});
