const countries = document.querySelector(".countries");
const inputText = document.querySelector('.country-input');
const searchBtn = document.querySelector('.country-btn');;


//create request

    function getCountry(country){
        let xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function(){
                if(this.readyState === 4 && this.status === 200 ){
                    xhttp.addEventListener('load', () => {
                        //JSON string to JS object
                        let [data] = JSON.parse(xhttp.responseText);
                        console.log(data);
                        const html = `
                        <article class="country">
                            <div class="country-img">
                                <img src="${data.flag}" />
                            </div>
                            
                            <div class="country-data">
                                <h3 class="country-name"> ${data.name} </h3>
                                <h4 class="country-region"><span>Region: </span> ${data.region} </h4>
                                <p class="country-row"><span><i class="fas fa-users"></i> Population: </span> ${data.population} </p>
                                <p class="country-row"><span><i class="far fa-smile"></i> Languages: </span> ${data.languages[0].name} </p>
                                <p class="country-row"><span><i class="far fa-money-bill-alt"></i> Currencies: </span> ${data.currencies[0].name} </p>
                            </div>
                        </article>
                        `;

                        countries.insertAdjacentHTML('beforeend', html);
                    });
                } 
            }
        
        xhttp.open('GET', 'https://restcountries.eu/rest/v2/name/'+country, true);
        xhttp.send();  
    }

searchBtn.addEventListener('click', () => {
    getCountry(inputText.value);
    inputText.value = "";
});
    

getCountry("usa");
getCountry("germany");
getCountry("Philippines");
