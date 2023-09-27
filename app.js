import express from "express";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const API_URL = "https://api.openweathermap.org/data/2.5/";

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("index", { weatherData: null });
});

app.post("/weather", async (req, res) => {
  const lat = req.body.lat;
  const lon = req.body.lon;
  const apiKey = process.env.API_KEY;

  try {
    const response = await axios.get(
      `${API_URL}weather?lat=${lat}&lon=${lon}&appid=${apiKey}`
    );
    const weatherData = response.data;
    console.log(weatherData);
    res.json(weatherData); // Send JSON response instead of rendering EJS
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server Error" }); // Send error as JSON
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
