import "./flagname.css";
import { FaMapMarkerAlt } from "react-icons/fa";

export default function FlagName({ city, data }) {
    const country = data.sys.country;
    const imgLink = `https://flagsapi.com/${country}/flat/64.png`;

    const firstLetter = city.charAt(0).toUpperCase();
    const restLetter = city.slice(1);
    const cityName = firstLetter + restLetter;

    return (
        <div className="flag-name">
            <FaMapMarkerAlt />
            <h1>{cityName}</h1>
            <img src={imgLink} alt="Flag-Img" />
        </div>
    );
}
