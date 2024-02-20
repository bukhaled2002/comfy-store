import { useState } from "react";
import { formatPrice } from "../utils";

// eslint-disable-next-line react/prop-types
function FormRange({ label, name, size, price }) {
  let step = 1000;
  let maxPrice = 100000;
  const [amount, setAmount] = useState(price || maxPrice);
  console.log(price);
  return (
    <div className="form-control">
      <label htmlFor={name} className="label">
        <span className="label-text capitalize">{label}</span>
        <span className="label-text-alt capitalize text-[16px]">
          {formatPrice(amount) || maxPrice}
        </span>
      </label>
      <input
        type="range"
        name={name}
        step={step}
        min={0}
        max={maxPrice}
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        className={`range range-primary ${size}`}
      />
      <div className="label">
        <span className="label-text-alt">{formatPrice(0)}</span>
        <span className="label-text-alt font-bold capitalize">
          max :{formatPrice(maxPrice)}
        </span>
      </div>
    </div>
  );
}

export default FormRange;
