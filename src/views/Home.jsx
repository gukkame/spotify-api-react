import List from "../components/List.jsx";
import React, { useState } from "react";
import Switch from "../components/Switch.jsx";

const Home = () => {
    const [query, setQuery] = useState("");
    const [isToggled, setIsToggled] = useState(false);

    /**
     * Handles changes to the query input.
     * @param {string} newQuery - The new query value.
     */
    const handleQueryChange = (newQuery) => {
        setQuery(newQuery);
    };

    /**
     * Toggles the toggled state.
     */
    const handleToggle = () => {
        setIsToggled(!isToggled);
    };

    return (
        <div className="flex flex-col justify-center mt-20 items-center gap-3">
            <h2 className="text-4xl text-gray-300">Spotify API Meklētājs</h2>
            <p className="mb-5 text-gray-400">Izstrādāja Gunta Kļava</p>
            <Switch onToggle={handleToggle} onQueryChange={handleQueryChange} />
            <List query={query} showFavorites={isToggled} />
        </div>
    );
};

export default Home;
