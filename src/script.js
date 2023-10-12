const apiKey = "dcb66753beab8eeb43ed7f4376e3244e"; // Obtén una API Key de OpenWeatherMap


let containerWeather = document.getElementById("containerWeather");
let searchForm = document.getElementById("search__submit");
let searchInput = document.getElementById("search__input");
let temperatureDegrees = document.getElementById("degreeNumber");
let weatherIcon = document.getElementById("weatherIcon");
let temperatureDescription = document.getElementById("description");
let timeZone = document.getElementById("timezone");
let date = document.getElementById("date");
let min = document.getElementById("min");
let max = document.getElementById("max");

//Declarar otras funciones
searchForm.addEventListener("submit", e => {
  e.preventDefault();
  console.log(searchInput.value);
  obtenerClima(searchInput.value);
});

window.onload = () => {
  obtenerClima("Medellín");
}

const displayBackgroundImage = (obj)=>{
  let dateSpanish = new Date(obj.dt*1000).toLocaleString("es-Co", {
    timeStyle: "short",
    dateStyle: "long",
  });
  console.log(dateSpanish);
  date.textContent = `Actualización ${dateSpanish}`;


  const dayHour = new Date(obj.dt*1000).getHours();
  console.log(dayHour);
  if(dayHour > 6 && dayHour < 18){
    containerWeather.classList.remove("night");
    containerWeather.classList.add("day")
  } else {
    containerWeather.classList.remove("day");
    containerWeather.classList.add("night")
  }
}

const displayData = (obj) => {
  

  temperatureDegrees.textContent = Math.floor(obj.main.temp -273.15);
  timeZone.textContent = obj.name;
  const icon = obj.weather[0].icon;
  weatherIcon.innerHTML = `<img src='icons/${icon}.png'></img>`
  min.textContent = Math.floor(obj.main.temp_min -273.15);
  max.textContent = Math.floor(obj.main.temp_max -273.15);
  temperatureDescription.textContent = obj.weather[0].description.charAt(0).toUpperCase()+
  obj.weather[0].description.slice(1);
}


//funcion principal Obtener Clima
const obtenerClima = async (ciudad)=>{
 
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${ciudad}&appid=${apiKey}`
    );

    const data = await response.json();console.log(data);

    displayBackgroundImage(data);
    displayData(data); //muestra datos en la pantalla
}