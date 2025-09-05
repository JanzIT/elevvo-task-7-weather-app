import "./App.css";
import WeatherCard from "./components/WeatherCard";
import mockWeatherData from "./assets/mockWeatherData.json";
import WeatherDashboard from "./components/weatherDashboard";
function App() {
  const handleCardClick = (data) => {
    console.log("Card clicado:", data.name);
  };

  return (
    <div className="App">
      <WeatherDashboard />
    </div>
  );
}

export default App;
