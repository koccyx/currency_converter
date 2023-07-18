import { API_KEY } from "./env.js";
let BASE_URL = `https://v6.exchangerate-api.com/v6/${API_KEY}`;

async function getRates(url) {
    try {
        let response = await fetch(`${BASE_URL}/latest/EUR`);
        let data = await response.json()

        return data;
    } catch(error) {
        console.log('error happend(((');
        console.log(error);
    }
}

async function converting(url) {
    try {
        let topVal = $inputTop.value;
        let selectTopVal= $selectTop.value;
        let selectBottomVal= $selectBottom.value; 
        if(!topVal) throw new Error('Input is empty');
        let response = await fetch(`${BASE_URL}/pair/${selectTopVal}/${selectBottomVal}/${topVal}`);
        let result = await response.json();

        $inputBottom.value = result.conversion_result;
    } catch(err) {
        console.log(err);
    }
}



const $selectTop = document.querySelector('#top-select');
const $selectBottom = document.querySelector('#bottom-select');
const $inputTop = document.querySelector('.top-input');
const $inputBottom = document.querySelector('.bottom-input');
const $button = document.querySelector('.container-button');


document.addEventListener('DOMContentLoaded', () => {
    getRates(BASE_URL)
    .then(data => {
        const rates = Object.keys(data.conversion_rates); 
        console.log(data);    
        rates.forEach(rate => {
            const $option = document.createElement('option');
            $option.value = rate;
            $option.innerText = rate; 
            const $optionClone = $option.cloneNode(true);
            $selectTop.append($option);
            $selectBottom.append($optionClone);
        })
    });
})


$button.addEventListener('click', () => {
    converting(BASE_URL);
})


