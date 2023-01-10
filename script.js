
let timer;

document.getElementById("form").addEventListener("submit", e=>{
    e.preventDefault();
    let formData = new FormData(form)
    requestWeather(Object.fromEntries(formData).location); 
    document.getElementById("search-input").value = "";
});

const requestWeather = async location => {


    document.body.style.backgroundImage =
    "url('https://source.unsplash.com/1600x900/?" + location + "')";

    clearInterval(timer);

    let response = await fetch(
        "https://api.weatherapi.com/v1/current.json?key=2ded8d00ee854608985205541230701&q=" 
        + location + 
        "&aqi=no"
    );

    let data = await response.json();

    document.getElementById("weather-container").innerHTML = `
        <div id="weather-location">
            <p id="city">Weather in ${data["location"]["name"]}</p>
            <p id="country">${data["location"]["country"]}</p>
            <div id="date"><p>${data["location"]["localtime"].slice(0,10)}</p><p id="time"></p></div>
        </div>
        <div id="weather-information">
            <span><h2>${data["current"]["condition"]["text"]}</h2><img src="${data["current"]["condition"]["icon"]}" id="weather-img" ></span>
            <p><i class="fa-solid fa-temperature-three-quarters" style="color: red;"></i> ${data["current"]["temp_c"]}  &#8451 / Feels Like ${data["current"]["feelslike_c"]}  &#8451 </p>
            <p><i class="fa-solid fa-droplet" style="color: #00FFFF;"></i> Humidity: ${data["current"]["humidity"]} %</p>
            <p><i class="fa-solid fa-wind" style="color: lightblue;"></i> Wind : ${data["current"]["wind_kph"]}km/h ${data["current"]["wind_dir"]}</p>
        </div>
    `;
    
    let time = data["location"]["localtime"].slice(11,16);
    let hours = time.split(":")[0]
    let minutes = time.split(":")[1]
    startTime(hours, minutes);
}

const startTime = (hour, minute) => {
    let h = hour;
    let m = minute;
    document.getElementById("time").innerHTML =  h + ":" + m;
    timer = setInterval(()=>{
        m++;
        if(m >= 60){
            m = 0;
            h ++;
            if(h == 24){
                h = 0;
            }
        }
        document.getElementById("time").innerHTML =  h + ":" + m;
    }, 60000)
}
  



