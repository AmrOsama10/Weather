var search = document.querySelector('#search');
var btnSearch = document.querySelector('#btnSearch');
var row = document.querySelector('#row');
var weatherLocation;
var weatherCurrent ;
var weatherForecast ;

async function getWeather(city) {
    try {
        var url = await fetch(
          `https://api.weatherapi.com/v1/forecast.json?key=9a498501f45e440abfc102710241306&q=${city}&days=3`
        );
        var res = await url.json();
        weatherLocation = [res.location]
        weatherCurrent=[res.current]
        weatherForecast = res.forecast.forecastday;
        display();  
    } catch (error) {
        console.log(error);
    }
}

search.addEventListener('keyup', function(e){
  getWeather(e.target.value);
})

function display() {
  var now = new Date();
  var daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  var dayOfMonth = now.getDate(); 
  var months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  var month = months[now.getMonth()]; 

  var box = "";
  for (var g = 0; g < weatherForecast.length; g++) {
    var dayIndex = (now.getDay() + g) % 7; 
    var dayOfWeek = daysOfWeek[dayIndex]; 
    if (g === 0) {
      box += `
                <div class="col-lg-4 p-0">
                    <div class="card text-white rounded-0">
                        <div class="card-head d-flex justify-content-between">
                            <p class="p-2 m-0">${dayOfWeek}</p>
                            <p class="p-2 m-0">${dayOfMonth + month}</p>
                        </div>
                        <div class="card-body">
                            <p class="text-white-50">${
                              weatherLocation[0].name
                            }</p>
                            <h1 class="display-1 fw-semibold">${
                              weatherCurrent[0].temp_c
                            }<sup>o</sup>C</h1>
                            <img class="w-25" src="${
                              weatherCurrent[0].condition.icon
                            }" alt="">
                            <p class="main-color py-1">${
                              weatherCurrent[0].condition.text
                            }</p>
                            <span class="pe-3 text-white-50"><i class="fa-solid fa-umbrella"></i> 20%</span>
                            <span class="pe-3 text-white-50"><i class="fa-solid fa-wind"></i> 18km/h</span>
                            <span class="pe-3 text-white-50"><i class="fa-solid fa-gauge-high"></i> East</span>
                        </div>
                    </div>
                </div>`;
    } else {
      box += `
                <div class="col-lg-4 p-0">
                    <div class="card-2 text-white">
                        <div class="card-2-head">
                            <p class="py-2 text-center">${dayOfWeek}</p>
                        </div>
                        <div class="card-body text-center">
                            <img class="w-10" src="${weatherForecast[g].day.condition.icon}" alt="">
                            <p class="fw-semibold fs-5 m-0">${weatherForecast[g].day.maxtemp_c}<sup>o</sup>C</p>
                            <p class="text-white-50">${weatherForecast[g].day.mintemp_c}<sup>o</sup>C</p>
                            <p class="main-color">${weatherForecast[g].day.condition.text}</p>
                        </div>
                    </div>
                </div>
                `;
    }
  }
  row.innerHTML = box;
}

getWeather("cairo");
