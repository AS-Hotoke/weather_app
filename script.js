
const API_KEY = "27dede6bda7b393a712746242ccb8626";

const form = document.getElementById("weather-form");
const cityInput = document.getElementById("city-input");
const message = document.getElementById("message");
const weatherCard = document.getElementById("weather-card");

form.addEventListener("submit", async function (event) {
    event.preventDefault();

    const city = cityInput.value.trim();

    if (!city) {
        message.textContent = "Please enter a city name.";
        weatherCard.hidden = true;
        return;
    }

    if (API_KEY === "YOUR_API_KEY_HERE") {
        message.textContent = "Please add your OpenWeatherMap API key.";
        weatherCard.hidden = true;
        return;
    }

    message.textContent = "Fetching weather...";
    weatherCard.hidden = true;

    const url =
        `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (!response.ok) {
            throw new Error(
                data.message || "Unable to fetch weather data."
            );
        }

        // Update the DOM with the API response
        document.getElementById("city-name").textContent =
            `${data.name}, ${data.sys.country}`;

        document.getElementById("temperature").textContent =
            `${Math.round(data.main.temp)}°C`;

        document.getElementById("condition").textContent =
            data.weather[0].description;

        document.getElementById("humidity").textContent =
            `${data.main.humidity}%`;

        document.getElementById("feels-like").textContent =
            `${Math.round(data.main.feels_like)}°C`;

        const iconCode = data.weather[0].icon;
        const icon = document.getElementById("weather-icon");

        icon.src =
            `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

        icon.alt = data.weather[0].description;

        weatherCard.hidden = false;
        message.textContent = "";

    } catch (error) {
        message.textContent =
            error.message === "Failed to fetch"
                ? "Network error. Check your connection and try again."
                : error.message;

        weatherCard.hidden = true;
    }
});
