import { useEffect, useState } from "react";
import "./search.css";
import { FaSearch } from "react-icons/fa";

export default function Search({ handleSearch, handleClick, search, setCity }) {
    const [suggestions, setSuggestions] = useState([]);

    async function fetchAutoCompelete() {
        try {
            const response = await fetch(
                `https://api.openweathermap.org/geo/1.0/direct?q=${search}&limit=${10}&appid=aecc7a363f5593d74da60ed8265e61d2`
            );

            let data = await response.json();
            data = data.filter((city) =>
                city.name.toLowerCase().startsWith(search.toLowerCase())
            );
            setSuggestions(data);
        } catch (e) {
            console.log(e);
        }
    }

    useEffect(() => {
        if (search.length > 2) {
            fetchAutoCompelete();
        }
    }, [search]);

    function handleSelect(cityObj) {
        setCity(cityObj.name);
        setSuggestions([]);
    }

    const suggestionsLi = suggestions.map((city, index) => {
        return (
            <li
                className="suggestions-li"
                key={index}
                onClick={() => handleSelect(city)}
            >
                <FaSearch style={{ marginRight: "0.5rem" }} size={12} />
                {city.name} {city.state ? `, ${city.state}` : ""}
                {`, ${city.country}`}
            </li>
        );
    });

    return (
        <div className="search">
            <div className="input-container">
                <input
                    id="search-input"
                    type="text"
                    placeholder="Search City..."
                    onChange={(e) => handleSearch(e.target.value)}
                    value={search}
                    onKeyDown={(e) => {
                        if (e.key == "Enter") handleClick();
                    }}
                    autoComplete="off"
                />
                <button onClick={handleClick} id="search-btn">
                    <FaSearch className="search-icon" />
                </button>
            </div>
            {search.length > 0 && (
                <ul className="suggestions">{suggestionsLi}</ul>
            )}
        </div>
    );
}
