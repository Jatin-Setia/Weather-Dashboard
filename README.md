# 🌤️ Weather Dashboard

A real-time weather forecasting web app with a futuristic glassmorphism UI, live location mapping, and a 7-day forecast — built as a frontend portfolio project.

🔗 **Live Demo:** [https://weather-dashboard-scansky.netlify.app]



---

## ✨ Features

- **City Search** — Get instant weather data for any city worldwide
- **Live Weather Data** — Real-time temperature, humidity, wind speed, and conditions via the OpenWeatherMap API
- **°C / °F Toggle** — Switch between temperature units instantly
- **Interactive Map** — Leaflet-powered map that pins the searched city's location
- **7-Day Forecast** — Scrollable daily forecast panel with icons and temperature ranges
- **Light / Dark Mode** — Toggle between visual themes
- **Responsive Design** — Optimized layout across desktop, tablet, and mobile
- **Glassmorphism UI** — Frosted-glass cards, neon glow effects, and animated gradients throughout

---

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| HTML5 | Page structure and semantics |
| CSS3 | Styling, animations, glassmorphism, responsive layout |
| JavaScript (Vanilla) | API calls, DOM manipulation, unit conversion, interactivity |
| [OpenWeatherMap API](https://openweathermap.org/api) | Live weather and forecast data |
| [Leaflet.js](https://leafletjs.com/) | Interactive location map |
| [Font Awesome](https://fontawesome.com/) | Icons |
| Google Fonts (Orbitron, Space Grotesk) | Typography |

---

## 🚀 Getting Started

### Prerequisites
- A free [OpenWeatherMap API key](https://openweathermap.org/appid)

### Installation

1. Clone the repository
   ```bash
   git clone https://github.com/yourusername/weather-dashboard.git
   cd weather-dashboard
   ```

2. Add your API key in `Script.js`
   ```javascript
   const apiKey = "YOUR_API_KEY_HERE";
   ```

3. Open `index.html` in your browser — no build step or dependencies required

---

## 📁 Project Structure

```
weather-dashboard/
├── index.html      # Markup and page structure
├── Style.css        # Styling, animations, and responsive layout
├── Script.js        # API integration and interactivity
└── README.md
```

---

## 📚 What I Learned

- Fetching and handling asynchronous data from a third-party REST API
- Structuring UI state (loading, error, and success states) in vanilla JS
- Building a fully responsive layout from a design that relied heavily on absolute positioning
- Integrating a third-party mapping library (Leaflet) with dynamic data
- Writing reusable CSS animations and glassmorphism effects from scratch

---

## 🔮 Future Improvements

- Loading spinner while weather data is being fetched
- Save favorite/recent cities with `localStorage`
- Add geolocation support ("use my current location")
- Hourly forecast breakdown
- Dynamic backgrounds based on current weather condition

---

## 👤 Author

**Jatin Setia**
- GitHub: [Jatin Setia](https://github.com/Jatin-Setia)
- LinkedIn: [JATIN SETIA](www.linkedin.com/in/jatin-setia-560247402)

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
