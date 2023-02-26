const container = document.querySelector('.container');
const search = document.querySelector('.search-box');
const weatherBox = document.querySelector('.weather-box');
const weatherDetails = document.querySelector('.weather-details');
const error404 = document.querySelector('.not-found');
const button = document.querySelector('.search-btn');

const storageContent = document.querySelector('.storage-content');
const storageList = document.querySelector('.storage__list');

console.log(error404)
search.addEventListener('submit', function(e) {
    e.preventDefault();
    
    let storageArray = [];
    let currentStorage = JSON.parse(localStorage.getItem('values'));
    const APIKey = 'f0ab883fd1d10d9e4ab98883ae4cd983';
    const city = search.querySelector('.search-input').value;

    if(city === '') {
        return;
    }

    if (currentStorage !== null) {
        let items = JSON.parse(localStorage.getItem('values'));
        storageArray = items.map(item => item);
    }

    storageArray.push(city.toUpperCase());

    if (storageArray.length > 3) {
        storageArray.shift();
    }

    localStorage.setItem('values', JSON.stringify(storageArray));

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`)
    .then(response => response.json())
    .then(json => {

        error404.style.display = 'none';
        error404.classList.remove('fade-in');

        const image = weatherBox.querySelector('img');
        const temperature = weatherBox.querySelector('.temperature');
        const description = weatherBox.querySelector('.description');
        const humidity = document.querySelector('.humidity span');
        const wind = document.querySelector('.wind span');

        switch (json.weather[0].main) {
            case 'Clear':
                image.src = './images/clear.png';
                break;
            case 'Rain':
                image.src = './images/rain.png';
                break;
            case 'Snow':
                image.src = './images/snow.png';
                break
            case 'Mist':
                image.src = './images/mist.png';
                break;
            case 'Clouds':
                image.src = './images/cloud.png';
                break;
            default:
                image.src = '';
        }

        
        temperature.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
        description.innerHTML = `${json.weather[0].description}`;
        humidity.innerHTML = `${json.main.humidity}%`;
        wind.innerHTML = `${parseInt(json.wind.speed)}Km/Ч`;

        weatherBox.style.display = '';
        weatherBox.style.display = '';
        weatherBox.classList.add('fade-in');
        weatherDetails.classList.add('fade-in');
        container.style.height = '590px';


    })
    .catch(error => {
        container.style.height = '400px';
        weatherBox.style.display = 'none';
        weatherBox.style.display = 'none';
        error404.style.display = 'block';
        error404.classList.add('fade-in');
    }) 

})

search.addEventListener('click', renderHistory);

storageList.addEventListener('click', selectItemValue);
    
function renderHistory() {
    let height = parseInt(container.style.height);

    if (height !== 590) {

        if (storageContent.classList.contains('active')) {
            storageContent.classList.remove('active');
        } else {
            storageContent.classList.add('active');
            showHistory();
        }

    } else {
        search.removeEventListener('click', renderHistory);
    }
}

function showHistory() {
    let arr = JSON.parse(localStorage.getItem('values'));
    let result = new Set(arr);

    storageList.innerHTML = '';

    result.forEach(item => {
        storageList.insertAdjacentHTML('beforeend', `<li class="storage__item">${item}</li>`);
    })
}

function selectItemValue(e) {
    let targetValue = e.target.textContent;
    document.querySelector('.search-input').value = targetValue;
}

localStorage.clear()