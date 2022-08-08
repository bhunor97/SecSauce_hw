import React from "react";
import { useState } from "react";
import "../style/style.css";
import Header from "./Header";
import Input from "./Input";
import Result from "./Result";

const Container = () => {
  let [calculated, setCalculated] = useState(false);
  let [parentSize, setParentSize] = useState("");

  console.log(parentSize.sizes);

  return (
    <>
      <Header />
      <div className="container">
        {calculated == false ? (
          <Input
            calculated={calculated}
            setCalculated={setCalculated}
            parentSize={parentSize}
            setParentSize={setParentSize}
          />
        ) : (
          <Result
            calculated={calculated}
            setCalculated={setCalculated}
            parentSize={parentSize}
            setParentSize={setParentSize}
          />
        )}
      </div>
    </>
  );
};

export default Container;
