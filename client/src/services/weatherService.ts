interface WeatherResponse {
  current: {
    time: string;
    temperature_2m: number;
    relative_humidity_2m: number;
    wind_speed_10m: number;
    weather_code: number;
  };
  current_units: {
    temperature_2m: string;
    relative_humidity_2m: string;
    wind_speed_10m: string;
  };
}

interface ProcessedWeatherData {
  location: string;
  temperature: number;
  condition: string;
  humidity: number;
  windSpeed: number;
  icon: string;
}

// Coordenadas de Cusco, Perú
const CUSCO_LAT = -13.53;
const CUSCO_LON = -71.97;

// Mapeo de códigos WMO a condiciones y iconos
const getWeatherCondition = (code: number): { condition: string; icon: string } => {
  const weatherMap: { [key: number]: { condition: string; icon: string } } = {
    0: { condition: 'Despejado', icon: 'sunny' },
    1: { condition: 'Mayormente despejado', icon: 'mostly-sunny' },
    2: { condition: 'Parcialmente nublado', icon: 'partly-cloudy' },
    3: { condition: 'Nublado', icon: 'cloudy' },
    45: { condition: 'Neblina', icon: 'fog' },
    48: { condition: 'Niebla', icon: 'fog' },
    51: { condition: 'Llovizna ligera', icon: 'light-rain' },
    53: { condition: 'Llovizna moderada', icon: 'light-rain' },
    55: { condition: 'Llovizna intensa', icon: 'rain' },
    61: { condition: 'Lluvia ligera', icon: 'light-rain' },
    63: { condition: 'Lluvia moderada', icon: 'rain' },
    65: { condition: 'Lluvia intensa', icon: 'heavy-rain' },
    71: { condition: 'Nieve ligera', icon: 'snow' },
    73: { condition: 'Nieve moderada', icon: 'snow' },
    75: { condition: 'Nieve intensa', icon: 'heavy-snow' },
    80: { condition: 'Chubascos ligeros', icon: 'rain' },
    81: { condition: 'Chubascos moderados', icon: 'rain' },
    82: { condition: 'Chubascos intensos', icon: 'heavy-rain' },
    95: { condition: 'Tormenta', icon: 'thunderstorm' },
    96: { condition: 'Tormenta con granizo ligero', icon: 'thunderstorm' },
    99: { condition: 'Tormenta con granizo intenso', icon: 'thunderstorm' }
  };

  return weatherMap[code] || { condition: 'Desconocido', icon: 'cloudy' };
};

export const fetchWeatherData = async (): Promise<ProcessedWeatherData> => {
  try {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${CUSCO_LAT}&longitude=${CUSCO_LON}&current=temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code&timezone=America/Lima`;
    
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`Error al obtener datos del clima: ${response.status}`);
    }

    const data: WeatherResponse = await response.json();
    const { condition, icon } = getWeatherCondition(data.current.weather_code);

    return {
      location: 'Cusco, Perú',
      temperature: Math.round(data.current.temperature_2m),
      condition,
      humidity: data.current.relative_humidity_2m,
      windSpeed: Math.round(data.current.wind_speed_10m),
      icon
    };
  } catch (error) {
    console.error('Error al obtener datos del clima:', error);
    
    // Datos de respaldo en caso de error
    return {
      location: 'Cusco, Perú',
      temperature: 18,
      condition: 'No disponible',
      humidity: 65,
      windSpeed: 12,
      icon: 'cloudy'
    };
  }
};