import React from "react";
import "./style.css";

interface CheckboxProps {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  onLabelClick?: () => void;
}

const Checkbox: React.FC<CheckboxProps> = ({
  label,
  checked,
  onChange,
  onLabelClick,
}) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.checked);
  };

  const handleLabelClick = () => {
    if (onLabelClick) {
      onLabelClick();
    }
  };

  return (
    <div className="checkbox-wrapper">
      <div className="checkbox-container">
        <input
          type="checkbox"
          checked={checked}
          onChange={handleChange}
          onClick={(e) => e.stopPropagation()} // Prevent label click event from being triggered
        />
        <span className="checkmark"></span>
      </div>
      <span className="label-text" onClick={handleLabelClick}>
        {label}
      </span>
    </div>
  );
};

export default Checkbox;
