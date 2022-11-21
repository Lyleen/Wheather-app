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
if (currentMinutes >= 9) {
  day.innerHTML = `${currentDay} ${currentHour}:${currentMinutes}`;
} else {
  day.innerHTML = `${currentDay} ${currentHour}:0${currentMinutes}`;
}

//load input the city & it's temp
function newdata(response) {
  let newcityname = response.data.name;
  let showthecity = document.querySelector("#current_place");
  showthecity.innerHTML = "📍 " + newcityname;
  let citytemp = Math.round(response.data.main.temp);
  let showtemp = document.querySelector("#temperature");
  showtemp.innerHTML = citytemp + "°";
}
function loadingdata(event) {
  event.preventDefault();
  let apiKey = "5863935ee9cca4c02ed68203f807c65b";
  let urlcity = `https://api.openweathermap.org/data/2.5/weather?q=${inputcity.value}&appid=${apiKey}&units=metric`;
  axios.get(urlcity).then(newdata);
}
let inputcity = document.querySelector("#cityname");
let thenewcity = document.querySelector("#countryform");
thenewcity.addEventListener("submit", loadingdata);

//load currentposition data
let showcurrentcityname = document.querySelector("#positionbutton");
showcurrentcityname.addEventListener("click", launch);

function launch() {
  navigator.geolocation.getCurrentPosition(TheCurrentPosition);
}
function TheCurrentPosition(position) {
  let apiKey = "5863935ee9cca4c02ed68203f807c65b";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let urlloc = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(urlloc).then(Loadnewdataposition);
}
function Loadnewdataposition(response) {
  let currentcityname = response.data.name;
  let showthecurrentcity = document.querySelector("#current_place");
  showthecurrentcity.innerHTML = "📍 " + currentcityname;
  let temperature = Math.round(response.data.main.temp);
  let currenttemp = document.querySelector("#temperature");
  currenttemp.innerHTML = temperature + "°";
}
