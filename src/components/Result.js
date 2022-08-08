import React from "react";

const Result = (props) => {
  // CHECKING RESULT LENGTH
  let resultFunc = () => {
    if (props.parentSize.sizes.length == 2) {
      return `${props.parentSize.sizes[0].label} or ${props.parentSize.sizes[1].label}`;
    } else if (props.parentSize.sizes.length == 1) {
      return `${props.parentSize.sizes[0].label}`;
    }
  };

  return (
    <>
      <div className="result-container">
        <div className="result-text">Your size is</div>
        <div className="result-values">{resultFunc()}</div>
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
