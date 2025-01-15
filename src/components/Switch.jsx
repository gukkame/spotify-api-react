import React, { useState } from "react";

/**
 * A toggleable switch component that handles state changes
 * @param {function} props.onToggle - Callback function to handle toggle events
 * @param {function} props.onQueryChange - Callback function to handle query changes
 */
const Switch = ({ onToggle, onQueryChange }) => {
    const [isToggled, setIsToggled] = useState(false);

    /**
     * Handles toggling of the switch state
     */
    const handleToggle = () => {
        setIsToggled(!isToggled);
        onToggle(!isToggled);
    };

    /**
     * Handles key press events
     * @param {KeyboardEvent} e - The keyboard event object
     */
    const handleKeyPress = (e) => {
        if (e.key === "Enter") {
            onQueryChange(e.target.value);
        }
    };

    return (
        <div
            className="w-80 h-12 flex items-center rounded-full cursor-pointer transition-all duration-300 shadow-2xl border border-gray-300 relative"
            tabIndex="0"
        >
            <div className="absolute left-1/2 transform -translate-x-1/2">
                {isToggled ? (
                    <h2 className="text-green-500 ">Iecienītākie</h2>
                ) : (
                    <input
                        type="text"
                        placeholder="Meklēt... "
                        style={{ all: "unset" }}
                        onKeyDown={handleKeyPress}
                    />
                )}
            </div>
            <div
                className={`w-11 h-11 rounded-full shadow-lg transition-transform transform duration-500 flex items-center justify-center ${
                    isToggled
                        ? "translate-x-[273px] bg-gradient-to-r from-green-500 to-green-700 shadow-inner"
                        : "translate-x-0 bg-gradient-to-r from-yellow-500 to-yellow-700 shadow-lg"
                }`}
                onClick={handleToggle}
            >
                {!isToggled ? (
                    <img
                        src="src/assets/star-icon.png"
                        alt="Favourite Icon"
                        className="w-6 h-6 invert"
                    />
                ) : (
                    <img
                        src="src/assets/search-icon.png"
                        alt="Search Icon"
                        className="w-4 h-4 "
                    />
                )}
            </div>
        </div>
    );
};

export default Switch;
