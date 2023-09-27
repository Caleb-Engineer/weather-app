document.addEventListener("DOMContentLoaded", function () {
  const cities = [
    { name: "New York", lat: 40.7128, lon: -74.006, itemGrab: "coffee" },
    { name: "London", lat: 51.5074, lon: -0.1278, itemGrab: "umbrella" },
    { name: "Tokyo", lat: 35.6895, lon: 139.6917, itemGrab: "sushi" },
    { name: "Sydney", lat: -33.8688, lon: 151.2093, itemGrab: "surfboard" },
    { name: "Paris", lat: 48.8566, lon: 2.3522, itemGrab: "baguette" },
    { name: "Dubai", lat: 25.276987, lon: 55.296249, itemGrab: "sunglasses" },
    {
      name: "Rio de Janeiro",
      lat: -22.9068,
      lon: -43.1729,
      itemGrab: "samba shoes",
    },
    { name: "Moscow", lat: 55.7558, lon: 37.6173, itemGrab: "fur hat" },
    {
      name: "Toronto",
      lat: 43.65107,
      lon: -79.347015,
      itemGrab: "hockey stick",
    },
    { name: "Beijing", lat: 39.9042, lon: 116.4074, itemGrab: "tea" },
    {
      name: "Buenos Aires",
      lat: -34.6037,
      lon: -58.3816,
      itemGrab: " tango shoes",
    },
    {
      name: "Cairo",
      lat: 30.0444,
      lon: 31.2357,
      itemGrab: "pyramid souvenir",
    },
    { name: "Mumbai", lat: 19.076, lon: 72.8777, itemGrab: "spices" },
    { name: "Rome", lat: 41.9028, lon: 12.4964, itemGrab: "espresso" },
    { name: "Los Angeles", lat: 34.0522, lon: -118.2437, itemGrab: "script" },
    { name: "Berlin", lat: 52.52, lon: 13.405, itemGrab: "graffiti spray" },
    { name: "Hong Kong", lat: 22.3964, lon: 114.1095, itemGrab: "dim sum" },
    {
      name: "Istanbul",
      lat: 41.0082,
      lon: 28.9784,
      itemGrab: "Turkish delight",
    },
    { name: "Mexico City", lat: 19.4326, lon: -99.1332, itemGrab: "sombrero" },
    {
      name: "Johannesburg",
      lat: -26.2041,
      lon: 28.0473,
      itemGrab: "gold coin",
    },
  ];

  function kelvinToFahrenheit(kelvin) {
    return ((kelvin - 273.15) * 9) / 5 + 32;
  }

  function generateFortune(weatherData) {
    let fortune = "";

    // Weather Condition
    switch (weatherData.weather[0].main) {
      case "Rain":
        fortune += "Raindrops are nature's way of throwing a splashy party! ";
        break;
      case "Clouds":
        fortune += "Clouds are just sky fluff doing a waltz. ";
        break;
      case "Snow":
        fortune +=
          "Snowflakes are winter's confetti. Time to party like a penguin! ";
        break;
      case "Clear":
        fortune += "The sky's as clear as a crystal ball. What do you see? ";
        break;
      default:
        fortune += "Mother Nature's got her poker face on. ";
        break;
    }

    // Temperature
    const temp = weatherData.main.temp;
    if (temp < 273) {
      fortune += "It's a 'build a snowman inside' kind of day! ";
    } else if (temp >= 273 && temp < 300) {
      fortune += "Ah, the weather's as comfy as grandma's hugs. ";
    } else {
      fortune += "It's so hot, the sun's throwing a BBQ and you're invited! ";
    }

    // Wind Speed
    if (weatherData.wind.speed > 10) {
      fortune +=
        "Hold onto your wigs and keys, it's a blow-dryer kind of day! ";
    }

    // Humidity
    if (weatherData.main.humidity > 80) {
      fortune += "You won't need a sauna, the air's giving free steam baths! ";
    }

    // Visibility
    if (weatherData.visibility < 5000) {
      fortune += "It's so foggy, even the ghosts are playing hide and seek. ";
    } else {
      fortune += "With visibility this good, you can see tomorrow! ";
    }

    return fortune;
  }

  const randomCityButton = document.getElementById("randomCity");

  randomCityButton.addEventListener("click", async function () {
    const randomIndex = Math.floor(Math.random() * cities.length);
    const randomCity = cities[randomIndex];

    const randomChoice = Math.floor(Math.random() * 9);
    let dynamicOpening;

    switch (randomChoice) {
      case 0:
        dynamicOpening = `Adventurer in ${randomCity.name}, your ${randomCity.itemGrab} awaits! Your fortune: `;
        break;
      case 1:
        dynamicOpening = `Ah, ${randomCity.name}! Where the ${randomCity.itemGrab} is a must-have. Today's wisdom: `;
        break;
      case 2:
        dynamicOpening = `Time-traveling to ${randomCity.name}? Don't forget your ${randomCity.itemGrab}. Your cosmic fortune: `;
        break;
      case 3:
        dynamicOpening = `Tasting ${randomCity.name} through its ${randomCity.itemGrab}. Savor this fortune: `;
        break;
      case 4:
        dynamicOpening = `Exploring the culture of ${randomCity.name}? Any ${randomCity.itemGrab} will come in handy. Your cultural fortune: `;
        break;
      case 5:
        dynamicOpening = `Mindfulness in ${randomCity.name} starts with grabbing ${randomCity.itemGrab}. Meditate on this: `;
        break;
      case 6:
        dynamicOpening = `Painting your day in ${randomCity.name} with ${randomCity.itemGrab}. Your artistic fortune: `;
        break;
      case 7:
        dynamicOpening = `Surviving the urban jungle of ${randomCity.name}? Arm yourself with ${randomCity.itemGrab}. Your survival fortune: `;
        break;
      case 8:
        dynamicOpening = `Love is in the air in ${randomCity.name}. Grab your ${randomCity.itemGrab} and find out: `;
        break;
      default:
        dynamicOpening = `Surviving the urban jungle of ${randomCity.name}? Arm yourself with ${randomCity.itemGrab}. Your survival fortune: `;
        break;
    }

    const response = await fetch("/weather", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ lat: randomCity.lat, lon: randomCity.lon }),
    });

    const weatherData = await response.json();
    console.log(weatherData);

    const fortune = generateFortune(weatherData);

    const tempFahrenheit = kelvinToFahrenheit(weatherData.main.temp).toFixed(2); // Convert to Fahrenheit and round to 2 decimal places

    const weatherDataDiv = document.getElementById("weatherData");
    weatherDataDiv.innerHTML = `
  <div class="fortune-container">
    <h2>${dynamicOpening}${fortune}</h2>
    <p>${randomCity.name}, Weather: ${weatherData.weather[0].main}, Temperature: ${tempFahrenheit}°F</p>
  </div>`;
  });
});
