import React, { forwardRef } from "react";
import "./ButtonCustom.css";

const ButtonCustom = forwardRef(({
    label,
    size = "medium",
    variant = "primary",
    disabled = false,
    icon = null, 
    iconPosition = "right", 
    onClick,
}, ref) => {
    const className = `boton ${size} ${variant} ${disabled ? "disabled" : ""}`;

    return (
        <button ref={ref} className={className} onClick={onClick} disabled={disabled}>
            {icon && iconPosition === "left" && <span className="icon">{icon}</span>}
            <span>{label}</span>
            {icon && iconPosition === "right" && <span className="icon">{icon}</span>}
        </button>
    );
});

export default ButtonCustom;
