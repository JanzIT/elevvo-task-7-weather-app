import { useState, useEffect } from "react";

export default function ForecastSection({ selectedCity }) {
  const [forecastData, setForecastData] = useState([]);
  const [loading, setLoading] = useState(false);

  const API_KEY = "d5038b83e270e2aec7096b7377b08cc5";

  // Função para processar e agrupar dados por dia
  const processForecastData = (forecastList) => {
    const dailyData = {};

    forecastList.forEach((item) => {
      const date = item.dt_txt.split(" ")[0];

      if (!dailyData[date]) {
        dailyData[date] = {
          date,
          temps: [],
          weather: item.weather[0],
          icon: item.weather[0].icon,
        };
      }

      dailyData[date].temps.push(item.main.temp);

      // Se for horário do meio-dia (12:00), usar este ícone
      if (item.dt_txt.includes("12:00:00")) {
        dailyData[date].weather = item.weather[0];
        dailyData[date].icon = item.weather[0].icon;
      }
    });

    // Converter para array e calcular min/max
    return Object.values(dailyData)
      .map((day) => ({
        ...day,
        tempMin: Math.round(Math.min(...day.temps)),
        tempMax: Math.round(Math.max(...day.temps)),
      }))
      .slice(0, 3); // Apenas 3 dias
  };

  const fetchForecastData = async (cityName) => {
    if (!cityName) return;

    setLoading(true);
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${API_KEY}&units=metric&lang=pt&cnt=24`
      );
      const data = await response.json();

      // Processar os dados antes de salvar no state
      const processedData = processForecastData(data.list);
      setForecastData(processedData);
      setLoading(false);
    } catch (error) {
      console.error("Erro ao buscar forecast:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchForecastData(selectedCity);
  }, [selectedCity]);

  if (!selectedCity) {
    return (
      <div className="forecast-message">
        Selecione uma cidade para ver a previsão
      </div>
    );
  }

  if (loading) {
    return (
      <div className="forecast-section loading">Carregando previsão...</div>
    );
  }

  return (
    <div className="forecast-section">
      <h2>Previsão de 3 dias para {selectedCity}</h2>
      <div className="forecast-grid">
        {forecastData.map((day, index) => (
          <div key={day.date} className="forecast-card">
            <div className="forecast-date">
              {index === 0
                ? "Hoje"
                : index === 1
                ? "Amanhã"
                : new Date(day.date).toLocaleDateString("pt-BR", {
                    weekday: "short",
                  })}
            </div>
            <img
              src={`https://openweathermap.org/img/wn/${day.icon}@2x.png`}
              alt={day.weather.description}
            />
            <div className="forecast-temps">
              <span className="temp-max">{day.tempMax}°</span>
              <span className="temp-min">{day.tempMin}°</span>
            </div>
            <div className="forecast-description">
              {day.weather.description}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
