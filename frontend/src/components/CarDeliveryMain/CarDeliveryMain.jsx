import React, { useState, useEffect, useRef, useMemo } from "react";
import "./carDeliveryMain.css";
import { useRentiva } from "../../Context/context.jsx";
import CarCard from "../Car/CarCard";
import { IoFilter } from "react-icons/io5";
import { FaChevronDown } from "react-icons/fa6";

const CarDeliveryMain = () => {
  const { cars, loading, error } = useRentiva();
  const [filteredCars, setFilteredCars] = useState([]);
  const [selectedCarType, setSelectedCarType] = useState("all");
  const [selectedBrand, setSelectedBrand] = useState("all");
  const [openDropdown, setOpenDropdown] = useState(null);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpenDropdown(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const deliveryCars = useMemo(() => cars.filter((car) => car.title && car.engine && car.power && car.acceleration), [cars]);

  const handleDropdownToggle = (dropdownName) => {
    setOpenDropdown(openDropdown === dropdownName ? null : dropdownName);
  };

  const handleOptionClick = (dropdownName, value, setter) => {
    setter(value);
    setOpenDropdown(null);
  };
  const carTypes = ["all", "Sports", "Luxury", "SUV", "Convertible", "Sedan"];
  const brands = useMemo(
    () => [
      "all",
      ...new Set(
        deliveryCars
          .map((car) => {
            const brandName = car.title?.split(" ")[0];
            return brandName;
          })
          .filter(Boolean)
      ),
    ],
    [deliveryCars]
  );

  useEffect(() => {
    let filtered = deliveryCars;

    if (selectedCarType !== "all") {
      filtered = filtered.filter((car) => {
        const carTitle = car.title?.toLowerCase();
        if (selectedCarType === "Sports") {
          return carTitle?.includes("lamborghini") || carTitle?.includes("ferrari") || carTitle?.includes("mclaren") || carTitle?.includes("porsche");
        } else if (selectedCarType === "Luxury") {
          return carTitle?.includes("rolls") || carTitle?.includes("bentley") || carTitle?.includes("mercedes");
        } else if (selectedCarType === "SUV") {
          return carTitle?.includes("range") || carTitle?.includes("cayenne") || carTitle?.includes("urus");
        } else if (selectedCarType === "Convertible") {
          return carTitle?.includes("convertible") || carTitle?.includes("spyder") || carTitle?.includes("roadster");
        }
        return true;
      });
    }

    if (selectedBrand !== "all") {
      filtered = filtered.filter((car) => car.title?.toLowerCase().startsWith(selectedBrand.toLowerCase()));
    }

    setFilteredCars(filtered);
  }, [selectedCarType, selectedBrand, deliveryCars]);

  if (loading) {
    return (
      <div className="carDeliveryMain">
        <div className="carDeliveryMainContainer">
          <div className="loadingContainer">
            <p className="loadingText">Loading available cars for delivery...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="carDeliveryMain">
        <div className="carDeliveryMainContainer">
          <div className="errorContainer">
            <p className="errorText">Error: {error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="carDeliveryMain">
      <div className="carDeliveryMainContainer">
        {/* Filters Section */}
        <div className="carDeliveryMainFilters">
          <div className="carDeliveryMainFiltersContainer">
            <div className="filtersLabel">
              <p className="filtersText bai-jamjuree-regular">FILTERS</p>
            </div>

            <div className="carDeliveryMainFiltersContainerDiv" ref={dropdownRef}>
              {/* Car Type Filter */}
              <div className="filterDropdown">
                <div className={`filterDropdownButton ${openDropdown === "carType" ? "active" : ""}`} onClick={() => handleDropdownToggle("carType")}>
                  <span className="filterDropdownButtonText">{selectedCarType === "all" ? "Car Types" : selectedCarType}</span>
                  <FaChevronDown className={`filterDropdownButtonIcon ${openDropdown === "carType" ? "rotated" : ""}`} />
                </div>
                {openDropdown === "carType" && (
                  <div className="filterDropdownMenu">
                    {carTypes.map((type) => (
                      <div
                        key={type}
                        className={`filterDropdownMenuItem ${selectedCarType === type ? "selected" : ""}`}
                        onClick={() => handleOptionClick("carType", type, setSelectedCarType)}
                      >
                        {type === "all" ? "All Types" : type}
                      </div>
                    ))}
                  </div>
                )}
              </div>{" "}
              {/* Brand Filter */}
              <div className="filterDropdown">
                <div className={`filterDropdownButton ${openDropdown === "brand" ? "active" : ""}`} onClick={() => handleDropdownToggle("brand")}>
                  <span className="filterDropdownButtonText">{selectedBrand === "all" ? "Brands" : selectedBrand}</span>
                  <FaChevronDown className={`filterDropdownButtonIcon ${openDropdown === "brand" ? "rotated" : ""}`} />
                </div>
                {openDropdown === "brand" && (
                  <div className="filterDropdownMenu">
                    {brands.map((brand) => (
                      <div
                        key={brand}
                        className={`filterDropdownMenuItem ${selectedBrand === brand ? "selected" : ""}`}
                        onClick={() => handleOptionClick("brand", brand, setSelectedBrand)}
                      >
                        {brand === "all" ? "All Brands" : brand}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Title Section */}
        <div className="carDeliveryMainTitle">
          <div className="carDeliveryMainTitleContainer">
            <h2 className="carDeliveryMainTitleText bai-jamjuree-regular">List of cars available with delivery option:</h2>
          </div>
        </div>

        {/* Cars Grid */}
        <div className="carDeliveryMainCars">
          <div className="carDeliveryMainCarsContainer">
            {filteredCars.length > 0 ? (              filteredCars.map((car) => (
                <CarCard
                  key={car.id}
                  car={car}
                />
              ))
            ) : (
              <div className="noCarsContainer">
                <p className="noCarsText">No cars found matching your filters.</p>{" "}
                <button
                  className="resetFiltersButton"
                  onClick={() => {
                    setSelectedCarType("all");
                    setSelectedBrand("all");
                    setOpenDropdown(null);
                  }}
                >
                  Reset Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarDeliveryMain;
