import React, { useState, useEffect } from "react";
import "../Styles/style.css";
import PropTypes from "prop-types";

const Municipalities = ({ handleSelectorChange }) => {
    const [municipalities, setMunicipalities] = useState([]);
    const [isOnline, setIsOnline] = useState(navigator.onLine);
    Municipalities.propTypes = {
        handleSelectorChange: PropTypes.func.isRequired,
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(
                    "https://cdcmemphremagog.com/wp-content/plugins/cdc-custom-map/public/api.php"
                );

                if (!response.ok) {
                    throw new Error("Failed to fetch data");
                }

                const data = await response.json();
                // Extract municipalities array from the API response
                const municipalitiesArray = data.municipalities
                    ? Object.entries(data.municipalities).map(([slug, title]) => ({
                        slug,
                        title,
                    }))
                    : [];
                setMunicipalities(municipalitiesArray);
                localStorage.setItem(
                    "municipalities",
                    JSON.stringify(municipalitiesArray)
                );
            } catch (error) {
                console.error("Error fetching data:", error);
                let municipalitiesArray = localStorage.getItem("municipalities");
                municipalitiesArray = JSON.parse(municipalitiesArray);
                setMunicipalities(municipalitiesArray);
            }
        };

        fetchData();
        const handleOnline = () => setIsOnline(true);
        const handleOffline = () => setIsOnline(false);

        window.addEventListener("online", handleOnline);
        window.addEventListener("offline", handleOffline);

        return () => {
            window.removeEventListener("online", handleOnline);
            window.removeEventListener("offline", handleOffline);
        };
    }, []);
    const handleChange = (event) => {
        const selectedValue = event.target.value;

        handleSelectorChange(selectedValue);
    };

    return (
        <div>
            {/* Municipalities Dropdown */}
            <select className="select" onChange={handleChange}>
                <option data-testid="select-municipality">Municipalité(s)</option>
                {municipalities.map((municipality, index) => (
                    <option key={index} value={municipality.slug}>
                        {municipality.title}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default Municipalities;
