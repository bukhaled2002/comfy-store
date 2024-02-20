import React from "react";

function FormCheckbox({ label, name, defaultValue, size }) {
  return (
    <div className="form-control items-center">
      <label htmlFor={name} className="label capitalize">
        <span className="label-text">{label}</span>
      </label>
      <input
        type="checkbox"
        name={name}
        defaultChecked={defaultValue}
        className={`checkbox checkbox-primary ${size}`}
      />
    </div>
  );
}

export default FormCheckbox;
