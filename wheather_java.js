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
  let showtemp = document.querySelector("#temperature");
  celcius = response.data.temperature.current;
  let citytemp = Math.round(celcius);
  showtemp.innerHTML = citytemp;
  let citywind = response.data.wind.speed;
  let showind = document.querySelector("#wind");
  showind.innerHTML = `Wind : ${citywind} km/h`;
  let cityhum = response.data.temperature.humidity;
  let showhumd = document.querySelector("#humidity");
  showhumd.innerHTML = `Humidity : ${cityhum} %`;
  let descr = response.data.condition.description;
  let newdescr = document.querySelector("#description");
  newdescr.innerHTML = descr;
  let emoji = document.querySelector("#emoji");
  emoji.setAttribute("src", response.data.condition.icon_url);
  emoji.setAttribute("alt", response.data.condition.description);
}
let urlcity = `https://api.shecodes.io/weather/v1/current?query=Honolulu&key=tfc5b1174a6eb0eo33d062c2b145a43f&units=metric`;
axios.get(urlcity).then(newdata);

function loadingdata(event) {
  event.preventDefault();
  let urlcity = `https://api.shecodes.io/weather/v1/current?query=${inputcity.value}&key=tfc5b1174a6eb0eo33d062c2b145a43f&units=metric`;
  let urlcityforecast = `https://api.shecodes.io/weather/v1/forecast?query=${inputcity.value}&key=tfc5b1174a6eb0eo33d062c2b145a43f&units=metric`;
  axios.get(urlcity).then(newdata);
  axios.get(urlcityforecast).then(displayforecast);
}
let inputcity = document.querySelector("#cityname");
let thenewcity = document.querySelector("#countryform");
thenewcity.addEventListener("submit", loadingdata);

//convertion temperature units
function farhenheit(event) {
  event.preventDefault();
  linkF = document.querySelector("#fahr");
  linkC = document.querySelector("#celcius");
  let farhenheit = (celcius * 9) / 5 + 32;
  temperature.innerHTML = Math.ceil(farhenheit);
  linkF.style.color = "black";
  linkC.style.color = "#0d6efd";
}
function celciuss(event) {
  event.preventDefault();
  linkC = document.querySelector("#celcius");
  temperature.innerHTML = Math.round(celcius);
  linkC.style.color = "black";
  linkF.style.color = "#0d6efd";
}

let clickonF = document.querySelector("#fahr");
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
  let urllocforecast = `https://api.shecodes.io/weather/v1/forecast?lon=${lon}&lat=${lat}&key=tfc5b1174a6eb0eo33d062c2b145a43f&units=metric`;
  axios.get(urlloc).then(Loadnewdataposition);
  axios.get(urllocforecast).then(displayforecast);
}
function Loadnewdataposition(response) {
  console.log(response);
  let currentcityname = response.data.city;
  let showthecurrentcity = document.querySelector("#current_place");
  showthecurrentcity.innerHTML = `📍 ${currentcityname}`;
  let temperature = Math.round(response.data.temperature.current);
  let currenttemp = document.querySelector("#temperature");
  currenttemp.innerHTML = temperature + "°";
  let citywnd = response.data.wind.speed;
  let displaywind = document.querySelector("#wind");
  displaywind.innerHTML = `Wind : ${citywnd} km/h`;
  let cityhumid = response.data.temperature.humidity;
  let displayhumd = document.querySelector("#humidity");
  displayhumd.innerHTML = `Humidity : ${cityhumid} %`;
  let emoji = document.querySelector("#emoji");
  emoji.setAttribute("src", response.data.condition.icon_url);
  emoji.setAttribute("alt", response.data.condition.description);
}

//Forecast
function formatdate(time) {
  let date = new Date(time * 1000);
  let day = date.getDay();
  let displaydays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return displaydays[day];
}

function displayforecast(response) {
  console.log(response);
  let forecast = response.data.daily;
  let prev = document.querySelector("#previsions");
  let htmlprev = `<div class="row">`;
  forecast.forEach(function (array, index) {
    if (index == 1 || (index > 1 && index <= 5)) {
      console.log(index);
      htmlprev += `  
  <div class="col-auto">
        <div class="card">
          <div class="card-body">
            <h2 class="card-title">${formatdate(array.time)}</h2>
            <p class="card-text">
            <img src=" ${array.condition.icon_url}"/>
            </p>
            <p class="card-text">
              <small class="font-weight-bold"><strong>${Math.round(
                array.temperature.minimum
              )}°C</strong></small> |
              <small class="text-muted"> ${Math.round(
                array.temperature.maximum
              )}°C </small>
            </p>
          </div>
        </div>
        </div>`;
    }
  });
  htmlprev += `</div>`;
  prev.innerHTML = htmlprev;
}
let urlforecast = `https://api.shecodes.io/weather/v1/forecast?query=Honolulu&key=tfc5b1174a6eb0eo33d062c2b145a43f&units=metric`;
axios.get(urlforecast).then(displayforecast);
