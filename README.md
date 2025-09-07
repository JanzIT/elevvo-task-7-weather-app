# Weather Dashboard 🌤️

A modern and responsive weather dashboard built with React and Vite, using the OpenWeatherMap API to display real-time weather information.

## 🚀 Features

- **Automatic Geolocation**: Automatically detects your location and displays local weather
- **Multiple Cities**: Shows weather for nearby or predefined cities
- **3-Day Forecast**: Detailed forecast with maximum and minimum temperatures
- **Responsive Interface**: Optimized for desktop, tablet, and mobile
- **Interactive Selection**: Click on any city to see its forecast
- **Modern Design**: Glassmorphism interface with smooth animations

## 🛠️ Technologies Used

- **React 18** - JavaScript library for user interfaces
- **Vite** - Modern and fast build tool
- **OpenWeatherMap API** - Real-time weather data
- **CSS3** - Styling with gradients, backdrop-filter, and grid
- **Geolocation API** - Automatic location detection

## 📦 Installation

1. Clone the repository:
```bash
git clone https://github.com/JanzIT/elevvo-task-7-weather-app.git
cd elevvo-task-7-weather-app
```

2. Install dependencies:
```bash
npm install
```

3. Configure API Key:
   - Create a free account at [OpenWeatherMap](https://openweathermap.org/api)
   - Replace the `API_KEY` in `WeatherDashboard.jsx` and `ForecastSection.jsx` files

4. Run the project:
```bash
npm run dev
```

## 🏗️ Project Structure

```
src/
├── components/
│   ├── WeatherCard/
│   │   └── WeatherCard.jsx       # Individual city card
│   ├── ForecastSection/
│   │   └── ForecastSection.jsx   # 3-day forecast
│   └── WeatherDashboard/
│       └── WeatherDashboard.jsx  # Main component
├── App.jsx                       # Root component
├── App.css                       # Global styles
└── main.jsx                      # Application entry point
```

## 🌟 Key Features

### Automatic Location Detection
The app uses the Geolocation API to automatically detect your current location and display local weather data as the default selection.

### Smart City Selection
- Shows current city weather first
- Displays nearby cities automatically
- Fallback to predefined cities if geolocation fails

### Interactive Weather Cards
- Click any city card to select it
- Visual feedback for selected city
- Hover effects and smooth transitions

### Comprehensive Weather Data
- Current temperature and "feels like"
- Weather description with icons
- Wind speed
- 3-day forecast with min/max temperatures

### Mobile-First Design
- Fully responsive layout
- Touch-friendly interface
- Optimized for all screen sizes

## 🎨 Design Approach

The design follows modern web standards with:
- **Glassmorphism effects** using backdrop-filter
- **Gradient backgrounds** for visual depth  
- **Card-based layout** for better organization
- **Smooth animations** for enhanced UX
- **High contrast** for accessibility

## 🔧 API Integration

### Current Weather Endpoint
```javascript
https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&lang=en&appid=${API_KEY}
```

### Forecast Endpoint
```javascript
https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${API_KEY}&units=metric&lang=en&cnt=24
```

### Data Processing
The forecast data is processed to group predictions by day and calculate daily min/max temperatures using JavaScript's `Math.min()` and `Math.max()` functions.

## 🚀 Live Demo

[View Live Demo](https://elevvo-task-7-weather-app.vercel.app/)

## 📱 Responsive Design

The application is fully responsive and works seamlessly across:
- **Desktop** (1200px+)
- **Tablet** (768px - 1199px)  
- **Mobile** (320px - 767px)

## 🔄 Error Handling

- Graceful fallback when geolocation is denied
- Loading states during API calls
- Error messages for failed requests
- Fallback cities when location detection fails

## 🏆 Project Context

This weather dashboard was developed as **Task 7** of the Elevvo Pathways internship program, demonstrating:
- API integration and data fetching
- React component architecture
- Responsive design implementation
- Modern CSS techniques
- User experience optimization

## 👨‍💻 About the Developer

Developed by a Software Engineering student passionate about creating modern, user-friendly web applications. Currently advancing skills in Node.js while working and studying.

## 🤝 Contributing

Feel free to fork this project and submit pull requests for any improvements.

## 📄 License

This project is open source and available under the MIT License.
