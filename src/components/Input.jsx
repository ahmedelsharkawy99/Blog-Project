import React from "react";

const Input = ({ onChange, type, placeholder, ariaDescribedby }) => {
  return (
    <div className="mb-3">
      <input
        type={type}
        className="form-control"
        name={type}
        placeholder={placeholder ? placeholder : ""}
        aria-describedby={ariaDescribedby ? ariaDescribedby : ""}
        onChange={onChange}
      />
    </div>
  );
};

export default Input;
