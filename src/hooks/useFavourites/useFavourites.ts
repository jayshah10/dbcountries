import { useState, useCallback } from 'react';

const localStorageKey = 'FAVOURITE_COUNTRIES';

export const useFavourites = (): {
  favourites: Array<string>;
  updateFavourites: (newFavourites: Array<string>) => void;
} => {
  const favouritesAsString: string | null = localStorage.getItem(localStorageKey);
  const defaultFavourites = favouritesAsString ? favouritesAsString.split(',') : [];
  const [favourites, setFavourites] = useState<Array<string>>(defaultFavourites);

  const updateFavourites = useCallback(
    (newFavourites: Array<string>) => {
      const updateFavouritesAsString = newFavourites.join(',');
      localStorage.setItem(localStorageKey, updateFavouritesAsString);
      setFavourites(newFavourites);
    },
    [setFavourites],
  );

  return { favourites, updateFavourites };
};
