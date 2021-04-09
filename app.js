const countries = document.querySelector(".countries");
const inputText = document.querySelector('.country-input');
const searchBtn = document.querySelector('.country-btn');;


//fetch data
async function fetchCountries() {
    try {
        const response = await fetch('https://restcountries.eu/rest/v2/all');
        const data = await response.json();
        return data;
    } catch(e) {
        console.log('ERROR OCCURED',e)
    }
}

async function getCountriesList(searchField) {
    const data = await fetchCountries();
    const countriesList = data.filter ( country => {
        if(searchField){
            return country.name.toLowerCase().includes(searchField.toLowerCase());
        } else {
            return country;
        }
        
    })

    const html = countriesList.map( country => {
                return `<section class="country">
                    <div class="country-img">
                        <img src="${country.flag}" />
                    </div>
                    <div class="country-data">
                        <h3 class="country-name"> ${country.name} </h3>
                        <h4 class="country-region"><span>Region: </span> ${country.region} </h4>
                        <p class="country-row"><span><i class="fas fa-users"></i> Population: </span> ${country.population} </p>
                        <p class="country-row"><span><i class="far fa-smile"></i> Languages: </span> ${country.languages[0].name} </p>
                        <p class="country-row"><span><i class="far fa-money-bill-alt"></i> Currencies: </span> ${country.currencies[0].name} </p>
                    </div>
                </section> `;
        })
        countries.innerHTML= html.map( list => list).join("");
}

searchBtn.addEventListener('click', () => {
    getCountriesList(inputText.value)
    inputText.value = "";
});    
getCountriesList();