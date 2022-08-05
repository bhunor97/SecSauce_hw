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
      let username = "user3472";
      let apiKey = "0f6aa487-0f3b-41dc-95be-86c19dd0b98d";
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

  // API CATEGORIES
  useEffect(() => {
    let fetchCategories = async () => {
      let username = "user3472";
      let apiKey = "0f6aa487-0f3b-41dc-95be-86c19dd0b98d";
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

  // GET SIZE INPUT
  let getInputSize = (e) => {
    if (e.target.value) {
      setCurrentInputSize(e.target.value);
    }
  };
  // console.log(currentInputSize);

  // API CALCULATE ON CLICK
  let getSizes = async () => {
    let username = "user3472";
    let apiKey = "0f6aa487-0f3b-41dc-95be-86c19dd0b98d";
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
    // setCurrentSizes(size);
    props.setParentSize(size);

    // ON CLICK CALCULATED STATE CHANGE
    if ((selectedBrand, selectedCategory, props.setParentSize)) {
      props.setCalculated(true);
    }
  };
  // console.log(currentSizes.sizes);

  // JSX
  return (
    <div className="input-container">
      {/*brand dropdown */}
      <select onChange={getSelectedBrand}>
        <option selected disabled value="">
          Select a brand
        </option>
        {getBrand()}
      </select>
      {/*category dropdown */}
      <select onChange={getSelectedCategory}>
        <option selected disabled value="">
          Select a category
        </option>
        {getCategory()}
      </select>
      {/* my size input  */}
      <div className="my-size">
        My size is
        <span>
          <input
            value={currentInputSize}
            onChange={getInputSize}
            className="size-input"
            type="number"
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
