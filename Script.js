const Loc = document.getElementById("Location");
const DateT = document.getElementById("DateText");
const Temp = document.getElementById("Temperature");
const Humidity = document.getElementById("Humidity");
const Wind = document.getElementById("Wind");
const FeelsLike = document.getElementById("FeelsLike");
const SearchInput = document.getElementById("LocInput");
const SearchBtn = document.getElementById("SrchBtn");
const WDesc = document.getElementById("Desc");
const GlassCard = document.getElementById("GlassC");


let CurrentTempC = 0;
let CurrentFeelsLikeC = 0;

const apiKey = "e12c7fbe8e66e2db1beaf78c34fb36da";
SearchBtn.addEventListener("click", function() {
    const city = SearchInput.value.trim();

    if (city === ""){
        alert("Please Enter a city name :(");
        return;
    }

    getWeather(city)
});

SearchInput.addEventListener("keydown", function(e){
    if (e.key === "Enter"){
        SearchBtn.click();
    }
});

function getWeather(city){
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    fetch(url)
    .then(function(response){
        return response.json();
    })
    .then(function(data){
         console.log(data)
        if (data.cod === "404") {
                alert("City not found! Try again.");
                return;
        }
        updateUI(data);
    })
    .catch(function(error){
         alert("Something went wrong. Check your internet.");
            console.log(error);
    })
}
function updateUI(data){
    CurrentTempC = Math.round(data.main.temp);
    CurrentFeelsLikeC = Math.round(data.main.feels_like);

    Loc.textContent = data.name + ", " + data.sys.country;

    const today = new Date();
    DateT.textContent = today.toLocaleDateString("en-IN",{
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric"
    });
    Temp.textContent = Math.round(data.main.temp) + "°";
    TempC.click();
    Humidity.textContent = data.main.humidity + "%";
    Wind.textContent = data.wind.speed + " m/s";
    FeelsLike.textContent = Math.round(data.main.feels_like) + "°C";
    WDesc.textContent = data.weather[0].description ;

    if (WDesc.textContent.trim() === ""){
    WDesc.classList.add("opac0");
}else{
    WDesc.classList.remove("opac0");
}

    initMap(data.coord.lat, data.coord.lon, data.name);
    get7DayForecast(data.name);

}

const TempC = document.getElementById("TempC");
const TempF = document.getElementById("TempF");
TempC.addEventListener("click",function(){
    TempC.classList.add("active");
    TempF.classList.remove("active");

    Temp.textContent = CurrentTempC + "°C";
    FeelsLike.textContent = CurrentFeelsLikeC + "°C";
});
TempF.addEventListener("click",function(){
    TempF.classList.add("active");
    TempC.classList.remove("active");

    Temp.textContent = toF(CurrentTempC) + "°F";
    FeelsLike.textContent = toF(CurrentFeelsLikeC) + "°F";

});

function toF(c) {
    const cn = parseFloat(c);
    return Math.round((cn * 9/5) + 32);
}

if (WDesc.textContent.trim() === ""){
    WDesc.classList.add("opac0");
}else{
    WDesc.classList.remove("opac0");
}

document.querySelectorAll('.GlassCard').forEach(card => {
  card.addEventListener('click', () => {
    card.classList.add('cardClicked');
    card.addEventListener('animationend', () => {
      card.classList.remove('cardClicked');
    }, { once: true });
  });
});
document.querySelectorAll('.Card').forEach(card => {
  card.addEventListener('click', () => {
    card.classList.add('cardClicked');
    card.addEventListener('animationend', () => {
      card.classList.remove('cardClicked');
    }, { once: true });
  });
});
document.querySelectorAll('.TempC, .TempF, .srchbtn, .Forecast').forEach(card => {
  card.addEventListener('click', () => {
    card.classList.add('cardClicked');
    card.addEventListener('animationend', () => {
      card.classList.remove('cardClicked');
    }, { once: true });
  });
});

let map = null;
let mapMarker = null;



function initMap(lat, lon, cityName) {
  if (!map) {
    map = L.map('weatherMap', { zoomControl: true, scrollWheelZoom: false }).setView([lat, lon], 10);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap'
    }).addTo(map);
  } else {
    map.setView([lat, lon], 10);
    if (mapMarker) map.removeLayer(mapMarker);
  }
  const customIcon = L.divIcon({
    className: '',
    html: `<div style="
      background:rgba(0,255,255,0.15);
      border:2px solid cyan;
      border-radius:50%;
      width:36px;height:36px;
      display:flex;align-items:center;justify-content:center;
      font-size:18px;
      box-shadow:0 0 12px cyan, 0 0 24px rgba(0,255,255,0.4);
    ">📍</div>`,
    iconSize: [36, 36],
    iconAnchor: [18, 18]
  });
  mapMarker = L.marker([lat, lon], { icon: customIcon })
    .addTo(map)
    .bindPopup(`<b style="color:cyan;font-family:Orbitron,sans-serif;font-size:12px;letter-spacing:2px">${cityName}</b>`)
    .openPopup();
}

function getWeatherIcons(desc) {
  const d = desc.toLowerCase();
  if (d.includes('thunder')) return '⛈️';
  if (d.includes('rain') || d.includes('drizzle')) return '🌧️';
  if (d.includes('snow')) return '❄️';
  if (d.includes('cloud')) return '☁️';
  if (d.includes('mist') || d.includes('fog') || d.includes('haze')) return '🌫️';
  return '☀️';
}

function get7DayForecast(city) {
  const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
  fetch(url)
    .then(r => r.json())
    .then(data => {
      if (data.cod !== '200') return;
      const daily = {};
      data.list.forEach(item => {
        const date = new Date(item.dt * 1000);
        const day = date.toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short' });
        if (!daily[day]) {
          daily[day] = { temps: [], desc: item.weather[0].description };
        }
        daily[day].temps.push(item.main.temp);
      });
      const container = document.getElementById('ForecastDays');
      container.innerHTML = '';
      Object.entries(daily).slice(0, 7).forEach(([day, info]) => {
        const max = Math.round(Math.max(...info.temps));
        const min = Math.round(Math.min(...info.temps));
        const icon = getWeatherIcons(info.desc);
        const el = document.createElement('div');
        el.className = 'ForecastDay';
        el.innerHTML = `
          <div class="ForecastDayName">${day}</div>
          <div class="ForecastDayIcon">${icon}</div>
          <div class="ForecastDayDesc">${info.desc}</div>
          <div class="ForecastDayTemp">${max}° <span>/ ${min}°</span></div>
        `;
        container.appendChild(el);
      });
    })
    .catch(err => console.log(err));
}
const ThemeSwitch = document.getElementById("BrightDark");

ThemeSwitch.addEventListener("click", () => {
    ThemeSwitch.classList.toggle("On");
    document.body.classList.toggle("LightMode");
});