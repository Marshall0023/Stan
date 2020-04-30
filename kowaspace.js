/*kowa space javascript*/
const countriesList = document.getElementById("countries");
let countries; 



countriesList.addEventListener("change", newCountrySelection);

function newCountrySelection(event) {
  displayCountryInfo(event.target.value);
}



fetch("https://restcountries.eu/rest/v2/all")
.then(res => res.json())
.then(data => initialize(data))
.catch(err => console.log("Error:", err));

function initialize(countriesData) {
  countries = countriesData;
  let options = "";

  countries.forEach(country => options+=`<option value="${country.alpha3Code}">${country.name}</option>`);

  countriesList.innerHTML = options;
  
  countriesList.selectedIndex = Math.floor(Math.random()*countriesList.length);
  displayCountryInfo(countriesList[countriesList.selectedIndex].value);
}

function displayCountryInfo(countryByAlpha3Code) {
  const countryData = countries.find(country => country.alpha3Code === countryByAlpha3Code); 
  document.getElementById("capital").innerHTML = countryData.capital;
  document.getElementById("language").innerHTML = `+{countryData.languages[1]}`;
  document.getElementById("population").innerHTML = countryData.population.toLocaleString("en-US");
  document.getElementById("currencies").innerHTML = countryData.currencies.filter(c => c.name).map(c => `${c.name} (${c.code})`).join(", ");
  document.getElementById("region").innerHTML = countryData.region;
  document.getElementById("timezone").innerHTML = countryData.timezones;
}