export default function WeatherCard({
  weatherData,
  isLoading,
  onCardClick,
  isSelected,
}) {
  if (isLoading) {
    return <div className="card-container loading">Carregando...</div>;
  }

  if (!weatherData) {
    return <div className="card-container error">Sem dados</div>;
  }

  return (
    <section
      className={`card-container ${isSelected ? "selected" : ""}`}
      onClick={() => onCardClick(weatherData)}
    >
      <div className="temperature-container">
        <img
          src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
          alt={weatherData.weather[0].description}
        />
        <div className="data-container">
          <ul>
            <li>
              <div className="city-name">{weatherData?.name}</div>
            </li>
            <li>
              <div className="weather-description">
                {weatherData?.weather[0]?.description}
              </div>
            </li>
            <li>
              <div className="temperature-data">
                Temperatura: {weatherData?.main?.temp}°C
              </div>
            </li>
            <li>
              <div>Sensação Térmica: {weatherData?.main?.feels_like}°C</div>
            </li>
            <li>
              <div>Vento: {weatherData?.wind?.speed} km/h</div>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}

// {
//   "name": "Lisboa",              // ← Nome da cidade
//   "main": {
//     "temp": 23.58,               // ← Temperatura atual
//     "feels_like": 23.87,         // ← Sensação térmica
//     "humidity": 72               // ← Humidade
//   },
//   "weather": [{
//     "description": "céu pouco nublado",  // ← Descrição
//     "icon": "02d"                        // ← Código do ícone
//   }],
//   "wind": {
//     "speed": 4.63                // ← Velocidade do vento
//   }
// }
