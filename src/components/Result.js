import React from "react";

const Result = (props) => {
  return (
    <>
      <div className="result-container">
        <div className="result-text">Your size is</div>
        <div className="result-values">
          {props.parentSize.sizes[0].label} or {props.parentSize.sizes[1].label}
        </div>
        <div className="result-footer">
          <button
            onClick={() => {
              props.setCalculated(false);
            }}
            className="btn"
          >
            OK
          </button>
        </div>
      </div>
    </>
  );
};

export default Result;
