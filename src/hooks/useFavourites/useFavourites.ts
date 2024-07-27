import { useState, useCallback, useEffect } from 'react';

const localStorageKey = 'FAVOURITE_COUNTRIES';

export const useFavourites = (): {
  favourites: Array<string>;
  toggleFavourite: (favourite: string) => void;
} => {
  const favouritesAsString: string | null = localStorage.getItem(localStorageKey);
  const defaultFavourites = favouritesAsString ? favouritesAsString.split(',') : [];
  const [favourites, setFavourites] = useState<Array<string>>(defaultFavourites);

  const toggleFavourite = useCallback(
    (favourite: string) => {
      setFavourites((existing: Array<string>) => {
        const newFavourites = [...existing];
        const indexofFavourite = newFavourites.indexOf(favourite);
        if (indexofFavourite === -1) {
          newFavourites.push(favourite);
        } else {
          newFavourites.splice(indexofFavourite, 1);
        }
        const updateFavouritesAsString = newFavourites.join(',');
        localStorage.setItem(localStorageKey, updateFavouritesAsString);
        return newFavourites;
      });
    },
    [setFavourites],
  );

  return { favourites, toggleFavourite };
};
