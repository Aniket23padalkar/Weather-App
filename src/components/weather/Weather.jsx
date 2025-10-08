import { useEffect, useState } from "react";
import Search from "../search/Search";
import "./weather.css";
import FlagName from "../FlagName/FlagName";
import searchCity from "../../assets/search-city.png";
import WeatherDetails from "../WeatherDetails/WeatherDetails";
import notFound from "../../assets/not-found.png";

export default function Weather() {
    const [search, setSearch] = useState("");
    const [city, setCity] = useState("");
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    async function fetchWeatherData() {
        const id = "aecc7a363f5593d74da60ed8265e61d2";

        try {
            setLoading(true);
            const response = await fetch(
                `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${id}&units=metric`
            );
            if (!response.ok)
                throw new Error(`HTTP service Error: ${response.status}`);

            const result = await response.json();

            setData(result);
            setLoading(false);
            setError(null);
        } catch (e) {
            setError(e.message);
            setLoading(false);
        }
    }

    function handleSearch(value) {
        setSearch(value);
    }

    function handleClick() {
        if (!search) return;
        setCity(search);
        setSearch("");
    }

    useEffect(() => {
        if (city) {
            fetchWeatherData();
        }
    }, [city]);

    return (
        <div className="weather">
            <Search
                handleSearch={handleSearch}
                handleClick={handleClick}
                search={search}
                setCity={setCity}
                setSearch={setSearch}
            />
            {loading ? (
                <h1
                    style={{
                        position: "absolute",
                        left: "25%",
                        top: "40%",
                        fontSize: "2rem",
                    }}
                >
                    Loading....
                </h1>
            ) : null}
            {!loading && error && (
                <img id="not-found" src={notFound} alt="Not-found" />
            )}

            {!loading && !error && data && (
                <>
                    <FlagName city={city} data={data} />
                    <WeatherDetails data={data} />
                </>
            )}

            {!loading && !error && !data && (
                <img id="search-city" src={searchCity} alt="search-img" />
            )}
        </div>
    );
}
