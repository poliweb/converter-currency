// Объект с курсами валют USD EUR GBP
const rates = {};

// Элементы для отображения курса валюты
const elementUSD = document.querySelector('[data-value="USD"]');
const elementEUR = document.querySelector('[data-value="EUR"]');
const elementGBP = document.querySelector('[data-value="GBP"]');

// Элементы формы, ввода суммы, выбор валюты, поле срезультатом конвертёра
const input = document.querySelector('#input');
const result = document.querySelector('#result');
const select = document.querySelector('#select');

getCurrencies();

// Время обновления данных в функции getCurrencies
setInterval(getCurrencies, 10000);

// Функция получения курса валют и отображение их на странице с формой конвертёра валюты
async function getCurrencies() {
    const response = await fetch('https://www.cbr-xml-daily.ru/daily_json.js');
    const data = await response.json();
    const result = await data;
    // console.log(result);
    // console.log(result.Valute.USD);
    rates.USD = result.Valute.USD;
    rates.EUR = result.Valute.EUR;
    rates.GBP = result.Valute.GBP;

    // console.log(rates);
    elementUSD.textContent = rates.USD.Value.toFixed(2);
    elementEUR.textContent = rates.EUR.Value.toFixed(2);
    elementGBP.textContent = rates.GBP.Value.toFixed(2);


    // Цвет информера для валюты USD
    if (rates.USD.Value > rates.USD.Previous) {
        elementUSD.classList.add('top');
    } else {
        elementUSD.classList.add('bottom');
    }

    // Цвет информера для валюты EUR
    if (rates.EUR.Value > rates.EUR.Previous) {
        elementEUR.classList.add('top');
    } else {
        elementEUR.classList.add('bottom');
    }

    // Цвет информера для валюты GBR
    if (rates.GBP.Value > rates.GBP.Previous) {
        elementGBP.classList.add('top');
    } else {
        elementGBP.classList.add('bottom');
    }
};

// Конвертёр рубля к валютам USD EUR GBP 

// Слушатель изминения в текстовых полях input и select
input.oninput = convertValue;
select.oninput = convertValue;

// Функция конвертации валют
function convertValue() {
    result.value = (parseFloat(input.value) / rates[select.value].Value).toFixed(2);
};