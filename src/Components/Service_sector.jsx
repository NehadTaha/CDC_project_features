import React, { useState, useEffect } from "react";
import "../Styles/style.css";
import PropTypes from "prop-types";

const ServiceSector = ({ handleSelectorChange }) => {
    const [serviceData, setServiceData] = useState([]);
    const [selectedSector, setSelectedSector] = useState("");
    const [isOnline, setIsOnline] = useState(navigator.onLine);
    ServiceSector.propTypes = {
        handleSelectorChange: PropTypes.func.isRequired,
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(
                    //Notice you have to use the correct URL to fetch the data you have to use the same as the municipa;lituies and targets
                    "https://cdcmemphremagog.com/wp-content/plugins/cdc-custom-map/public/api.php"
                );

                if (!response.ok) {
                    throw new Error("Failed to fetch data");
                }

                const data = (await response.json()) || [];
                const sectorsArray = data.service_sector || [];
                setServiceData(sectorsArray);
                localStorage.setItem("serviceData", JSON.stringify(sectorsArray));
            } catch (error) {
                console.error("Error fetching data:", error);
                let serviceData = localStorage.getItem("serviceData");
                serviceData = JSON.parse(serviceData);
                setServiceData(serviceData);
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
        setSelectedSector(selectedValue);
        handleSelectorChange(selectedValue); // Send the selected sector value to the parent component
    };

    return (
        <div data-testid="service-posts">
            {/* Service Sector Dropdown */}
            <select
                className="select"
                data-testid="select-sector"
                value={selectedSector}
                onChange={handleChange}
            >
                <option value="">Secteurs d&apos;activité</option>
                {serviceData.map((sector, index) => (
                    <option key={index} value={Object.keys(sector)[0]}>
                        {Object.values(sector)[0]}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default ServiceSector;
