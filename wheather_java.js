//Show the current day and time
let now = new Date();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let currentDay = days[now.getDay()];
let currentHour = now.getHours();
let currentMinutes = now.getMinutes();

let day = document.querySelector("#current_day");
if (currentMinutes > 9) {
  day.innerHTML = `${currentDay} ${currentHour}:${currentMinutes}`;
} else {
  day.innerHTML = `${currentDay} ${currentHour}:0${currentMinutes}`;
}

//load input the city & it's temp
function newdata(response) {
  console.log(response);
  let newcityname = response.data.city;
  let showthecity = document.querySelector("#current_place");
  showthecity.innerHTML = newcityname;
  let citytemp = Math.round(response.data.temperature.current);
  let showtemp = document.querySelector("#temperature");
  showtemp.innerHTML = citytemp + "°";
  let citywind = response.data.wind.speed;
  let showind = document.querySelector("#wind");
  showind.innerHTML = `Wind : ${citywind} km/h`;
  let cityhum = response.data.temperature.humidity;
  let showhumd = document.querySelector("#humidity");
  showhumd.innerHTML = `Humidity : ${cityhum} %`;
  let descr = response.data.condition.description;
  let newdescr = document.querySelector("#description");
  newdescr.innerHTML = descr;
  let emoji = document.querySelector("emoji");
  emoji.setAttribute(
    "src",
    `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.data.condition.icon_url}.png`
  );
  emoji.setAttribute("alt", response.data.condition.description);
}
let urlcity = `https://api.shecodes.io/weather/v1/current?query=Honolulu&key=tfc5b1174a6eb0eo33d062c2b145a43f&units=metric`;
axios.get(urlcity).then(newdata);

function loadingdata(event) {
  event.preventDefault();
  let urlcity = `https://api.shecodes.io/weather/v1/current?query=${inputcity.value}&key=tfc5b1174a6eb0eo33d062c2b145a43f&units=metric`;
  axios.get(urlcity).then(newdata);
}
let inputcity = document.querySelector("#cityname");
let thenewcity = document.querySelector("#countryform");
thenewcity.addEventListener("submit", loadingdata);

//convertion temperature units
function farhenheit(event) {
  event.preventDefault();
  let targettemperature = document.querySelector("#temperature");
  let farhenheit = (targettemperature * 9) / 5 + 32;
  temperature.innerHTML = Math.ceil(farhenheit);
}

function celciuss(event) {
  event.preventDefault();
  let targettemperature = document.querySelector("#temperature");
  temperature.innerHTML = targettemperature;
}

let clickonF = document.querySelector("#farh");
clickonF.addEventListener("click", farhenheit);
let clickonC = document.querySelector("#celcius");
clickonC.addEventListener("click", celciuss);

//load currentposition data
let showcurrentcityname = document.querySelector("#positionbutton");
showcurrentcityname.addEventListener("click", launch);

function launch() {
  navigator.geolocation.getCurrentPosition(TheCurrentPosition);
}
function TheCurrentPosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let urlloc = `https://api.shecodes.io/weather/v1/current?lat=${lat}&lon=${lon}&key=tfc5b1174a6eb0eo33d062c2b145a43f&units=metric`;
  axios.get(urlloc).then(Loadnewdataposition);
}
function Loadnewdataposition(response) {
  let currentcityname = response.data.city;
  let showthecurrentcity = document.querySelector("#current_place");
  showthecurrentcity.innerHTML = "📍 " + currentcityname;
  let temperature = Math.round(response.data.temperature.current);
  let currenttemp = document.querySelector("#temperature");
  currenttemp.innerHTML = temperature + "°";
  let citywnd = response.data.wind.speed;
  let displaywind = document.querySelector("#wind");
  displaywind.innerHTML = `Wind : ${citywnd} km/h`;
  let cityhumid = response.data.temperature.humidity;
  let displayhumd = document.querySelector("#humidity");
  showhumd.innerHTML = `Humidity : ${cityhumid} %`;
}
