import React from "react";
import "../style/style.css";
import { useState, useEffect } from "react";

const Input = (props) => {
  // brands
  let [currentBrands, setCurrentBrands] = useState("");
  let [selectedBrand, setSelectedBrand] = useState("");
  // categories
  let [currentCategories, setCurrentCategories] = useState("");
  let [selectedCategory, setSelectedCategory] = useState("");
  // size
  let [currentInputSize, setCurrentInputSize] = useState("");
  let [currentSizes, setCurrentSizes] = useState("");

  // API BRANDS
  useEffect(() => {
    let fetchBrands = async () => {
      let username = "user31410";
      let apiKey = "0f12172e-9d0e-472e-80ca-1ec1d50c89e2";
      const response = await fetch(
        "https://size-calculator-api.sspinc.io/brands",
        {
          mode: "cors",
          credentials: "include",
          method: "GET",
          headers: {
            Authorization: "Basic " + btoa(`${username}:${apiKey}`),
          },
        }
      );
      const brands = await response.json();
      setCurrentBrands(brands);
    };
    fetchBrands();
  }, []);

  // MAPPING BRAND NAMES
  let getBrand = () => {
    if (currentBrands.brands) {
      return currentBrands.brands.map((x) => {
        return (
          <option value={x.id} key={x.id}>
            {x.name}
          </option>
        );
      });
    }
  };

  // GETTING SELECTED BRAND ID
  let getSelectedBrand = (e) => {
    setSelectedBrand(e.target.value);
  };
  // console.log(selectedBrand);

  // API CATEGORIES
  useEffect(() => {
    let fetchCategories = async () => {
      let username = "user31410";
      let apiKey = "0f12172e-9d0e-472e-80ca-1ec1d50c89e2";
      const response = await fetch(
        `https://size-calculator-api.sspinc.io/categories?brand_id=${selectedBrand}`,
        {
          mode: "cors",
          credentials: "include",
          method: "GET",
          headers: {
            Authorization: "Basic " + btoa(`${username}:${apiKey}`),
          },
        }
      );
      const categories = await response.json();
      setCurrentCategories(categories);
    };
    fetchCategories();
  }, [selectedBrand]);

  // MAPPING CATEGORIES
  let getCategory = () => {
    if (currentCategories) {
      return currentCategories.categories.map((x) => {
        return (
          <option key={x.id} value={x.id}>
            {x.name}
          </option>
        );
      });
    }
  };

  // GETTING SELECTED CATEGORY
  let getSelectedCategory = (e) => {
    setSelectedCategory(e.target.value);
  };
  // console.log(selectedCategory);
  // console.log(currentInputSize);

  // GET SIZE INPUT
  let getInputSize = (e) => {
    setCurrentInputSize(e.target.value);
  };
  // console.log(currentInputSize);

  // API CALCULATE ON CLICK
  let getSizes = async () => {
    if (!selectedCategory || !currentInputSize) {
      alert("Please fill out the form");
    } else {
      let username = "user31410";
      let apiKey = "0f12172e-9d0e-472e-80ca-1ec1d50c89e2";
      const response = await fetch(
        `https://size-calculator-api.sspinc.io/sizes?brand_id=${selectedBrand}&category_id=${selectedCategory}&measurement=${currentInputSize}`,
        {
          mode: "cors",
          credentials: "include",
          method: "GET",
          headers: {
            Authorization: "Basic " + btoa(`${username}:${apiKey}`),
          },
        }
      );
      const size = await response.json();
      // console.log(size.sizes.length);

      // CHECKING IF SIZE AVAILABLE
      if (size.sizes.length < 2) {
        alert("Size not available");
      } else {
        props.setParentSize(size);
        // ON CLICK CALCULATED STATE CHANGE
        props.setCalculated(true);
      }
    }
  };

  // JSX
  return (
    <div className="input-container">
      {/*brand dropdown */}
      <div className="brand-div">
        <select onChange={getSelectedBrand}>
          <option selected disabled value="">
            Select a brand
          </option>
          {getBrand()}
        </select>
        {/* custom arrow */}
        <svg
          className="custom-arrow"
          viewBox="0 0 11 9"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M5.53617 8.99272L0.747868 0.791069L10.2449 0.745107L5.53617 8.99272Z"
            fill="#B4C6C1"
          />
        </svg>
        <span className="select-line"></span>
      </div>

      {/*category dropdown */}
      <div className="category-div">
        <select onChange={getSelectedCategory}>
          <option selected disabled value="">
            Select a category
          </option>
          {getCategory()}
        </select>
        {/* custom arrow */}
        <svg
          className="custom-arrow"
          viewBox="0 0 11 9"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M5.53617 8.99272L0.747868 0.791069L10.2449 0.745107L5.53617 8.99272Z"
            fill="#B4C6C1"
          />
        </svg>
        <span className="select-line"></span>
      </div>

      {/* my size input  */}
      <div className="my-size">
        My size is
        <span>
          <input
            value={currentInputSize}
            onChange={getInputSize}
            className="size-input"
            type="number"
            min="0"
            name="size-input"
            id="size-input"
          />
        </span>
        inches
      </div>
      {/* calculate size button */}
      <div className="footer">
        <button onClick={getSizes} className="btn">
          CALCULATE
        </button>
      </div>
    </div>
  );
};

export default Input;
