import { useState, useEffect } from 'react';
import { fetchWeatherData } from '../services/weatherService';

interface WeatherData {
  location: string;
  temperature: number;
  condition: string;
  humidity: number;
  windSpeed: number;
  icon: string;
}

function Weather() {
  const [weather, setWeather] = useState<WeatherData>({
    location: 'Cusco, Perú',
    temperature: 18,
    condition: 'Cargando...',
    humidity: 65,
    windSpeed: 12,
    icon: 'cloudy'
  });

  const [currentTime, setCurrentTime] = useState(new Date());
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const loadWeatherData = async () => {
      try {
        setIsLoading(true);
        const data = await fetchWeatherData();
        setWeather(data);
      } catch (error) {
        console.error('Error cargando datos del clima:', error);
      } finally {
        setIsLoading(false);
      }
    };

    // Cargar datos inicialmente
    loadWeatherData();

    // Actualizar cada 10 minutos
    const weatherTimer = setInterval(loadWeatherData, 10 * 60 * 1000);

    return () => clearInterval(weatherTimer);
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('es-ES', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('es-ES', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getWeatherIcon = (iconType: string) => {
    switch (iconType) {
      case 'sunny':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" width="48px" height="48px" fill="currentColor" viewBox="0 0 256 256" className="text-yellow-500">
            <path d="M120,40V16a8,8,0,0,1,16,0V40a8,8,0,0,1-16,0Zm72,88a64,64,0,1,1-64-64A64.07,64.07,0,0,1,192,128Zm-16,0a48,48,0,1,0-48,48A48.05,48.05,0,0,0,176,128ZM58.34,69.66A8,8,0,0,0,69.66,58.34l-16-16A8,8,0,0,0,42.34,53.66Zm0,116.68-16,16a8,8,0,0,0,11.32,11.32l16-16a8,8,0,0,0-11.32-11.32ZM192,72a8,8,0,0,0,5.66-2.34l16-16a8,8,0,0,0-11.32-11.32l-16,16A8,8,0,0,0,192,72Zm5.66,114.34a8,8,0,0,0-11.32,11.32l16,16a8,8,0,0,0,11.32-11.32ZM48,128a8,8,0,0,0-8-8H16a8,8,0,0,0,0,16H40A8,8,0,0,0,48,128Zm80,80a8,8,0,0,0-8,8v24a8,8,0,0,0,16,0V216A8,8,0,0,0,128,208Zm112-88H216a8,8,0,0,0,0,16h24a8,8,0,0,0,0-16Z"></path>
          </svg>
        );
      case 'mostly-sunny':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" width="48px" height="48px" fill="currentColor" viewBox="0 0 256 256" className="text-yellow-400">
            <path d="M120,40V16a8,8,0,0,1,16,0V40a8,8,0,0,1-16,0Zm8,24a64,64,0,0,1,64,64c0,32-24,58.86-56,63.24V216a8,8,0,0,1-16,0V191.24C88,186.86,64,160,64,128A64,64,0,0,1,128,64Z"></path>
          </svg>
        );
      case 'partly-cloudy':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" width="48px" height="48px" fill="currentColor" viewBox="0 0 256 256" className="text-gray-400">
            <path d="M164,72A76.2,76.2,0,0,0,92.8,121.6,52,52,0,0,0,76,224h88a76,76,0,0,0,0-152ZM164,208H76a36,36,0,0,1-1.3-71.91A8,8,0,0,0,81.31,128H88a8,8,0,0,0,8-8,60,60,0,1,1,60,60Z"></path>
          </svg>
        );
      case 'cloudy':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" width="48px" height="48px" fill="currentColor" viewBox="0 0 256 256" className="text-gray-500">
            <path d="M160,40a88.09,88.09,0,0,1,81.06,128.64A64,64,0,0,1,200,232H88a64,64,0,1,1,8.59-127.6A88,88,0,0,1,160,40Zm0,16a72.08,72.08,0,0,0-71.07,64.28A8,8,0,0,1,81,128a48,48,0,0,0-1,96H200a48,48,0,0,0,7.84-95.61,8,8,0,0,1-5.16-7.7A72.08,72.08,0,0,0,160,56Z"></path>
          </svg>
        );
      case 'rain':
      case 'light-rain':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" width="48px" height="48px" fill="currentColor" viewBox="0 0 256 256" className="text-blue-500">
            <path d="M116,228a12,12,0,1,1-12-12A12,12,0,0,1,116,228ZM152,204a12,12,0,1,0,12,12A12,12,0,0,0,152,204Zm72-16a12,12,0,1,0,12,12A12,12,0,0,0,224,188ZM160,40a88.09,88.09,0,0,1,81.06,128.64A64,64,0,0,1,200,232H88a64,64,0,1,1,8.59-127.6A88,88,0,0,1,160,40Z"></path>
          </svg>
        );
      case 'heavy-rain':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" width="48px" height="48px" fill="currentColor" viewBox="0 0 256 256" className="text-blue-700">
            <path d="M116,228a12,12,0,1,1-12-12A12,12,0,0,1,116,228ZM152,204a12,12,0,1,0,12,12A12,12,0,0,0,152,204Zm72-16a12,12,0,1,0,12,12A12,12,0,0,0,224,188ZM80,228a12,12,0,1,1-12-12A12,12,0,0,1,80,228ZM188,204a12,12,0,1,0,12,12A12,12,0,0,0,188,204Z"></path>
          </svg>
        );
      case 'snow':
      case 'heavy-snow':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" width="48px" height="48px" fill="currentColor" viewBox="0 0 256 256" className="text-blue-200">
            <path d="M224,64H208L189.34,21.34a8,8,0,0,0-13.86,8L185.89,56H134.11l10.41-26.66a8,8,0,0,0-13.86-8L111,64H96a8,8,0,0,0,0,16h8v80H96a8,8,0,0,0,0,16h15l-19.66,42.66a8,8,0,1,0,13.86,8L115.61,200h52.78l10.41,26.66a8,8,0,1,0,13.86-8L173,200h15a8,8,0,0,0,0-16h-8V104h8a8,8,0,0,0,0-16Z"></path>
          </svg>
        );
      case 'thunderstorm':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" width="48px" height="48px" fill="currentColor" viewBox="0 0 256 256" className="text-purple-600">
            <path d="M96,240a8,8,0,0,1-8-8V224H80a8,8,0,0,1-6.4-12.8l72-96A8,8,0,0,1,152,112h48V104a8,8,0,0,1,16,0v8h8a8,8,0,0,1,6.4,12.8l-72,96A8,8,0,0,1,152,224H104v8A8,8,0,0,1,96,240Z"></path>
          </svg>
        );
      case 'fog':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" width="48px" height="48px" fill="currentColor" viewBox="0 0 256 256" className="text-gray-400">
            <path d="M248,184a8,8,0,0,1-8,8H16a8,8,0,0,1,0-16H240A8,8,0,0,1,248,184Zm-8,40H16a8,8,0,0,0,0,16H240a8,8,0,0,0,0-16ZM160,40a88.09,88.09,0,0,1,81.06,128.64A64,64,0,0,1,200,232H184a8,8,0,0,1,0-16h16a48,48,0,0,0,7.84-95.61,8,8,0,0,1-5.16-7.7A72.08,72.08,0,0,0,160,56a71.87,71.87,0,0,0-71.09,64.28A8,8,0,0,1,81,128H72a48,48,0,0,0,0,96h8a8,8,0,0,1,0,16H72a64,64,0,1,1,8.59-127.6A88,88,0,0,1,160,40Z"></path>
          </svg>
        );
      default:
        return (
          <svg xmlns="http://www.w3.org/2000/svg" width="48px" height="48px" fill="currentColor" viewBox="0 0 256 256" className="text-gray-500">
            <path d="M160,40a88.09,88.09,0,0,1,81.06,128.64A64,64,0,0,1,200,232H88a64,64,0,1,1,8.59-127.6A88,88,0,0,1,160,40Zm0,16a72.08,72.08,0,0,0-71.07,64.28A8,8,0,0,1,81,128a48,48,0,0,0-1,96H200a48,48,0,0,0,7.84-95.61,8,8,0,0,1-5.16-7.7A72.08,72.08,0,0,0,160,56Z"></path>
          </svg>
        );
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-4">
      {/* Título */}
      <div className="flex items-center gap-2 mb-4">
        <div className="text-[#0d141c]" data-icon="Clock" data-size="20px">
          <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" fill="currentColor" viewBox="0 0 256 256">
            <path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.1,88.1,0,0,1,128,216Zm64-88a8,8,0,0,1-8,8H128a8,8,0,0,1-8-8V72a8,8,0,0,1,16,0v48h48A8,8,0,0,1,192,128Z"></path>
          </svg>
        </div>
        <h3 className="text-lg font-semibold text-[#0d141c]">Hora y Clima</h3>
      </div>

      {/* Fecha y Hora */}
      <div className="mb-4 pb-4 border-b border-gray-100">
        <div className="text-2xl font-bold text-[#0d141c] mb-1">
          {formatTime(currentTime)}
        </div>
        <div className="text-sm text-gray-600 capitalize">
          {formatDate(currentTime)}
        </div>
      </div>

      {/* Clima */}
      <div className="space-y-3">
        {/* Ubicación */}
        <div className="flex items-center gap-2">
          <div className="text-[#0d141c]" data-icon="MapPin" data-size="16px">
            <svg xmlns="http://www.w3.org/2000/svg" width="16px" height="16px" fill="currentColor" viewBox="0 0 256 256">
              <path d="M128,64a40,40,0,1,0,40,40A40,40,0,0,0,128,64Zm0,64a24,24,0,1,1,24-24A24,24,0,0,1,128,128Zm0-112a88.1,88.1,0,0,0-88,88c0,31.4,14.51,64.68,42,96.25a254.19,254.19,0,0,0,41.45,38.3,8,8,0,0,0,9.18,0A254.19,254.19,0,0,0,174,200.25c27.45-31.57,42-64.85,42-96.25A88.1,88.1,0,0,0,128,16Zm0,206c-16.53-13-72-60.75-72-118a72,72,0,0,1,144,0C200,161.23,144.53,209,128,222Z"></path>
            </svg>
          </div>
          <span className="text-sm font-medium text-[#0d141c]">{weather.location}</span>
        </div>

        {/* Temperatura y condición */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {getWeatherIcon(weather.icon)}
            <div>
              <div className="text-xl font-bold text-[#0d141c]">
                {isLoading ? '...' : `${weather.temperature}°C`}
              </div>
              <div className="text-sm text-gray-600">
                {isLoading ? 'Cargando...' : weather.condition}
              </div>
            </div>
          </div>
        </div>

        {/* Detalles adicionales */}
        <div className="grid grid-cols-2 gap-3 pt-3 border-t border-gray-100">
          <div className="flex items-center gap-2">
            <div className="text-[#0d141c]" data-icon="Drop" data-size="16px">
              <svg xmlns="http://www.w3.org/2000/svg" width="16px" height="16px" fill="currentColor" viewBox="0 0 256 256">
                <path d="M174,47.75a254.19,254.19,0,0,0-41.45-38.3,8,8,0,0,0-9.18,0A254.19,254.19,0,0,0,82,47.75C54.51,79.32,40,112.6,40,144a88,88,0,0,0,176,0C216,112.6,201.49,79.32,174,47.75ZM128,216a72.08,72.08,0,0,1-72-72c0-57.23,55.47-105,72-118,16.53,13,72,60.75,72,118A72.08,72.08,0,0,1,128,216Z"></path>
              </svg>
            </div>
            <div>
              <div className="text-xs text-gray-500">Humedad</div>
              <div className="text-sm font-medium text-[#0d141c]">{weather.humidity}%</div>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <div className="text-[#0d141c]" data-icon="Wind" data-size="16px">
              <svg xmlns="http://www.w3.org/2000/svg" width="16px" height="16px" fill="currentColor" viewBox="0 0 256 256">
                <path d="M24,104a8,8,0,0,1,8-8H192a16,16,0,0,0,0-32,16,16,0,0,0-11.31,4.69,8,8,0,1,1-11.32-11.38A32,32,0,0,1,192,48a32,32,0,0,1,0,64H32A8,8,0,0,1,24,104Zm200,24H184a8,8,0,0,0,0,16h40a16,16,0,0,1,0,32,16,16,0,0,1-11.31-4.69,8,8,0,1,0-11.32,11.38A32,32,0,0,0,224,192a32,32,0,0,0,0-64Zm-64,48H32a8,8,0,0,0,0,16H160a16,16,0,0,1,0,32,16,16,0,0,1-11.31-4.69,8,8,0,1,0-11.32,11.38A32,32,0,0,0,160,240a32,32,0,0,0,0-64Z"></path>
              </svg>
            </div>
            <div>
              <div className="text-xs text-gray-500">Viento</div>
              <div className="text-sm font-medium text-[#0d141c]">{weather.windSpeed} km/h</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Weather;