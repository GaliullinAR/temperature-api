const container = document.querySelector('.container');
const search = document.querySelector('.search-box');
const weatherBox = document.querySelector('.weather-box');
const weatherDetails = document.querySelector('.weather-details');
const error404 = document.querySelector('.not-found');
const button = document.querySelector('.search-btn');

console.log(error404)
search.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const APIKey = 'f0ab883fd1d10d9e4ab98883ae4cd983';
    const city = search.querySelector('.search-input').value;

    if(city === '') {
        return;
    }

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