const id = "64b70d8967279ce0d9c2b261db2ff9f1";
const searchInput = document.getElementById("search-input");
const searchBtn = document.getElementById("search-btn");
const country = document.getElementById("country");
const weatherInfo = document.getElementById("weather-info");
const errMsg = document.querySelector(".err-msg");
const weatherIcon = document.getElementById("weather-icon");
const tempNum = document.getElementById("temp-num");
const description = document.querySelector(".description");
const clouds = document.getElementById("clouds");
const humidity = document.getElementById("humidity");
const pressure = document.getElementById("pressure");
const defaultMsg = document.getElementById("default-msg");

async function getData(cityName) {
    try {
        const apiLink = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${id}&units=metric`;
        const response = await fetch(apiLink);
        const data = await response.json();

        defaultMsg.style.display = "none";

        if (data.cod === 200) {
            weatherInfo.style.display = "block";
            errMsg.style.display = "none";

            const countryName = data.name;
            country.innerHTML = `<i class="fa-solid fa-location-dot location"></i>${countryName}`;
            console.log(data);

            const countryImg = data.sys.country;
            const flagImg = weatherInfo.querySelector("img");
            flagImg.src = `https://flagsapi.com/${countryImg}/flat/64.png`;

            const iconId = data.weather[0].icon;
            weatherIcon.src = `https://openweathermap.org/img/wn/${iconId}@4x.png`;

            tempNum.textContent = `${data.main.temp}°C`;

            const descriptionId = data.weather[0].description;
            description.textContent = descriptionId;

            clouds.innerHTML = `${data.clouds.all}%`;
            humidity.innerHTML = `${data.main.humidity}%`;
            pressure.innerHTML = `${data.main.pressure}hPa`;
        } else {
            weatherInfo.style.display = "none";
            errMsg.style.display = "block";
        }
    } catch (err) {
        console.log(err);
        defaultMsg.style.display = "none";
        weatherInfo.style.display = "none";
        errMsg.style.display = "block";
    }
}

searchBtn.addEventListener("click", () => {
    const input = searchInput.value.trim();

    if (input !== "") {
        getData(input);
    } else if (input === "") {
        alert("Cannot read city");
    }

    searchInput.value = "";
});

searchInput.addEventListener("keyup", (e) => {
    if (e.key === "Enter") {
        searchBtn.click();
    }
});
