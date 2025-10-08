import { FaCloud } from "react-icons/fa";
import { FaDroplet, FaGauge } from "react-icons/fa6";
import "./weatherdetails.css";

export default function WeatherDetails({ data }) {
    const weatherImgCode = data.weather[0].icon;
    const weatherImgLink = `https://openweathermap.org/img/wn/${weatherImgCode}@4x.png`;

    return (
        <div className="weather-details">
            <div className="weather-img">
                <img src={weatherImgLink} alt="weather" />
            </div>
            <div className="temperature">
                <h1>{data.main.temp} ºC</h1>
                <h2>{data.weather[0].description}</h2>
            </div>
            <div className="temp-parameters">
                <ul>
                    <li>
                        <span>Clouds</span>
                        <FaCloud size={30} />
                        <span>{data.clouds.all}%</span>
                    </li>
                    <li>
                        <span>Humidity</span>
                        <FaDroplet size={30} />
                        <span>{data.main.humidity}%</span>
                    </li>
                    <li>
                        <span>Pressure</span>
                        <FaGauge size={30} />
                        <span>{data.main.pressure}hPa</span>
                    </li>
                </ul>
            </div>
        </div>
    );
}
