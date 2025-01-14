import SearchResults from "../components/SearchResults.jsx";
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
        <div className="flex justify-center items-top mt-32 min-h-screen">
            <div className="flex flex-col items-center space-y-8">
                <Switch
                    onToggle={handleToggle}
                    onQueryChange={handleQueryChange}
                />
                <SearchResults query={query} showFavorites={isToggled} />
            </div>
        </div>
    );
};

export default Home;
