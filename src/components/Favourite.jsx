import React from "react";

const Favourite = ({ favouriteArtists }) => {
  const [isActive, setIsActive] = React.useState(false);

  const handleIconClick = () => {
    setIsActive(!isActive);
  };

  return (
    <div>
      {isActive && (
        <div>
          {favouriteArtists.length > 0 ? (
            <>
              <ul className="list-disc list-inside">
                {favouriteArtists.map((artist, index) => (
                  <li key={index}>{artist}</li>
                ))}
              </ul>
            </>
          ) : (
            <h2 className="text-center text-2xl text-green-500">
              No artists found
            </h2>
          )}
        </div>
      )}
    </div>
  );
};

export default Favourite;
