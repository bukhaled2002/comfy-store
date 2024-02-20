import React from "react";

function FormInput({ label, name, type, defaultValue, size }) {
  return (
    <div className="form-control">
      <label htmlFor={name} className="label">
        <p className="label-text capitalize">{label}</p>
      </label>
      <input
        className={`input input-bordered ${size}`}
        type={type}
        name={name}
        defaultValue={defaultValue}
      />
    </div>
  );
}

export default FormInput;
