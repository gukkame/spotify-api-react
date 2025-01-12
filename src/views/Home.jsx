import SearchResults from "../components/SearchResults.jsx";
import Favourite from "../components/Favourite.jsx";
import React, { useState } from "react";
import Switch from "../components/Switch.jsx";

const Home = () => {
    const [query, setQuery] = useState("");
    const [isToggled, setIsToggled] = useState(false);

    const handleQueryChange = (newQuery) => {
        console.log("Query changed to", newQuery);

        setQuery(newQuery);
    };
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
                {isToggled ? <Favourite /> : <SearchResults query={query} />}
            </div>
        </div>
    );
};

export default Home;
