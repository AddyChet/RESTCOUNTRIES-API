document.addEventListener("DOMContentLoaded", async () => {
  const countryName = new URLSearchParams(location.search).get("name");

  try {
    const res = await fetch(`https://restcountries.com/v3.1/name/${countryName}?fullText=true`);
    const [country] = await res.json();

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
      native.innerHTML = `<b>Native Name:</b> ${Object.values(country.name.nativeName)[0].common}`;
    } else {
      native.innerHTML = `<b>Native Name:</b> ${country.name.common}`;
    }

    console.log(country);
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

      for (const border of country.borders) {
        const res = await fetch(`https://restcountries.com/v3.1/alpha/${border}`);
        const [borderCountry] = await res.json();
        const a = document.createElement("a");
        a.innerText = borderCountry?.name.common;
        a.href = `/country.html?name=${borderCountry.name.common}`;
        p.appendChild(a);
      }
      borderinfo.appendChild(p);
    }
  } catch (err) {
    console.log('Error fetching country data:', err);
  }
});
