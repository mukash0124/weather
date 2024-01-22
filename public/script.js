const map = L.map('map').setView([0, 0], 1);
const layerGroup = L.layerGroup().addTo(map);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© OpenStreetMap contributors'
}).addTo(map);

async function getWeather() {
    const city = document.getElementById('cityInput').value;
    const response = await fetch(`/weather?city=${city}`);
    const data = await response.json();

    const resultDiv = document.getElementById('weatherResult');
    resultDiv.innerHTML = `Temperature: ${data.main.temp} <br>
                         Weather: ${data.weather[0].description}`;


    const lat = data.coord.lat;
    const lon = data.coord.lon;

    layerGroup.clearLayers();

    L.marker([lat, lon]).addTo(layerGroup);
    map.setView([lat, lon], 13);

    const image_url_response = await fetch(`/image?city=${city}&weather=${data.weather[0].description}`);
    const image_url_data = await image_url_response.json();

    const image_url = image_url_data.image_url;

    const image = document.getElementById('image');

    image.setAttribute('src', image_url);
}
