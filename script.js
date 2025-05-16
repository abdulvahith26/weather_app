const iconMap = {
    "sunny": "☀️",
    "clear": "☀️",
    "partly cloudy": "⛅",
    "cloudy": "☁️",
    "overcast": "☁️",
    "rain": "🌧️",
    "light rain": "🌦️",
    "thunder": "⛈️",
    "snow": "❄️",
    "mist": "🌫️",
    "haze": "🌁"
  };
  
  const cities = ["Chennai", "Trichy", "Madurai", "Salem", "Coimbatore"];
  
  window.onload = () => {
    const cardContainer = document.getElementById("fixedCities");
    cardContainer.innerHTML = ""; // Clear just in case
  
    cities.forEach(city => {
      fetchCityWeather(city);
    });
  };
  
  async function fetchCityWeather(city) {
    const cardContainer = document.getElementById("fixedCities");
  
    try {
      const res = await fetch(`https://wttr.in/${city}?format=j1`);
      const data = await res.json();
      const weather = data.current_condition[0];
  
      const desc = weather.weatherDesc[0].value.toLowerCase();
      const icon = Object.entries(iconMap).find(([key]) => desc.includes(key))?.[1] || "🌤️";
  
      const card = document.createElement("div");

      card.className = "bg-gray-800 rounded-lg p-3 text-center shadow text-sm text-gray-300";
      card.innerHTML = `
        <h3 class="font-semibold">${city}</h3>
        <div class="text-2xl my-1">${icon}</div>
        <p class="capitalize">${desc}</p>
        <p class="font-bold mt-1">${weather.temp_C} °C</p>
      `;
  
      cardContainer.appendChild(card);
    } catch (error) {
      console.error("Error loading fixed city:", city);
    }
  }
  
  async function getWeather() {
    const city = document.getElementById("cityInput").value.trim();
    const errorMsg = document.getElementById("errorMsg");
    const weatherBox = document.getElementById("weatherResult");
  
    if (!city) {
      errorMsg.textContent = "Please enter a city.";
      errorMsg.classList.remove("hidden");
      weatherBox.classList.add("hidden");
      return;
    }
  
    try {
      const response = await fetch(`https://wttr.in/${city}?format=j1`);
      if (!response.ok) throw new Error("City not found");
  
      const data = await response.json();
      const current = data.current_condition[0];
  
      document.getElementById("cityText").textContent = city;
      document.getElementById("description").textContent = current.weatherDesc[0].value;
      document.getElementById("temperature").textContent = `${current.temp_C} °C`;
      document.getElementById("humidity").textContent = `${current.humidity}%`;
      document.getElementById("windSpeed").textContent = `${current.windspeedKmph} km/h`;
      document.getElementById("clouds").textContent = `${current.cloudcover}%`;
  
      const desc = current.weatherDesc[0].value.toLowerCase();
      const icon = Object.entries(iconMap).find(([key]) => desc.includes(key))?.[1] || "🌤️";
      document.getElementById("weatherIcon").textContent = icon;
  
      weatherBox.classList.remove("hidden");
      errorMsg.classList.add("hidden");
    } catch (err) {
      errorMsg.textContent = "Unable to fetch weather data.";
      errorMsg.classList.remove("hidden");
      weatherBox.classList.add("hidden");
    }
  }
  