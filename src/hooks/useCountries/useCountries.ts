import { useQuery } from '@tanstack/react-query';
import { Country } from '../../types';
import { useCallback } from 'react';
import Fuse, { FuseResult } from 'fuse.js';

const URL = 'https://restcountries.com/v3.1/all';
const fuseOptions = {
  // isCaseSensitive: false,
  // includeScore: false,
  shouldSort: true,
  // includeMatches: false,
  findAllMatches: false,
  minMatchCharLength: 3,
  // location: 0,
  // threshold: 0.6,
  // distance: 100,
  // useExtendedSearch: false,
  // ignoreLocation: false,
  // ignoreFieldNorm: false,
  // fieldNormWeight: 1,
  keys: ['name.common'],
};

export const useCountries = (search?: string) => {
  const filterFunc = useCallback(
    (values: Array<Country>) => {
      const fuze = new Fuse(values, fuseOptions);
      if (search) {
        const results: Array<FuseResult<Country>> = fuze.search(search);
        return results.map((res: FuseResult<Country>) => {
          return res.item;
        });
      } else {
        return values;
      }
    },
    [search],
  );

  return useQuery<Array<Country>>({
    queryKey: [search],
    queryFn: () =>
      fetch(URL)
        .then((res) => res.json() as Promise<Array<Country>>)
        .then(filterFunc),
  });
};
