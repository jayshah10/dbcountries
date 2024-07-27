import { ChangeEventHandler, useCallback, useState } from 'react';
import { useCountries, useFavourites } from '../../hooks';
import { CircularProgress, Container, Stack, TextField, Card, CardContent } from '@mui/material';
import useDebounce from '../../hooks/useDebounce/useDebounce';
import { CountryGrid } from '../country-grid';
import { Country } from '../../types';
import { CountryDetail } from '../country-detail';

export const Countries = () => {
  const [searchString, setSearchString] = useState<string | undefined>();
  const [selectedCountry, setSelectedCountry] = useState<Country | undefined>();
  const { favourites, toggleFavourite } = useFavourites();
  const debouncedSearchString = useDebounce(searchString, 500);
  const updateSearchString: ChangeEventHandler<HTMLInputElement> = useCallback(
    (e) => {
      setSearchString(e.target.value);
    },
    [setSearchString],
  );

  const { data, isPending } = useCountries(debouncedSearchString);

  return (
    <>
      <Card style={{ width: 'inherit' }}>
        <CardContent>
          <Container>
            <Stack spacing={2}>
              <TextField value={searchString} onChange={updateSearchString} label="Search" variant="filled" />
              {isPending && <CircularProgress />}
              {data && (
                <CountryGrid
                  data={data}
                  onSelect={setSelectedCountry}
                  favourites={favourites}
                  onToggleFavourite={toggleFavourite}
                />
              )}
            </Stack>
          </Container>
        </CardContent>
      </Card>
      {selectedCountry && (
        <CountryDetail
          country={selectedCountry}
          onClose={() => {
            setSelectedCountry(undefined);
          }}
        />
      )}
    </>
  );
};
