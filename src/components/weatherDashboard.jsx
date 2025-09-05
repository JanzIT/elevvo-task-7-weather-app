import { useState, useEffect } from "react";
import WeatherCard from "./WeatherCard";
import ForecastSection from "./ForecastSection";

export default function WeatherDashboard() {
  const [weatherDataList, setWeatherDataList] = useState([]);
  const [selectedCity, setSelectedCity] = useState(null);
  const [loading, setLoading] = useState(false);

  const API_KEY = "d5038b83e270e2aec7096b7377b08cc5";

  // Função para buscar clima pela localização (cidade atual)
  const fetchWeatherByLocation = async (lat, lon) => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&lang=pt_br&appid=${API_KEY}`
      );
      return await response.json();
    } catch (error) {
      console.error("Erro ao buscar cidade atual:", error);
      return null;
    }
  };

  // Função para buscar cidades próximas
  const fetchNearbyCities = async (lat, lon) => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/find?lat=${lat}&lon=${lon}&cnt=5&units=metric&lang=pt_br&appid=${API_KEY}`
      );
      const data = await response.json();
      return data.list || [];
    } catch (error) {
      console.error("Erro ao buscar cidades próximas:", error);
      return [];
    }
  };

  useEffect(() => {
    const loadWeatherData = async () => {
      setLoading(true);

      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            const { latitude, longitude } = position.coords;

            // 1. Buscar cidade atual
            const currentCity = await fetchWeatherByLocation(
              latitude,
              longitude
            );

            // 2. Buscar cidades próximas
            const nearbyCities = await fetchNearbyCities(latitude, longitude);

            // 3. Combinar lista (sem duplicar a cidade atual)
            const allData = [
              currentCity,
              ...nearbyCities.filter((city) => city.name !== currentCity?.name),
            ].filter(Boolean); // Remove valores null/undefined

            setWeatherDataList(allData);
            setSelectedCity(currentCity?.name || null);
            setLoading(false);
          },
          (error) => {
            console.warn("Permissão de localização negada:", error);
            // Fallback para cidades fixas se geolocalização falhar
            loadFallbackCities();
          }
        );
      } else {
        console.warn("Geolocalização não suportada pelo navegador.");
        loadFallbackCities();
      }
    };

    // Função fallback para carregar cidades fixas
    const loadFallbackCities = async () => {
      const defaultCities = ["Lisboa", "Porto", "Madrid", "Paris"];
      const weatherPromises = defaultCities.map((city) =>
        fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric&lang=pt_br`
        )
          .then((res) => res.json())
          .catch((err) => {
            console.error(`Erro ao buscar ${city}:`, err);
            return null;
          })
      );

      const results = await Promise.all(weatherPromises);
      const validResults = results.filter(Boolean);

      setWeatherDataList(validResults);
      setSelectedCity(validResults[0]?.name || null);
      setLoading(false);
    };

    loadWeatherData();
  }, []);

  const handleCardClick = (weatherData) => {
    setSelectedCity(weatherData.name);
  };

  return (
    <div className="dashboard-container">
      <h1>Weather Dashboard</h1>

      {loading ? (
        <p>Carregando dados...</p>
      ) : weatherDataList.length === 0 ? (
        <p>Nenhum dado de clima disponível</p>
      ) : (
        <>
          <div className="cards-grid">
            {weatherDataList.map((data) => (
              <WeatherCard
                key={data.id}
                weatherData={data}
                isLoading={false}
                onCardClick={handleCardClick}
                isSelected={selectedCity === data.name}
              />
            ))}
          </div>

          <ForecastSection selectedCity={selectedCity} />
        </>
      )}
    </div>
  );
}
