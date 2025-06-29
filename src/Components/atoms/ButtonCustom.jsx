import React from "react";
import "./ButtonCustom.css";

const ButtonCustom = ({
    label,
    size = "medium",
    variant = "primary",
    disabled = false,
    icon = null, 
    iconPosition = "right", // o 'left' si querés en otro caso
    onClick,
}) => {
    const className = `boton ${size} ${variant} ${disabled ? "disabled" : ""}`;

    return (
        <button className={className} onClick={onClick} disabled={disabled}>
            {icon && iconPosition === "left" && <span className="icon">{icon}</span>}
            <span>{label}</span>
            {icon && iconPosition === "right" && <span className="icon">{icon}</span>}
        </button>
    );
};

export default ButtonCustom;
