import { API_KEY } from "./env.js";

let BASE_URL = 'http://api.exchangeratesapi.io/v1/latest' + `?access_key=${API_KEY}`;

async function getRates(url) {
    try {
        let response = await fetch(url);
        let data = await response.json()

        return data;
    } catch(error) {
        console.log('error happend(((');
        console.log(error);
    }
}

const $selectTop = document.querySelector('#top-select');
const $selectBottom = document.querySelector('#top-select');

getRates(BASE_URL)
    .then(data => {
        const rates = Object.keys(data.rates); 
        
        rates.forEach(rate => {
            const $option = document.createElement('option');
            $option.value = rate;
            $option.innerText = rate;  
            $selectTop.append($option);
            $selectBottom.append($option);
        })
    });